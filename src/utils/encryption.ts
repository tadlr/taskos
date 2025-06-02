export async function encryptData(
  data: string,
  key: CryptoKey,
): Promise<string> {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(data),
  );

  const buffer = new Uint8Array(encrypted);
  const fullData = new Uint8Array(iv.length + buffer.length);
  fullData.set(iv, 0);
  fullData.set(buffer, iv.length);

  return btoa(String.fromCharCode(...fullData));
}

export async function decryptData(
  data: string,
  key: CryptoKey,
): Promise<string> {
  const rawData = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  const iv = rawData.slice(0, 12);
  const ciphertext = rawData.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(decrypted);
}

export async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
    "decrypt",
  ]);
}
