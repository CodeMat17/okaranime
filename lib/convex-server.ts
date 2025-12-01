// lib/convex-server.ts
import { ConvexHttpClient } from "convex/browser";

// Create a server-side Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export { convex };
