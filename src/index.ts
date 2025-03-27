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

// Testing that the server is running
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is the Neynar Test server!");
});

// Webhook to handle mentions @Aethermint from Farcaster
app.post("/api/webhook/mention", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(util.inspect(data, { depth: null, colors: true }));
    res.status(200).send("Received mention from Farcaster");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// Pusblishing a cast to Farcaster
app.post("/api/cast", async (req: Request, res: Response) => {
  const text = req.body.text;
  try {
    await neynarClient.publishCast({
      signerUuid: config.signer_uuid,
      text: text,
      embeds: [
        {
          url: "https://apricot-obvious-xerinae-783.mypinata.cloud/ipfs/bafybeiejeassvoqz2gk7tl4m725qyxcyz2dsa7wtr3fayechhm5nvl5jee",
        }
      ],
    });
    console.log("Published cast:", text);
    res.status(200).send(`Cast published successfully`);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
