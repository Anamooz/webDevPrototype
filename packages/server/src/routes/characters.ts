import express, { Request, Response } from "express";
import { Character } from "../models/character";

import Characters from "../services/character-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const characters = await Characters.index();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve characters." });
    }
});

export default router;