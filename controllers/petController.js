const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, patas INTEGER, cola BOOLEAN)",
  );
});

exports.getPets = (req, res) => {
  db.all("SELECT * FROM pets", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
};

exports.deletePet = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM pets WHERE id = ?", id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Mascota no encontrada" });
    res.status(200).json({ message: "Mascota eliminada correctamente" });
  });
};

exports.createPet = (req, res) => {
  const { name, age, patas, cola } = req.body;
  if (!name || !age || !patas || cola === undefined) {
    return res.status(400).json({ error: "Falta informacion" });
  }

  db.get("SELECT * FROM pets WHERE name = ?", name, (err, pet) => {
    if (err) return res.status(500).json({ error: err.message });
    if (pet)
      return res.status(400).json({ error: "Esta mascota ya esta registrado" });

    db.run(
      "INSERT INTO pets (name, age, patas, cola) VALUES (?, ?, ?, ?)",
      [name, age, patas, cola],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({ id: this.lastID, message: "Mascota agregada correctamente" });
      },
    );
  });
};

exports.updatePet = (req, res) => {
  const { id } = req.params;
  const { name, age, patas, cola } = req.body;

  db.get("SELECT * FROM pets WHERE id = ?", id, (err, pet) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });

    const updatedPet = {
      name: name || pet.name,
      age: age !== undefined ? age : pet.age,
      patas: patas !== undefined ? patas : pet.patas,
      cola: cola !== undefined ? cola : pet.cola,
    };

    db.run(
      "UPDATE pets SET name = ?, age = ?, patas = ?, cola = ? WHERE id = ?",
      [updatedPet.name, updatedPet.age, updatedPet.patas, updatedPet.cola, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Mascota actualizada correctamente" });
      },
    );
  });
};
