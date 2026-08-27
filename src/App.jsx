import { useEffect, useMemo, useRef, useState } from "react";

/**
 * MOSTAFA GODA — SOFTWARE ENGINEER PORTFOLIO
 * ------------------------------------------------------------
 * Single-file React portfolio.
 *
 * Design goals:
 * - Recruiter-first information architecture
 * - Engineering evidence before technology lists
 * - Strong flagship case study without turning the portfolio
 *   into a thesis/documentation website
 * - Clear distinction between professional experience,
 *   engineering projects, and education
 * - Accessible navigation, reduced-motion support, keyboard focus
 * - Responsive from mobile upward
 *
 * BEFORE DEPLOYMENT:
 * 1. Replace every [FILL ...] placeholder.
 * 2. Add your real resume to /public/Mostafa_Goda_Resume.pdf.
 * 3. Add real project screenshots to /public/images/.
 * 4. Replace any optional links with real URLs.
 * 5. Only publish metrics you can defend in an interview.
 */

const PROFILE = {
  name: "Mostafa Goda",
  title: "Software Engineer",
  positioning: "Backend systems · Secure platforms · Infrastructure",
  location: "Egypt",
  email: "magopa092@gmail.com",
  phone: "+201099307299",
  github: "https://github.com/MOSTAFAGTR",
  linkedin: "https://www.linkedin.com/in/mostafa-goda-008251275/",
  resume: "/Mostafa_Goda_Resume.pdf",

  // Optional: fill these only if they are accurate and public.
  availability: "Open to Software Engineering opportunities",
  professionalNote:
    "Interested in backend, platform, security, DevSecOps, cloud, and industrial software engineering roles.",
};

const FLAGSHIP = {
  name: "SCALE",
  fullName: "Secure Coding Learning Environment",
  repo: "https://github.com/MOSTAFAGTR/grad-project",
  demo: "[FILL — live demo URL, or remove this button]",
  caseStudy: "#scale",
  summary:
    "A full-stack secure-coding platform designed around a difficult systems problem: validating learner-written security fixes without executing untrusted code directly inside the main application. The completed system integrates sandboxed execution, static analysis, dependency intelligence, AI-assisted learning, role-based workflows and analytics into one deployable platform.",
  problem:
    "Security-training platforms need to execute code written by learners. Executing that code inside the application process would make the learning environment itself a security boundary. SCALE separates the high-risk execution path from the application and validates remediation in disposable environments.",
  solution:
    "The platform combines vulnerability labs, sandbox-validated remediation, static analysis, dependency scanning, authentication and RBAC, learning analytics, instructor workflows, AI-assisted quiz generation, and controlled Docker execution.",
  metrics: [
    { value: "10", label: "interactive security labs" },
    { value: "128", label: "documented API routes" },
    { value: "32", label: "functional requirements verified" },
    { value: "4.1–4.5 / 5", label: "user evaluation scores" },
  ],
  stack: [
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "MySQL",
    "Docker",
    "Semgrep",
    "OSV.dev",
  ],
  architecture: [
    {
      n: "01",
      title: "Client",
      text:
        "React + TypeScript SPA with role-aware interfaces, dashboards, learning flows and browser-based code editing.",
    },
    {
      n: "02",
      title: "Application",
      text:
        "FastAPI backend with routing, service, ORM/domain and infrastructure responsibilities separated into explicit layers.",
    },
    {
      n: "03",
      title: "Security",
      text:
        "JWT authentication, RBAC, security-event logging, static analysis and dependency vulnerability intelligence.",
    },
    {
      n: "04",
      title: "Execution",
      text:
        "Disposable Docker environments validate learner fixes against controlled tests with bounded resources and network isolation.",
    },
  ],
  controls: [
    "Ephemeral execution containers",
    "Network isolation",
    "256 MB memory limit",
    "CPU quota enforcement",
    "PID limit of 128",
    "25-second execution timeout",
    "Controlled challenge directories",
    "Separate vulnerable databases",
    "bcrypt password hashing",
    "JWT authentication",
    "Role-based authorization",
    "Security event logging",
  ],
  decisions: [
    {
      title: "Why a hybrid architecture?",
      text:
        "Transactional application logic stays together where consistency matters, while high-risk execution and optional AI capabilities are isolated behind independent boundaries. A pure microservices architecture would add distributed-systems complexity without enough deployment-scale benefit.",
    },
    {
      title: "Why isolate execution?",
      text:
        "Learner submissions are untrusted input. The execution path therefore has different failure and security requirements from authentication, persistence and user sessions.",
    },
    {
      title: "What is the remaining boundary?",
      text:
        "Docker is an isolation mechanism, not a perfect hostile-code security boundary. The reference deployment still relies on the host kernel and Docker access. Stronger production isolation would require additional hardening or a stronger sandbox technology.",
    },
  ],
};

const EXPERIENCE = [
  {
    period: "2020 — PRESENT",
    company: "Emar Trading Agencies (ETA)",
    role: "Co-Manager · Procurement & Operations",
    type: "Professional experience",
    description:
      "Five+ years of practical responsibility across industrial automation, technical procurement, international importation, supplier management, client relationships and banking operations. Work includes technically evaluating pneumatic, mechatronic and factory-automation components, sourcing internationally, handling supplier accounts and resolving operational issues. Covered all company operations solo for a week during a staffing gap.",
    bullets: [],
    tags: [
      "Industrial Automation",
      "Mechatronics",
      "Technical Procurement",
      "Supplier Management",
      "International Logistics",
      "Operations",
    ],
  },
  {
    period: "AUGUST 2025",
    company: "NTI / ITIDA",
    role: "Full-Stack Web Development Trainee",
    type: "Technical training",
    description:
      "Completed an intensive 120-hour full-stack development program with a final score of 88.5%, covering web architecture, JavaScript, PHP, MySQL and software-engineering fundamentals.",
    bullets: [],
    tags: ["PHP", "JavaScript", "MySQL", "Web Architecture"],
  },
];

