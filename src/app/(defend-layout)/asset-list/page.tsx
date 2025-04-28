import { getAgents } from "@/api/defend/assets";
import AssetListTable from "@/components/AssetListTable/AssetListTable";

export default async function DeployAgent() {
  const agent = await getAgents();
  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <AssetListTable data={agent} />
    </div>
  );
}
