import Cookies from "js-cookie";
import { registerUser } from "../../api/RegisterApi";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, PasswordInput } from "../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
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
      const token = response.data.token.data;
      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
      navigate("/");
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">
        <img className="logo" src="/logo.png" alt="logo" />
        <p>Register</p>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <TextInput
            label="First Name"
            id="first-name"
            error={errors.firstName?.message}
            required
            {...register("firstName")}
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Last Name"
            id="last-name"
            error={errors.lastName?.message}
            required
            {...register("lastName")}
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Email"
            id="email"
            error={errors.email?.message}
            required
            {...register("email")}
          />
        </div>
        <div className="form-group">
          <PasswordInput
            label="Password"
            id="password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>
        <div className="form-group">
          <PasswordInput
            label="Confirm password"
            id="confirm-password"
            error={errors.confirmPassword?.message}
            required
            {...register("confirmPassword")}
          />
        </div>
        <div className="form-group">
          <button className="submit-button" type="submit">
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
