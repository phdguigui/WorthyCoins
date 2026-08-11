import Cookies from "js-cookie";
import { loginUser } from "../../api/LoginApi";
import styles from "./LoginPage.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TextInput, PasswordInput } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { ToastContent } from "../../components/Toast/ToastContent";
import { useTranslation } from "react-i18next";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const { t } = useTranslation();

  const loginSchema = z.object({
    email: z.string().email(t("login.invalidEmail")),
    password: z.string().min(1, t("login.passwordRequired")),
  });

  type LoginInput = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailParam,
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await loginUser(data.email, data.password);
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
      const errorMessage = e?.message || t("login.errorDefault");
      toast.error(
        <ToastContent title={t("login.errorTitle")} description={errorMessage} />,
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="/logo.png" alt="logo" />
        <p>{t("login.title")}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <TextInput
            label={t("login.emailLabel")}
            id="email"
            error={errors.email?.message}
            required
            {...register("email")}
          />
        </div>
        <div className={styles.formGroup}>
          <PasswordInput
            label={t("login.passwordLabel")}
            id="password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            {t("login.button")}
          </button>
        </div>
      </form>
      <div>
        <p>
          {t("login.dontHaveAccount")}{" "}
          <Link to="/register">{t("login.registerHere")}</Link>
        </p>
      </div>
    </div>
  );
}
