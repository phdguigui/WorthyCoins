import { useState } from "react";
import Cookies from "js-cookie";
import { registerUser } from "../../api/RegisterApi";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, PasswordInput } from "../../components/Input";

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const response = await registerUser(firstName, lastName, email, password);
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextInput
            label="First Name"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Last Name"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <PasswordInput
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <PasswordInput
            label="Confirm password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
