import React from "react";
import clsx from "clsx";

export interface TableColumn<T> {
  label: string;
  className?: string;
  render: (item: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  striped?: boolean;
}

export function Table<T>({ data, columns, striped = true }: TableProps<T>) {
  const baseHeaderClass = "text-white text-lg font-bold text-center py-3 px-4";
  const baseCellClass = "px-4 py-3 font-medium text-neutral-200 text-center";

  return (
    <table className="w-full text-sm text-left text-white">
      <thead className="bg-base-800 text-neutral-300 border-b border-base-700">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className={clsx(baseHeaderClass, col.className)}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIdx) => (
          <tr
            key={rowIdx}
            className={
              striped && rowIdx % 2 === 0
                ? "bg-base-700"
                : striped
                ? "bg-base-800"
                : ""
            }
          >
            {columns.map((col, colIdx) => (
              <td key={colIdx} className={clsx(baseCellClass, col.className)}>
                {col.render(item, rowIdx)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
