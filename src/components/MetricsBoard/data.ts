export type DataEntry = {
  name: string;
  Block: number;
  Alert: number;
  Logged: number;
  None: number;
};

export const metriciesData: DataEntry[] = [
  { name: "Discovery", Block: 0, Alert: 0, Logged: 0, None: 12 },
  { name: "Lateral Movement", Block: 0, Alert: 4, Logged: 6, None: 6 },
  { name: "Execution", Block: 0, Alert: 6, Logged: 3, None: 3 },
  { name: "Credential Dumping", Block: 0, Alert: 4, Logged: 3, None: 5 },
];
