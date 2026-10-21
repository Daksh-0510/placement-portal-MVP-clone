export type BloomTaxonomy = {
  code: "CU" | "AP" | "AS" | "EV" | "CR";
  label: string;
  fullName: string;
  colorClass: string;
  badgeClass: string;
};

export type CriticalityLevel = "Critical" | "Important" | "Baseline";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  requiredScore: number; // 1 - 10
  description: string;
  roadmap: {
    level: number;
    title: string;
    description: string;
    stage: "Fundamentals" | "Intermediate" | "Advanced";
  }[];
}

export function proficiencyToBloom(score: number): BloomTaxonomy {
  if (score >= 9) {
    return {
      code: "CR",
      label: "Create",
      fullName: "Create & Innovate",
      colorClass: "text-purple-700 dark:text-purple-300 border-purple-500/30 bg-purple-500/10 dark:bg-purple-950/30",
      badgeClass: "bg-purple-500/10 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-500/30",
    };
  }
  if (score >= 7) {
    return {
      code: "EV",
      label: "Evaluate",
      fullName: "Evaluate & Critique",
      colorClass: "text-rose-700 dark:text-rose-300 border-rose-500/30 bg-rose-500/10 dark:bg-rose-950/30",
      badgeClass: "bg-rose-500/10 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-500/30",
    };
  }
  if (score >= 5) {
    return {
      code: "AS",
      label: "Analyse",
      fullName: "Analyse & Deconstruct",
      colorClass: "text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/30",
      badgeClass: "bg-amber-500/10 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/30",
    };
  }
  if (score >= 3) {
    return {
      code: "AP",
      label: "Apply",
      fullName: "Apply & Implement",
      colorClass: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/30",
      badgeClass: "bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
    };
  }
  return {
    code: "CU",
    label: "Understand",
    fullName: "Comprehend & Understand",
    colorClass: "text-cyan-700 dark:text-cyan-300 border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/30",
    badgeClass: "bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30",
  };
}

export function scoreToCriticality(score: number): {
  level: CriticalityLevel;
  badgeClass: string;
  dotColor: string;
} {
  if (score >= 7) {
    return {
      level: "Critical",
      badgeClass: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 border",
      dotColor: "bg-emerald-500",
    };
  }
  if (score >= 5) {
    return {
      level: "Important",
      badgeClass: "text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/40 border",
      dotColor: "bg-amber-500",
    };
  }
  return {
    level: "Baseline",
    badgeClass: "text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-900/40 border",
    dotColor: "bg-slate-400",
  };
}

export const BLOOM_TAXONOMY_LEGEND = [
  {
    code: "CU",
    range: "1 - 2",
    label: "Understand",
    fullName: "Comprehend & Understand",
    description: "Core definitions, syntax fundamentals, and conceptual models.",
    badgeClass: "text-cyan-700 dark:text-cyan-300 border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40",
    dotColor: "bg-cyan-400",
  },
  {
    code: "AP",
    range: "3 - 4",
    label: "Apply",
    fullName: "Apply & Implement",
    description: "Standard execution, idiomatic coding patterns, and routine bug resolution.",
    badgeClass: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40",
    dotColor: "bg-emerald-400",
  },
  {
    code: "AS",
    range: "5 - 6",
    label: "Analyse",
    fullName: "Analyse & Deconstruct",
    description: "System dissection, performance bottlenecks, and edge-case debugging.",
    badgeClass: "text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/40",
    dotColor: "bg-amber-400",
  },
  {
    code: "EV",
    range: "7 - 8",
    label: "Evaluate",
    fullName: "Evaluate & Critique",
    description: "Architectural trade-off assessment, scalability audits, and system benchmarking.",
    badgeClass: "text-rose-700 dark:text-rose-300 border-rose-500/30 bg-rose-500/10 dark:bg-rose-950/40",
    dotColor: "bg-rose-400",
  },
  {
    code: "CR",
    range: "9 - 10",
    label: "Create",
    fullName: "Create & Innovate",
    description: "Novel paradigm synthesis, pioneer system design, and zero-defect architecture.",
    badgeClass: "text-purple-700 dark:text-purple-300 border-purple-500/30 bg-purple-500/10 dark:bg-purple-950/40",
    dotColor: "bg-purple-400",
  },
] as const;

