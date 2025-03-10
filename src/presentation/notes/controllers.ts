import { Request, Response } from "express";
import { db } from "../../config/firebase";

export class NotesControllers {
  public notes = async (_req: Request, res: Response) => {
    const snapshot = await db.collection("notes").get();

    const notes = snapshot.docs.map((x) => ({
      message: x.data().message,
    }));
    res.status(200).send(notes);
  };
}
