// Method 2: The ChainKit SDK
//
// Avalanche's official on-chain data SDK. Structured, paginated results,
// no manual RPC parsing. Needs a free Glacier API key from avacloud.io.

import "dotenv/config";
import { Avalanche } from "@avalanche-sdk/chainkit";
import { normalizeMany } from "./normalize.js";

async function main() {
  const walletAddress = process.env.WALLET_ADDRESS;
  const apiKey = process.env.GLACIER_API_KEY;
  if (!walletAddress) throw new Error("Set WALLET_ADDRESS in your .env first.");
  if (!apiKey)
    throw new Error(
      "Set GLACIER_API_KEY in your .env first. Get a free one at avacloud.io.",
    );

  const avalancheSDK = new Avalanche({
    chainId: "43113",
    apiKey,
  });

  try {
    const result = await avalancheSDK.data.evm.address.transactions.list({
      address: walletAddress,
      sortOrder: "asc",
    });

    console.log(result);

    const transactions = result?.result?.transactions ?? result?.items ?? [];

    console.log(`Found ${transactions.length} transactions\n`);

    for (const tx of transactions) {
      console.log("->", tx);
    }
  } catch (error) {
    console.error("ChainKit fetch error:", error);
    process.exit(1);
  }
}

main();