export const CRITICALITY_LEGEND = [
  {
    level: "Critical" as const,
    range: "Score ≥ 7",
    description: "Core hiring requirement & high-stakes evaluation metric.",
    badgeClass: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40",
    dotColor: "bg-emerald-400",
  },
  {
    level: "Important" as const,
    range: "Score 5 - 6",
    description: "Significant differentiator & targeted team competency.",
    badgeClass: "text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/40",
    dotColor: "bg-amber-400",
  },
  {
    level: "Baseline" as const,
    range: "Score < 5",
    description: "Foundational exposure or supplementary domain familiarity.",
    badgeClass: "text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-900/40",
    dotColor: "bg-slate-400",
  },
] as const;

const DEFAULT_ROADMAP_TOPICS: Record<string, { title: string; desc: string }[]> = {
  "Data Structures & Algorithms": [
    { title: "Primitive Types & Arrays", desc: "Memory layouts, pointers, time complexity bounds, array manipulations." },
    { title: "Linked Lists & Stacks", desc: "Singly/doubly linked chains, stack operations, recursion unrolling." },
    { title: "Hash Tables & Sets", desc: "Collision resolution strategies, load factors, deterministic hashing." },
    { title: "Trees & Binary Search", desc: "BST traversals, AVL & Red-Black self-balancing operations." },
    { title: "Graphs & Traversals", desc: "BFS, DFS, cycle detection, topological ordering, connected components." },
    { title: "Dynamic Programming I", desc: "Memoization patterns, tabulation techniques, classic knapsack variations." },
    { title: "Shortest Paths & Spanning Trees", desc: "Dijkstra, Bellman-Ford, Kruskal & Prim algorithms." },
    { title: "Advanced DP & Bitmasking", desc: "State compression, digit DP, tree dynamic programming." },
    { title: "String Algorithms & Tries", desc: "KMP pattern matching, Aho-Corasick, Suffix Arrays." },
    { title: "Network Flows & Combinatorics", desc: "Ford-Fulkerson, max-flow min-cut theorem, competitive programming techniques." },
  ],
  "System Design & Architecture": [
    { title: "Client-Server & HTTP Fundamentals", desc: "REST conventions, status codes, payload structures, headers." },
    { title: "Database Normalization & SQL", desc: "Relational schemas, indexing mechanisms, query execution plans." },
    { title: "Caching Mechanisms", desc: "Cache-aside, write-through strategies, Redis eviction policies." },
    { title: "Load Balancing & Horizontal Scale", desc: "Round-robin, least-connections, reverse proxy configurations." },
    { title: "Message Brokers & Queues", desc: "Async event loops, Kafka partition topology, RabbitMQ routing." },
    { title: "Microservices & API Gateways", desc: "Service discovery, circuit breakers, rate limiting patterns." },
    { title: "Distributed Consensus & Consistency", desc: "CAP theorem, Paxos/Raft consensus models, eventual consistency." },
    { title: "Sharding & Data Partitioning", desc: "Consistent hashing rings, cross-partition joins, replication lag." },
    { title: "Event Sourcing & CQRS", desc: "Immutable event streams, projection stores, distributed transactions." },
    { title: "High-Availability Multi-Region Architecture", desc: "Active-active database replication, latency routing, catastrophic failover." },
  ],
  "Cloud & DevOps Infrastructure": [
    { title: "Linux Systems Administration", desc: "File hierarchies, process signals, bash scripting, systemd." },
    { title: "Networking & VPC Basics", desc: "CIDR blocks, subnets, NAT gateways, security groups." },
    { title: "Containerization with Docker", desc: "Layer caching, multi-stage builds, non-root users, bind mounts." },
    { title: "CI/CD Pipelines", desc: "GitHub Actions, automated test suites, artifact registry publishing." },
    { title: "Infrastructure as Code (Terraform)", desc: "State locking, resource declarative graphs, module patterns." },
    { title: "Kubernetes Orchestration", desc: "Deployments, pods, services, ingress controllers, config maps." },
    { title: "Observability & Monitoring", desc: "Prometheus metric scraping, Grafana dashboards, distributed tracing." },
    { title: "Cloud Security & IAM Hardening", desc: "Least-privilege role policies, secret rotation, zero-trust network models." },
    { title: "Cost Optimization & FinOps", desc: "Reserved instances, spot fleet management, storage lifecycle tiers." },
    { title: "Chaos Engineering & Resiliency", desc: "Fault injection testing, disaster recovery game-days, auto-remediation." },
  ],
  "Database Engineering": [
    { title: "Relational Modeling", desc: "Foreign keys, constraints, table joins, entity relationship design." },
    { title: "Index Optimization", desc: "B-Tree indexes, composite indexes, covering queries, vacuuming." },
    { title: "Transactions & ACID", desc: "Isolation levels, dirty reads, two-phase commits, deadlocks." },
    { title: "NoSQL Key-Value & Document", desc: "MongoDB aggregation pipelines, DynamoDB single-table design." },
    { title: "Columnar & Analytical Stores", desc: "ClickHouse, Snowflake, OLAP vs OLTP query optimizations." },
    { title: "Replication & Read Replicas", desc: "Streaming replication, wal-shipping, read scaling architectures." },
    { title: "Database Sharding & Citus", desc: "Distributed tables, partition pruning, routing query planners." },
    { title: "Graph & Vector Databases", desc: "Neo4j Cypher queries, pgvector embeddings, cosine distance index." },
    { title: "Engine Internals & Storage Engines", desc: "LSM trees, write-ahead logging (WAL), buffer pool tuning." },
    { title: "Autonomous & Multi-Master DBs", desc: "CockroachDB, Spanner TrueTime, multi-region conflict resolution." },
  ],
  "Full Stack Web Development": [
    { title: "Modern HTML, CSS & Semantics", desc: "DOM hierarchy, responsive layouts, web accessibility standards." },
    { title: "Core TypeScript & ESNext", desc: "Strict type checking, generics, utility types, async/await runtime." },
    { title: "Modern Component State (React)", desc: "Hooks, reconciliation lifecycle, context API, memoization." },
    { title: "Server State & Caching", desc: "TanStack Query, mutation patterns, optimistic UI updates." },
    { title: "Server-Side Rendering & Routing", desc: "TanStack Start / Next.js, code splitting, edge runtime streaming." },
    { title: "Backend API Engineering (Node/Go)", desc: "Middleware pipelines, validation schemas, JWT authentication." },
    { title: "Realtime WebSockets & WebRTC", desc: "Full-duplex socket rooms, binary payloads, STUN/TURN servers." },
    { title: "Web Performance & Core Web Vitals", desc: "LCP/INP/CLS optimizations, bundle analysis, lazy loading." },
    { title: "Security Hardening (CORS/CSRF/XSS)", desc: "CSP headers, sanitized inputs, secure cookie configurations." },
    { title: "Micro-Frontends & Module Federation", desc: "Independent deployment runtimes, shared dependency federation." },
  ],
  "AI & Applied Machine Learning": [
    { title: "Python Data Science Foundations", desc: "NumPy arrays, Pandas dataframes, vectorized computations." },
    { title: "Classical Supervised Learning", desc: "Linear/Logistic regression, Decision Trees, Random Forests." },
    { title: "Unsupervised & Clustering", desc: "K-Means, PCA dimensionality reduction, anomaly detection." },
    { title: "Neural Networks & Backpropagation", desc: "Loss functions, gradient descent optimizers, activation layers." },
    { title: "Deep Learning Frameworks (PyTorch)", desc: "Tensors, autograd, custom Dataset & DataLoader pipelines." },
    { title: "Computer Vision & CNNs", desc: "Convolution kernels, transfer learning with ResNet/ViT models." },
    { title: "Natural Language Processing & Transformers", desc: "Self-attention mechanism, BERT/GPT architectures, tokenizers." },
    { title: "LLM Fine-Tuning & RAG Pipelines", desc: "LoRA/QLoRA parameter-efficient tuning, LangChain, vector stores." },
    { title: "MLOps & Model Deployment", desc: "ONNX runtime, vLLM inference serving, Triton inference server." },
    { title: "Autonomous Agent Architectures", desc: "ReAct reasoning frameworks, multi-agent orchestration, tool use." },
  ],
  "Cybersecurity & Application Security": [
    { title: "Networking Protocols & Encryption", desc: "TCP/IP handshake, TLS 1.3 certificates, symmetric vs asymmetric keys." },
    { title: "OWASP Top 10 Vulnerabilities", desc: "SQL injection, broken access control, SSRF, security misconfigurations." },
    { title: "Authentication & Authorization (OAuth2/OIDC)", desc: "PKCE flows, token exchange, scopes, role-based access control." },
    { title: "Penetration Testing & Scanning", desc: "Burp Suite, Nmap port scanning, SAST/DAST CI/CD integration." },
    { title: "Threat Modeling & Attack Surfaces", desc: "STRIDE framework, data flow diagrams, privilege escalation risks." },
    { title: "Cryptographic Architecture", desc: "Hashing algorithms (Argon2), digital signatures, HSM integrations." },
    { title: "Container & Kubernetes Security", desc: "Falco runtime security, Trivy image vulnerability scanners." },
    { title: "Incident Response & SIEM", desc: "Log aggregation, intrusion detection rules, forensic root cause analysis." },
    { title: "Cloud Security Posture Management", desc: "AWS GuardDuty, Azure Sentinel, compliance auditing frameworks." },
    { title: "Zero Trust Architecture & Micro-Segmentation", desc: "BeyondCorp principles, mutual TLS (mTLS), strict identity enforcement." },
  ],
  "Site Reliability & Performance Engineering": [
    { title: "Linux Performance Diagnostics", desc: "top, htop, vmstat, iostat, strace, memory allocation limits." },
    { title: "Service Level Objectives (SLI/SLO/SLA)", desc: "Error budget management, burn rate alerts, reliability targets." },
    { title: "Distributed Tracing & APM", desc: "OpenTelemetry instrumentation, span contexts, waterfall flamegraphs." },
    { title: "Load & Stress Testing", desc: "k6, Locust, traffic replay simulations, concurrency saturation." },
    { title: "Memory Leak & Profiling", desc: "Heap dump inspection, CPU flame graphs, garbage collection tuning." },
    { title: "High-Throughput I/O Tuning", desc: "Non-blocking event loops, epoll, socket buffer optimizations." },
    { title: "Automated Incident Escalation", desc: "PagerDuty on-call scheduling, automated runbook triggers." },
    { title: "Postmortem Culture & Reliability Reviews", desc: "Blameless postmortems, root cause remediation tracking." },
    { title: "Resilience Patterns", desc: "Hedging requests, adaptive rate limiting, exponential backoff with jitter." },
    { title: "Global CDN & Edge Compute Optimization", desc: "Edge workers, origin shield caching, TLS session resumption." },
  ],
  "Product Analytics & Experimentation": [
    { title: "Event Tracking & Instrumentation", desc: "Clickstream schema design, Segment / RudderStack integrations." },
    { title: "Statistical Hypothesis Testing", desc: "p-values, statistical significance, sample size calculations." },
    { title: "A/B Testing Frameworks", desc: "Variant splitting, bucketing algorithms, network effect controls." },
    { title: "Cohort Analysis & Retention Curves", desc: "Churn prediction, funnel drop-off analysis, feature adoption." },
    { title: "Data Pipelines & ETL", desc: "dbt transformations, Airflow DAG orchestration, BigQuery warehousing." },
    { title: "Product Analytics Tools", desc: "Mixpanel, Amplitude custom dashboards, user session replays." },
    { title: "Multivariate & Bandit Algorithms", desc: "Multi-armed bandits, Bayesian experimentation methodologies." },
    { title: "Feature Flagging Systems", desc: "LaunchDarkly, progressive rollout schedules, canary testing." },
    { title: "Attribution Modeling", desc: "First-touch, multi-touch attribution, return on marketing spend." },
    { title: "Causal Inference & Quasi-Experiments", desc: "Difference-in-differences, synthetic controls, regression discontinuity." },
  ],
  "API Design & Distributed Communication": [
    { title: "RESTful Standards & Semantics", desc: "Idempotent verbs, standard error structures, query pagination." },
    { title: "OpenAPI & Swagger Documentation", desc: "Schema validation, code generation, client SDK synthesis." },
    { title: "GraphQL Schema Architecture", desc: "Queries, mutations, subscriptions, N+1 query problem resolution." },
    { title: "gRPC & Protocol Buffers", desc: "Binary serialization, streaming RPCs, proto definition files." },
    { title: "Webhook Systems & Event Handlers", desc: "Signature verification, retry backoff policies, dead letter queues." },
    { title: "API Gateway Governance", desc: "Traffic routing, rate limiting, request transformation, telemetry." },
    { title: "API Versioning & Deprecation", desc: "Header versioning, sunset schedules, backwards compatibility guarantees." },
    { title: "Event-Driven EDA Architectures", desc: "Kafka event schemas, Avro schema registry, publish-subscribe topologies." },
    { title: "GraphQL Federation & Mesh", desc: "Apollo Federation subgraphs, unified gateway composition." },
    { title: "Zero-Latency Edge APIs", desc: "Cloudflare Workers KV, distributed edge caches, geolocation routing." },
  ],
  "Test Automation & Quality Engineering": [
    { title: "Unit Testing & Assertions", desc: "Vitest, Jest, code coverage metrics, isolation testing." },
    { title: "Mocking & Dependency Injection", desc: "Stubbing external APIs, spies, deterministic fixture data." },
    { title: "Integration Testing", desc: "Database test containers, API endpoint functional test suites." },
    { title: "End-to-End Testing (Playwright/Cypress)", desc: "Headless browser automation, page object model, visual regressions." },
    { title: "Contract Testing (Pact)", desc: "Consumer-driven contracts, breaking schema prevention in CI." },
    { title: "Test Driven Development (TDD)", desc: "Red-Green-Refactor cycles, clean architecture design principles." },
    { title: "Performance & Benchmark Suites", desc: "Continuous micro-benchmarking, regression thresholds." },
    { title: "Security Regression Scanning", desc: "Automated vulnerability checks, dependency license auditing." },
    { title: "Fuzz Testing & Property-Based Testing", desc: "Hypothesis, fast-check, randomized invariant discovery." },
    { title: "Autonomous Test Generation & Mutation Testing", desc: "Stryker mutation score evaluation, AI-assisted edge-case synthesis." },
  ],
  "Mobile & Cross-Platform Engineering": [
    { title: "Mobile Operating System Lifecycles", desc: "Android/iOS app lifecycles, memory constraints, background tasks." },
    { title: "Cross-Platform Frameworks (React Native / Flutter)", desc: "Bridge architecture, JSI, Flutter rendering engine." },
    { title: "Native Mobile UI Components", desc: "Flexbox layout engine, platform-specific gesture handling." },
    { title: "Offline-First Storage & Sync", desc: "SQLite, WatermelonDB, local cache reconciliation strategies." },
    { title: "Mobile Navigation & Deep Linking", desc: "Universal links, intent filters, multi-stack navigation trees." },
    { title: "Push Notifications & Device Hardware", desc: "APNs, FCM, camera access, biometrics, location sensors." },
    { title: "App Store Guidelines & CI Builds", desc: "Fastlane deployment pipelines, certificate signing, TestFlight." },
    { title: "Mobile Performance & Profiling", desc: "Frame rate drops (60/120fps), battery drain, bundle slimming." },
    { title: "Native Module Bridging (Swift/Kotlin)", desc: "Custom native modules, TurboModules, platform channels." },
    { title: "Over-The-Air (OTA) Updates & Security Hardening", desc: "CodePush updates, certificate pinning, anti-tampering measures." },
  ],
};

