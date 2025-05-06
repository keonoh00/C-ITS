import React, { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import clsx from "clsx";
import SearchInput from "../SearchInput/SearchInput";

export enum InfoModalOutcomeEnum {
  Blocked = "Blocked",
  Alerted = "Alerted",
  Logged = "Logged",
  None = "None",
}

export interface InfoModalData {
  defenses: string;
  detectionTime: Date;
  description: string;
  tags: string[];
  outcome: InfoModalOutcomeEnum[];
}

interface InfoModalProps {
  open: boolean;
  onSave: () => void;
  onClose: () => void;
  modalData: InfoModalData;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  open,
  onClose,
  onSave,
  modalData,
}) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      // allow rendering, then animate in
      timeout = setTimeout(() => setVisible(true), 10); // delay class toggle
    } else {
      setVisible(false); // fade/slide out
    }
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out h-screen",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative mx-auto my-12 w-full sm:w-[95%] md:w-[90%] lg:max-w-[1200px] bg-base-900 text-white rounded-md shadow-lg p-6 space-y-6 transition-all duration-300 ease-out transform-gpu",
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-95"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b-1 border-neutral-500 pb-6">
          <div className="text-lg font-semibold">Find atypical open ports</div>
          <button onClick={onClose} className="text-xl">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="gap-4 flex flex-col">
          <div className="flex flex-col gap-2">
            <label>Related Attack</label>

            <SearchInput
              onSearch={() => {
                console.log("search");
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Attack Result</label>

            <div className="flex flex-row gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={"Success"}
                  className="form-checkbox"
                  checked
                />
                <span>{"Success"}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={"Failed"}
                  className="form-checkbox"
                  checked={false}
                />
                <span>{"Failed"}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={"None"}
                  className="form-checkbox"
                  checked={false}
                />
                <span>{"None"}</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Outcome</label>

            <div className="flex flex-row gap-6">
              {Object.keys(InfoModalOutcomeEnum).map((key) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={key}
                    className="form-checkbox"
                    defaultChecked={modalData.outcome.includes(
                      key as InfoModalOutcomeEnum
                    )}
                  />
                  <span>{key}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Tags</label>
            <div className="flex flex-wrap gap-2 p-2 border border-neutral-500 rounded-sm bg-base-800 min-h-[48px]">
              {modalData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-600 text-white text-sm px-3 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Defenses</label>
            <input
              className="p-2 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
              disabled
              value={modalData.defenses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Detection Time</label>
            <input
              className="p-2 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
              disabled
              value={modalData.detectionTime.toISOString()}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Description</label>
            <textarea
              className="p-2 h-48 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
              defaultValue={modalData.description}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            onClick={onSave}
          >
            저장
          </button>
          <button
            className={"bg-gray-500 hover:bg-neutral-500 px-4 py-2 rounded"}
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
