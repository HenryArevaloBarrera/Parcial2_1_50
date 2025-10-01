import Producto from "../models/producto.mjs";

// Obtener todos los productos (sin autenticación requerida)
async function findAll(req, res) {
    try {
        const result = await Producto.find();
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Buscar producto por ID (sin autenticación requerida)
async function findById(req, res) {
    const { id } = req.params;
    try {
        const result = await Producto.findById(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el producto" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Registrar entrada o salida de inventario (requiere autenticación)
async function actualizarInventario(req, res) {
    const { id } = req.params;
    const { tipo, cantidad, stockMinimo = 0 } = req.body;

    if (!["entrada", "salida"].includes(tipo)) {
        return res.status(400).json({ state: false, error: "El tipo debe ser 'entrada' o 'salida'" });
    }

    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ state: false, error: "No se encontró el producto" });
        }

        if (tipo === "entrada") {
            producto.stock += cantidad;
        } else if (tipo === "salida") {
            if (producto.stock - cantidad < stockMinimo) {
                return res.status(400).json({
                    state: false,
                    error: "No hay suficiente inventario para realizar la salida"
                });
            }
            producto.stock -= cantidad;
        }

        const actualizado = await producto.save();
        res.status(200).json({ state: true, data: actualizado });

    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Crear un producto nuevo (requiere autenticación)
async function save(req, res) {
    try {
        const nuevoProducto = new Producto(req.body);
        const result = await nuevoProducto.save();
        res.status(201).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Actualizar info de un producto (requiere autenticación, no inventario)
async function update(req, res) {
    const { id } = req.params;
    try {
        const result = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el producto" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Eliminar un producto (requiere autenticación)
async function deleteById(req, res) {
    const { id } = req.params;
    try {
        const result = await Producto.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el producto" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

export {
    findAll,
    findById,
    save,
    update,
    deleteById,
    actualizarInventario
};
