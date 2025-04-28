import { getAgents } from "@/api/defend/assets";
import AssetListTable from "@/components/AssetListTable/AssetListTable";

export default async function AssetsList() {
  const agent = await getAgents();

  return agent ? (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <AssetListTable data={agent} />
    </div>
  ) : null;
}
