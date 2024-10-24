import express, { Request, Response } from "express";
import { weaponPage } from "pages/weapon";
import { getWeapon } from "services/weapon-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("weapon/:weaponId",
  (req: Request, res: Response) => {
    const { weaponId} = req.params;
    const data = getWeapon(weaponId);
    const page = new weaponPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  }
)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});