require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 1000;

app.use(express.json()); //permite que express lea los daos en formato json 
app.use(cors()); //habilita cors para que cualquier front pueda usar la API

let users = [
  {
    id: 1,
    name: "maria emilia bagnera",
    ciudad: "Cordoba",
    mail: "emi@gmail.com",
    desde: "2022-09-19"
  }
]

app.get("/users", (req, res) => { //Cuando alguien acceda con get le responde con la lista de usuarios
  res.status(200).json(users);    // codigo del exito / se envia la lista en json
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex(user => user.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  users.splice(index, 1);

  res.status(200).json({ message: "Usuario eliminado correctamente" });
});

app.post("/users", (req, res) => {
  const { name, ciudad, mail, desde } = req.body; //req.body contiene los datos enviados en la solicitud
  if (!name || !ciudad || !mail || !desde) {
    return res.status(400).json({ error: "Falta informacion" });
  }

  const userExist = users.some(user => user.mail === mail);
  if (userExist) {
    return res.status(400).json({ error: "El usuario ya esta registrado" });
  }

  const id = users.length + 1;
  const newUser = { id, name, ciudad, mail, desde };
  users.push(newUser);
  res.status(201).json({ message: "Usuario agregado correctamente" });
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, ciudad, mail, desde } = req.body;

  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (name) user.name = name;
  if (mail) user.mail = mail;
  if (ciudad) user.ciudad = ciudad;
  if (desde) user.desde = desde;


  res.status(200).json({ message: "Usuario actualizado correctamente", user });
});

let pets = [
  {
    id: 1,
    name: "Mora",
    age: 9,
    patas: 4,
    cola: true
  }
]

app.get("/pets", (req, res) => { //Cuando alguien acceda con get le responde con la lista de usuarios
  res.status(200).json(pets);    // codigo del exito / se envia la lista en json
});

app.delete("/pets/:id", (req, res) => {
  const { id } = req.params;

  const index = pets.findIndex(pet => pet.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  pets.splice(index, 1);

  res.status(200).json({ message: "Usuario eliminado correctamente" });
});

app.post("/pets", (req, res) => {
  const { name, age, patas, cola } = req.body; //req.body contiene los datos enviados en la solicitud
  if (!name || !age || !patas || !cola) {
    return res.status(400).json({ error: "Falta informacion" });
  }

  const petExist = pets.some(pet => pet.name === name);
  if (petExist) {
    return res.status(400).json({ error: "El usuario ya esta registrado" });
  }

  const id = pets.length + 1;
  const newPet = { id, name, age, patas, cola };
  pets.push(newPet);
  res.status(201).json({ message: "Usuario agregado correctamente" });
});

app.patch("/pets/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, patas, cola } = req.body;

  const pet = pets.find(pet => pet.id === parseInt(id));

  if (!pet) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (name) pet.name = name;
  if (age) pet.age = age;
  if (patas) pet.patas = patas;
  if (cola) pet.cola = cola;


  res.status(200).json({ message: "Usuario actualizado correctamente", pet });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