export const DEFAULT_12_SKILLS: SkillItem[] = [
  {
    id: "fullstack-web",
    name: "Full Stack Web Development",
    category: "Frontend & Applications",
    requiredScore: 9,
    description: "TypeScript, modern React, TanStack Start/Next, SSR, performance, and API design.",
    roadmap: buildRoadmap("Full Stack Web Development", 9),
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "Computer Science Core",
    requiredScore: 8,
    description: "Core problem-solving, tree/graph algorithms, dynamic programming, and complexity analysis.",
    roadmap: buildRoadmap("Data Structures & Algorithms", 8),
  },
  {
    id: "system-design",
    name: "System Design & Architecture",
    category: "Software Engineering",
    requiredScore: 7,
    description: "High-scale distributed systems, microservices, load balancing, and consensus protocols.",
    roadmap: buildRoadmap("System Design & Architecture", 7),
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps Infrastructure",
    category: "Infrastructure & Platform",
    requiredScore: 7,
    description: "Kubernetes, Docker, Terraform, CI/CD pipelines, and cloud platform orchestration.",
    roadmap: buildRoadmap("Cloud & DevOps Infrastructure", 7),
  },
  {
    id: "api-comms",
    name: "API Design & Distributed Communication",
    category: "Software Engineering",
    requiredScore: 7,
    description: "RESTful best practices, gRPC, GraphQL federation, and Kafka event streaming.",
    roadmap: buildRoadmap("API Design & Distributed Communication", 7),
  },
  {
    id: "database-eng",
    name: "Database Engineering",
    category: "Data & Storage",
    requiredScore: 6,
    description: "Relational tuning, indexing, ACID transactions, NoSQL, and vector storage engines.",
    roadmap: buildRoadmap("Database Engineering", 6),
  },
  {
    id: "ai-ml",
    name: "AI & Applied Machine Learning",
    category: "Data Science & AI",
    requiredScore: 6,
    description: "PyTorch, Transformers, LLM fine-tuning, RAG architectures, and model inference serving.",
    roadmap: buildRoadmap("AI & Applied Machine Learning", 6),
  },
  {
    id: "sre-perf",
    name: "Site Reliability & Performance Engineering",
    category: "Infrastructure & Platform",
    requiredScore: 6,
    description: "SLO/SLA management, distributed tracing, observability, and performance profiling.",
    roadmap: buildRoadmap("Site Reliability & Performance Engineering", 6),
  },
  {
    id: "app-security",
    name: "Cybersecurity & Application Security",
    category: "Security & Governance",
    requiredScore: 5,
    description: "OWASP Top 10 mitigation, zero-trust architecture, OAuth2, and cryptography.",
    roadmap: buildRoadmap("Cybersecurity & Application Security", 5),
  },
  {
    id: "test-automation",
    name: "Test Automation & Quality Engineering",
    category: "Software Engineering",
    requiredScore: 4,
    description: "End-to-end automation, TDD, integration suites, and mutation testing.",
    roadmap: buildRoadmap("Test Automation & Quality Engineering", 4),
  },
  {
    id: "product-analytics",
    name: "Product Analytics & Experimentation",
    category: "Product & Growth",
    requiredScore: 3,
    description: "A/B testing, cohort analysis, telemetry tracking, and event instrumentation.",
    roadmap: buildRoadmap("Product Analytics & Experimentation", 3),
  },
  {
    id: "mobile-eng",
    name: "Mobile & Cross-Platform Engineering",
    category: "Frontend & Applications",
    requiredScore: 2,
    description: "Cross-platform mobile apps, native bridging, offline sync, and app store deployment.",
    roadmap: buildRoadmap("Mobile & Cross-Platform Engineering", 2),
  },
];

