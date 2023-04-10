import { Router } from "express";

const router = Router();

/** READ */
router.get("/", (req, res) => {
  return res.status(200).json({ message: "asd" });
});

router.get("/:id", (req, res) => {
  const { id: orderId } = req.params;
  return res.status(200).json({ message: "asd" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  return res.status(200).json({ message: "asd" });
});

export default router;
