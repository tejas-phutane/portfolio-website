import { notFound } from "next/navigation";
import StudioClient from "./StudioClient";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  // Completely block access to Studio in production deployments
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_STUDIO_IN_PROD !== "true") {
    notFound();
  }

  return <StudioClient />;
}
