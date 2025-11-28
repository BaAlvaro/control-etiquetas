import { useState } from "react";

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

  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Panel principal</h2>
          <p>
            Hola, <strong>{username}</strong>
          </p>
        </div>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>

      <main>
        <section style={{ maxWidth: 400, marginBottom: "2rem" }}>
          <h3>Asignar rango de etiquetas</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.25rem" }}>
                Cantidad de etiquetas a imprimir (máx. 3000)
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
            <p style={{ color: "red", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          {assignedRange && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0 }}>Rango asignado:</p>
              <p style={{ margin: "0.25rem 0" }}>
                Desde: <strong>{assignedRange.start}</strong>
              </p>
              <p style={{ margin: 0 }}>
                Hasta: <strong>{assignedRange.end}</strong>
              </p>
            </div>
          )}
        </section>

        <section>
          <h3>Próximos pasos</h3>
          <ul>
            <li>Conectar este contador con el backend.</li>
            <li>Guardar cada rango asignado en base de datos.</li>
            <li>Añadir el sidebar con usuarios conectados.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
