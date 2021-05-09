import express from "express";
import cors from "cors";
import ProductRoutes from "../routes/productRoutes";

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ origin: true, credentials: true }));
    // this.app.use(morgan("dev"));
    // this.port = Number(process.env.PORT) || 3500;

  }

  async start(port: number, callback?: any) {
    this.app.listen(port, callback);
    console.log(`Servidor en puerto ${port}`)
    this.startRoutes();
  }

  startRoutes() {
    this.app.use('/api', ProductRoutes)
  }
}