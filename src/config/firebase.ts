import * as admin from "firebase-admin";

if (process.env.STAGE === "prod") {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
      projectId: process.env.PROJECT_ID,
    }),
    projectId: process.env.PROJECT_ID,
  });
} else {
  admin.initializeApp({
    credential: admin.credential.cert("./lamudaCredentials.json"),
  });
}

const db = admin.firestore();

export { db };
