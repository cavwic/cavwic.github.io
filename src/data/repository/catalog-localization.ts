import { companies, matrices, type CompanyProfile, type MatrixRow, type ProductMatrix } from "./catalog";
import { getPhaseOneCompanyProfiles } from "./robodict-phase-one";
import { getDeepCompanyProfiles } from "./robodict-deep-research";
import { landscapeCompanies, pickText } from "./industry-landscape";
import type { Locale } from "../site";

const landscapeBySlug = {
  unitree: "unitree",
  "booster-robotics": "booster",
  galbot: "galbot",
  "noetix-robotics": "noetix",
  ubtech: "ubtech",
  agibot: "agibot",
  "fourier-intelligence": "fourier",
  "nvidia-robotics": "nvidia",
  "google-deepmind": "deepmind",
  "physical-intelligence": "physicalintelligence",
  orbbec: "orbbec",
  livox: "livox",
  "d-robotics": "drobotics",
  maxon: "maxon",
  faulhaber: "faulhaber",
  leaderdrive: "leaderdrive",
  "harmonic-drive": "harmonicdrive",
  kinco: "kinco",
  "changxing-power": "changxing",
  "mech-mind": "mechmind",
  linkerbot: "linkerbot",
  "inspire-robots": "inspire",
  paxini: "paxini",
  "dh-robotics": "dhrobotics",
  "shadow-robot": "shadow",
  "kunwei-technology": "kunwei",
  "xela-robotics": "xela",
  gelsight: "gelsight",
} as const satisfies Record<string, keyof typeof landscapeCompanies>;

type CompanyCopy = Pick<CompanyProfile, "name" | "valueChainRole" | "positioning" | "strengths" | "products" | "fit" | "verificationFocus" | "presalesQuestions">;

