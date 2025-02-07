require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5050;

app.use(express.json()); //permite que express lea los daos en formato json 
app.use(cors()); //habilita cors para que cualquier front pueda usar la API

let users = [
  {
    id: 1,
    dni: 45508487,
    name: "maria emilia bagnera"
  }
]

app.get("/users", (req, res) => { //Cuando alguien acceda con get le responde con la lista de usuarios
  res.status(200).json(users);    // codigo del exito / se envia la lista en json
});

app.post("/users", (req, res) => {
  const { name, dni } = req.body; //req.body contiene los datos enviados en la solicitud
  if (!name || !dni) {
    return res.status(400).json({ error: "Falta informacion" });
  }

  const dniNumber = parseInt(dni);
  if (isNaN(dniNumber)) {
    return res.status(400).json({ error: "El DNI debe ser un número válido" });
  }

  if (dniNumber.toString().length < 7 || dniNumber.toString().length > 8) {
    return res.status(400).json({ error: "El DNI debe tener 7 u 8 números" });
  }

  const userExist = users.some(user => user.dni === dni);
  if (userExist) {
    return res.status(400).json({ error: "El usuario ya esta registrado" });
  }

  const id = users.length + 1;
  const newUser = { id, name, dni };
  users.push(newUser);
  res.status(201).json({ message: "Usuario agregado correctamente" });
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, dni } = req.body;

  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (name) user.name = name;
  if (dni) user.dni = dni;

  res.status(200).json({ message: "Usuario actualizado correctamente", user });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});