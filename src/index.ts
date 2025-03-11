import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use((req: Request, res: Response, next) => {
  console.log(
    `${req.method} ${req.path} - ${new Date().toISOString()} - IP: ${req.ip}`
  );
  next();
});

app.set("trust proxy", true);

app.use(express.json());

app.use(cors());

app.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    if (data.embeds) {
      data.embeds.forEach((embed, index) => {
        console.log(`Embed ${index + 1}:`, embed);
      });
    }
    res.send("gm!");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is a GET request!");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
