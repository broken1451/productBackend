import { Router, Request, Response } from "express";
import { ProductModel } from "../models/Products";

const ProductRoutes = Router();

ProductRoutes.get("/productos", async (req: any, res: Response) => {
  try {
    const productos = await ProductModel.find({});
    return res.status(200).json({
      ok: true,
      productos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: true,
      messge: "Error interno",
    });
  }
});

ProductRoutes.post("/productos", async (req: any, res: Response) => {
  try {
    const { producto, categoria, ubicacion, precio } = req.body;
    const product = {
      producto,
      categoria,
      ubicacion,
      precio,
    };
    const newProduct = new ProductModel(product);
    await newProduct.save();
    return res.status(200).json({
      ok: true,
      messge: "funciona",
      newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      messge: "Error interno",
    });
  }
});

ProductRoutes.put("/productos/:id", async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const { producto, categoria, ubicacion, precio } = req.body;

    const updateProduct: any = await ProductModel.findById(id).exec();
    if (updateProduct) {
      updateProduct.producto = producto;
      updateProduct.categoria = categoria;
      updateProduct.ubicacion = ubicacion;
      updateProduct.precio = precio;

      const productoUpdate = await updateProduct.save();

      return res.status(200).json({
        ok: true,
        messge: "funciona",
        productoUpdate,
      });
    } else {
      return res.status(404).json({
        ok: true,
        messge: "producto no existe",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      messge: "Error interno",
    });
  }
});

ProductRoutes.get("/productos/:id", async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const productId: any = await ProductModel.findById(id).exec();
    return res.status(200).json({
      ok: true,
      mensaje: "Todo funciona bien",
      productId,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: `No existe pc con este id ${id}`,
    });
  }
});

ProductRoutes.delete("/productos/:id", async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const productDeleted: any = await ProductModel.findByIdAndRemove(id).exec();
    if (productDeleted) {
      return res.status(200).json({
        ok: true,
        mensaje: "producto eiminado exitosamente",
        productDeleted,
      });
    } else {
      return res.status(400).json({
        ok: false,
        mensaje: "El producto con el " + id + " ya no existe",
        errors: { message: "No existe un producto con ese ID" },
      });
    }
  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: "El producto con el id " + id + " no existe",
      errors: { message: "No existe un producto con ese ID" },
      error,
    });
  }
});

export default ProductRoutes;
