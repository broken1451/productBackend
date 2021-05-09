import mongoose, { Model } from "mongoose";

const productSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  categoria: { type: String, required: true },
  ubicacion: { type: String, required: true },
  precio: { type: String, required: true },
  creado: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model("Producto", productSchema);
