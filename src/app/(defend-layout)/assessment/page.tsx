"use client";

import { useEffect, useState, useCallback } from "react";
import { SaveIcon, Trash2 } from "lucide-react";
import SearchInput from "@/components/SearchInput/SearchInput";
import AssessmentTable from "@/components/AssessmentTable/AssessmentTable";
import { fetchOperations, OperationResponse } from "@/api/defend/assetssment";
import Loading from "@/components/Loading/Loading";

export default function Assessment() {
  const [data, setData] = useState<OperationResponse>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchOperations();
      setData(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Slight delay for better UX
    }
  }, []);

  const handleSearch = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <div className="justify-between flex w-full items-center">
        <SearchInput onSearch={handleSearch} />
        <div className="flex-row flex">
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

      <div className="mt-4">
        {isLoading ? <Loading /> : <AssessmentTable data={data} />}
      </div>
    </div>
  );
}
