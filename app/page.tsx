import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getTasks } from "./actions";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const tasks = await getTasks();

  return <HomeClient initialTasks={tasks} />;
}