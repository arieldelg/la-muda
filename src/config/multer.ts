import multer, { Multer } from "multer";
// const upload = multer({ dest: "uploads/" });
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array("files", 5); // Accept up to 5 files
export { upload, Multer };
