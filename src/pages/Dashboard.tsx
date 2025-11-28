import { useState } from "react";
import MainLayout from "../layout/MainLayout";

const Dashboard = ({ username, onLogout }) => {
  const [quantity, setQuantity] = useState("");
  const [globalCounter, setGlobalCounter] = useState(0);
  const [assignedRange, setAssignedRange] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setError("Introduce una cantidad válida mayor que 0.");
      setAssignedRange(null);
      return;
    }

    if (parsedQuantity > 3000) {
      setError("La cantidad máxima permitida es 3000.");
      setAssignedRange(null);
      return;
    }

    const start = globalCounter + 1;
    const end = globalCounter + parsedQuantity;

    setAssignedRange({ start, end });
    setGlobalCounter(end);
    setError("");
  };

  const sidebarContent = (
    <div>
      <h3>Menú</h3>
      <p>Usuario: {username}</p>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );

  return (
    <MainLayout sidebar={sidebarContent}>
      <h2>Asignar rango de etiquetas</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400, marginBottom: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Cantidad de etiquetas (máx. 3000)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
            min={1}
            max={3000}
          />
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Generar rango
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {assignedRange && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid white", borderRadius: "0.5rem" }}>
          <p>Rango asignado:</p>
          <p>Desde: <strong>{assignedRange.start}</strong></p>
          <p>Hasta: <strong>{assignedRange.end}</strong></p>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
