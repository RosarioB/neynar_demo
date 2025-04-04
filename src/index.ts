import express, { Request, Response } from "express";
import cors from "cors";
import util from "util";
import neynarClient from "./neynar.js";
import { config } from "./config.js";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is the Neynar Test server!");
});

app.post("/api/webhook/mention", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(util.inspect(data, { depth: null, colors: true }));
    res.status(200).send("Received mention from Farcaster");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

app.post("/api/cast", async (req: Request, res: Response) => {
  const text = req.body.text;
  const imageUrl = req.body.imageUrl;
  try {
    await neynarClient.publishCast({
      signerUuid: config.signer_uuid,
      text: text,
      embeds: [
        {
          url: imageUrl,
        },
      ],
    });
    console.log("Published cast:", text);
    res.status(200).send(`Cast published successfully`);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

app.get("/api/users/:username", async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const userResponse = await neynarClient.lookupUserByUsername({
      username,
    });
    if (userResponse) {
      res.status(200).send(userResponse);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e: any) {
    console.error("Error fetching user:", e);
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
