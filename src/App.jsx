import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  // currentUser será:
  // - null  -> nadie ha iniciado sesión
  // - "pepe" (por ejemplo) -> usuario logueado
  const [currentUser, setCurrentUser] = useState(null);

  // Esta función se la pasamos al LoginPage.
  // LoginPage la llamará cuando el usuario inicie sesión correctamente.
  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  // (Opcional) más adelante podremos hacer logout con esto:
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {currentUser ? (
        // Si hay usuario, mostramos el Dashboard
        <Dashboard username={currentUser} onLogout={handleLogout} />
      ) : (
        // Si NO hay usuario (null), mostramos el login
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
