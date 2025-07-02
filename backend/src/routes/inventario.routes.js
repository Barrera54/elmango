import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // La tabla se sigue llamando 'productos', la consulta es correcta
    const [rows] = await pool.query("SELECT * FROM inventario");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ Error: "al obtener el inventario" });
  }
});

router.get("/:ID_produ", async (req, res) => {
  try {
    // Se cambia 'id' por 'ID_produ' en la consulta SQL
    const [rows] = await pool.query(
      "SELECT nombre, precio FROM inventario WHERE ID_produ = ?",
      [req.params.ID_produ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Devuelve el primer resultado (debería ser único si ID_produ es PK)
    res.json({
      nombre: rows[0].nombre,
      precio: rows[0].precio,
    });
  } catch (error) {
    console.error(error); // Para debugging
    res.status(500).json({ error: "Error al obtener el producto" });
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
      "INSERT INTO inventario (nombre, descripcion, precio) values (?, ?, ?)",
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
      "UPDATE inventario SET nombre = ?, descripcion = ?, precio = ? WHERE ID_produ = ?",
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
      "DELETE FROM inventario WHERE ID_produ = ?",
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
