import { fetchAttacks } from "@/api/defend/defend";
import { DefendClientComponent } from "@/components/DefendClientComponent/DefendClientComponent";

export default async function Defend() {
  let initialData = undefined;

  try {
    initialData = await fetchAttacks({});
  } catch (error) {
    console.error("Failed to fetch attacks:", error);
  }

  return <DefendClientComponent initialData={initialData} />;
}
