"use client";

import AssessmentTable from "@/components/AssessmentTable/AssessmentTable";
import SearchInput from "@/components/SearchInput/SearchInput";
import { SaveIcon, Trash2 } from "lucide-react";

export default function Assessment() {
  const onSearchClick = () => {
    console.log("asdfasdfas");
  };
  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <div className="justify-between flex w-full items-center">
        <SearchInput onSearch={onSearchClick} />
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
        <AssessmentTable />
      </div>
    </div>
  );
}
