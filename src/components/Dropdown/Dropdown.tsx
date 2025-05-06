interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div style={{ position: "relative", width: "340px" }}>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 40px 8px 16px",
          borderRadius: "8px",
          color: "#d1d5db",
          border: "1px solid #3f3f46",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {options.map((opt, idx) => (
          <option
            key={idx}
            value={opt}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {opt}
          </option>
        ))}
      </select>

      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
        }}
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};