const customCompanyEnglish: Record<string, CompanyCopy> = {
  langgenius: {
    name: "LangGenius",
    valueChainRole: "Generative AI application development and runtime platform vendor",
    positioning: "The team behind Dify, with products focused on generative AI applications, workflows, knowledge bases, and plugin extensions.",
    strengths: ["Model access, workflow orchestration, knowledge bases, and a plugin ecosystem."],
    products: ["Dify Community", "Dify Cloud", "Plugin ecosystem"],
    fit: ["Enterprise knowledge applications, workflow automation, agent prototypes, and private integration."],
    verificationFocus: "Version boundaries, knowledge permissions, retrieval evaluation, runtime logs, and human takeover.",
    presalesQuestions: ["What are the deployment boundaries and version differences?", "Can knowledge permissions map to the existing organization?", "How do logs, evaluation, and human takeover form a closed loop?"],
  },
  infiniflow: {
    name: "InfiniFlow",
    valueChainRole: "Document parsing and retrieval-augmented generation platform vendor",
    positioning: "The team behind RAGFlow. Its public product material emphasizes document parsing, retrieval-augmented generation, and traceable citations.",
    strengths: ["Complex document parsing, retrieval pipelines, and citation traceability."],
    products: ["RAGFlow"],
    fit: ["Document-heavy knowledge bases, retrieval evaluation, and enterprise Q&A that requires cited evidence."],
    verificationFocus: "Parsing failure samples, recall and reranking evaluation, index updates, and permission filtering.",
    presalesQuestions: ["Which complex-document samples fail to parse?", "How are recall, reranking, and generation evaluated separately?", "How are index updates and permission filters implemented?"],
  },
  labring: {
    name: "Labring",
    valueChainRole: "Knowledge-base and workflow application platform vendor",
    positioning: "The team behind FastGPT. The public project covers knowledge bases, workflows, model access, and application publishing.",
    strengths: ["Knowledge applications, workflow configuration, model access, and API publishing."],
    products: ["FastGPT"],
    fit: ["Enterprise knowledge assistants, process-oriented AI applications, and private prototypes."],
    verificationFocus: "Deployment dependencies, knowledge quality, workflow versions, and index updates.",
    presalesQuestions: ["Which infrastructure does a private deployment require?", "How is knowledge-base quality measured?", "How are workflow versions and rollback managed?"],
  },
  "ai-indeed": {
    name: "AI Indeed",
    valueChainRole: "Enterprise agent and business-process automation vendor",
    positioning: "An enterprise agent and automation vendor whose public work includes screen-semantic understanding, RPA, and business-process execution.",
    strengths: ["Interface semantics, RPA, and business-process execution."],
    products: ["AI Indeed Agent", "Digital workers", "Automation platform"],
    fit: ["Cross-system process automation, interaction with legacy interfaces, and replacement of repetitive manual steps."],
    verificationFocus: "The boundary between APIs and UI automation, exception takeover, process change, and maintenance cost.",
    presalesQuestions: ["Which steps rely on UI automation and which use APIs?", "How are exceptions and human takeover handled?", "How is maintenance cost estimated after a process changes?"],
  },
  zsibot: {
    name: "Zsibot",
    valueChainRole: "Embodied robot and technology-platform vendor",
    positioning: "Public material covers embodied robot platforms and Genisom-related technology. Product boundaries still need to be checked against current documentation.",
    strengths: ["Integration of robot bodies, control, and embodied intelligence."],
    products: ["Embodied robot platform", "Genisom-related technology"],
    fit: ["Embodied intelligence research, scenario validation, and robot-platform integration."],
    verificationFocus: "Body versions, control and perception interfaces, access levels, continuous operation, and service conditions.",
    presalesQuestions: ["Which site assumptions apply to the public demonstrations?", "Which control, perception, and task interfaces are open?", "Can POC acceptance metrics be separated by scenario?"],
  },
  "theo-hand": {
    name: "Theo Hand",
    valueChainRole: "Multi-finger dexterous-hand vendor",
    positioning: "The public product page presents Theo Hand for embodied manipulation. Some engineering specifications still require confirmation.",
    strengths: ["Anthropomorphic multi-finger end effectors for embodied manipulation."],
    products: ["Theo Hand"],
    fit: ["Multi-finger grasping, teleoperation, and embodied manipulation validation."],
    verificationFocus: "Actuation and tactile configuration, interfaces, payload definitions, repeated grasping, consumables, and delivery version.",
    presalesQuestions: ["How is repeatable grasping tested?", "Are service consumables and replacement intervals documented?", "How does the hand integrate with robot arms and teleoperation systems?"],
  },
  "boston-dynamics": {
    name: "Boston Dynamics",
    valueChainRole: "Dynamic robotics and industrial humanoid vendor",
    positioning: "Atlas is moving from a research prototype toward an electric humanoid for industrial tasks. Public material establishes the platform direction, while the deliverable package still requires project-level confirmation.",
    strengths: ["Whole-body dynamic control, complex locomotion, and industrial robot systems engineering."],
    products: ["Atlas", "Spot", "Stretch"],
    fit: ["Industrial manipulation trials, complex-motion research, and high-dynamic robot development."],
    verificationFocus: "Atlas availability, task packages, interfaces, safety, continuous operation, and service ownership.",
    presalesQuestions: ["Which Atlas task capabilities are currently deliverable?", "What access is available at the control, perception, and task layers?", "How are continuous duty, safety, and site service accepted?"],
  },
  "agility-robotics": {
    name: "Agility Robotics",
    valueChainRole: "Humanoid robotics vendor for logistics and manufacturing",
    positioning: "Digit and Arc target warehouse, logistics, and manufacturing workflows, with public material covering the robot, workflow orchestration, system connections, and deployment support.",
    strengths: ["Tote handling in existing facilities, robot workflows, and fleet operations."],
    products: ["Digit", "Agility Arc"],
    fit: ["Warehouse material movement, line-side logistics, and automation gaps in human workspaces."],
    verificationFocus: "Object and workstation boundaries, cycle time, shift coverage, end effectors, system interfaces, and site support.",
    presalesQuestions: ["Does the target workflow fit tasks already validated for Digit?", "How does Arc connect to WMS, WES, MES, and site equipment?", "How are recovery, charging, shift changes, and service handled?"],
  },
  "figure-ai": {
    name: "Figure",
    valueChainRole: "General-purpose humanoid and embodied-model vendor",
    positioning: "Figure 03 is designed around Helix, hand sensing, and scaled manufacturing for home and commercial tasks. Production and deployment statements should be checked as current manufacturer plans.",
    strengths: ["Vertical integration of the body, hand sensing, embodied models, and manufacturing."],
    products: ["Figure 03", "Helix"],
    fit: ["General manipulation research, home and commercial pilots, and end-to-end learning trials."],
    verificationFocus: "Usable tasks, tactile durability, autonomy boundaries, charging, data loops, and manufacturing commitments.",
    presalesQuestions: ["Which Helix and body version supports the target task?", "How much teleoperation, demonstration, or human takeover is required?", "Which manufacturing and deployment figures are achieved results and which remain plans?"],
  },
  apptronik: {
    name: "Apptronik",
    valueChainRole: "Modular industrial humanoid vendor",
    positioning: "Apollo 2 combines bipedal or wheeled mobility with task software and fleet operations for workflows in manufacturing, logistics, and retail.",
    strengths: ["Modular mobility, actuator technology, task software, and fleet management."],
    products: ["Apollo 2", "Artemis", "Fleet Connect"],
    fit: ["Picking, sorting, machine tending, inspection, and logistics pilots."],
    verificationFocus: "Mobility and end-effector configuration, task autonomy, safety zones, power strategy, interfaces, and deployment maturity.",
    presalesQuestions: ["Which site conditions suit the bipedal or wheeled configuration?", "Which integration interfaces do Artemis and Fleet Connect expose?", "What evidence supports task success, battery operations, and safety acceptance?"],
  },
  "1x-technologies": {
    name: "1X",
    valueChainRole: "Home humanoid robotics developer",
    positioning: "NEO Gamma is an internal home-testing prototype for compliant design, human coexistence, and household task learning. It should not be treated as a mature commercial product.",
    strengths: ["Home-oriented interaction design, data collection, and general task learning."],
    products: ["NEO Gamma"],
    fit: ["Household-task research, teleoperation and autonomy studies, and human-robot interaction trials."],
    verificationFocus: "Commercial availability, autonomy, data privacy, safety, maintainability, and task success.",
    presalesQuestions: ["Is the current version for internal tests, pilots, or public delivery?", "Which tasks require remote assistance or human takeover?", "How are home data, privacy, and safety incidents handled?"],
  },
  "sanctuary-ai": {
    name: "Sanctuary AI",
    valueChainRole: "Physical AI and general manipulation platform vendor",
    positioning: "Sanctuary AI develops Physical AI and the Phoenix platform for general manipulation. Its public hardware generations change quickly, so each proposal must lock the current body and software version.",
    strengths: ["General task learning, teleoperation data loops, and multi-finger manipulation research."],
    products: ["Phoenix", "Physical AI platform"],
    fit: ["Retail and industrial pilots, general manipulation research, and data collection."],
    verificationFocus: "Hardware generation, autonomy-to-teleoperation split, hand capability, interfaces, task transfer, and support model.",
    presalesQuestions: ["Which Phoenix hardware generation is being evaluated?", "What portions of execution are autonomous or human-operated?", "What data, training, and release steps are needed for a new task?"],
  },
  "pal-robotics": {
    name: "PAL Robotics",
    valueChainRole: "Research and service robot platform vendor",
    positioning: "TALOS is a high-payload humanoid for research institutions, centered on whole-body control, dual-arm manipulation, and the ROS ecosystem rather than turnkey general labor.",
    strengths: ["Research humanoids, whole-body control, and ROS integration."],
    products: ["TALOS"],
    fit: ["Academic and laboratory research in whole-body control, dual-arm manipulation, and humanoid robotics."],
    verificationFocus: "Research configuration, software stack, maintenance resources, experiment safety, lead time, and local support.",
    presalesQuestions: ["Which sensors and end effectors does the research program require?", "What are the controller, simulation, and ROS version boundaries?", "Who owns training, spare parts, maintenance, and laboratory safety?"],
  },
  "neura-robotics": {
    name: "NEURA Robotics",
    valueChainRole: "Cognitive robotics and humanoid vendor",
    positioning: "4NE1 extends NEURA's cognitive-robotics and sensor-safety direction into a humanoid for human workspaces. Configuration and delivery timing require current quotation data.",
    strengths: ["Perceptive safety, cognitive robot platforms, and a broader human-robot collaboration portfolio."],
    products: ["4NE1"],
    fit: ["Industrial collaboration, service tasks, and cognitive-robot platform trials."],
    verificationFocus: "Purchasable configuration, delivery status, safety certification, interfaces, task software, and service network.",
    presalesQuestions: ["Does the purchasable configuration match the demonstrated system?", "How are sensor skin and safety functions accepted?", "Who supplies task development, remote support, and spare parts?"],
  },
  "hexagon-robotics": {
    name: "Hexagon Robotics",
    valueChainRole: "Industrial humanoid and spatial-intelligence vendor",
    positioning: "AEON combines an industrial humanoid with spatial perception and Hexagon's industrial software capabilities. It is best evaluated as a pilot and integration program at this stage.",
    strengths: ["Industrial spatial perception, digital toolchains, and robot systems integration."],
    products: ["AEON"],
    fit: ["Industrial inspection, material handling, and pilots that coordinate with spatial data."],
    verificationFocus: "Pilot status, task scope, tool and battery changes, site software connections, safety, and operations.",
    presalesQuestions: ["Is there evidence from a comparable task pilot?", "How does AEON connect to existing digital-twin and production systems?", "How are battery changes, tool use, takeover, and maintenance designed?"],
  },
  wandercraft: {
    name: "Wandercraft",
    valueChainRole: "Heavy-duty industrial humanoid developer",
    positioning: "Calvin-40 targets heavy industrial work, but the official site places initial series deliveries in a future period. It should currently be treated as a pre-production or joint-validation platform.",
    strengths: ["Dynamic balance, heavy material handling, and motion control derived from exoskeleton work."],
    products: ["Calvin-40"],
    fit: ["Heavy material handling, industrial task validation, and early joint pilots."],
    verificationFocus: "Series delivery timing, task samples, load duty, safety, interfaces, and site coverage.",
    presalesQuestions: ["Is a prototype, pilot, or series unit currently available?", "Which postures, speeds, and durations apply to the payload rating?", "What are the validation stages and exit conditions before delivery?"],
  },
  "wonik-robotics": {
    name: "Wonik Robotics",
    valueChainRole: "Research multi-finger dexterous-hand vendor",
    positioning: "Allegro Hand is a widely used four-finger research platform. Current hardware generations and ROS software must be matched against official product and repository versions.",
    strengths: ["Compact multi-finger mechanics, torque control, and a research software ecosystem."],
    products: ["Allegro Hand V4", "Allegro Hand V5"],
    fit: ["Grasping research, reinforcement learning, teleoperation, and dexterous-control validation."],
    verificationFocus: "Generation, left or right configuration, control interface, ROS version, calibration, durability, and spare parts.",
    presalesQuestions: ["Which Allegro generation does the research code support?", "What control rate, communications, and torque interfaces are available?", "How are calibration recovery, consumables, and long experiments maintained?"],
  },
  tesollo: {
    name: "TESOLLO",
    valueChainRole: "Fully actuated multi-finger dexterous-hand vendor",
    positioning: "DG-5F-M targets research and robot integration with independently driven joints and optional fingertip force or tactile sensing.",
    strengths: ["Independent joint actuation, optional sensing, and robot-arm integration."],
    products: ["DG-5F-M"],
    fit: ["Fine-grasp research, teleoperation, robot learning, and multi-finger control."],
    verificationFocus: "Model, sensor options, communications, control cycle, payload definition, life, and lead time.",
    presalesQuestions: ["Are the required sensors standard or optional?", "Which platforms are supported by the SDK and control interfaces?", "How will grasp success and durability be accepted on the target object set?"],
  },
  qbrobotics: {
    name: "qbrobotics",
    valueChainRole: "Compliant underactuated hand and actuator vendor",
    positioning: "The qb SoftHand family uses synergy actuation and mechanical compliance to reduce control complexity. Research and industrial versions require separate checks for interfaces, durability, and certification.",
    strengths: ["Underactuated synergies, mechanical compliance, and ROS or ROS 2 research integration."],
    products: ["qb SoftHand2 Research", "qb SoftHand Industry"],
    fit: ["Safe grasping, human-robot collaboration, research validation, and compliant end effectors."],
    verificationFocus: "Synergy DOF, controllability, interfaces, grip force, durability, certification, and maintenance.",
    presalesQuestions: ["Does the task need independent joint control or synergy grasping?", "How do research and industrial versions differ in certification and life?", "How are ROS, mechanical mounting, and electrical integration completed?"],
  },
  schunk: {
    name: "SCHUNK",
    valueChainRole: "Industrial gripping-system and five-finger hand vendor",
    positioning: "SVH is a servo-electric five-finger hand with integrated electronics and should be compared with SCHUNK's broader industrial end-effector portfolio.",
    strengths: ["Industrial gripping experience, integrated electronics, and ROS driver support."],
    products: ["SVH Five-Finger Hand"],
    fit: ["Research demonstrations, service robots, and light manipulation that benefits from an anthropomorphic form."],
    verificationFocus: "Actuated DOF, interfaces, finger force, speed, payload limits, spares, and lifecycle status.",
    presalesQuestions: ["Does SVH meet the project's delivery and lifecycle requirements?", "Does the task genuinely need a five-finger form?", "How will mounting, ROS drivers, and safety limits be verified?"],
  },
  "seed-robotics": {
    name: "Seed Robotics",
    valueChainRole: "Underactuated multi-finger robot-hand vendor",
    positioning: "RH8D uses an underactuated mechanism with onboard actuators for research, education, and prototypes. Optional tactile sensing must be confirmed by configuration.",
    strengths: ["Compact self-contained mechanics, underactuated grasping, and accessible integration documentation."],
    products: ["RH8D Adult Robot Hand"],
    fit: ["Education, research, lower-cost multi-finger prototypes, teleoperation, and object-set validation."],
    verificationFocus: "Actuator-to-DOF mapping, tactile options, interfaces, grip force, backlash, durability, and spares.",
    presalesQuestions: ["Does underactuated coupling meet the manipulation accuracy required?", "Which hardware version includes tactile sensing and the control board?", "How are backlash, heat, and maintenance assessed in continuous experiments?"],
  },
  psyonic: {
    name: "PSYONIC",
    valueChainRole: "Bionic hand and robotics research end-effector vendor",
    positioning: "Ability Hand originated as a prosthetic product and is also available to research and robotics users. Selection must separate prosthetic design goals from industrial robot requirements.",
    strengths: ["Lightweight bionic mechanics, fingertip feedback, and research interfaces."],
    products: ["Ability Hand"],
    fit: ["Teleoperation, bionic control, human-interface research, and light robot manipulation."],
    verificationFocus: "Robotics interfaces, payload and duty cycle, tactile data, durability, repair, and non-medical support.",
    presalesQuestions: ["Is the project using a research configuration or a derivative of the medical product?", "Does continuous robotic work exceed the original duty cycle?", "How are tactile data, control interfaces, and repair support provided?"],
  },
  "ati-industrial-automation": {
    name: "ATI Industrial Automation",
    valueChainRole: "Robot multi-axis force and torque sensor vendor",
    positioning: "ATI force and torque sensors measure overall interaction at the wrist or tool. They do not replace distributed fingertip tactile sensing.",
    strengths: ["Multi-axis force measurement, industrial robot integration, and a broad model range."],
    products: ["Multi-Axis Force/Torque Sensors"],
    fit: ["Wrist force control, assembly, finishing, testing, and acceptance measurement."],
    verificationFocus: "Range, overload, resolution, acquisition chain, coordinate calibration, mounting stiffness, and environmental rating.",
    presalesQuestions: ["Does the task need whole-wrist force or local contact distribution?", "What are the impact and overload peaks?", "How are the controller, acquisition hardware, and robot coordinates synchronized and calibrated?"],
  },
  syntouch: {
    name: "SynTouch",
    valueChainRole: "Biomimetic fingertip tactile-sensor vendor",
    positioning: "BioTac combines pressure, vibration, and temperature channels to emulate fingertip sensing. Its public material is older, so current models, availability, and support must be confirmed before selection.",
    strengths: ["Multimodal biomimetic fingertip sensing and robot tactile-research experience."],
    products: ["BioTac"],
    fit: ["Tactile recognition, slip studies, material interaction, and multimodal contact experiments."],
    verificationFocus: "Current purchasable model, sampling and interfaces, package durability, calibration, replacement parts, and software support.",
    presalesQuestions: ["Is the model described by the public material still deliverable?", "How are the sensing channels sampled and calibrated?", "How are the skin, fluid, and connectors maintained or replaced?"],
  },
  synapx: {
    name: "SynapX",
    valueChainRole: "Physical AI, dexterous-hand, and embodied-data platform vendor",
    positioning: "SynapX groups SYNWorld, OctoH-Hand, and OctoSense into a product line for world modeling, dexterous execution, and data collection. All three were launched at the 2026 World Robot Conference and should currently be evaluated through new-product introduction and joint validation.",
    strengths: ["A single training and execution chain for a world model, tendon-driven dexterous hand, and multimodal data collection."],
    products: ["SYNWorld", "OctoH-Hand", "OctoSense", "OctoS-Ego / EgoBio / DexUMI"],
    fit: ["Dexterous-manipulation research, teleoperation and demonstration data collection, and model-to-body validation."],
    verificationFocus: "Purchasing status, hand actuation and sensing, control interfaces, object-set success, durability, data rights, and model evaluation.",
    presalesQuestions: ["Is the current deliverable a prototype, development kit, or production version?", "How are active DOF, tactile force control, and interfaces configured on OctoH-Hand?", "How does OctoSense data enter SYNWorld training, and how are data ownership and permitted use defined?"],
  },
};

