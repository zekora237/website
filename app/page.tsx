// This file exists only as a fallback — the middleware redirects / to /{locale}
// If someone somehow reaches this page, redirect them
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
