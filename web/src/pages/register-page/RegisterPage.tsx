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

const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterInput = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
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
        e?.message || "Registration failed. Please try again.";
      toast.error(
        <ToastContent title="Erro no Cadastro" description={errorMessage} />,
      );

      if (e?.errorCode === "EMAIL_ALREADY_EXISTS") {
        setError(
          "email",
          {
            type: "manual",
            message: "Email already registered.",
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
        <p>Register</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <TextInput
            label="First Name"
            id="first-name"
            error={errors.firstName?.message}
            required
            {...register("firstName")}
          />
        </div>
        <div className={styles.formGroup}>
          <TextInput
            label="Last Name"
            id="last-name"
            error={errors.lastName?.message}
            required
            {...register("lastName")}
          />
        </div>
        <div className={styles.formGroup}>
          <TextInput
            label="Email"
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
                      Login instead.
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
            label="Password"
            id="password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>
        <div className={styles.formGroup}>
          <PasswordInput
            label="Confirm password"
            id="confirm-password"
            error={errors.confirmPassword?.message}
            required
            {...register("confirmPassword")}
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            Register
          </button>
        </div>
      </form>
      <div>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
