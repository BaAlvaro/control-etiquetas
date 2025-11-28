import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let globalCounter = 0;

app.use("/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/counter", (req, res) => {
  res.json({ globalCounter });
});

app.post("/counter/assign-range", (req, res) => {
  const { quantity } = req.body;

  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ error: "Cantidad inválida" });
  }

  if (quantity > 3000) {
    return res.status(400).json({ error: "La cantidad máxima permitida es 3000" });
  }

  const start = globalCounter + 1;
  const end = globalCounter + quantity;

  globalCounter = end;

  res.json({ start, end, newGlobalCounter: globalCounter });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
