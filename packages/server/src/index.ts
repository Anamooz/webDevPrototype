import express, { Request, Response } from "express";
import { weaponPage } from "./pages/weapon";
import Weapons from "./services/weapon-svc";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
connect("test");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/weapon/:weaponid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Weapons.get(userid).then((data) => {
    res
      .set("Content-Type", "text/html")
      .send(weaponPage.render(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});