import type { DataRecord } from "@/lib/directory";

export function getCategoryForSkill(skillName: string): string {
  const normalized = skillName.toLowerCase().replace(/&/g, "and").trim();
  if (normalized.includes("coding") || normalized.includes("programming")) return "Core Programming";
  if (normalized.includes("data structure") || normalized.includes("algorithm")) return "Core Computer Science";
  if (normalized.includes("aptitude") || normalized.includes("problem solving")) return "Cognitive & Problem Solving";
  if (normalized.includes("communication") || normalized.includes("behavioral")) return "Professional & Interpersonal";
  if (normalized.includes("database") || normalized.includes("sql") || normalized.includes("data")) return "Data & Storage";
  if (normalized.includes("ai") || normalized.includes("machine learning") || normalized.includes("ml")) return "Data Science & AI";
  if (normalized.includes("system design") || normalized.includes("distributed")) return "Distributed Systems";
  if (normalized.includes("devops") || normalized.includes("cloud") || normalized.includes("infra")) return "Infrastructure & Platform";
  if (normalized.includes("software engineering")) return "Engineering Excellence";
  if (normalized.includes("networking") || normalized.includes("network")) return "Systems & Networking";
  if (normalized.includes("operating system") || normalized.includes("os")) return "Low-Level & OS";
  if (normalized.includes("security") || normalized.includes("cyber")) return "Security & Governance";
  if (normalized.includes("test") || normalized.includes("quality")) return "Quality Engineering";
  if (normalized.includes("mobile")) return "Frontend & Applications";
  if (normalized.includes("analytics")) return "Product & Growth";
  return "Technical Domain";
}

