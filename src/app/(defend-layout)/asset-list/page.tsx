import { getAgents } from "@/api/defend/assets";
import AssetListTable from "@/components/AssetListTable/AssetListTable";

export default async function AssetsList() {
  let agent = null;

  try {
    agent = await getAgents();
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    // agent stays null
  }

  return agent ? (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <AssetListTable data={agent} />
    </div>
  ) : (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl items-center justify-center">
      <p className="text-neutral-400 text-lg">Failed to load assets.</p>
    </div>
  );
}
