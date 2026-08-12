import Cookies from "js-cookie";
import { registerUser } from "../../api/RegisterApi";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, PasswordInput } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { ToastContent } from "../../components/Toast/ToastContent";
import { useTranslation } from "react-i18next";

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const registerSchema = z
    .object({
      firstName: z.string().trim().min(1, t("register.validation.firstNameRequired")),
      lastName: z.string().trim().min(1, t("register.validation.lastNameRequired")),
      email: z.string().email(t("register.validation.invalidEmail")),
      password: z
        .string()
        .trim()
        .min(6, t("register.validation.passwordLength"))
        .regex(/[A-Z]/, t("register.validation.passwordUppercase"))
        .regex(/[a-z]/, t("register.validation.passwordLowercase"))
        .regex(/[0-9]/, t("register.validation.passwordNumber"))
        .regex(/[^a-zA-Z0-9]/, t("register.validation.passwordSpecial")),
      confirmPassword: z.string().trim().min(1, t("register.validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("register.validation.passwordsMustMatch"),
      path: ["confirmPassword"],
    });

  type RegisterInput = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await registerUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword,
      );
      const token = response.data.data;
      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
      navigate("/");
    } catch (e: any) {
      const errorMessage =
        e?.message || t("register.errorDefault");
      toast.error(
        <ToastContent title={t("register.errorTitle")} description={errorMessage} />,
      );

      if (e?.errorCode === "EMAIL_ALREADY_EXISTS") {
        setError(
          "email",
          {
            type: "manual",
            message: t("register.emailAlreadyRegistered"),
          },
          { shouldFocus: true },
        );
        return;
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="/logo.png" alt="logo" />
        <p>{t("register.title")}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <TextInput
            label={t("register.firstNameLabel")}
            id="first-name"
            error={errors.firstName?.message}
            required
            {...register("firstName")}
          />
        </div>
        <div className={styles.formGroup}>
          <TextInput
            label={t("register.lastNameLabel")}
            id="last-name"
            error={errors.lastName?.message}
            required
            {...register("lastName")}
          />
        </div>
        <div className={styles.formGroup}>
          <TextInput
            label={t("register.emailLabel")}
            id="email"
            error={
              errors.email?.message ? (
                <span>
                  {errors.email.message}{" "}
                  {errors.email.type === "manual" && (
                    <Link
                      to={`/login?email=${watch("email")}`}
                      className={styles.loginInsteadLink}
                    >
                      {t("register.loginInstead")}
                    </Link>
                  )}
                </span>
              ) : undefined
            }
            required
            {...register("email")}
          />
        </div>
        <div className={styles.formGroup}>
          <PasswordInput
            label={t("register.passwordLabel")}
            id="password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>
        <div className={styles.formGroup}>
          <PasswordInput
            label={t("register.confirmPasswordLabel")}
            id="confirm-password"
            error={errors.confirmPassword?.message}
            required
            {...register("confirmPassword")}
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("register.registering") : t("register.button")}
          </button>
        </div>
      </form>
      <div>
        <p>
          {t("register.alreadyHaveAccount")}{" "}
          <Link to="/login">{t("register.loginHere")}</Link>
        </p>
      </div>
    </div>
  );
}