export function getDefaultSkillDescription(skillName: string): string {
  const normalized = skillName.toLowerCase().replace(/&/g, "and").trim();
  if (normalized.includes("coding")) {
    return "Syntax fundamentals, idiomatic implementations, clean coding principles, and high-performance algorithms.";
  }
  if (normalized.includes("data structure") || normalized.includes("algorithm")) {
    return "Core algorithmic complexity, non-linear data structures, dynamic programming, and competitive problem solving.";
  }
  if (normalized.includes("aptitude") || normalized.includes("problem solving")) {
    return "Quantitative arithmetic, analytical deduction, logical reasoning, and structured hypothesis deconstruction.";
  }
  if (normalized.includes("communication")) {
    return "Cross-functional technical translation, architectural decision documentation, and collaborative stakeholder management.";
  }
  if (normalized.includes("object-oriented") || normalized.includes("oop")) {
    return "Encapsulation, SOLID design patterns, domain-driven architecture, and decoupling large-scale software systems.";
  }
  if (normalized.includes("ai") || normalized.includes("machine learning")) {
    return "LLM integration, RAG architectures, prompt pipelines, vector embeddings, and autonomous agent loops.";
  }
  if (normalized.includes("sql") || normalized.includes("database")) {
    return "Relational schema design, ACID transactions, B-Tree index optimization, and distributed analytical storage.";
  }
  if (normalized.includes("system design") || normalized.includes("architecture")) {
    return "Distributed microservices, horizontal scaling, caching strategies, event-driven message brokers, and high availability.";
  }
  if (normalized.includes("devops") || normalized.includes("cloud")) {
    return "Infrastructure as code, Docker container orchestration, CI/CD pipeline automation, and cloud security governance.";
  }
  if (normalized.includes("software engineering")) {
    return "SDLC best practices, version control workflows, automated testing pyramids, and release engineering.";
  }
  if (normalized.includes("networking") || normalized.includes("network")) {
    return "OSI model, TCP/IP socket mechanics, HTTP/3, TLS encryption handshakes, DNS routing, and firewalls.";
  }
  if (normalized.includes("operating system") || normalized.includes("os")) {
    return "Process scheduling, thread concurrency, memory paging, file system drivers, and kernel-level abstractions.";
  }
  return "Comprehensive technical evaluation and production-grade competency requirements.";
}

