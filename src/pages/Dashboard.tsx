const Dashboard = ({ username, onLogout }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h2>Panel principal</h2>
        <p>Hola, <strong>{username}</strong></p>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>

      <main>
        <p>
          Aquí más adelante pondremos:
        </p>
        <ul>
          <li>El formulario para pedir cantidad de etiquetas</li>
          <li>El rango asignado (ej: 1000–2000)</li>
          <li>El sidebar con usuarios conectados</li>
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
