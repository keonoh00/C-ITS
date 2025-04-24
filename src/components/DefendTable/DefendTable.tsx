"use client";

export enum DefendPlatform {
  WINDOWS = "Windows",
}

export enum DefendTactics {
  DETECTION = "Detection",
}

export enum DefendPlugin {
  ELASTIC = "Elastic",
  SHELL = "Shell",
}

export type DefendMethods = {
  id: string;
  name: string;
  platform: DefendPlatform;
  plugin: DefendPlugin[];
  tactics: DefendTactics;
  technique: boolean;
  lastUpdated: Date;
};

interface DefendTableProps {
  data: DefendMethods[];
}

export function DefendTable({ data }: DefendTableProps) {
  const onCheck = () => {};

  return (
    <div className="bg-base-800 p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b-1 border-base-850">
            <th className="text-left w-[5%] p-4">Select</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Plug In</th>
            <th>ATT&CK Tactics</th>
            <th>Technique</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className={`text-neutral-200 font-bold text-center text-xs border-b-1 border-base-850 ${
                  index % 2 == 1 ? "" : "bg-base-700"
                }`}
              >
                <td className="text-left px-4 py-3">
                  <input type="checkbox" onChange={onCheck} />
                </td>
                <td className="text-left underline">{item.name}</td>
                <td>{item.platform}</td>
                <td>{item.plugin}</td>
                <td>{item.tactics}</td>
                <td>{item.technique ? "O" : "X"}</td>
                <td>{item.lastUpdated.toISOString().split("T")[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
