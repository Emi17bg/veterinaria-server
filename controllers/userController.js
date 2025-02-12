let users = [
  {
    id: 1,
    name: "Maria Emilia Bagnera",
    ciudad: "Cordoba",
    mail: "emi@gmail.com",
    desde: "2022-09-19",
  },
];

exports.getUsers = (req, res) => {
  // Cuando alguien acceda con get le responde con la lista de usuarios
  res.status(200).json(users); // codigo del exito / se envia la lista en json
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  users.splice(index, 1);

  res.status(200).json({ message: "Usuario eliminado correctamente" });
};

exports.createUser = (req, res) => {
  const { name, ciudad, mail, desde } = req.body; //req.body contiene los datos enviados en la solicitud
  if (!name || !ciudad || !mail || !desde) {
    return res.status(400).json({ error: "Falta informacion" });
  }

  const userExist = users.some((user) => user.mail === mail);
  if (userExist) {
    return res.status(400).json({ error: "El usuario ya esta registrado" });
  }

  const id = users.length + 1;
  const newUser = { id, name, ciudad, mail, desde };
  users.push(newUser);
  res.status(201).json({ message: "Usuario agregado correctamente" });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, ciudad, mail, desde } = req.body;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (name) user.name = name;
  if (mail) user.mail = mail;
  if (ciudad) user.ciudad = ciudad;
  if (desde) user.desde = desde;

  res.status(200).json({ message: "Usuario actualizado correctamente", user });
};
