import { Tactic, Technique } from "../tacticsData";
import InitialAccessTechniques from "./Initial Access.json";
import ExecutionTechniques from "./Execution.json";
import PersistenceTechniques from "./Persistence.json";
import PrivilegeEscalationTechniques from "./Privilege Escalation.json";
import EvasionTechniques from "./Evasion.json";
import DiscoveryTechniques from "./Discovery.json";
import LateralMovementTechniques from "./Lateral Movement.json";
import CollectionTechniques from "./Collection.json";
import CommandAndControlTechniques from "./Command and Control.json";
import InhibitResponseFunctionTechniques from "./Inhibit Response Function.json";
import ImpairProcessControlTechniques from "./Impair Process Control.json";
import ImpactTechniques from "./Impact.json";

export const tacticsDataICS: Tactic[] = [
  {
    name: "Initial Access",
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
    name: "Evasion",
    techniques: EvasionTechniques as Technique[],
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
    name: "Command and Control",
    techniques: CommandAndControlTechniques as Technique[],
  },
  {
    name: "Inhibit Response Function",
    techniques: InhibitResponseFunctionTechniques as Technique[],
  },
  {
    name: "Impair Process Control",
    techniques: ImpairProcessControlTechniques as Technique[],
  },
  {
    name: "Impact",
    techniques: ImpactTechniques as Technique[],
  },
];