export function buildRoadmap(skillName: string, _targetScore: number) {
  const direct = DEFAULT_ROADMAP_TOPICS[skillName];
  if (direct) {
    return Array.from({ length: 10 }, (_, i) => {
      const level = i + 1;
      const stage: "Fundamentals" | "Intermediate" | "Advanced" =
        level <= 3 ? "Fundamentals" : level <= 7 ? "Intermediate" : "Advanced";
      const topic = direct[i] ?? {
        title: `Level ${level} Mastery`,
        desc: `Comprehensive domain proficiency at level ${level}.`,
      };
      return {
        level,
        stage,
        title: topic.title,
        description: topic.desc,
      };
    });
  }

  const norm = skillName.toLowerCase().replace(/&/g, "and");
  const matchingKey = Object.keys(DEFAULT_ROADMAP_TOPICS).find((k) => {
    const kNorm = k.toLowerCase().replace(/&/g, "and");
    return norm.includes(kNorm) || kNorm.includes(norm);
  });
  const topics = (matchingKey ? DEFAULT_ROADMAP_TOPICS[matchingKey] : []) ?? [];
  return Array.from({ length: 10 }, (_, i) => {
    const level = i + 1;
    const stage: "Fundamentals" | "Intermediate" | "Advanced" =
      level <= 3 ? "Fundamentals" : level <= 7 ? "Intermediate" : "Advanced";
    const topic = topics[i] ?? {
      title: `${skillName} Level ${level} Competency`,
      desc: `In-depth practical execution and domain proficiency for ${skillName} at level ${level}.`,
    };
    return {
      level,
      stage,
      title: topic.title,
      description: topic.desc,
    };
  });
}