const sharedPresalesQuestions = [
  "Do the target objects, tasks, and site conditions match the public product positioning?",
  "Which interfaces are open in the deliverable version, and which capabilities require customization?",
  "How will continuous operation, recovery, maintenance, and spare parts be accepted?",
];

export function getCompanies(locale: Locale): CompanyProfile[] {
  if (locale === "zh") return companies;

  const phaseOneEnglish = new Map(getPhaseOneCompanyProfiles("en").map((company) => [company.slug, company]));
  const deepEnglish = new Map(getDeepCompanyProfiles("en").map((company) => [company.slug, company]));

  return companies.map((entry) => {
    const deep = deepEnglish.get(entry.slug);
    if (deep) return deep;
    const phaseOne = phaseOneEnglish.get(entry.slug);
    if (phaseOne) return phaseOne;
    const custom = customCompanyEnglish[entry.slug];
    if (custom) return { ...entry, ...custom, englishName: custom.name };

    const landscapeId = landscapeBySlug[entry.slug as keyof typeof landscapeBySlug];
    const profile = landscapeId ? landscapeCompanies[landscapeId] : undefined;
    if (!profile) return entry;

    const name = pickText(profile.name, "en");
    return {
      ...entry,
      name,
      englishName: name,
      valueChainRole: pickText(profile.role, "en"),
      positioning: pickText(profile.positioning, "en"),
      strengths: [pickText(profile.strengths, "en")],
      products: [pickText(profile.products, "en")],
      fit: [pickText(profile.fit, "en")],
      verificationFocus: pickText(profile.verify, "en"),
      presalesQuestions: sharedPresalesQuestions,
    };
  });
}

