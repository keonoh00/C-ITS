"use client";

import { useEffect, useState } from "react";
import { SaveIcon, Trash2 } from "lucide-react";
import { DefendTable } from "@/components/DefendTable/DefendTable";
import { AttackResponse, fetchAttacks } from "@/api/defend/defend";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Pagination } from "../Pagination/Pagination";

interface DefendClientComponentProps {
  initialData?: AttackResponse;
}

export function DefendClientComponent({
  initialData,
}: DefendClientComponentProps) {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearch = async (query?: string) => {
    const searched = await fetchAttacks({ query }); // You can pass query inside fetch if needed
    setData(searched);
  };

  useEffect(() => {
    const fetchPaginatedAttack = async () => {
      const pageData = await fetchAttacks({
        page: currentPage,
      });
      setData(pageData);
    };
    fetchPaginatedAttack();
  }, [currentPage]);

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <div className="justify-between flex w-full items-center">
        <div className="flex items-center">
          <SearchInput onSearch={handleSearch} />
        </div>

        <div className="flex flex-row">
          <button className="p-2 bg-primary-300 flex flex-row rounded-sm">
            <SaveIcon color="white" />
            <p className="ml-1">등록</p>
          </button>
          <button className="p-2 bg-danger-500 flex flex-row rounded-sm ml-2">
            <Trash2 color="white" />
            <p className="ml-1">삭제</p>
          </button>
        </div>
      </div>
      {data ? (
        <>
          <div className="mt-4">
            <DefendTable data={data} />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={data.pagenation.total_items}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
}
