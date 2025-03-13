import * as admin from "firebase-admin";
import { WriteResult } from "firebase-admin/firestore";
import "dotenv/config";

if (process.env.STAGE === "prod") {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
      projectId: process.env.PROJECT_ID,
    }),
    projectId: process.env.PROJECT_ID,
  });
} else if (process.env.STAGE === "dev") {
  admin.initializeApp({
    credential: admin.credential.cert("./lamudaCredentials.json"),
  });
} else if (process.env.STAGE === "test") {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  admin.initializeApp({
    projectId: process.env.PROJECT_ID,
  });
}

const db = admin.firestore();

export { db, WriteResult };