type MatrixCopy = Pick<ProductMatrix, "title" | "description" | "dimensions"> & { rows: Omit<MatrixRow, "sourceIds">[] };

const matrixEnglish: Record<string, MatrixCopy> = {
  "enterprise-ai-platforms": {
    title: "Enterprise AI application platforms",
    description: "Compares knowledge handling, orchestration, extension, deployment, and evaluation without assigning a context-free overall rank.",
    dimensions: ["Application role", "Knowledge handling", "Workflows and agents", "Extensions and interfaces", "Deployment and operations", "Evaluation and audit"],
    rows: [
      { product: "Dify", company: "LangGenius", type: "LLM application and workflow platform", openness: "Open-source project; cloud and community-edition boundaries depend on version", integration: "APIs, plugins, models, and external tools", verificationFocus: "Permission mapping, retrieval evaluation, logs, and version governance" },
      { product: "RAGFlow", company: "InfiniFlow", type: "Platform focused on document parsing and RAG", openness: "Open-source project; features follow current documentation", integration: "APIs, models, parsing, and retrieval components", verificationFocus: "Complex-document parsing, recall, and citation consistency" },
      { product: "FastGPT", company: "Labring", type: "Knowledge-base and workflow application platform", openness: "Open-source project; verify capabilities by version", integration: "Models, knowledge bases, workflows, and APIs", verificationFocus: "Deployment dependencies, workflow maintenance, and index updates" },
      { product: "Coze Studio", company: "Coze", type: "Agent and application development platform", openness: "Open-source project; verify service and open-source capabilities separately", integration: "APIs, plugins, and Chat SDK", verificationFocus: "Plugin permissions, runtime logs, and deployment boundaries" },
    ],
  },
  "embodied-robot-platforms": {
    title: "Embodied robot bodies and development platforms",
    description: "Separates research, education, display, service, and task execution before comparing bodies, developer access, site conditions, and service ownership.",
    dimensions: ["Product role", "Body form", "Developer access", "Task fit", "Site dependencies", "Service and maintenance"],
    rows: [
      { product: "G1 / H series", company: "Unitree Robotics", type: "Humanoid robot platform", openness: "Product pages, SDKs, and open resources are public; verify interfaces by version", integration: "Body control, simulation, development kits, and upper-layer algorithms", verificationFocus: "Target task, payload, endurance, control permissions, and safety boundaries" },
      { product: "K1 / T series", company: "Booster Robotics", type: "Humanoid platforms in several sizes", openness: "Products, developer documentation, and open resources are public", integration: "SDKs, control interfaces, simulation, and training resources", verificationFocus: "Model role, control frequency, endurance, maintenance, and spare parts" },
      { product: "G1 / S1", company: "Galbot", type: "Embodied robots and scenario products", openness: "G1 developer documentation is public; verify other fields by product version", integration: "Body, models, development platform, and scenario system", verificationFocus: "Task closure, interfaces, failure recovery, and delivery conditions" },
      { product: "Bumi / N2 / E1", company: "Noetix Robotics", type: "Humanoid products with different roles", openness: "Product information is public; full interface scope requires confirmation", integration: "Secondary-development access is not fully public", verificationFocus: "Research or display role, continuous operation, interfaces, and support" },
      { product: "Embodied robot platform", company: "Zsibot", type: "Robot body and embodied-technology platform", openness: "Company and technology entry points are public; verify model-level details", integration: "Control, perception, and task-application boundaries require confirmation", verificationFocus: "Demo assumptions, interface levels, POC metrics, and service conditions" },
      { product: "Walker series", company: "UBTECH Robotics", type: "Industrial and service humanoid robots", openness: "Product and industry material is public; confirm developer interfaces per project", integration: "Body, task system, and industry-process integration", verificationFocus: "Workstation changes, cycle time, safety, takeover, and operations ownership" },
      { product: "Expedition and related series", company: "AgiBot", type: "General-purpose and industry embodied platforms", openness: "Product ecosystem and AimDK documentation are public", integration: "Bodies, development kits, data, and model toolchains", verificationFocus: "Supported models, interface permissions, data licensing, and site stability" },
      { product: "GR / N series", company: "Fourier Intelligence", type: "Humanoid robots and development platforms", openness: "Product and developer material is public; verify each model separately", integration: "Body control, SDKs, teleoperation, and application development", verificationFocus: "Task role, payload, control access, reliability, and service" },
      { product: "Atlas", company: "Boston Dynamics", type: "Electric humanoid for industrial tasks", openness: "Product direction is public; purchasing, interfaces, and task packages require project confirmation", integration: "Whole-body control, perception, manipulation, and industrial task development", verificationFocus: "Availability, task boundaries, safety, continuous operation, and service" },
      { product: "Digit", company: "Agility Robotics", type: "Humanoid robot for logistics and manufacturing", openness: "Robot, workflow platform, and service paths are public", integration: "WMS, WES, MES, fleet management, and site processes", verificationFocus: "Objects, workstations, cycle time, power, end effectors, recovery, and support" },
      { product: "Figure 03 / Helix", company: "Figure", type: "General-purpose humanoid and embodied-intelligence system", openness: "Product and model direction are public; verify deployment and manufacturing progress against current manufacturer material", integration: "Body, hand tactile sensing, vision-language-action models, and data loops", verificationFocus: "Real tasks, autonomy boundaries, durability, charging, data, and manufacturing commitments" },
      { product: "Apollo 2", company: "Apptronik", type: "Modular industrial humanoid platform", openness: "Body, task software, and fleet-platform direction are public", integration: "Bipedal or wheeled mobility, Artemis, and Fleet Connect", verificationFocus: "Configuration, task success, safety zones, power, interfaces, and deployment maturity" },
      { product: "NEO Gamma", company: "1X", type: "Home humanoid testing platform", openness: "Internal home-testing direction is public; not treated as a mature production product", integration: "Home data collection, teleoperation, learning, and human interaction", verificationFocus: "Availability, autonomy, privacy, safety, maintenance, and task success" },
      { product: "Phoenix / Physical AI", company: "Sanctuary AI", type: "General manipulation and Physical AI platform", openness: "Company direction and some hardware generations are public; lock the current deliverable version", integration: "Multi-finger manipulation, teleoperation data, task learning, and robot body", verificationFocus: "Hardware generation, autonomy split, interfaces, task transfer, and support model" },
      { product: "TALOS", company: "PAL Robotics", type: "High-payload research humanoid", openness: "Research platform and datasheet are public; confirm project configuration", integration: "ROS, whole-body control, dual-arm manipulation, and laboratory tools", verificationFocus: "Software versions, sensors, maintenance, safety, lead time, and local support" },
      { product: "4NE1", company: "NEURA Robotics", type: "Cognitive and collaborative humanoid", openness: "Product direction is public; configuration, certification, and delivery status require confirmation", integration: "Perceptive safety, task software, and the cognitive-robot portfolio", verificationFocus: "Purchasable configuration, safety certification, interfaces, task software, and service network" },
      { product: "AEON", company: "Hexagon Robotics", type: "Spatially intelligent industrial humanoid", openness: "Product and pilot direction are public; evaluate as an early integration program", integration: "Spatial perception, industrial software, tool use, and fleet operations", verificationFocus: "Pilot evidence, task scope, battery changes, software connections, safety, and operations" },
      { product: "Calvin-40", company: "Wandercraft", type: "Heavy-duty industrial humanoid", openness: "Product direction is public; the official site places initial series deliveries in a future phase", integration: "Dynamic balance, heavy material handling, and industrial task development", verificationFocus: "Delivery timing, load duty, task samples, safety, interfaces, and site coverage" },
    ],
  },
  "robot-model-software-compute": {
    title: "Robot models, software, and compute platforms",
    description: "Compares the responsibilities of foundation models, development tools, and edge compute without treating a research model as a deliverable robot system.",
    dimensions: ["Layer and responsibility", "Supported bodies", "Data and training", "Deployment location", "Interface access", "Limits and evaluation"],
    rows: [
      { product: "Isaac GR00T / Jetson Thor", company: "NVIDIA", type: "Robot models, simulation, and edge-compute platform", openness: "Developer access is public; verify models, hardware, and licenses by version", integration: "Training simulation, high-level policy, vision, and onboard inference", verificationFocus: "Supported bodies, operators, latency, power, licensing, and safety" },
      { product: "Gemini Robotics", company: "Google DeepMind", type: "Embodied reasoning and robot-model family", openness: "Research and model cards are public; availability depends on release status", integration: "Multimodal understanding, task planning, and robot control", verificationFocus: "Hardware support, interfaces, latency, data policy, and failure samples" },
      { product: "pi0", company: "Physical Intelligence", type: "Cross-embodiment general robot policy", openness: "Research is public; it is not treated as a plug-and-play delivery product", integration: "Multi-robot, multi-task data and continuous-action policies", verificationFocus: "Model availability, post-training, inference hardware, and safety boundaries" },
      { product: "AimDK", company: "AgiBot", type: "Robot development toolchain", openness: "Developer documentation is public", integration: "Body interfaces, application development, and ecosystem resources", verificationFocus: "Supported models, API stability, licenses, and version compatibility" },
      { product: "RDK X5 / RDK S", company: "D-Robotics", type: "Robot edge-compute and development kits", openness: "Hardware, algorithms, and accessory ecosystem are public", integration: "Vision, navigation, model deployment, and multi-I/O prototypes", verificationFocus: "Operator support, end-to-end latency, real-time split, power, and supply" },
      { product: "SYNWorld / OctoSense", company: "SynapX", type: "Embodied world model and multimodal data-collection system", openness: "Launch information is public; model access, data formats, and developer interfaces require vendor documentation", integration: "Vision, EMG, and exoskeleton operation data connected to the world model and OctoH-Hand", verificationFocus: "Supported bodies, model availability, data licensing, latency, training loop, and task evaluation" },
    ],
  },
  "robot-perception-components": {
    title: "Robot environment and contact sensing",
    description: "Separates navigation, close-range manipulation, contact feedback, and workstation vision so one sensor is not expected to cover every scenario.",
    dimensions: ["Sensing target", "Measurement principle", "Mounting location", "Data interface", "Calibration and sync", "Environment and durability"],
    rows: [
      { product: "Gemini 330 series", company: "Orbbec", type: "Robot RGB-D and 3D cameras", openness: "Product and SDK entry points are public", integration: "Close-range arm perception, mobile navigation, and multi-camera systems", verificationFocus: "Depth accuracy, strong light and reflection, motion blur, sync, and calibration" },
      { product: "MID-360", company: "Livox", type: "3D LiDAR", openness: "Product material is public", integration: "SLAM, mobile navigation, obstacle avoidance, and perimeter sensing", verificationFocus: "Near-field blind area, reflectivity, motion distortion, sync, and safety redundancy" },
      { product: "ITPU / AX series", company: "PaXini", type: "Multi-axis tactile and force-sensing products", openness: "Product pages are public; verify raw data and interfaces by model", integration: "Fingers, palms, whole-body mechanics, and contact loops", verificationFocus: "Range, resolution, drift, calibration, sync, and wear" },
      { product: "Six-axis force and joint-torque sensors", company: "Kunwei Technology", type: "Wrist and joint force sensing", openness: "Product catalog is public; verify model specifications separately", integration: "Wrist force control, joint feedback, assembly tests, and acceptance measurement", verificationFocus: "Range, overload, cross-axis coupling, thermal drift, sampling, and mounting stiffness" },
      { product: "Mech-Eye / Mech-Vision", company: "Mech-Mind Robotics", type: "Industrial 3D vision hardware and software", openness: "Product and scenario material is public", integration: "Depalletizing, machine tending, random picking, localization, and inspection", verificationFocus: "Object samples, cycle time, reflective or transparent objects, recovery, and workstation changes" },
    ],
  },
  "robot-joint-drive-components": {
    title: "Robot joints, drives, and transmission",
    description: "Separates motors, reducers, drives, and complete joint modules to compare integration depth and responsibility boundaries.",
    dimensions: ["Component layer", "Output and load spectrum", "Transmission and backlash", "Encoding and control", "Thermal and continuous duty", "Life and supply"],
    rows: [
      { product: "Frameless motors and drive systems", company: "maxon", type: "Motors, gears, encoders, controllers, and joint components", openness: "Robot product paths are public; verify selection data for each combination", integration: "Stepwise integration from components to complete drive systems", verificationFocus: "Efficiency at the duty point, continuous heat, gear life, control compatibility, and lead time" },
      { product: "Miniature precision drive combinations", company: "FAULHABER", type: "Miniature motors, gears, encoders, and control", openness: "Robot-joint application material is public", integration: "Compact drives for fingers, wrists, medical devices, and laboratory equipment", verificationFocus: "Load spectrum, temperature rise, backlash, noise, life, and customization cost" },
      { product: "Harmonic reducers and joints", company: "Leaderdrive", type: "Precision reducers, rotary actuators, and joint modules", openness: "Product paths are public; confirm model data from manuals", integration: "From reducers to humanoid joints and servo systems", verificationFocus: "Rated and peak torque, stiffness, backlash, life, and responsibility boundary" },
      { product: "Harmonic gears and rotary actuators", company: "Harmonic Drive", type: "Reduction components, gear units, and integrated actuators", openness: "Product families are public", integration: "Precision rotary motion across sizes and integration levels", verificationFocus: "Load spectrum, torsional stiffness, lubrication, bearings, life, and shock" },
      { product: "FMK / RD and joint solutions", company: "Kinco", type: "Frameless motors, drives, and joint electronics", openness: "Solution and product paths are public", integration: "Motor, drive, communication, and reducer matching", verificationFocus: "Control frequency, encoders, torque estimation, functional safety, and cooling" },
      { product: "Robot joint modules", company: "Changxing Power", type: "Integrated joints and actuators", openness: "Company product entry point is public; model-level data requires confirmation", integration: "Motor, reduction, encoding, drive, and structure", verificationFocus: "Rated output, heat, shock, backlash, life, fieldbus, and maintenance" },
    ],
  },
  "dexterous-hand-selection": {
    title: "Dexterous-hand products and selection",
    description: "Degrees of freedom are only an entry point. Delivery depends on actuation, tactile sensing, interfaces, payload definitions, durability, and the target object set.",
    dimensions: ["Mechanism and actuation", "DOF and actuator count", "Tactile configuration", "Control and interfaces", "Payload definition", "Durability and service"],
    rows: [
      { product: "O6 / L6 / L20 / L30 / R30", company: "LinkerBot", type: "Multi-finger hands across several design routes", openness: "Products, FAQ, support material, and datasheets are public", integration: "Verify mechanism, communication, SDK, teleoperation, and data platform by model", verificationFocus: "Actuated DOF, tactile coverage, control rate, temperature rise, and life" },
      { product: "RH56 series", company: "Inspire Robots", type: "Five-finger hands driven by miniature servos", openness: "Product pages and user manuals are public", integration: "Verify mounting, electrical, communication, and control details from the manual", verificationFocus: "Actuator life, finger output, refresh rate, overload protection, and spare parts" },
      { product: "DEX / AX series", company: "PaXini", type: "Multi-axis tactile dexterous hands", openness: "Product pages are public; verify each version separately", integration: "Tactile sensing, complete hands, whole-body mechanics, and data collection", verificationFocus: "Range, drift, calibration, sync, wear, and success by object set" },
      { product: "Five-finger dexterous hands", company: "DH Robotics", type: "Industrial end-effector products", openness: "Dexterous-hand and gripper catalogs are public", integration: "Evaluate alongside grippers and rotary actuators", verificationFocus: "Task necessity, object coverage, cycle time, life, mounting, and total cost" },
      { product: "Dexterous Hand / Lite / DEX-EE", company: "Shadow Robot", type: "High-DOF research dexterous hands", openness: "Product families and ROS-related paths are public", integration: "Robot learning, teleoperation, and tactile research", verificationFocus: "Tendon consumables, calibration recovery, object-set success, and continuous experiments" },
      { product: "Theo Hand", company: "Theo Hand", type: "Multi-finger dexterous hand", openness: "Product page is public; some engineering fields are not public", integration: "Arm, teleoperation, and embodied-manipulation integration requires confirmation", verificationFocus: "Actuation and tactile sensing, interfaces, payload, repeatable grasping, consumables, and maintenance" },
      { product: "Allegro Hand V4 / V5", company: "Wonik Robotics", type: "Research four-finger torque-controlled hand", openness: "Products and software repositories are public; match hardware generation and ROS version", integration: "Grasping research, teleoperation, reinforcement learning, and multi-finger control", verificationFocus: "Generation, interfaces, control rate, calibration, durability, and spares" },
      { product: "DG-5F-M", company: "TESOLLO", type: "Independently actuated multi-joint five-finger hand", openness: "Product and options are public; confirm the deliverable configuration", integration: "Optional fingertip force or tactile sensing, SDKs, and robot-arm integration", verificationFocus: "Sensor options, interfaces, control cycle, payload, life, and lead time" },
      { product: "qb SoftHand2 Research", company: "qbrobotics", type: "Compliant underactuated synergy hand", openness: "Research and industrial product paths are public; distinguish their boundaries", integration: "ROS or ROS 2, synergy control, and compliant grasping", verificationFocus: "Synergy DOF, controllability, grip force, durability, certification, and maintenance" },
      { product: "SVH", company: "SCHUNK", type: "Servo-electric five-finger hand", openness: "Product and ROS driver paths are public; confirm lifecycle status", integration: "Integrated electronics, robot interfaces, and light anthropomorphic manipulation", verificationFocus: "Actuated DOF, interfaces, finger force, speed, spares, and product lifecycle" },
      { product: "RH8D", company: "Seed Robotics", type: "Self-contained underactuated multi-finger robot hand", openness: "Product and knowledge base are public; confirm tactile options by version", integration: "Education, teleoperation, multi-finger prototypes, and object-set tests", verificationFocus: "Actuation mapping, tactile sensing, interfaces, grip force, backlash, durability, and spares" },
      { product: "Ability Hand", company: "PSYONIC", type: "Research robot hand derived from a bionic prosthesis", openness: "Research-user and robotics paths are public; confirm non-medical configuration", integration: "Teleoperation, bionic control, tactile feedback, and robotics research", verificationFocus: "Robotics interfaces, payload, duty cycle, tactile data, repair, and support" },
      { product: "OctoH-Hand", company: "SynapX", type: "23+ DOF anthropomorphic tendon-driven five-finger hand", openness: "World Robot Conference launch information is public; verify model specifications, interfaces, and purchasable version", integration: "Forms a data, model, and execution loop with SYNWorld and OctoSense", verificationFocus: "Active and passive DOF, actuator placement, tactile force control, interfaces, accuracy, life, and delivery status" },
    ],
  },
  "tactile-force-sensing": {
    title: "Tactile and force sensing for dexterous manipulation",
    description: "Separates distributed fingertip tactile sensing, vision-based tactile sensing, and wrist six-axis force sensing. Define the measurement need before comparing accuracy, synchronization, and durability.",
    dimensions: ["Measurement target", "Sensing dimensions", "Coverage and packaging", "Sampling and sync", "Calibration and drift", "Durability and replacement"],
    rows: [
      { product: "ITPU tactile sensors", company: "PaXini", type: "Multi-axis distributed tactile sensing", openness: "Product material is public; verify raw-data interfaces by model", integration: "Dexterous hands, whole-body mechanics kits, and data collection", verificationFocus: "Range, resolution, drift, sync, wear, and curved-surface coverage" },
      { product: "Six-axis force and joint-torque sensors", company: "Kunwei Technology", type: "Overall force and joint feedback", openness: "Product catalog is public; verify each model's specifications", integration: "Wrist, joints, force control, calibration, and acceptance measurement", verificationFocus: "Cross-axis coupling, overload, thermal drift, mounting stiffness, and sampling chain" },
      { product: "uSkin uSCu / uSPa", company: "XELA Robotics", type: "Modular three-axis tactile skin", openness: "Product entry points are public; custom specifications require confirmation", integration: "Finger pads, palms, grippers, and distributed curved-surface coverage", verificationFocus: "Curvature, wiring, package durability, sync, calibration, and latency" },
      { product: "GelSight Mini", company: "GelSight", type: "High-resolution vision-based tactile sensing", openness: "Product entry point is public", integration: "Surface recognition, slip research, assembly decisions, and material experiments", verificationFocus: "Frame rate, optical-surface life, contamination, recalibration, and closed-loop latency" },
      { product: "Multi-axis force and torque sensors", company: "ATI Industrial Automation", type: "Whole-force sensing at the wrist or tool", openness: "Products and model catalog are public", integration: "Wrist force control, assembly, finishing, testing, and acceptance measurement", verificationFocus: "Range, overload, resolution, sampling, coordinate calibration, and mounting stiffness" },
      { product: "BioTac", company: "SynTouch", type: "Multimodal biomimetic fingertip tactile sensing", openness: "Product material is public but older; confirm current supply and support", integration: "Pressure, vibration, temperature, slip, and material-interaction research", verificationFocus: "Available model, sampling interfaces, package durability, calibration, and replacement parts" },
    ],
  },
};

export function getMatrices(locale: Locale): ProductMatrix[] {
  if (locale === "zh") return matrices;

  return matrices.map((matrix) => {
    const copy = matrixEnglish[matrix.slug];
    if (!copy || copy.rows.length !== matrix.rows.length) {
      throw new Error(`Missing or mismatched English matrix copy: ${matrix.slug}`);
    }
    return {
      ...matrix,
      title: copy.title,
      description: copy.description,
      dimensions: copy.dimensions,
      rows: copy.rows.map((row, index) => ({ ...row, sourceIds: matrix.rows[index].sourceIds })),
    };
  });
}
