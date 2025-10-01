import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

export default mongoose.models.Producto || model("Producto", ProductoSchema);
