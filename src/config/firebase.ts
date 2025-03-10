import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./lamudaCredentials.json"),
});

const db = admin.firestore();

export { db };
