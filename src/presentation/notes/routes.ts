import { Router } from "express";
import { NotesControllers } from "./controllers";

export class NotesRoutes {
  static get routes() {
    const routes = Router();
    const notesControllers = new NotesControllers();
    routes.get("/", notesControllers.notes);
    return routes;
  }
}
