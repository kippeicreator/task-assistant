import { getTasks } from "./actions";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const tasks = await getTasks();

  return <HomeClient initialTasks={tasks} />;
}