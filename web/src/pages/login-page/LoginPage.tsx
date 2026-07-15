import Cookies from "js-cookie";
import { loginUser } from "../../api/LoginApi";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, PasswordInput } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
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
    } catch (e: any) {}
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="/logo.png" alt="logo" />
        <p>Login</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <TextInput
            label="Email"
            id="email"
            error={errors.email?.message}
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
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </div>
      </form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
