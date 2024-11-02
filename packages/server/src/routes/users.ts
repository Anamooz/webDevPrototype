import express, { Request, Response } from "express";
import { User } from "../models/user";

import Users from "../services/user-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Users.index()
      .then((list: User[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
  });
  
router.get("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;

    Users.get(userid)
        .then((user: User) => res.json(user))
        .catch((err) => res.status(404).send(err));
    });

router.get("/:userid/favoriteCharacters", (req: Request, res: Response) => {
    const { userid } = req.params;
    
    Users.get(userid)
        .then((user: User) => res.json(user.favoriteCharacters))
        .catch((err) => res.status(404).send(err));
    });

router.post("/:userid/favoriteCharacters/:characterid", (req: Request, res: Response) => {
    const { userid, characterid } = req.params;

    Users.addFavoriteCharacter(userid, characterid)
        .then((user: User) => res.status(201).json(user)) // Return the updated user with populated favoriteCharacters
        .catch((err) => res.status(500).send(err));
});

router.delete("/:userid/favoriteCharacters/:characterid", (req: Request, res: Response) => {
    const { userid, characterid } = req.params;

    Users.deleteFavoriteCharacter(userid, characterid)
        .then((user: User) => res.status(200).json(user)) // Return the updated user with populated favoriteCharacters
        .catch((err) => res.status(404).send(err)); // Return 404 if user not found
});

  export default router; 