const PROJECTS = [
  {
    title: "InfraMate",
    category: "BACKEND / JAVA",
    featured: true,
    description:
      "Enterprise-style infrastructure management system built with Java, Spring Boot, Maven and Thymeleaf.",
    problem: "[FILL — the business/engineering problem]",
    contribution: "[FILL — exactly what you designed and implemented]",
    result: "[FILL — measurable or demonstrable outcome]",
    tags: ["Java", "Spring Boot", "Maven", "Thymeleaf"],
    repo: "[FILL — repository URL]",
    demo: "[FILL — demo URL or remove]",
  },
  {
    title: "QuizMaster",
    category: "FULL-STACK",
    featured: false,
    description:
      "Quiz platform with authentication, RBAC, instant grading and per-question result breakdown.",
    problem: "[FILL — problem]",
    contribution: "[FILL — your contribution]",
    result: "[FILL — result]",
    tags: ["React", "TypeScript", "Node.js", "Express", "JWT", "RBAC"],
    repo: "https://github.com/MOSTAFAGTR/quizMaster",
    demo: "[FILL — demo URL or remove]",
  },
  {
    title: "SQL Injection Prototype",
    category: "SECURITY / PROTOTYPE",
    featured: false,
    description:
      "Security-learning prototype used to demonstrate SQL injection behavior and remediation workflows.",
    problem: "[FILL — problem]",
    contribution: "[FILL — your contribution]",
    result: "[FILL — result]",
    tags: ["Python", "SQL", "Security", "OWASP"],
    repo: "https://github.com/MOSTAFAGTR/Sql-injection",
    demo: "[FILL — demo URL or remove]",
  },
];

const ENGINEERING_AREAS = [
  {
    title: "Backend Systems",
    lead: "Build services around clear boundaries, APIs, persistence and business logic.",
    evidence: ["FastAPI", "Spring Boot", "Node.js", "REST APIs", "SQLAlchemy", "JWT / RBAC"],
  },
  {
    title: "Security Engineering",
    lead: "Treat untrusted input, authorization and execution boundaries as architectural concerns.",
    evidence: ["OWASP", "SAST", "Semgrep", "OSV.dev", "Sandboxed execution", "Security logging"],
  },
  {
    title: "Infrastructure",
    lead: "Containerize services and make execution environments predictable, bounded and reproducible.",
    evidence: ["Docker", "Docker Compose", "Linux", "Resource limits", "Environment configuration"],
  },
  {
    title: "Frontend & Design",
    lead: "Deliver highly responsive, intuitive, and aesthetically polished user interfaces.",
    evidence: ["React", "UI/UX Design", "TypeScript", "Tailwind CSS", "Dashboards", "SPA Development"],
  },
];

const CORE_STACK = [
  {
    label: "Languages",
    value: "Python · C/C++ · Java · TypeScript · JavaScript · SQL · PHP · Dart",
  },
  {
    label: "Frontend & Design",
    value: "React · UI/UX Design · Tailwind CSS · HTML/CSS · SPA Development · Vite · Recharts",
  },
  {
    label: "Backend & Arch",
    value: "FastAPI · Spring Boot · Node.js · Express.js · REST APIs · System Design · Microservices",
  },
  {
    label: "Databases",
    value: "MySQL · PostgreSQL · MongoDB · Oracle · SQLite · Relational Design · Multi-database Arch",
  },
  {
    label: "Security",
    value: "Application Security · Secure Coding · OWASP · SAST · Semgrep · OSV.dev · JWT/RBAC · bcrypt",
  },
  {
    label: "DevOps & Test",
    value: "Docker · Docker Compose · Linux · Isolated Code Execution · JMeter · Automated/Performance Testing",
  },
  {
    label: "Mobile & AI",
    value: "Flutter · Dart · Riverpod · OpenAI API Integration · LLM Prompting & Fallback Design",
  },
  {
    label: "Industrial Domain",
    value: "Mechatronics · Pneumatics (Festo/SMC) · Technical Sourcing · Supplier Mgmt · International Logistics",
  },
];

const PROOF_ITEMS = [
  {
    number: "01",
    title: "Architecture decisions",
    text:
      "Explain why a system is shaped the way it is—not merely which frameworks were used.",
  },
  {
    number: "02",
    title: "Security boundaries",
    text:
      "Model untrusted inputs and isolate high-risk execution paths rather than treating security as a final checklist.",
  },
  {
    number: "03",
    title: "Engineering practice",
    text:
      "Apply structured problem decomposition, technical research, formal UML/SRS documentation, and testing methodologies.",
  },
  {
    number: "04",
    title: "Real-world ownership",
    text:
      "Professional responsibility outside university adds evidence of judgment, communication and operational ownership.",
  },
];

const CREDENTIALS = [
  {
    title: "B.Sc. Computer Science",
    institution: "Misr International University",
    detail: "Graduated June 2026. Comprehensive foundation in software architecture, requirements engineering, relational database design, and algorithmic problem solving.",
  },
  {
    title: "Minor in Software Engineering",
    institution: "Misr International University",
    detail: "Advanced coursework centered on engineering scalable software, encompassing system architecture, formal requirements engineering (SRS/UML), Agile/Scrum lifecycles, and rigorous QA/testing. Applied practically through the end-to-end architectural design and delivery of the SCALE capstone.",
  },
];

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 19 19 5M8 5h11v11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path 
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.7" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.34-3.8-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.26-5.15-5.61 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.11-1.16 3.11-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.36-2.65 5.31-5.17 5.59.41.36.77 1.06.77 2.14v3.18c0 .31.2.65.78.54A11.3 11.3 0 0 0 12 .7Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.2 3.5A2.2 2.2 0 1 1 .8 3.5a2.2 2.2 0 0 1 4.4 0ZM1 8h4.3v13H1V8Zm6.9 0h4.1v1.78h.06c.57-1.08 1.97-2.21 4.06-2.21 4.34 0 5.14 2.86 5.14 6.58V21h-4.3v-6.08c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H7.9V8Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 5.5h18v13H3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function isPlaceholder(value) {
  return typeof value === "string" && value.includes("[FILL");
}

