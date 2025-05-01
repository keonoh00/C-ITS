import { Tactic, Technique } from "../tacticsData";
import ReconnaissanceTechniques from "./Reconnaissance.json";
import ResourceDevelopmentTechniques from "./Resource Development.json";
import InitialAccessTechniques from "./Initial Access.json";
import ExecutionTechniques from "./Execution.json";
import PersistenceTechniques from "./Persistence.json";
import PrivilegeEscalationTechniques from "./Privilege Escalation.json";
import DefenseEvasionTechniques from "./Defense Evasion.json";
import CredentialAccessTechniques from "./Credential Access.json";
import DiscoveryTechniques from "./Discovery.json";
import LateralMovementTechniques from "./Lateral Movement.json";
import CollectionTechniques from "./Collection.json";
import CommandAndControlTechniques from "./Command and Control.json";
import ExfiltrationTechniques from "./Exfiltration.json";
import ImpactTechniques from "./Impact.json";

export const tacticsDataEnterprise: Tactic[] = [
  {
    name: "Reconnaissance",
    techniques: ReconnaissanceTechniques as Technique[],
  },
  {
    name: "Resource Development",
    techniques: ResourceDevelopmentTechniques as Technique[],
  },
  {
    name: "InitialAccess",
    techniques: InitialAccessTechniques as Technique[],
  },
  {
    name: "Execution",
    techniques: ExecutionTechniques as Technique[],
  },
  {
    name: "Persistence",
    techniques: PersistenceTechniques as Technique[],
  },
  {
    name: "Privilege Escalation",
    techniques: PrivilegeEscalationTechniques as Technique[],
  },
  {
    name: "Defense Evasion",
    techniques: DefenseEvasionTechniques as Technique[],
  },
  {
    name: "Credential Access",
    techniques: CredentialAccessTechniques as Technique[],
  },
  {
    name: "Discovery",
    techniques: DiscoveryTechniques as Technique[],
  },
  {
    name: "Lateral Movement",
    techniques: LateralMovementTechniques as Technique[],
  },
  {
    name: "Collection",
    techniques: CollectionTechniques as Technique[],
  },
  {
    name: "Command And Control",
    techniques: CommandAndControlTechniques as Technique[],
  },
  {
    name: "Exfiltration",
    techniques: ExfiltrationTechniques as Technique[],
  },
  {
    name: "Impact",
    techniques: ImpactTechniques as Technique[],
  },
];
