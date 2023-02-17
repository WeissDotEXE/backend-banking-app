import express from "express";
// import controllers from notificationController.ts

const router = express.Router();

router.route("/:userId").get();

export default router;
