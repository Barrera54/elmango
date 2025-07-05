import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // La tabla se sigue llamando 'productos', la consulta es correcta
    const [rows] = await pool.query("SELECT * FROM producto");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ Error: "al obtener los productos" });
  }
});

router.post("/", async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: "Nombre y precio son requeridos" });
  }
  try {
    // Se asume que la columna ID_produ se genera automáticamente o se manejará aparte si no es autoincremental.
    // Si 'ID_produ' es una columna autoincremental, 'insertId' seguirá funcionando para obtener el último ID insertado.
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio) values (?, ?, ?)",
      [nombre, descripcion, precio]
    );
    res.json({ ID_produ: result.insertId, nombre, descripcion, precio }); // Se cambió 'id' por 'ID_produ' en la respuesta
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

router.put("/:ID_produ", async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    // Se cambia 'id' por 'ID_produ' en la consulta SQL
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE ID_produ = ?",
      [nombre, descripcion, precio, req.params.ID_produ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Producto no encontrado" });
    // Se devuelve el ID_produ que se usó para la actualización
    res.json({ ID_produ: req.params.ID_produ, nombre, descripcion, precio });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

router.delete("/:ID_produ", async (req, res) => {
  try {
    // Se cambia 'id' por 'ID_produ' en la consulta SQL
    const [result] = await pool.query(
      "DELETE FROM productos WHERE ID_produ = ?",
      [req.params.ID_produ]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});



export default router;
