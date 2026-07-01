import { useState } from "react";
import { TextInput, PasswordInput } from "../../components/Input";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(username, password);
        }}
      >
        <TextInput
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
