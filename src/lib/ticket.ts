import { SignJWT, jwtVerify, generateKeyPair, exportJWK, importJWK } from "jose";

type Payload = { ticket_id: string; event_id: string; valid_from: number; valid_to: number; nonce: string };

let privateKeyPromise: Promise<CryptoKey> | null = null;
let publicKeyPromise: Promise<CryptoKey> | null = null;

async function getKeys() {
  if (privateKeyPromise && publicKeyPromise) return { privateKey: await privateKeyPromise, publicKey: await publicKeyPromise };
  const priv = process.env.TICKET_PRIVATE_KEY;
  const pub = process.env.TICKET_PUBLIC_KEY;
  if (priv && pub) {
    const privJwk = JSON.parse(Buffer.from(priv, "base64").toString());
    const pubJwk = JSON.parse(Buffer.from(pub, "base64").toString());
    privateKeyPromise = importJWK(privJwk, "EdDSA") as Promise<CryptoKey>;
    publicKeyPromise = importJWK(pubJwk, "EdDSA") as Promise<CryptoKey>;
  } else {
    const { privateKey, publicKey } = await generateKeyPair("Ed25519");
    const privJwk = await exportJWK(privateKey);
    const pubJwk = await exportJWK(publicKey);
    privateKeyPromise = importJWK(privJwk, "EdDSA") as Promise<CryptoKey>;
    publicKeyPromise = importJWK(pubJwk, "EdDSA") as Promise<CryptoKey>;
  }
  return { privateKey: await privateKeyPromise!, publicKey: await publicKeyPromise! };
}

export async function signTicket(payload: Payload) {
  const { privateKey } = await getKeys();
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "EdDSA" })
    .setIssuedAt()
    .setExpirationTime(payload.valid_to)
    .sign(privateKey);
  return token;
}

export async function verifyTicket(token: string) {
  const { publicKey } = await getKeys();
  const { payload } = await jwtVerify(token, publicKey, { algorithms: ["EdDSA"] });
  return payload as any as Payload;
}