export function transformCompanySkills(company: DataRecord | null | undefined): SkillItem[] {
  if (!company) return [];

  const rawLevels = company["skill_levels"] ?? company["company_skill_levels"] ?? company["skills"];
  const rawSkills: DataRecord[] = Array.isArray(rawLevels)
    ? rawLevels.filter((v): v is DataRecord => typeof v === "object" && v !== null)
    : [];

  if (rawSkills.length === 0) {
    return [];
  }

  return rawSkills
    .map((raw, index) => {
      const name = String(raw["name"] ?? raw["skill"] ?? raw["skill_set_name"] ?? `Skill ${index + 1}`).trim();
      const rawScore = Number(raw["required_level"] ?? raw["requiredScore"] ?? raw["score"] ?? raw["level"] ?? 0);
      const requiredScore = Math.max(1, Math.min(10, isNaN(rawScore) ? 1 : Math.round(rawScore)));
      const id = String(raw["skill_set_id"] ?? raw["id"] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      const category = typeof raw["category"] === "string" && raw["category"].trim() ? raw["category"].trim() : getCategoryForSkill(name);
      const descVal = raw["description"];
      const description =
        typeof descVal === "string" && descVal.trim().length > 0
          ? descVal.trim()
          : getDefaultSkillDescription(name);

      return {
        id,
        name,
        category,
        requiredScore,
        description,
        roadmap: buildRoadmap(name, requiredScore),
      };
    })
    .sort((a, b) => b.requiredScore - a.requiredScore);
}
