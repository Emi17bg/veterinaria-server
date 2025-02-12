let pets = [
  {
    id: 1,
    name: "Mora",
    age: 9,
    patas: 4,
    cola: true,
  },
];

exports.getPets = (req, res) => {
  //Cuando alguien acceda con get le responde con la lista de usuarios
  res.status(200).json(pets); // codigo del exito / se envia la lista en json
};

exports.deletePet = (req, res) => {
  const { id } = req.params;

  const index = pets.findIndex((pet) => pet.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  pets.splice(index, 1);

  res.status(200).json({ message: "Usuario eliminado correctamente" });
};

exports.createPet = (req, res) => {
  const { name, age, patas, cola } = req.body; //req.body contiene los datos enviados en la solicitud
  if (!name || !age || !patas || cola === undefined) {
    return res.status(400).json({ error: "Falta informacion" });
  }

  const petExist = pets.some((pet) => pet.name === name);
  if (petExist) {
    return res.status(400).json({ error: "El usuario ya esta registrado" });
  }

  const id = pets.length + 1;
  const newPet = { id, name, age, patas, cola };
  pets.push(newPet);
  res.status(201).json({ message: "Usuario agregado correctamente" });
};

exports.updatePet = (req, res) => {
  const { id } = req.params;
  const { name, age, patas, cola } = req.body;

  const pet = pets.find((pet) => pet.id === parseInt(id));

  if (!pet) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (name) pet.name = name;
  if (age) pet.age = age;
  if (patas) pet.patas = patas;
  if (cola) pet.cola = cola;

  res.status(200).json({ message: "Usuario actualizado correctamente", pet });
};
