import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación básica: que no estén vacíos
    if (!username.trim() || !password.trim()) {
      alert("Por favor, introduce usuario y contraseña.");
      return;
    }

    // Aquí en el futuro llamarías a la API para comprobar credenciales.
    // De momento, simulamos que siempre está bien:

    onLogin(username); // avisamos a App de quién se ha logueado
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
            placeholder="Ej: nave1_user"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
