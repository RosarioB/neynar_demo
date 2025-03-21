import "dotenv/config";

if (!process.env.NEYNAR_API_KEY) {
  throw new Error("Make sure you set NEYNAR_API_KEY in your .env file");
}

if(!process.env.SIGNER_UUID) {
  throw new Error("Make sure you set SIGNER_UUID in your .env file");
}

export const config = {
  neynar_api_key: process.env.NEYNAR_API_KEY as string,
  signer_uuid: process.env.SIGNER_UUID as string,
};