function OptionalLink({ href, children, primary = false }) {
  if (!href || isPlaceholder(href)) return null;

  return (
    <a
      className={`button ${primary ? "button-primary" : ""}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
      <ExternalIcon />
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [decisionOpen, setDecisionOpen] = useState(null);

  const navItems = useMemo(
    () => [
      ["work", "Work"],
      ["engineering", "Engineering"],
      ["experience", "Experience"],
      ["about", "About"],
      ["contact", "Contact"],
    ],
    []
  );

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${PROFILE.name} — ${PROFILE.title}`;

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg: #0b0a09;
          --bg-2: #100e0c;
          --panel: #15120f;
          --panel-2: #1a1612;
          --text: #f3ecdf;
          --text-soft: #d5cabb;
          --muted: #a89c8b;
          --muted-2: #776e61;
          --accent: #c89b5c;
          --accent-strong: #e0b879;
          --line: rgba(200,155,92,.17);
          --line-strong: rgba(200,155,92,.32);
          --success: #a9c99e;
          --max: 1200px;
          --nav-h: 72px;
        }

        * { box-sizing: border-box; }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        body, button, a { -webkit-font-smoothing: antialiased; }

        a {
          color: inherit;
          text-decoration: none;
        }

        button { font: inherit; }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solid var(--accent-strong);
          outline-offset: 4px;
        }

        ::selection {
          background: var(--accent);
          color: var(--bg);
        }

        .site {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 78% 7%, rgba(200,155,92,.07), transparent 28rem),
            var(--bg);
        }

        .container {
          width: min(var(--max), calc(100% - 48px));
          margin: 0 auto;
        }

        .mono {
          font-family: "Space Mono", monospace;
        }

        .eyebrow {
          margin: 0 0 16px;
          color: var(--accent-strong);
          font: 700 11px/1.4 "Space Mono", monospace;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .section {
          padding: 104px 0;
          border-top: 1px solid var(--line);
        }

        .section-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 500px);
          align-items: end;
          gap: 48px;
          margin-bottom: 54px;
        }

        .section-title {
          margin: 0;
          max-width: 760px;
          font: 800 clamp(34px, 4.7vw, 58px)/1.02 Manrope, sans-serif;
          letter-spacing: -.055em;
        }

        .section-intro {
          margin: 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.78;
        }

        /* NAV */

        .nav {
          position: fixed;
          inset: 0 0 auto;
          z-index: 100;
          border-bottom: 1px solid var(--line);
          background: rgba(11,10,9,.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .nav-inner {
          min-height: var(--nav-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font: 700 14px Manrope, sans-serif;
        }

        .brand-mark {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 1px solid var(--accent);
          color: var(--accent-strong);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: -.04em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          color: var(--muted);
          font: 12px "Space Mono", monospace;
          letter-spacing: .06em;
        }

        .nav-links a {
          transition: color .2s ease;
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          padding: 0 14px;
          border: 1px solid var(--line-strong);
          color: var(--text);
          font: 700 11px "Space Mono", monospace;
          transition: .2s ease;
        }

        .nav-cta:hover {
          border-color: var(--accent);
          color: var(--accent-strong);
        }

        .menu-button {
          display: none;
          width: 40px;
          height: 40px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--text);
          cursor: pointer;
        }

        .nav-mobile {
          display: none;
        }

        /* HERO */

        .hero {
          position: relative;
          min-height: 790px;
          display: flex;
          align-items: center;
          padding: 145px 0 92px;
        }

        .hero-grid {
          position: absolute;
          inset: var(--nav-h) 0 0;
          pointer-events: none;
          opacity: .5;
          background-image:
            linear-gradient(rgba(200,155,92,.042) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,155,92,.042) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, black, transparent 78%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 78%);
        }

        .hero-content {
          position: relative;
          max-width: 1040px;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 24px;
          color: var(--accent-strong);
          font: 700 12px "Space Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .hero-kicker::before {
          content: "";
          width: 34px;
          height: 1px;
          background: var(--accent);
        }

        .hero h1 {
          max-width: 1000px;
          margin: 0;
          font: 800 clamp(48px, 6.6vw, 82px)/.96 Manrope, sans-serif;
          letter-spacing: -.068em;
        }

        .hero h1 em {
          color: var(--accent);
          font-style: normal;
        }

        .hero-subtitle {
          max-width: 760px;
          margin: 30px 0 0;
          color: var(--text-soft);
          font-size: clamp(18px, 2vw, 21px);
          line-height: 1.7;
        }

        .hero-subtitle strong {
          color: var(--text);
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 34px;
        }

        .button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 16px;
          border: 1px solid var(--line-strong);
          background: transparent;
          color: var(--text);
          font: 700 11px "Space Mono", monospace;
          letter-spacing: .02em;
          transition: transform .2s ease, border-color .2s ease, background .2s ease, color .2s ease;
          cursor: pointer;
        }

        .button svg {
          width: 15px;
          height: 15px;
          flex: 0 0 auto;
        }

        .button:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          color: var(--accent-strong);
        }

        .button-primary {
          border-color: var(--accent);
          background: var(--accent);
          color: var(--bg);
        }

        .button-primary:hover {
          background: var(--accent-strong);
          border-color: var(--accent-strong);
          color: var(--bg);
        }

        .hero-proof {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 64px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .proof-stat {
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 22px;
          border-right: 1px solid var(--line);
        }

        .proof-stat:last-child { border-right: 0; }

        .proof-stat strong {
          color: var(--text);
          font: 700 23px "Space Mono", monospace;
          letter-spacing: -.05em;
        }

        .proof-stat span {
          margin-top: 8px;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.45;
        }

        /* WORK / SCALE */

        .flagship {
          border: 1px solid var(--line-strong);
          background:
            linear-gradient(135deg, rgba(200,155,92,.065), transparent 48%),
            var(--panel);
        }

        .flagship-top {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr);
          min-height: 460px;
        }

        .flagship-copy {
          padding: 48px;
          border-right: 1px solid var(--line);
        }

        .flagship-label {
          color: var(--accent);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .flagship h3 {
          margin: 24px 0 0;
          font: 800 clamp(52px, 7vw, 78px)/.92 Manrope, sans-serif;
          letter-spacing: -.075em;
        }

        .flagship-fullname {
          margin-top: 12px;
          color: var(--accent-strong);
          font: 700 12px "Space Mono", monospace;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .flagship-summary {
          max-width: 690px;
          margin: 28px 0 0;
          color: var(--text-soft);
          font-size: 17px;
          line-height: 1.75;
        }

        .flagship-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 30px;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 24px;
        }

        .tag {
          padding: 6px 9px;
          border: 1px solid var(--line);
          color: var(--muted);
          font: 10px "Space Mono", monospace;
        }

        .flagship-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .metric {
          min-height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px;
          border-bottom: 1px solid var(--line);
          border-right: 1px solid var(--line);
        }

        .metric:nth-child(2n) { border-right: 0; }
        .metric:nth-last-child(-n+2) { border-bottom: 0; }

        .metric-value {
          color: var(--text);
          font: 700 clamp(27px, 4vw, 44px) "Space Mono", monospace;
          letter-spacing: -.07em;
        }

        .metric-label {
          max-width: 130px;
          margin-top: 9px;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.45;
        }

        .case-study {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 60px;
          margin-top: 42px;
        }

        .case-copy h3 {
          margin: 0;
          font: 700 27px/1.15 Manrope, sans-serif;
          letter-spacing: -.035em;
        }

        .case-copy p {
          margin: 17px 0 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.78;
        }

        .case-block {
          padding-bottom: 28px;
          margin-bottom: 28px;
          border-bottom: 1px solid var(--line);
        }

        .case-block:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: 0;
        }

        .case-label {
          color: var(--accent);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .pipeline {
          margin-top: 42px;
          border: 1px solid var(--line);
          background: var(--bg-2);
        }

        .pipeline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid var(--line);
        }

        .pipeline-title {
          color: var(--accent);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .1em;
        }

        .pipeline-note {
          color: var(--muted-2);
          font: 10px "Space Mono", monospace;
        }

        .pipeline-flow {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .pipeline-step {
          position: relative;
          min-height: 130px;
          padding: 19px 14px;
          border-right: 1px solid var(--line);
        }

        .pipeline-step:last-child { border-right: 0; }

        .pipeline-step:not(:last-child)::after {
          content: "→";
          position: absolute;
          top: 50%;
          right: -7px;
          z-index: 2;
          width: 14px;
          transform: translateY(-50%);
          background: var(--bg-2);
          color: var(--accent);
          text-align: center;
          font: 12px "Space Mono", monospace;
        }

        .pipeline-step small {
          color: var(--muted-2);
          font: 10px "Space Mono", monospace;
        }

        .pipeline-step strong {
          display: block;
          margin-top: 22px;
          font: 700 14px Manrope, sans-serif;
        }

        .pipeline-step span {
          display: block;
          margin-top: 7px;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.45;
        }

        /* ARCHITECTURE */

        .architecture-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .architecture-card {
          min-height: 300px;
          height: 100%;
          padding: 30px 26px;
          background: var(--bg);
          transition: background .2s ease;
        }

        .architecture-card:hover { background: var(--panel); }

        .architecture-number {
          color: var(--accent);
          font: 700 11px "Space Mono", monospace;
        }

        .architecture-card h3 {
          margin: 72px 0 12px;
          font: 700 21px Manrope, sans-serif;
        }

        .architecture-card p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .decision-list {
          margin-top: 32px;
          border-top: 1px solid var(--line);
        }

        .decision {
          border-bottom: 1px solid var(--line);
        }

        .decision-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 0;
          border: 0;
          background: transparent;
          color: var(--text);
          text-align: left;
          cursor: pointer;
        }

        .decision-button span:first-child {
          font: 700 13px "Space Mono", monospace;
        }

        .decision-button span:last-child {
          color: var(--accent);
          font-size: 20px;
        }

        .decision-content {
          max-width: 800px;
          padding: 0 0 25px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }

        /* SECURITY */

        .security-layout {
          display: grid;
          grid-template-columns: .72fr 1.28fr;
          gap: 70px;
        }

        .security-layout > .reveal {
          height: 100%;
        }

        .security-layout > .reveal > .security-grid {
          height: 100%;
        }

        .security-title {
          margin: 0;
          max-width: 520px;
          font: 700 clamp(32px, 4vw, 52px)/1.02 Manrope, sans-serif;
          letter-spacing: -.045em;
        }

        .security-intro {
          max-width: 500px;
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.78;
        }

        .security-boundary {
          margin-top: 28px;
          padding: 20px;
          border-left: 2px solid var(--accent);
          background: rgba(200,155,92,.045);
          color: var(--muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .security-boundary strong { color: var(--text); }

        .security-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .security-item {
          display: flex;
          gap: 12px;
          padding: 19px 17px;
          background: var(--bg);
          color: var(--muted);
          font: 11px/1.5 "Space Mono", monospace;
        }

        .security-item::before {
          content: "✓";
          color: var(--accent);
          flex: 0 0 auto;
        }

        /* ENGINEERING */

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .proof-grid > .reveal,
        .engineering-stack > .reveal,
        .architecture-grid > .reveal,
        .credentials > .reveal {
          height: 100%;
          min-width: 0;
          background: var(--bg);
        }

        .proof-card {
          min-height: 250px;
          height: 100%;
          padding: 30px 25px;
          background: var(--bg);
        }

        .proof-card-number {
          color: var(--accent);
          font: 700 11px "Space Mono", monospace;
        }

        .proof-card h3 {
          margin: 62px 0 12px;
          font: 700 20px Manrope, sans-serif;
        }

        .proof-card p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.68;
        }

        .engineering-stack {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          margin-top: 42px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .engineering-card {
          height: 100%;
          min-width: 0;
          padding: 30px;
          background: var(--bg);
        }

        .engineering-card h3 {
          margin: 0;
          font: 700 18px Manrope, sans-serif;
        }

        .engineering-lead {
          margin: 10px 0 20px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.65;
        }

        .evidence {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        /* EXPERIENCE */

        .experience-list {
          border-top: 1px solid var(--line);
        }

        .experience-item {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 58px;
          padding: 42px 0;
          border-bottom: 1px solid var(--line);
        }

        .experience-period {
          color: var(--accent);
          font: 11px "Space Mono", monospace;
          letter-spacing: .04em;
        }

        .experience-type {
          margin-top: 8px;
          color: var(--muted-2);
          font: 9px "Space Mono", monospace;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .experience-company {
          margin: 0;
          font: 700 26px Manrope, sans-serif;
          letter-spacing: -.025em;
        }

        .experience-role {
          margin: 6px 0 17px;
          color: var(--accent-strong);
          font: 12px "Space Mono", monospace;
        }

        .experience-description {
          max-width: 800px;
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.78;
        }

        .experience-bullets {
          display: grid;
          gap: 9px;
          max-width: 800px;
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
        }

        .experience-bullets li {
          position: relative;
          padding-left: 17px;
          color: var(--text-soft);
          font-size: 13px;
          line-height: 1.6;
        }

        .experience-bullets li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--accent);
        }

        /* PROJECTS */

        .project-list {
          border-top: 1px solid var(--line);
        }

        .project-row {
          display: grid;
          grid-template-columns: 170px minmax(0, 1fr) auto;
          align-items: start;
          gap: 34px;
          padding: 31px 0;
          border-bottom: 1px solid var(--line);
        }

        .project-category {
          padding-top: 5px;
          color: var(--accent);
          font: 10px "Space Mono", monospace;
          letter-spacing: .08em;
        }

        .project-row h3 {
          margin: 0;
          font: 700 21px Manrope, sans-serif;
        }

        .project-row p {
          max-width: 760px;
          margin: 9px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.68;
        }

        .project-row-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .mini-button {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 10px;
          border: 1px solid var(--line);
          color: var(--muted);
          font: 10px "Space Mono", monospace;
          transition: .2s ease;
        }

        .mini-button:hover {
          border-color: var(--accent);
          color: var(--accent-strong);
        }

        .mini-button svg {
          width: 12px;
          height: 12px;
        }

        /* ABOUT / CREDENTIALS */

        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
          gap: 80px;
        }

        .about-title {
          margin: 0;
          font: 700 clamp(34px, 4.5vw, 58px)/1.02 Manrope, sans-serif;
          letter-spacing: -.05em;
        }

        .about-text {
          max-width: 690px;
          margin: 23px 0 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.8;
        }

        .toolkit {
          border-top: 1px solid var(--line);
        }

        .tool-row {
          padding: 19px 0;
          border-bottom: 1px solid var(--line);
        }

        .tool-label {
          margin-bottom: 8px;
          color: var(--accent);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .tool-value {
          color: var(--text-soft);
          font-size: 14px;
          line-height: 1.65;
        }

        .credentials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          margin-top: 42px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .credential {
          height: 100%;
          padding: 30px;
          background: var(--bg);
        }

        .credential-label {
          color: var(--accent);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .credential h3 {
          margin: 24px 0 8px;
          font: 700 20px Manrope, sans-serif;
        }

        .credential p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.65;
        }

        /* CONTACT */

        .contact {
          position: relative;
          overflow: hidden;
          padding: 125px 0;
          border-top: 1px solid var(--line);
          background:
            radial-gradient(circle at 82% 45%, rgba(200,155,92,.085), transparent 27rem),
            var(--bg-2);
        }

        .contact h2 {
          max-width: 900px;
          margin: 0;
          font: 800 clamp(46px, 7vw, 86px)/.94 Manrope, sans-serif;
          letter-spacing: -.065em;
        }

        .contact h2 em {
          color: var(--accent);
          font-style: normal;
        }

        .contact-copy {
          max-width: 620px;
          margin: 25px 0 31px;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.75;
        }

        .contact-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .availability {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 26px;
          color: var(--muted);
          font: 10px "Space Mono", monospace;
        }

        .availability::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--success);
          box-shadow: 0 0 0 4px rgba(169,201,158,.08);
        }

        /* FOOTER */

        footer {
          border-top: 1px solid var(--line);
          padding: 27px 0;
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          color: var(--muted-2);
          font: 10px "Space Mono", monospace;
          letter-spacing: .04em;
        }

        .footer-links {
          display: flex;
          gap: 18px;
        }

        .footer-links a:hover { color: var(--accent); }

        /* REVEAL */

        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity .62s ease var(--delay),
            transform .62s ease var(--delay);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .reveal,
          .reveal.is-visible {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          *,
          *::before,
          *::after {
            animation: none !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* TABLET */

        @media (max-width: 980px) {
          .nav-links { gap: 17px; }
          .nav-cta { display: none; }

          .hero { min-height: auto; }

          .hero-proof {
            grid-template-columns: repeat(2, 1fr);
          }

          .proof-stat:nth-child(2) { border-right: 0; }
          .proof-stat:nth-child(-n+2) { border-bottom: 1px solid var(--line); }

          .flagship-top,
          .case-study,
          .security-layout,
          .about-grid {
            grid-template-columns: 1fr;
          }

          .flagship-copy {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .architecture-grid,
          .proof-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .engineering-stack {
            grid-template-columns: 1fr;
          }

          .experience-item {
            grid-template-columns: 150px minmax(0, 1fr);
            gap: 30px;
          }

          .project-row {
            grid-template-columns: 150px minmax(0, 1fr);
          }

          .project-row-actions {
            grid-column: 2;
            justify-content: flex-start;
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          :root { --nav-h: 64px; }

          .container {
            width: min(var(--max), calc(100% - 30px));
          }

          .nav-inner { min-height: var(--nav-h); }

          .nav-links { display: none; }

          .menu-button {
            display: grid;
            place-items: center;
          }

          .nav-mobile {
            display: grid;
            padding: 9px 0 17px;
            border-top: 1px solid var(--line);
            background: rgba(11,10,9,.97);
          }

          .nav-mobile a {
            padding: 13px 0;
            color: var(--muted);
            font: 11px "Space Mono", monospace;
            letter-spacing: .07em;
            border-bottom: 1px solid rgba(200,155,92,.08);
          }

          .nav-mobile a:last-child { border-bottom: 0; }

          .section {
            padding: 82px 0;
          }

          .section-header {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-bottom: 38px;
          }

          .hero {
            padding: 125px 0 68px;
          }

          .hero h1 {
            font-size: clamp(45px, 13vw, 70px);
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-actions .button {
            flex: 1 1 calc(50% - 10px);
          }

          .hero-proof {
            grid-template-columns: 1fr 1fr;
            margin-top: 48px;
          }

          .proof-stat {
            min-height: 94px;
            padding: 17px;
          }

          .proof-stat strong {
            font-size: 18px;
          }

          .flagship-copy {
            padding: 28px 20px;
          }

          .flagship h3 {
            font-size: clamp(56px, 20vw, 84px);
          }

          .flagship-summary {
            font-size: 15px;
          }

          .flagship-metrics {
            grid-template-columns: 1fr 1fr;
          }

          .metric {
            min-height: 140px;
            padding: 22px 18px;
          }

          .metric:nth-child(2) { border-right: 0; }
          .metric:nth-child(3) { border-right: 1px solid var(--line); }
          .metric:nth-child(3),
          .metric:nth-child(4) { border-bottom: 0; }

          .pipeline-flow {
            grid-template-columns: 1fr;
          }

          .pipeline-step {
            min-height: auto;
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .pipeline-step:last-child { border-bottom: 0; }

          .pipeline-step:not(:last-child)::after {
            content: "↓";
            top: auto;
            right: auto;
            left: 50%;
            bottom: -8px;
            transform: translateX(-50%);
          }

          .architecture-grid,
          .proof-grid,
          .engineering-stack,
          .credentials,
          .security-grid {
            grid-template-columns: 1fr;
          }

          .architecture-card {
            min-height: 230px;
          }

          .architecture-card h3 {
            margin-top: 48px;
          }

          .security-grid {
            gap: 1px;
          }

          .security-item {
            font-size: 10px;
          }

          .experience-item {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 34px 0;
          }

          .project-row {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 26px 0;
          }

          .project-row-actions {
            grid-column: auto;
          }

          .about-grid {
            gap: 50px;
          }

          .contact {
            padding: 90px 0;
          }

          .contact h2 {
            font-size: clamp(45px, 14vw, 68px);
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 420px) {
          .hero-actions .button {
            flex-basis: 100%;
          }

          .hero-proof {
            grid-template-columns: 1fr;
          }

          .proof-stat,
          .proof-stat:nth-child(-n+2) {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .proof-stat:last-child {
            border-bottom: 0;
          }

          .flagship-metrics {
            grid-template-columns: 1fr;
          }

          .metric,
          .metric:nth-child(3) {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .metric:last-child {
            border-bottom: 0;
          }
        }
      `}</style>

      <div className="site" id="top">
        <header className="nav">
          <div className="container nav-inner">
            <a className="brand" href="#top" onClick={closeMenu} aria-label="Back to top">
              <span className="brand-mark">MG</span>
              <span>{PROFILE.name}</span>
            </a>

            <nav className="nav-links" aria-label="Primary navigation">
              {navItems.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
              <a className="nav-cta" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                RESUME
              </a>
            </nav>

            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <nav id="mobile-navigation" className="container nav-mobile" aria-label="Mobile navigation">
              {navItems.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={closeMenu}>
                  {label}
                </a>
              ))}
              <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                Resume
              </a>
            </nav>
          )}
        </header>

        <main>
          {/* ============================================================
              HERO
          ============================================================ */}
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-grid" aria-hidden="true" />

            <div className="container">
              <div className="hero-content">
                <Reveal>
                  <div className="hero-kicker">
                    {PROFILE.title} · {PROFILE.positioning}
                  </div>

                  <h1 id="hero-title">
                    I build <em>backend systems</em> and secure software platforms.
                  </h1>

                  <p className="hero-subtitle">
                    {PROFILE.professionalNote !== "[FILL — one short sentence about the kinds of engineering teams/problems you want to work on.]"
                      ? PROFILE.professionalNote
                      : (
                        <>
                          Software engineer focused on <strong>backend architecture,
                          secure execution and infrastructure</strong>, with the
                          ability to work across the stack when the system requires it.
                        </>
                      )}
                  </p>

                  <div className="hero-actions">
                    <a className="button button-primary" href="#scale">
                      View flagship system
                      <ArrowIcon />
                    </a>

                    <a className="button" href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}>
                      <PhoneIcon />
                      {PROFILE.phone}
                    </a>

                    <a
                      className="button"
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon />
                      GitHub
                    </a>

                    <a
                      className="button"
                      href={PROFILE.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DownloadIcon />
                      Resume
                    </a>
                  </div>

                  <div className="hero-proof" aria-label="Selected engineering evidence">
                    <div className="proof-stat">
                      <strong>2026</strong>
                      <span>Computer Science graduate</span>
                    </div>
                    <div className="proof-stat">
                      <strong>5+ yrs</strong>
                      <span>Real-world business & operations</span>
                    </div>
                    <div className="proof-stat">
                      <strong>10</strong>
                      <span>Sandboxed security labs in SCALE</span>
                    </div>
                    <div className="proof-stat">
                      <strong>128</strong>
                      <span>Documented SCALE API routes</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================================================
              WORK / SCALE
          ============================================================ */}
          <section className="section" id="work" aria-labelledby="work-title">
            <div className="container">
              <Reveal>
                <div className="section-header">
                  <div>
                    <p className="eyebrow">SELECTED WORK</p>
                    <h2 className="section-title" id="work-title">
                      One flagship system.
                      <br />
                      Real engineering depth.
                    </h2>
                  </div>
                  <p className="section-intro">
                    I am intentionally keeping the portfolio focused. SCALE is the
                    strongest evidence of my systems, backend and security work;
                    secondary projects are presented as supporting evidence rather
                    than competing for attention.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <article className="flagship" id="scale">
                  <div className="flagship-top">
                    <div className="flagship-copy">
                      <div className="flagship-label">Flagship engineering case study</div>
                      <h3>{FLAGSHIP.name}</h3>
                      <div className="flagship-fullname">{FLAGSHIP.fullName}</div>

                      <p className="flagship-summary">{FLAGSHIP.summary}</p>

                      <div className="flagship-actions">
                        <OptionalLink href={FLAGSHIP.repo} primary>
                          Source code
                        </OptionalLink>
                        <OptionalLink href={FLAGSHIP.demo}>
                          Live demo
                        </OptionalLink>
                        <a className="button" href="#architecture">
                          Architecture
                          <ArrowIcon />
                        </a>
                      </div>

                      <div className="tag-list" aria-label="SCALE technology stack">
                        {FLAGSHIP.stack.map((item) => (
                          <span className="tag" key={item}>{item}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flagship-metrics">
                      {FLAGSHIP.metrics.map((metric) => (
                        <div className="metric" key={metric.label}>
                          <div className="metric-value">{metric.value}</div>
                          <div className="metric-label">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={80}>
                <div className="case-study">
                  <div className="case-copy">
                    <p className="eyebrow">ENGINEERING CASE STUDY</p>
                    <h3>Problem → boundary → implementation.</h3>
                    <p>
                      SCALE was engineered as a complete platform rather than a collection
                      of isolated features. Its core challenge was safely executing and
                      validating untrusted learner code while keeping the application,
                      persistence and user sessions isolated from execution failures.
                    </p>
                  </div>

                  <div>
                    <div className="case-block">
                      <div className="case-label">01 · Problem</div>
                      <p>{FLAGSHIP.problem}</p>
                    </div>

                    <div className="case-block">
                      <div className="case-label">02 · Solution</div>
                      <p>{FLAGSHIP.solution}</p>
                    </div>

                    <div className="case-block">
                      <div className="case-label">03 · Engineering result</div>
                      <p>
                        The implementation satisfied all 32 functional and 16 non-functional
                        requirements verified in the evaluation chapter. User evaluation
                        scores ranged from 4.1 to 4.5 out of 5, while the system was prepared
                        as a containerised deployment that can be started with Docker Compose.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="pipeline">
                  <div className="pipeline-header">
                    <span className="pipeline-title">CORE EXECUTION PIPELINE</span>
                    <span className="pipeline-note">UNTRUSTED CODE → VALIDATED RESULT</span>
                  </div>

                  <div className="pipeline-flow">
                    {[
                      ["01", "Submit", "Learner code"],
                      ["02", "Validate", "API + auth"],
                      ["03", "Isolate", "Ephemeral container"],
                      ["04", "Execute", "Controlled tests"],
                      ["05", "Collect", "Execution logs"],
                      ["06", "Analyze", "Backend result"],
                      ["07", "Respond", "Score + feedback"],
                    ].map(([n, title, text]) => (
                      <div className="pipeline-step" key={n}>
                        <small>{n}</small>
                        <strong>{title}</strong>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============================================================
              ARCHITECTURE
          ============================================================ */}
          <section className="section" id="architecture" aria-labelledby="architecture-title">
            <div className="container">
              <Reveal>
                <div className="section-header">
                  <div>
                    <p className="eyebrow">SYSTEM DESIGN</p>
                    <h2 className="section-title" id="architecture-title">
                      Architecture is a
                      <br />
                      decision, not a diagram.
                    </h2>
                  </div>
                  <p className="section-intro">
                    The useful part of architecture is the reasoning behind the
                    boundaries. This section exposes the decisions an engineering
                    interviewer is likely to ask about.
                  </p>
                </div>
              </Reveal>

              <div className="architecture-grid">
                {FLAGSHIP.architecture.map((item, index) => (
                  <Reveal key={item.n} delay={index * 55}>
                    <article className="architecture-card">
                      <span className="architecture-number">{item.n}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={100}>
                <div className="decision-list" aria-label="Architecture decisions">
                  {FLAGSHIP.decisions.map((decision, index) => {
                    const open = decisionOpen === index;

                    return (
                      <div className="decision" key={decision.title}>
                        <button
                          className="decision-button"
                          type="button"
                          aria-expanded={open}
                          aria-controls={`decision-${index}`}
                          onClick={() => setDecisionOpen(open ? null : index)}
                        >
                          <span>{decision.title}</span>
                          <span aria-hidden="true">{open ? "−" : "+"}</span>
                        </button>

                        <div
                          id={`decision-${index}`}
                          className="decision-content"
                          hidden={!open}
                        >
                          {decision.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============================================================
              SECURITY
          ============================================================ */}
          <section className="section" id="security" aria-labelledby="security-title">
            <div className="container">
              <div className="security-layout">
                <Reveal>
                  <div>
                    <p className="eyebrow">SECURITY ENGINEERING</p>
                    <h2 className="security-title" id="security-title">
                      Security is part of the system boundary.
                    </h2>
                    <p className="security-intro">
                      SCALE treats learner submissions as untrusted input and routes
                      remediation through a separate execution environment rather
                      than executing it directly inside the main application process.
                    </p>

                    <div className="security-boundary">
                      <strong>Important boundary:</strong> Docker is not presented
                      here as a magical perfect security boundary. The reference
                      deployment still shares the host kernel and requires Docker
                      access. Stronger production isolation would require additional
                      hardening or a stronger sandbox technology.
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={90}>
                  <div className="security-grid">
                    {FLAGSHIP.controls.map((item) => (
                      <div className="security-item" key={item}>{item}</div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================================================
              ENGINEERING PROOF
          ============================================================ */}
          <section className="section" id="engineering" aria-labelledby="engineering-title">
            <div className="container">
              <Reveal>
                <div className="section-header">
                  <div>
                    <p className="eyebrow">ENGINEERING EVIDENCE</p>
                    <h2 className="section-title" id="engineering-title">
                      What I can prove,
                      <br />
                      not just what I can list.
                    </h2>
                  </div>
                  <p className="section-intro">
                    Technologies are supporting evidence. The stronger signal is the
                    ability to reason about architecture, failure, security and
                    delivery.
                  </p>
                </div>
              </Reveal>

              <div className="proof-grid">
                {PROOF_ITEMS.map((item, index) => (
                  <Reveal key={item.number} delay={index * 50}>
                    <article className="proof-card">
                      <span className="proof-card-number">{item.number}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div className="engineering-stack">
                {ENGINEERING_AREAS.map((area, index) => (
                  <Reveal key={area.title} delay={index * 45}>
                    <article className="engineering-card">
                      <h3>{area.title}</h3>
                      <p className="engineering-lead">{area.lead}</p>
                      <div className="evidence">
                        {area.evidence.map((item) => (
                          <span className="tag" key={item}>{item}</span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              EXPERIENCE
          ============================================================ */}
          <section className="section" id="experience" aria-labelledby="experience-title">
            <div className="container">
              <Reveal>
                <div className="section-header">
                  <div>
                    <p className="eyebrow">PROFESSIONAL EXPERIENCE</p>
                    <h2 className="section-title" id="experience-title">
                      Software engineer.
                      <br />
                      Real-world responsibility.
                    </h2>
                  </div>
                  <p className="section-intro">
                    Graduation is not the end of the story. Professional responsibility,
                    technical judgment and working with real organizations are part of
                    the engineering profile.
                  </p>
                </div>
              </Reveal>

              <div className="experience-list">
                {EXPERIENCE.map((item, index) => (
                  <Reveal key={`${item.company}-${item.period}`} delay={index * 65}>
                    <article className="experience-item">
                      <div>
                        <div className="experience-period">{item.period}</div>
                        <div className="experience-type">{item.type}</div>
                      </div>

                      <div>
                        <h3 className="experience-company">{item.company}</h3>
                        <p className="experience-role">{item.role}</p>
                        <p className="experience-description">{item.description}</p>

                        {item.bullets.length > 0 && (
                          <ul className="experience-bullets">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        )}

                        <div className="tag-list">
                          {item.tags.map((tag) => (
                            <span className="tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              ADDITIONAL PROJECTS
          ============================================================ */}
          <section className="section" id="projects" aria-labelledby="projects-title">
            <div className="container">
              <Reveal>
                <div className="section-header">
                  <div>
                    <p className="eyebrow">ADDITIONAL ENGINEERING WORK</p>
                    <h2 className="section-title" id="projects-title">
                      Supporting evidence,
                      <br />
                      not project inflation.
                    </h2>
                  </div>
                  <p className="section-intro">
                    Keep only projects that you can defend technically. The goal is
                    consistency and evidence, not a long list of university assignments.
                  </p>
                </div>
              </Reveal>

              <div className="project-list">
                {PROJECTS.map((project, index) => (
                  <Reveal key={project.title} delay={index * 45}>
                    <article className="project-row">
                      <div className="project-category">{project.category}</div>

                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>

                        {project.featured && (
                          <div className="tag-list">
                            <span className="tag">Featured supporting project</span>
                          </div>
                        )}
                      </div>

                      <div className="project-row-actions">
                        <OptionalLink href={project.repo}>
                          Source
                        </OptionalLink>
                        <OptionalLink href={project.demo}>
                          Demo
                        </OptionalLink>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              ABOUT / TOOLKIT / EDUCATION
          ============================================================ */}
          <section className="section" id="about" aria-labelledby="about-title">
            <div className="container">
              <div className="about-grid">
                <Reveal>
                  <div>
                    <p className="eyebrow">ABOUT</p>
                    <h2 className="about-title" id="about-title">
                      Understand the problem.
                      <br />
                      Design the boundary.
                      <br />
                      Build the system.
                    </h2>

                    <p className="about-text">
                      I am a Software Engineer with a strong foundation in backend engineering, software architecture, cybersecurity, and full-stack development, complemented by several years of real-world experience in industrial automation, technical procurement, and operations. I have designed and built complex software systems using Python, FastAPI, Java, Spring Boot, React, TypeScript, Node.js, MySQL, Docker, and related technologies.
                    </p>

                    <p className="about-text">
                      My strongest technical experience comes from developing SCALE, a large security-focused platform combining containerized services, isolated execution of untrusted code, application security, SAST, dependency vulnerability scanning, AI integration, databases, and full-stack functionality. I am particularly strong at understanding complex systems, integrating multiple technologies, troubleshooting difficult technical problems, and translating requirements into practical implementations.
                    </p>

                    <p className="about-text">
                      While I focus heavily on robust backend architecture, I also bring strong expertise in frontend development and UI/UX design. This allows me to craft highly intuitive, responsive, and aesthetically polished user interfaces that seamlessly integrate with complex backend services.
                    </p>

                    <p className="about-text">
                      Beyond software, my professional experience in industrial automation and technical sourcing has given me practical knowledge of pneumatic systems, mechatronics, industrial components, suppliers, procurement, and international logistics. This combination allows me to approach problems from both an engineering and business perspective.
                    </p>

                    <p className="about-text">
                      I am especially interested in backend, platform, security, DevSecOps, cloud, and industrial software engineering, where I can apply my ability to build reliable systems, analyze technical problems deeply, and continuously develop toward advanced engineering roles.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <div>
                    <p className="eyebrow">CORE TOOLKIT & SKILLS</p>

                    <div className="toolkit">
                      {CORE_STACK.map((item) => (
                        <div className="tool-row" key={item.label}>
                          <div className="tool-label">{item.label}</div>
                          <div className="tool-value">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={100}>
                <div style={{ marginTop: "80px" }}>
                  <p className="eyebrow">EDUCATION & CREDENTIALS</p>

                  <div className="credentials">
                    {CREDENTIALS.map((item) => (
                      <article className="credential" key={item.title}>
                        <div className="credential-label">Credential</div>
                        <h3>{item.title}</h3>
                        <p>{item.institution}</p>
                        <p style={{ marginTop: "8px" }}>{item.detail}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============================================================
              CONTACT
          ============================================================ */}
          <section className="contact" id="contact" aria-labelledby="contact-title">
            <div className="container">
              <Reveal>
                <p className="eyebrow">CONTACT</p>
                <h2 id="contact-title">
                  Building software
                  <br />
                  <em>worth engineering.</em>
                </h2>

                <p className="contact-copy">
                  Open to software engineering opportunities across backend,
                  full-stack, systems, platform and security-oriented roles.
                  For the strongest technical evidence, start with SCALE and the
                  source code behind it.
                </p>

                <div className="contact-links">
                  <a className="button button-primary" href={`mailto:${PROFILE.email}`}>
                    <MailIcon />
                    Email me
                  </a>

                  <a className="button" href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}>
                    <PhoneIcon />
                    {PROFILE.phone}
                  </a>

                  <a
                    className="button"
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon />
                    GitHub
                  </a>

                  <a
                    className="button"
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>

                  <a
                    className="button"
                    href={PROFILE.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon />
                    Resume
                  </a>
                </div>

                <div className="availability">{PROFILE.availability}</div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer>
          <div className="container footer-inner">
            <span>© 2026 {PROFILE.name} · {PROFILE.title}</span>

            <div className="footer-links">
              <a href="#top">Back to top</a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}