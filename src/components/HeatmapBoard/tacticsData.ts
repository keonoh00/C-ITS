export interface Technique {
  name: string;
  id: string;
  outcome:
    | "No Test Coverage"
    | "Outcome TBD"
    | "Weakest"
    | "Minimal"
    | "Lower"
    | "Moderate"
    | "Strong";
  topCount: number;
  bottomCount: number;
}

export interface Tactic {
  name: string;
  techniques: Technique[];
}

export const tacticsDataMobile: Tactic[] = [
  {
    name: "Initial Access",
    techniques: [
      {
        name: "Drive-by Compromise",
        id: "T0817",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Exploit Public-Facing Application",
        id: "T0819",
        outcome: "Outcome TBD",
        topCount: 1,
        bottomCount: 0,
      },
      {
        name: "External Remote Services",
        id: "T0822",
        outcome: "Weakest",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Execution",
    techniques: [
      {
        name: "Autorun Image",
        id: "T0895",
        outcome: "Minimal",
        topCount: 1,
        bottomCount: 1,
      },
      {
        name: "Change Operation Mode",
        id: "T1592",
        outcome: "Lower",
        topCount: 2,
        bottomCount: 0,
      },
      {
        name: "Command-Line Interface",
        id: "T0807",
        outcome: "Moderate",
        topCount: 2,
        bottomCount: 1,
      },
      {
        name: "Execution through API",
        id: "T0871",
        outcome: "Strong",
        topCount: 3,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Persistence",
    techniques: [
      {
        name: "Hardcoded Credentials",
        id: "T0891",
        outcome: "Minimal",
        topCount: 1,
        bottomCount: 1,
      },
      {
        name: "Modify Program",
        id: "T0838",
        outcome: "Outcome TBD",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Module Firmware",
        id: "T0839",
        outcome: "Lower",
        topCount: 1,
        bottomCount: 1,
      },
    ],
  },
  {
    name: "Privilege Escalation",
    techniques: [
      {
        name: "Exploitation for Privilege Escalation",
        id: "T0890",
        outcome: "Weakest",
        topCount: 1,
        bottomCount: 1,
      },
      {
        name: "Gather Victim Host Information",
        id: "T1542",
        outcome: "Lower",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Defense Evasion",
    techniques: [
      {
        name: "Change Operating Mode",
        id: "T0890",
        outcome: "Lower",
        topCount: 2,
        bottomCount: 1,
      },
    ],
  },
  {
    name: "Discovery",
    techniques: [
      {
        name: "Network Connection Enumeration",
        id: "T0840",
        outcome: "Minimal",
        topCount: 1,
        bottomCount: 0,
      },
      {
        name: "Network Sniffing",
        id: "T0842",
        outcome: "Moderate",
        topCount: 2,
        bottomCount: 1,
      },
    ],
  },
  {
    name: "Lateral Movement",
    techniques: [
      {
        name: "Default Credentials",
        id: "T0812",
        outcome: "Lower",
        topCount: 1,
        bottomCount: 0,
      },
      {
        name: "Exploitation of Remote Services",
        id: "T0866",
        outcome: "Minimal",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Collection",
    techniques: [
      {
        name: "Default Credentials",
        id: "T0812",
        outcome: "Moderate",
        topCount: 1,
        bottomCount: 1,
      },
      {
        name: "Exploitation of Remote Services",
        id: "T0866",
        outcome: "Strong",
        topCount: 3,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Command and Control",
    techniques: [
      {
        name: "Default Credentials",
        id: "T0812",
        outcome: "Outcome TBD",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Exploitation of Remote Services",
        id: "T0866",
        outcome: "Lower",
        topCount: 1,
        bottomCount: 1,
      },
    ],
  },
  {
    name: "Impact",
    techniques: [
      {
        name: "Damage to Property",
        id: "T0879",
        outcome: "Moderate",
        topCount: 2,
        bottomCount: 0,
      },
      {
        name: "Denial of Control",
        id: "T0813",
        outcome: "Lower",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
];

// Enterprise Framework Data
export const tacticsDataEnterprise: Tactic[] = [
  {
    name: "Reconnaissance",
    techniques: [
      {
        name: "Active Scanning",
        id: "T1595",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Resource Development",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Initial Access",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Strong",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Execution",
    techniques: [
      {
        name: "Gather Victim Host Information sad",
        id: "T1595",
        outcome: "Strong",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Persistence",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Weakest",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Privilege Escalation",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Minimal",
        topCount: 1,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Defense Evasion",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1595",
        outcome: "Lower",
        topCount: 4,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Credential Access",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1595",
        outcome: "Weakest",
        topCount: 4,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Discovery",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Strong",
        topCount: 4,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Lateral Movement",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Strong",
        topCount: 4,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Collection",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Strong",
        topCount: 4,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Command and Control",
    techniques: [
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "Strong",
        topCount: 4,
        bottomCount: 0,
      },
    ],
  },
];

// ICS Framework Data
export const tacticsDataICS: Tactic[] = [
  {
    name: "Initial Access",
    techniques: [
      {
        name: "Drive-by Compromise",
        id: "T0817",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Exploit Public-Facing Application",
        id: "T0819",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "External Remote Services",
        id: "T0822",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Execution",
    techniques: [
      {
        name: "Autorun Image",
        id: "T0895",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Change Operation Mode",
        id: "T1592",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Command-Line Interface",
        id: "T0807",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Execution through API",
        id: "T0871",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Persistence",
    techniques: [
      {
        name: "Hardcoded Credentials",
        id: "T0891",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Modify Program",
        id: "T0838",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Module Firmware",
        id: "T0839",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Privilege Escalation",
    techniques: [
      {
        name: "Exploitation for Privilege Escalation",
        id: "T0890",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Gather Victim Host Information",
        id: "T1592",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Gather Victim Host Information",
        id: "T1542",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Evasion",
    techniques: [
      {
        name: "Change Operating Mode",
        id: "T0890",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Discovery",
    techniques: [
      {
        name: "Network Connection Enumeration",
        id: "T0840",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Network Sniffing",
        id: "T0842",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Lateral Movement",
    techniques: [
      {
        name: "Default Credentials",
        id: "T0812",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Exploitation of Remote Services",
        id: "T0866",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Collection",
    techniques: [
      {
        name: "Default Credentials",
        id: "T0812",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Exploitation of Remote Services",
        id: "T0866",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Command and Control",
    techniques: [
      {
        name: "Default Credentials",
        id: "T0812",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Exploitation of Remote Services",
        id: "T0866",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Inhibit Response Function",
    techniques: [
      {
        name: "Active Firmware Update Mode",
        id: "T0812",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Alarm Suppression",
        id: "T0866",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Impair Process Control",
    techniques: [
      {
        name: "Brute Force I/O",
        id: "T0806",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Modify Parameter",
        id: "T0836",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Module Firmware",
        id: "T0839",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
  {
    name: "Impact",
    techniques: [
      {
        name: "Damage to Property",
        id: "T0879",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Denial of Control",
        id: "T0813",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
      {
        name: "Module Firmware",
        id: "T0839",
        outcome: "No Test Coverage",
        topCount: 0,
        bottomCount: 0,
      },
    ],
  },
];
