require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Permite que express lea los daos en formato json
app.use(cors()); // Habilita cors para que cualquier front pueda usar la API

app.use("/users", userRoutes);
app.use("/pets", petRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
