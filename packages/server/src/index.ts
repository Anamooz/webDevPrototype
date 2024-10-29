import express, { Request, Response } from "express";
import { WeaponPage } from "./pages/weapon";
import Weapons from "./services/weapon-svc";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
connect("test");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});