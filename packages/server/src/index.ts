import express, { Request, Response } from "express";
import { WeaponPage } from "./pages/weapon";
import { UserPage } from "./pages/user";
import Weapons from "./services/weapon-svc";
import Users from "./services/user-svc";
import Characters from "./services/character-svc";
import { connect } from "./services/mongo";
import users from "./routes/users";
import auth, { authenticateUser } from "./routes/auth";
import { LoginPage } from "./pages/auth";
import { RegistrationPage } from "./pages/auth";
import characters from "./routes/characters";
import fs from "node:fs/promises";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);
app.use("/api/users", users);
app.use("/api/characters", characters);

connect("test");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/register", (req: Request, res: Response) => {
  const page = new RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/weapon/:weaponid", (req: Request, res: Response) => {
  const { weaponid } = req.params;
  Weapons.get(weaponid).then((data) => {
    const page = new WeaponPage(data);
    res
      .set("Content-Type", "text/html")
      .send(page.render());
  });
});

app.get("/user/:username", (req: Request, res: Response) => {
  const { username } = req.params;

  Users.getByUsername(username)
    .then((user) => {
      const page = new UserPage(user);
      res
        .set("Content-Type", "text/html")
        .send(page.render());
    })
    .catch((error) => {
      res.status(404).send(`User with username ${username} not found`);
    });
});

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});