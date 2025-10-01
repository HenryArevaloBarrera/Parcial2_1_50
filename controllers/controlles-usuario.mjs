import Usuario from "../models/usuario.mjs";

// Obtener todos los usuarios
async function findAll(req, res) {
    try {
        const result = await Usuario.find();
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Buscar usuario por _id (ObjectId de Mongo)
async function findById(req, res) {
    const { id } = req.params;
    try {
        const result = await Usuario.findById(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el usuario" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Guardar nuevo usuario
async function save(req, res) {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const result = await nuevoUsuario.save();
        res.status(201).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Actualizar usuario por _id
async function update(req, res) {
    const { id } = req.params;
    try {
        const result = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el usuario" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Eliminar usuario por _id
async function deleteById(req, res) {
    const { id } = req.params;
    try {
        const result = await Usuario.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el usuario" });
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
    deleteById
};
