import express, { Router, Express } from "express";

export interface Options {
  port: number;
  router: Router;
}
export class Server {
  private readonly port: number;
  private readonly router: Router;
  private readonly app: Express = express();
  constructor({ port, router }: Options) {
    this.port = port;
    this.router = router;
  }

  start() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(this.router);

    this.app.listen(this.port, () => {
      console.log("ariel;", this.port);
    });
  }
}
