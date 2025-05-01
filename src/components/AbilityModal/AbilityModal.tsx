import React, { useEffect, useState } from "react";
import { GeneralTab } from "./GeneralTab";
import { ExecutorsTab } from "./ExecutorsTab";
import { RequirementTab } from "./RequirementTab";
import { ConfigurationTab } from "./ConfigurationTab";
import { XIcon } from "lucide-react";
import clsx from "clsx";
import { AttackDataItem } from "@/api/defend/defend";

enum AbilityModalTabs {
  General = "General",
  Executors = "Executors",
  Requirement = "Requirement",
  Configuration = "Configuration",
}

interface TabContentProps {
  tab: AbilityModalTabs;
  tabData: AttackDataItem;
}

const TabContent: React.FC<TabContentProps> = ({ tab, tabData }) => {
  switch (tab) {
    case AbilityModalTabs.General:
      return <GeneralTab data={tabData} />;
    case AbilityModalTabs.Executors:
      return <ExecutorsTab data={tabData.executors} />;
    case AbilityModalTabs.Requirement:
      return <RequirementTab />;
    case AbilityModalTabs.Configuration:
      return <ConfigurationTab />;
    default:
      return null;
  }
};

interface AbilityModalProps {
  open: boolean;
  onSave: () => void;
  onClose: () => void;
  modalData: AttackDataItem;
}

const AbilityModal: React.FC<AbilityModalProps> = ({
  open,
  onClose,
  onSave,
  modalData,
}) => {
  const [visible, setVisible] = useState(open);
  const [tab, setTab] = useState<AbilityModalTabs>(AbilityModalTabs.General);

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
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Find atypical open ports</div>
          <button onClick={onClose} className="text-xl">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-base-800 space-x-4">
          {Object.values(AbilityModalTabs).map((t) => (
            <button
              key={t}
              className={clsx(
                "py-2 px-4 font-medium transition-colors",
                tab === t
                  ? "border-b-2 border-blue-400 text-blue-400"
                  : "text-neutral-400 hover:text-white"
              )}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <TabContent tab={tab} tabData={modalData} />

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

export default AbilityModal;
