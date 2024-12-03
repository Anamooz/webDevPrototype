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

router.get("/:name", (req: Request, res: Response) => {
    const { name } = req.params;

    Characters.getByName(name)
        .then((character) => {
            if (!character) {
                return res.status(404).json({ error: "Character not found." });
            }
            res.json(character);
        })
        .catch((error) => {
            console.error("Error fetching character:", error);
            res.status(500).json({ error: "Failed to retrieve character." });
        });
});

export default router;