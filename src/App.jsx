import { useEffect, useRef, useState } from "react";

/*
  ============================================================
  MOSTAFA GODA — SOFTWARE ENGINEER PORTFOLIO 
  ============================================================

  Design philosophy:
  - Calm
  - Editorial
  - Engineering-first
  - Minimal color
  - Motion with purpose
  - Evidence over decoration
  - Recruiter-readable
  - No animation libraries
  - No icon libraries

  Assets to add later:

  /public/images/profile.png
  /public/images/scale-dashboard.png
  /public/images/scale-labs-challenges.png
  /public/images/scale-red-vs-blue.png
  /public/images/scale-security-logs.png
  /public/images/scale-security-scanner.png
  /public/images/scale-lab-attack.png
  /public/images/scale-lab-fix.png
  /public/images/scale-architecture.png
  /public/images/inframate.png
  /public/images/quizmaster.png

  /public/videos/scale-marketing.mp4
  /public/videos/scale-marketing.vtt
  /public/Mostafa_Goda_Resume.pdf
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

  resume: "./Mostafa_Goda_Resume.pdf",

  availability: "Open to Software Engineering opportunities",
};

const SCALE = {
  name: "SCALE",
  fullName: "Secure Coding Learning Environment",

  repo: "https://github.com/MOSTAFAGTR/grad-project",

  summary:
    "A security-focused learning platform built around a difficult systems problem: safely executing and validating learner-written code without allowing that execution path to become part of the main application boundary.",

  problem:
    "Security-training platforms need to execute code written by learners. Executing that code directly inside the application process would make the learning environment itself part of the attack surface.",

  solution:
    "SCALE separates high-risk execution from the application using disposable Docker environments, while combining vulnerability labs, sandbox-validated remediation, authentication, RBAC, static analysis, dependency intelligence, analytics and AI-assisted learning.",

  metrics: [
    ["10", "interactive security labs"],
    ["128", "documented API routes"],
    ["32", "functional requirements verified"],
    ["4.1–4.5 / 5", "user evaluation scores"],
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
      number: "01",
      title: "Client",
      text:
        "React + TypeScript SPA with dashboards, learning flows, role-aware interfaces and browser-based code editing.",
    },
    {
      number: "02",
      title: "Application",
      text:
        "FastAPI backend with explicit routing, service, ORM/domain and infrastructure responsibilities.",
    },
    {
      number: "03",
      title: "Security",
      text:
        "JWT authentication, RBAC, security-event logging, static analysis and dependency vulnerability intelligence.",
    },
    {
      number: "04",
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
        "Docker is an isolation mechanism, not a perfect hostile-code security boundary. The reference deployment still relies on the host kernel and Docker access. Stronger production isolation would require additional hardening or stronger sandbox technology.",
    },
  ],
};

const SCALE_GALLERY = [
  {
    src: "./images/scale-dashboard.png",
    alt: "SCALE dashboard",
    label: "Dashboard",
  },
  {
    src: "./images/scale-labs-challenges.png",
    alt: "SCALE labs and challenges",
    label: "Labs & Challenges",
  },
  {
    src: "./images/scale-red-vs-blue.png",
    alt: "SCALE Red vs Blue security challenge",
    label: "Red vs Blue",
  },
  {
    src: "./images/scale-security-logs.png",
    alt: "SCALE security event logs",
    label: "Security Logs",
  },
  {
    src: "./images/scale-security-scanner.png",
    alt: "SCALE security scanner",
    label: "Security Scanner",
  },
  {
    src: "./images/scale-lab-attack.png",
    alt: "SCALE security lab attack page",
    label: "Lab · Attack",
  },
  {
    src: "./images/scale-lab-fix.png",
    alt: "SCALE security lab fix page",
    label: "Lab · Fix",
  },
  {
    src: "./images/scale-architecture.png",
    alt: "SCALE system architecture",
    label: "Architecture",
  },
];

const EXPERIENCE = [
  {
    period: "2020 — PRESENT",
    company: "Emar Trading Agencies (ETA)",
    role: "Co-Manager · Procurement & Operations",
    type: "Professional experience",
    description:
      "Five+ years of practical responsibility across industrial automation, technical procurement, international importation, supplier management, client relationships and banking operations.",
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
    tags: [
      "PHP",
      "JavaScript",
      "MySQL",
      "Web Architecture",
    ],
  },
];

const PROJECTS = [
  {
    title: "InfraMate",
    category: "BACKEND / JAVA",
    description:
      "Enterprise-style infrastructure management system built with Java, Spring Boot, Maven and Thymeleaf.",
    repo: null,
    image: "./images/inframate.png",
  },
  {
    title: "QuizMaster",
    category: "FULL-STACK",
    description:
      "Quiz platform with authentication, RBAC, instant grading and per-question result breakdown.",
    repo: "https://github.com/MOSTAFAGTR/quizMaster",
    image: "./images/quizmaster.png",
  },
  {
    title: "SQL Injection Prototype",
    category: "SECURITY / PROTOTYPE",
    description:
      "Security-learning prototype demonstrating SQL injection behavior and remediation workflows.",
    repo: "https://github.com/MOSTAFAGTR/Sql-injection",
    image: null,
  },
];

const SKILLS = [
  {
    title: "Backend Systems",
    description:
      "Services, APIs, persistence and business logic built around clear boundaries.",
    items: [
      "Python",
      "FastAPI",
      "Java",
      "Spring Boot",
      "Node.js",
      "REST APIs",
      "SQLAlchemy",
      "JWT / RBAC",
    ],
  },
  {
    title: "Security Engineering",
    description:
      "Security treated as an architectural concern rather than a final checklist.",
    items: [
      "OWASP",
      "Secure Coding",
      "SAST",
      "Semgrep",
      "OSV.dev",
      "Sandboxed Execution",
      "Security Logging",
    ],
  },
  {
    title: "Infrastructure",
    description:
      "Predictable, bounded and reproducible execution environments.",
    items: [
      "Docker",
      "Docker Compose",
      "Linux",
      "Resource Limits",
      "Environment Configuration",
    ],
  },
  {
    title: "Frontend & Design",
    description:
      "Interfaces that remain clear while integrating with complex systems.",
    items: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "UI/UX",
      "Dashboards",
      "Vite",
      "Recharts",
    ],
  },
];

const TOOLKIT = [
  [
    "Languages",
    "Python · C/C++ · Java · TypeScript · JavaScript · SQL · PHP · Dart",
  ],
  [
    "Frontend",
    "React · TypeScript · UI/UX · Tailwind CSS · HTML/CSS · Vite · Recharts",
  ],
  [
    "Backend",
    "FastAPI · Spring Boot · Node.js · Express.js · REST APIs · System Design",
  ],
  [
    "Databases",
    "MySQL · PostgreSQL · MongoDB · Oracle · SQLite",
  ],
  [
    "Security",
    "Application Security · OWASP · SAST · Semgrep · OSV.dev · JWT/RBAC · bcrypt",
  ],
  [
    "DevOps & Testing",
    "Docker · Docker Compose · Linux · Isolated Code Execution · JMeter",
  ],
  [
    "Mobile & AI",
    "Flutter · Dart · Riverpod · OpenAI API Integration",
  ],
  [
    "Industrial Domain",
    "Mechatronics · Pneumatics · Technical Sourcing · Supplier Management",
  ],
];

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

function LinkedinIcon() {
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

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9 6 9 6-9 6V6Z"
        fill="currentColor"
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

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

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
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  href,
  primary = false,
  external = false,
  className = "",
  onClick,
}) {
  const classes = `button ${
    primary ? "button-primary" : ""
  } ${className}`;

  if (onClick) {
    return (
      <button className={classes} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function ImageGallery({ onOpen }) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState({});

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % SCALE_GALLERY.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const previous = (event) => {
    event.stopPropagation();
    setCurrent((index) =>
      (index - 1 + SCALE_GALLERY.length) % SCALE_GALLERY.length
    );
  };

  const next = (event) => {
    event.stopPropagation();
    setCurrent((index) => (index + 1) % SCALE_GALLERY.length);
  };

  const image = SCALE_GALLERY[current];

  return (
    <div className="image-gallery" aria-label="SCALE project screenshots">
      {!failed[current] ? (
        <button
          type="button"
          className="gallery-image-button"
          onClick={() => onOpen(current)}
          aria-label={`Open ${image.label} image`}
        >
          <img
            className="gallery-image"
            src={image.src}
            alt={image.alt}
            loading={current === 0 ? "eager" : "lazy"}
            onError={() =>
              setFailed((items) => ({ ...items, [current]: true }))
            }
          />
        </button>
      ) : (
        <button
          type="button"
          className="image-fallback gallery-fallback-button"
          onClick={() => onOpen(current)}
          aria-label={`Open ${image.label} image`}
        >
          <span>{image.label}</span>
          <small>IMAGE PLACEHOLDER</small>
        </button>
      )}

      <button
        type="button"
        className="gallery-arrow gallery-prev"
        onClick={previous}
        aria-label="Previous SCALE image"
      >
        ‹
      </button>

      <button
        type="button"
        className="gallery-arrow gallery-next"
        onClick={next}
        aria-label="Next SCALE image"
      >
        ›
      </button>

      <div className="gallery-overlay">
        <span>
          {String(current + 1).padStart(2, "0")} / {String(SCALE_GALLERY.length).padStart(2, "0")} · {image.label}
        </span>

        <div className="gallery-dots" aria-label="Choose SCALE image">
          {SCALE_GALLERY.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={`gallery-dot ${index === current ? "active" : ""}`}
              onClick={(event) => {
                event.stopPropagation();
                setCurrent(index);
              }}
              aria-label={`Show ${item.label}`}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoPanel({ onOpen }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="video-panel">
      {!videoFailed ? (
        <video
          className="scale-video"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          crossOrigin="anonymous"
          poster="./images/scale-poster.jpg"
          onError={() => setVideoFailed(true)}
        >
          <track
            kind="subtitles"
            src="./videos/scale-marketing.vtt"
            srcLang="en"
            label="English"
            default
          />
          <source
            src="./videos/scale-marketing.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <div className="video-fallback">
          <div className="video-fallback-grid" />
          <span className="video-code">SCALE / SYSTEM PREVIEW</span>
          <strong>60 seconds of the system.</strong>
          <small>
            Add your marketing video to
            <br />
            /public/videos/scale-marketing.mp4
          </small>
        </div>
      )}

      <button
        type="button"
        className="video-overlay"
        onClick={onOpen}
        aria-label="Open SCALE marketing video"
      >
        <span className="play-circle">
          <PlayIcon />
        </span>

        <span>
          <small>OPTIONAL · 01:00</small>
          <strong>Watch SCALE</strong>
        </span>

        <ArrowIcon />
      </button>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [decisionOpen, setDecisionOpen] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("work");
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    document.title = `${PROFILE.name} — ${PROFILE.title}`;

    const sections = [
      "work",
      "architecture",
      "engineering",
      "experience",
      "projects",
      "about",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.15, 0.3],
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = videoOpen || imageOpen || avatarOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [videoOpen, imageOpen, avatarOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
        setImageOpen(false);
        setAvatarOpen(false);
      }

      if (imageOpen && event.key === "ArrowRight") {
        setImageIndex((index) => (index + 1) % SCALE_GALLERY.length);
      }

      if (imageOpen && event.key === "ArrowLeft") {
        setImageIndex((index) =>
          (index - 1 + SCALE_GALLERY.length) % SCALE_GALLERY.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [imageOpen]);

  const closeMenu = () => setMenuOpen(false);

  const nav = [
    ["work", "Work"],
    ["architecture", "Architecture"],
    ["engineering", "Engineering"],
    ["experience", "Experience"],
    ["about", "About"],
    ["contact", "Contact"],
  ];

  return (
    <>
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

        :root {
          --bg: #090908;
          --bg-soft: #0e0d0b;
          --panel: #12110f;
          --panel-light: #171512;

          --text: #f2ece2;
          --soft: #d2c8ba;
          --muted: #9a9083;
          --dim: #625b52;

          --gold: #c49a61;
          --gold-light: #dfb77d;

          --line: rgba(196,154,97,.16);
          --line-strong: rgba(196,154,97,.30);

          --green: #a8c99a;

          --max: 1200px;
          --nav: 70px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Manrope, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        body,
        button,
        a {
          -webkit-font-smoothing: antialiased;
        }

        body::selection {
          background: var(--gold);
          color: var(--bg);
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solid var(--gold-light);
          outline-offset: 4px;
        }

        ::selection {
          background: var(--gold);
          color: var(--bg);
        }

        .site {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 76% 8%,
              rgba(196,154,97,.055),
              transparent 32rem
            ),
            var(--bg);
        }

        .container {
          width: min(
            var(--max),
            calc(100% - 56px)
          );
          margin: 0 auto;
        }

        .mono {
          font-family: "DM Mono", monospace;
        }

        /* ================================================
           NAVIGATION
        ================================================ */

        .nav {
          position: fixed;
          z-index: 100;
          inset: 0 0 auto;
          border-bottom: 1px solid var(--line);
          background: rgba(9,9,8,.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .nav-inner {
          min-height: var(--nav);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -.02em;
        }

        .brand-mark {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font: 500 10px "DM Mono", monospace;
          position: relative;
          overflow: hidden;
        }

        .brand-mark::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gold-light);
          opacity: .5;
          animation: brandScan 3.5s ease-in-out infinite;
        }

        @keyframes brandScan {
          0%, 100% { top: -2px; }
          50% { top: 31px; }
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-links a {
          position: relative;
          color: var(--muted);
          font: 10px "DM Mono", monospace;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 7px 0;
          transition:
            color .25s ease,
            transform .25s ease;
        }

        .nav-links a:hover {
          color: var(--text);
          transform: translateY(-1px);
        }

        .nav-links a.active {
          color: var(--gold-light);
        }

        .nav-links a.active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: var(--gold);
        }

        .nav-resume {
          min-height: 35px !important;
          padding: 0 13px !important;
          border: 1px solid var(--line-strong);
          display: inline-flex !important;
          align-items: center;
        }

        .nav-resume:hover {
          border-color: var(--gold) !important;
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

        .mobile-menu {
          display: none;
        }

        /* ================================================
           HERO
        ================================================ */

        .hero {
          position: relative;
          min-height: 850px;
          display: flex;
          align-items: center;
          padding: 150px 0 100px;
        }

        .hero-grid {
          position: absolute;
          inset: var(--nav) 0 0;
          pointer-events: none;
          opacity: .45;

          background-image:
            linear-gradient(
              rgba(196,154,97,.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(196,154,97,.035) 1px,
              transparent 1px
            );

          background-size: 64px 64px;

          mask-image:
            linear-gradient(
              to bottom,
              black 0%,
              black 28%,
              transparent 82%
            );

          animation: gridDrift 18s linear infinite;
        }

        @keyframes gridDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 64px 64px;
          }
        }

        .hero-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          right: -170px;
          top: 90px;
          border-radius: 50%;
          pointer-events: none;

          background:
            radial-gradient(
              circle,
              rgba(196,154,97,.075),
              rgba(196,154,97,.018) 40%,
              transparent 70%
            );

          animation: breathe 8s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(.96);
            opacity: .7;
          }

          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1080px;
        }

        /* ================================================
           PROFILE AVATAR (HERO TOP ROW)
        ================================================ */

        .hero-top-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .hero-avatar {
          background: transparent;
          border: none;
          padding: 0;
          cursor: zoom-in;
          border-radius: 50%;
        }

        .avatar-ring {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          border: 1px solid var(--gold);
          padding: 4px;
          position: relative;
          background: rgba(196,154,97,.05);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s ease;
        }

        .hero-avatar:hover .avatar-ring {
          transform: scale(1.08);
          border-color: var(--gold-light);
        }

        .avatar-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background: var(--bg-soft);
        }

        .avatar-fallback {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: var(--panel);
          color: var(--gold);
          font: 500 22px "DM Mono", monospace;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-kicker {
          display: flex;
          align-items: center;
          gap: 11px;
          color: var(--gold-light);
          font: 500 10px "DM Mono", monospace;
          letter-spacing: .09em;
          text-transform: uppercase;
          margin: 0;
        }

        .hero-kicker::before {
          content: "";
          width: 34px;
          height: 1px;
          background: var(--gold);
          transform-origin: left center;
          animation: kickerLine 3.2s ease-in-out infinite;
        }

        @keyframes kickerLine {
          0%, 100% { transform: scaleX(.72); opacity: .5; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        .hero h1 {
          max-width: 1000px;
          margin: 0;

          font-size: clamp(50px, 7vw, 88px);
          line-height: .95;
          font-weight: 800;
          letter-spacing: -.072em;
        }

        .hero h1 em {
          color: var(--gold);
          font-style: normal;
        }

        .hero-subtitle {
          max-width: 720px;
          margin: 30px 0 0;

          color: var(--soft);
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.75;
        }

        .hero-subtitle strong {
          color: var(--text);
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 33px;
        }

        .button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          padding: 0 15px;

          border: 1px solid var(--line-strong);
          background: transparent;
          color: var(--text);

          font: 500 10px "DM Mono", monospace;
          letter-spacing: .02em;

          cursor: pointer;

          transition:
            transform .25s cubic-bezier(.2,.8,.2,1),
            border-color .25s ease,
            background .25s ease,
            color .25s ease;
        }

        .button svg {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
        }

        .button {
          position: relative;
          overflow: hidden;
        }

        .button::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -70%;
          width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent);
          transform: skewX(-18deg);
          transition: left .7s ease;
          pointer-events: none;
        }

        .button:hover::after {
          left: 130%;
        }

        .button:hover {
          transform: translateY(-2px);
          border-color: var(--gold);
          color: var(--gold-light);
        }

        .button:active {
          transform: translateY(0);
        }

        .button-primary {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--bg);
        }

        .button-primary:hover {
          background: var(--gold-light);
          border-color: var(--gold-light);
          color: var(--bg);
        }

        .hero-proof {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 70px;

          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .proof-stat {
          min-height: 105px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 18px 20px;

          border-right: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }

        .proof-stat:last-child {
          border-right: 0;
        }

        .proof-stat::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 0;
          background: var(--gold);
          transition: width .45s ease;
        }

        .proof-stat:hover::after {
          width: 100%;
        }

        .proof-stat strong {
          font: 500 21px "DM Mono", monospace;
          letter-spacing: -.05em;
        }

        .proof-stat span {
          margin-top: 8px;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.45;
        }

        /* ================================================
           GENERAL
        ================================================ */

        .section {
          position: relative;
          padding: 110px 0;
          border-top: 1px solid var(--line);
        }

        .section-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 470px);
          gap: 60px;
          align-items: end;
          margin-bottom: 55px;
        }

        .eyebrow {
          margin: 0 0 15px;
          color: var(--gold-light);
          font: 500 10px "DM Mono", monospace;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .section-title {
          margin: 0;
          max-width: 800px;

          font-size: clamp(37px, 5vw, 60px);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -.06em;
        }

        .section-intro {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.85;
        }

        /* ================================================
           REVEAL
        ================================================ */

        .reveal {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          transition:
            opacity .7s ease var(--delay),
            transform .7s cubic-bezier(.2,.75,.2,1) var(--delay);
        }

        .reveal.visible {
          opacity: 1;
          transform: translate3d(0,0,0);
        }

        /* ================================================
           SCALE
        ================================================ */

        .scale-shell {
          position: relative;
        }

        .scale-card {
          border: 1px solid var(--line-strong);
          background:
            linear-gradient(
              135deg,
              rgba(196,154,97,.055),
              transparent 45%
            ),
            var(--panel);
          position: relative;
          overflow: hidden;
        }

        .scale-card::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          right: -260px;
          top: -260px;
          border-radius: 50%;
          border: 1px solid rgba(196,154,97,.08);
          box-shadow:
            0 0 0 70px rgba(196,154,97,.012),
            0 0 0 140px rgba(196,154,97,.008);
          animation: orbitPulse 9s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes orbitPulse {
          0%, 100% {
            transform: scale(.96) rotate(0deg);
          }
          50% {
            transform: scale(1.04) rotate(5deg);
          }
        }

        .scale-top {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(310px, .85fr);
          min-height: 500px;
        }

        .scale-copy {
          padding: 52px;
          border-right: 1px solid var(--line);
          position: relative;
          z-index: 2;
        }

        .scale-label {
          color: var(--gold);
          font: 500 9px "DM Mono", monospace;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .scale-name {
          margin: 24px 0 0;

          font-size: clamp(58px, 8vw, 92px);
          line-height: .86;
          font-weight: 800;
          letter-spacing: -.085em;
        }

        .scale-fullname {
          margin-top: 13px;
          color: var(--gold-light);
          font: 500 10px "DM Mono", monospace;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .scale-summary {
          max-width: 690px;
          margin: 29px 0 0;

          color: var(--soft);
          font-size: 15px;
          line-height: 1.85;
        }

        .scale-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 29px;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 23px;
        }

        .tag {
          padding: 6px 8px;
          border: 1px solid var(--line);
          color: var(--muted);
          font: 9px "DM Mono", monospace;
          transition:
            border-color .25s ease,
            color .25s ease,
            transform .25s ease;
        }

        .tag:hover {
          border-color: var(--line-strong);
          color: var(--gold-light);
          transform: translateY(-1px);
        }

        .scale-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .metric {
          min-height: 175px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px;
          border-bottom: 1px solid var(--line);
          border-right: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }

        .metric:nth-child(2n) {
          border-right: 0;
        }

        .metric:nth-last-child(-n+2) {
          border-bottom: 0;
        }

        .metric::before {
          content: "";
          position: absolute;
          width: 90px;
          height: 90px;
          right: -35px;
          bottom: -35px;
          border-radius: 50%;
          border: 1px solid rgba(196,154,97,.08);
          transition: transform .5s ease;
        }

        .metric:hover::before {
          transform: scale(1.8);
        }

        .metric-value {
          font: 500 clamp(26px, 4vw, 42px) "DM Mono", monospace;
          letter-spacing: -.07em;
        }

        .metric-label {
          max-width: 135px;
          margin-top: 9px;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.5;
        }

        /* ================================================
           SCALE MEDIA
        ================================================ */

        .scale-media {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 12px;
          margin-top: 12px;
          align-items: stretch;
        }

        .image-gallery,
        .video-panel {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 0;
          border: 1px solid var(--line);
          background: #0c0b0a;
          overflow: hidden;
        }

        .image-gallery {
          isolation: isolate;
        }

        .gallery-image-button {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: #0c0b0a;
          cursor: zoom-in;
        }

        .gallery-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: #0c0b0a;
          opacity: .94;
          transition: transform .7s cubic-bezier(.2,.8,.2,1), opacity .35s ease;
        }

        .gallery-image-button:hover .gallery-image {
          transform: scale(1.018);
          opacity: 1;
        }

        .gallery-arrow {
          position: absolute;
          z-index: 5;
          top: 50%;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(196,154,97,.28);
          background: rgba(9,9,8,.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--text);
          font: 300 25px/1 Manrope, sans-serif;
          cursor: pointer;
          opacity: 0;
          transform: translateY(-50%);
          transition: opacity .25s ease, background .25s ease, border-color .25s ease;
        }

        .image-gallery:hover .gallery-arrow,
        .gallery-arrow:focus-visible {
          opacity: 1;
        }

        .gallery-arrow:hover {
          border-color: var(--gold);
          background: rgba(196,154,97,.12);
        }

        .gallery-prev { left: 14px; }
        .gallery-next { right: 14px; }

        .gallery-overlay {
          position: absolute;
          z-index: 4;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 14px 16px;
          background: linear-gradient(to top, rgba(9,9,8,.92), rgba(9,9,8,.32));
          pointer-events: none;
        }

        .gallery-overlay > span {
          color: var(--soft);
          font: 9px "DM Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .gallery-dots {
          display: flex;
          align-items: center;
          gap: 5px;
          pointer-events: auto;
        }

        .gallery-dot {
          width: 20px;
          height: 3px;
          padding: 0;
          border: 0;
          background: rgba(242,236,226,.24);
          cursor: pointer;
          transition: width .3s ease, background .3s ease;
        }

        .gallery-dot.active {
          width: 30px;
          background: var(--gold);
        }

        .gallery-fallback-button {
          width: 100%;
          height: 100%;
          border: 0;
          cursor: zoom-in;
        }

        .video-panel {
          min-height: 0;
        }

        .scale-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .72;
        }

        .video-overlay {
          position: absolute;
          z-index: 3;
          inset: auto 0 0 0;
          width: 100%;
          min-height: 92px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border: 0;
          border-top: 1px solid rgba(196,154,97,.16);
          background: linear-gradient(to top, rgba(9,9,8,.95), rgba(9,9,8,.55));
          color: var(--text);
          text-align: left;
          cursor: pointer;
          transition: background .35s ease, min-height .35s ease;
        }

        .video-panel:hover .video-overlay {
          background: linear-gradient(to top, rgba(9,9,8,.97), rgba(9,9,8,.62));
        }

        .video-panel:hover .play-circle {
          animation: playBreath 1.8s ease-in-out infinite;
        }

        .play-circle {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          border-radius: 50%;
          transition: transform .3s ease, border-color .3s ease, background .3s ease;
        }

        .play-circle svg {
          width: 14px;
          height: 14px;
          margin-left: 2px;
        }
        
        .video-overlay:hover .play-circle {
          transform: scale(1.08);
          border-color: var(--gold);
          background: var(--gold);
          color: var(--bg);
        }

        .video-overlay small {
          display: block;
          color: var(--gold);
          font: 9px "DM Mono", monospace;
          letter-spacing: .1em;
        }

        .video-overlay strong {
          display: block;
          margin-top: 5px;
          font-size: 13px;
        }

        .video-overlay > svg {
          width: 17px;
          height: 17px;
          color: var(--gold);
        }

        @keyframes playBreath {
          0%, 100% { box-shadow: 0 0 0 rgba(196,154,97,0); }
          50% { box-shadow: 0 0 0 7px rgba(196,154,97,.055); }
        }

        .image-modal {
          position: fixed;
          z-index: 600;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 25px;
          background: rgba(4,4,3,.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: modalIn .25s ease;
        }

        .image-modal-inner {
          width: min(1200px, 100%);
          position: relative;
          border: 1px solid var(--line-strong);
          background: var(--bg);
          box-shadow: 0 30px 100px rgba(0,0,0,.55);
        }

        .image-modal-stage {
          position: relative;
          display: grid;
          place-items: center;
          min-height: min(70vh, 760px);
          padding: 20px;
          background: #050504;
          overflow: hidden;
        }

        .image-modal-stage img {
          display: block;
          max-width: 100%;
          max-height: 68vh;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .modal-media-arrow {
          position: absolute;
          top: 50%;
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          background: rgba(9,9,8,.76);
          color: var(--text);
          font: 300 30px/1 Manrope, sans-serif;
          cursor: pointer;
          transform: translateY(-50%);
          transition: background .25s ease, border-color .25s ease;
        }

        .modal-media-arrow:hover {
          border-color: var(--gold);
          background: rgba(196,154,97,.12);
        }

        .modal-media-prev { left: 18px; }
        .modal-media-next { right: 18px; }

        .image-modal-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 12px 15px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font: 9px "DM Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        /* ================================================
           CASE STUDY
        ================================================ */

        .case-study {
          display: grid;
          grid-template-columns: .75fr 1.25fr;
          gap: 70px;
          margin-top: 55px;
        }

        .case-copy h3 {
          margin: 0;
          font-size: 27px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -.04em;
        }

        .case-copy p {
          margin: 17px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .case-block {
          padding-bottom: 29px;
          margin-bottom: 29px;
          border-bottom: 1px solid var(--line);
        }

        .case-block:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: 0;
        }

        .case-label {
          color: var(--gold);
          font: 500 9px "DM Mono", monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .case-block p {
          margin: 10px 0 0;
          color: var(--soft);
          font-size: 14px;
          line-height: 1.8;
        }

        /* ================================================
           PIPELINE
        ================================================ */

        .pipeline {
          margin-top: 48px;
          border: 1px solid var(--line);
          background: var(--bg-soft);
        }

        .pipeline-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 15px 17px;
          border-bottom: 1px solid var(--line);
        }

        .pipeline-title,
        .pipeline-note {
          font: 9px "DM Mono", monospace;
          letter-spacing: .08em;
        }

        .pipeline-title {
          color: var(--gold);
        }

        .pipeline-note {
          color: var(--dim);
        }

        .pipeline-flow {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .pipeline-step {
          position: relative;
          min-height: 135px;
          padding: 18px 14px;
          border-right: 1px solid var(--line);
          transition: background .3s ease;
        }

        .pipeline-step:hover {
          background: rgba(196,154,97,.025);
        }

        .pipeline-step:last-child {
          border-right: 0;
        }

        .pipeline-step:not(:last-child)::after {
          content: "→";
          position: absolute;
          right: -6px;
          top: 50%;
          z-index: 2;
          color: var(--gold);
          background: var(--bg-soft);
          transform: translateY(-50%);
          font: 10px "DM Mono", monospace;
        }

        .pipeline-step small {
          color: var(--dim);
          font: 9px "DM Mono", monospace;
        }

        .pipeline-step strong {
          display: block;
          margin-top: 21px;
          font-size: 12px;
        }

        .pipeline-step span {
          display: block;
          margin-top: 7px;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.5;
        }

        /* ================================================
           ARCHITECTURE
        ================================================ */

        .architecture-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }

        .architecture-card {
          min-height: 300px;
          padding: 28px 25px;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          transition:
            background .3s ease,
            transform .3s ease;
        }

        .architecture-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .45s ease;
        }

        .architecture-card:hover {
          background: var(--panel);
        }

        .architecture-card:hover::after {
          transform: scaleX(1);
        }

        .architecture-number {
          color: var(--gold);
          font: 500 10px "DM Mono", monospace;
        }

        .architecture-card h3 {
          margin: 70px 0 12px;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -.025em;
        }

        .architecture-card p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }

        .decision-list {
          margin-top: 34px;
          border-top: 1px solid var(--line);
        }

        .decision {
          border-bottom: 1px solid var(--line);
        }

        .decision-button {
          width: 100%;
          min-height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 0;

          border: 0;
          background: transparent;
          color: var(--text);

          text-align: left;
          cursor: pointer;
        }

        .decision-button span:first-child {
          font: 500 11px "DM Mono", monospace;
        }

        .decision-button span:last-child {
          color: var(--gold);
          font-size: 20px;
          font-weight: 300;
        }

        .decision-content {
          max-width: 780px;
          padding: 0 0 26px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          animation: decisionIn .25s ease;
        }

        @keyframes decisionIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ================================================
           SECURITY
        ================================================ */

        .security-layout {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 70px;
        }

        .security-title {
          max-width: 540px;
          margin: 0;
          font-size: clamp(32px, 4vw, 51px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -.05em;
        }

        .security-intro {
          max-width: 510px;
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .security-boundary {
          margin-top: 28px;
          padding: 18px 19px;
          border-left: 2px solid var(--gold);
          background: rgba(196,154,97,.035);
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }

        .security-boundary strong {
          color: var(--text);
        }

        .security-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .security-item {
          padding: 18px;
          background: var(--bg);
          color: var(--muted);
          font: 9px/1.5 "DM Mono", monospace;
          transition:
            color .25s ease,
            background .25s ease;
        }

        .security-item:hover {
          background: var(--panel);
          color: var(--soft);
        }

        .security-item::before {
          content: "✓";
          margin-right: 9px;
          color: var(--gold);
        }

        /* ================================================
           ENGINEERING
        ================================================ */

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .proof-card {
          min-height: 245px;
          padding: 28px 24px;
          background: var(--bg);
          transition: background .3s ease;
        }

        .proof-card:hover {
          background: var(--panel);
        }

        .proof-number {
          color: var(--gold);
          font: 500 10px "DM Mono", monospace;
        }

        .proof-card h3 {
          margin: 60px 0 11px;
          font-size: 18px;
          letter-spacing: -.03em;
        }

        .proof-card p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          margin-top: 42px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .skill-card {
          padding: 29px;
          background: var(--bg);
          min-height: 210px;
          transition:
            background .3s ease,
            transform .3s ease;
        }

        .skill-card:hover {
          background: var(--panel);
        }

        .skill-card h3 {
          margin: 0;
          font-size: 18px;
        }

        .skill-description {
          max-width: 490px;
          margin: 10px 0 20px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* ================================================
           EXPERIENCE
        ================================================ */

        .experience-list {
          border-top: 1px solid var(--line);
        }

        .experience-item {
          display: grid;
          grid-template-columns: 190px minmax(0,1fr);
          gap: 55px;
          padding: 41px 0;
          border-bottom: 1px solid var(--line);
        }

        .experience-period {
          color: var(--gold);
          font: 10px "DM Mono", monospace;
        }

        .experience-type {
          margin-top: 8px;
          color: var(--dim);
          font: 8px "DM Mono", monospace;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .experience-company {
          margin: 0;
          font-size: 25px;
          letter-spacing: -.035em;
        }

        .experience-role {
          margin: 6px 0 17px;
          color: var(--gold-light);
          font: 10px "DM Mono", monospace;
        }

        .experience-description {
          max-width: 800px;
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
        }

        /* ================================================
           PROJECTS
        ================================================ */

        .project-list {
          border-top: 1px solid var(--line);
        }

        .project-row {
          display: grid;
          grid-template-columns: 165px minmax(0,1fr) 250px;
          gap: 32px;
          align-items: center;
          padding: 26px 0;
          border-bottom: 1px solid var(--line);
          transition:
            padding .3s ease;
        }

        .project-row:hover {
          padding-left: 8px;
        }

        .project-category {
          color: var(--gold);
          font: 9px "DM Mono", monospace;
          letter-spacing: .08em;
        }

        .project-main {
          display: grid;
          grid-template-columns: 1fr;
        }

        .project-row h3 {
          margin: 0;
          font-size: 19px;
          letter-spacing: -.03em;
        }

        .project-row p {
          max-width: 700px;
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .project-image {
          width: 100%;
          height: 75px;
          min-height: 0;
        }

        .project-image img {
          min-height: 75px;
        }

        .project-image .image-fallback {
          flex-direction: row;
          gap: 8px;
        }

        .project-image .image-fallback small {
          margin: 0;
        }

        .project-actions {
          display: flex;
          justify-content: flex-end;
          gap: 7px;
        }

        .mini-button {
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 9px;

          border: 1px solid var(--line);
          color: var(--muted);

          font: 9px "DM Mono", monospace;

          transition:
            color .25s ease,
            border-color .25s ease,
            transform .25s ease;
        }

        .mini-button:hover {
          color: var(--gold-light);
          border-color: var(--gold);
          transform: translateY(-1px);
        }

        .mini-button svg {
          width: 11px;
          height: 11px;
        }

        /* ================================================
           ABOUT
        ================================================ */

        .about-grid {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 80px;
        }

        .about-title {
          margin: 0;
          font-size: clamp(35px, 4.7vw, 58px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -.055em;
        }

        .about-text {
          max-width: 680px;
          margin: 21px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .toolkit {
          border-top: 1px solid var(--line);
        }

        .tool-row {
          padding: 17px 0;
          border-bottom: 1px solid var(--line);
        }

        .tool-label {
          margin-bottom: 7px;
          color: var(--gold);
          font: 500 9px "DM Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .tool-value {
          color: var(--soft);
          font-size: 12px;
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
          padding: 29px;
          background: var(--bg);
          transition: background .3s ease;
        }

        .credential:hover {
          background: var(--panel);
        }

        .credential-label {
          color: var(--gold);
          font: 500 9px "DM Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .credential h3 {
          margin: 22px 0 7px;
          font-size: 18px;
        }

        .credential p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        /* ================================================
           CONTACT
        ================================================ */

        .contact {
          position: relative;
          overflow: hidden;
          padding: 135px 0;
          border-top: 1px solid var(--line);

          background:
            radial-gradient(
              circle at 80% 45%,
              rgba(196,154,97,.075),
              transparent 30rem
            ),
            var(--bg-soft);
        }

        .contact::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          right: -400px;
          top: -300px;
          border-radius: 50%;
          border: 1px solid rgba(196,154,97,.06);
          box-shadow:
            0 0 0 80px rgba(196,154,97,.008),
            0 0 0 160px rgba(196,154,97,.005);
          animation: contactOrbit 16s linear infinite;
        }

        @keyframes contactOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .contact h2 {
          position: relative;
          z-index: 2;

          max-width: 900px;
          margin: 0;

          font-size: clamp(47px, 7vw, 88px);
          line-height: .93;
          font-weight: 800;
          letter-spacing: -.07em;
        }

        .contact h2 em {
          color: var(--gold);
          font-style: normal;
        }

        .contact-copy {
          position: relative;
          z-index: 2;

          max-width: 620px;
          margin: 25px 0 30px;

          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .contact-links {
          position: relative;
          z-index: 2;

          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .availability {
          position: relative;
          z-index: 2;

          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-top: 25px;

          color: var(--muted);
          font: 9px "DM Mono", monospace;
        }

        .availability::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--green);
          box-shadow:
            0 0 0 4px rgba(168,201,154,.07);
          animation: statusPulse 2.5s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(168,201,154,.07);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(168,201,154,.025);
          }
        }

        /* ================================================
           FOOTER
        ================================================ */

        footer {
          padding: 26px 0;
          border-top: 1px solid var(--line);
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: var(--dim);
          font: 9px "DM Mono", monospace;
        }

        .footer-links {
          display: flex;
          gap: 18px;
        }

        .footer-links a {
          transition: color .25s ease;
        }

        .footer-links a:hover {
          color: var(--gold);
        }

        /* ================================================
           VIDEO MODAL
        ================================================ */

        .video-modal {
          position: fixed;
          z-index: 500;
          inset: 0;

          display: grid;
          place-items: center;

          padding: 25px;

          background: rgba(4,4,3,.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          animation: modalIn .25s ease;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .video-modal-inner {
          width: min(1000px, 100%);
          position: relative;
          border: 1px solid var(--line-strong);
          background: var(--bg);
          box-shadow:
            0 30px 100px rgba(0,0,0,.55);
        }

        .modal-video {
          display: block;
          width: 100%;
          max-height: 75vh;
          background: #050504;
        }

        .modal-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          border-bottom: 1px solid var(--line);
        }

        .modal-top span {
          color: var(--gold);
          font: 9px "DM Mono", monospace;
          letter-spacing: .1em;
        }

        .modal-close {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;

          border: 1px solid var(--line);
          background: transparent;
          color: var(--text);
          cursor: pointer;
        }

        .modal-close:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 1000px) {

          .nav-links {
            gap: 15px;
          }

          .section-header {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .scale-top {
            grid-template-columns: 1fr;
          }

          .scale-copy {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .architecture-grid {
            grid-template-columns: 1fr 1fr;
          }

          .proof-grid {
            grid-template-columns: 1fr 1fr;
          }

          .security-layout {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .project-row {
            grid-template-columns: 145px minmax(0,1fr);
          }

          .project-actions {
            grid-column: 2;
            justify-content: flex-start;
          }

          .project-image {
            display: none;
          }

          .pipeline-flow {
            grid-template-columns: repeat(4,1fr);
          }

          .pipeline-step:nth-child(4) {
            border-right: 0;
          }

          .pipeline-step:nth-child(-n+4) {
            border-bottom: 1px solid var(--line);
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 700px) {

          :root {
            --nav: 64px;
          }

          .container {
            width: min(
              var(--max),
              calc(100% - 30px)
            );
          }

          .nav-links {
            display: none;
          }

          .menu-button {
            display: grid;
            place-items: center;
          }

          .mobile-menu {
            display: grid;
            padding: 9px 0 15px;
            border-top: 1px solid var(--line);
            background: rgba(9,9,8,.97);
            animation: mobileMenuIn .2s ease;
          }

          @keyframes mobileMenuIn {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .mobile-menu a {
            padding: 13px 0;
            border-bottom: 1px solid rgba(196,154,97,.07);
            color: var(--muted);
            font: 10px "DM Mono", monospace;
            letter-spacing: .06em;
            text-transform: uppercase;
          }

          .mobile-menu a:last-child {
            border-bottom: 0;
          }

          .hero {
            min-height: auto;
            padding: 125px 0 70px;
          }

          .hero h1 {
            font-size: clamp(
              46px,
              13vw,
              70px
            );
          }

          .hero-subtitle {
            font-size: 15px;
          }

          .hero-proof {
            grid-template-columns: 1fr 1fr;
            margin-top: 50px;
          }

          .proof-stat:nth-child(2) {
            border-right: 0;
          }

          .proof-stat:nth-child(-n+2) {
            border-bottom: 1px solid var(--line);
          }

          .proof-stat {
            min-height: 88px;
            padding: 15px;
          }

          .proof-stat strong {
            font-size: 17px;
          }

          .hero-actions .button {
            flex: 1 1 calc(50% - 8px);
          }

          .section {
            padding: 82px 0;
          }

          .section-title {
            font-size: clamp(35px, 11vw, 53px);
          }

          .scale-copy {
            padding: 29px 20px;
          }

          .scale-name {
            font-size: clamp(
              58px,
              20vw,
              84px
            );
          }

          .scale-summary {
            font-size: 14px;
          }

          .scale-metrics {
            grid-template-columns: 1fr 1fr;
          }

          .metric {
            min-height: 135px;
            padding: 20px 17px;
          }

          .metric-value {
            font-size: 25px;
          }

          .scale-media {
            grid-template-columns: 1fr;
          }

          .image-gallery,
          .video-panel {
            aspect-ratio: 16 / 9;
          }

          .gallery-arrow {
            opacity: 1;
          }

          .gallery-overlay {
            min-height: 50px;
            padding: 11px 12px;
          }

          .gallery-dots {
            display: none;
          }

          .image-modal {
            padding: 10px;
          }

          .image-modal-stage {
            min-height: 60vh;
            padding: 10px;
          }

          .image-modal-stage img {
            max-height: 60vh;
          }

          .modal-media-prev { left: 8px; }
          .modal-media-next { right: 8px; }

          .pipeline-flow {
            grid-template-columns: 1fr;
          }

          .pipeline-step {
            min-height: auto;
            border-right: 0 !important;
            border-bottom: 1px solid var(--line);
          }

          .pipeline-step:last-child {
            border-bottom: 0;
          }

          .pipeline-step:not(:last-child)::after {
            content: "↓";
            right: auto;
            left: 50%;
            top: auto;
            bottom: -7px;
            transform: translateX(-50%);
          }

          .architecture-grid,
          .proof-grid,
          .skills-grid {
            grid-template-columns: 1fr;
          }

          .architecture-card {
            min-height: 225px;
          }

          .architecture-card h3 {
            margin-top: 45px;
          }

          .security-grid {
            grid-template-columns: 1fr;
          }

          .experience-item {
            grid-template-columns: 1fr;
            gap: 11px;
            padding: 32px 0;
          }

          .experience-company {
            font-size: 23px;
          }

          .project-row {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 25px 0;
          }

          .project-actions {
            grid-column: auto;
          }

          .about-grid {
            gap: 48px;
          }

          .credentials {
            grid-template-columns: 1fr;
          }

          .contact {
            padding: 92px 0;
          }

          .contact h2 {
            font-size: clamp(
              45px,
              14vw,
              70px
            );
          }

          .contact-links .button {
            flex: 1 1 calc(50% - 8px);
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 430px) {

          .hero-actions .button,
          .contact-links .button {
            flex-basis: 100%;
          }

          .hero-proof {
            grid-template-columns: 1fr;
          }

          .proof-stat,
          .proof-stat:nth-child(2) {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .proof-stat:last-child {
            border-bottom: 0;
          }

          .scale-metrics {
            grid-template-columns: 1fr;
          }

          .metric,
          .metric:nth-child(2n) {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .metric:last-child {
            border-bottom: 0;
          }

          .pipeline-header {
            flex-direction: column;
            gap: 7px;
          }
        }

        /* ================================================
           REDUCED MOTION
        ================================================ */

        @media (prefers-reduced-motion: reduce) {

          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation: none !important;
            transition-duration: .01ms !important;
          }

          .reveal,
          .reveal.visible {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

      `}</style>

      <div className="site" id="top">

        {/* =====================================================
            NAV
        ===================================================== */}

        <header className="nav">

          <div className="container nav-inner">

            <a
              className="brand"
              href="#top"
              onClick={closeMenu}
              aria-label="Back to top"
            >
              <span className="brand-mark">MG</span>
              <span>{PROFILE.name}</span>
            </a>

            <nav
              className="nav-links"
              aria-label="Primary navigation"
            >
              {nav.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    activeSection === id
                      ? "active"
                      : ""
                  }
                >
                  {label}
                </a>
              ))}

              <a
                className="nav-resume"
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </nav>

            <button
              className="menu-button"
              type="button"
              onClick={() =>
                setMenuOpen((value) => !value)
              }
              aria-expanded={menuOpen}
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
            >
              {menuOpen ? "×" : "☰"}
            </button>

          </div>

          {menuOpen && (
            <nav
              className="container mobile-menu"
              aria-label="Mobile navigation"
            >
              {nav.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}

              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Resume
              </a>
            </nav>
          )}

        </header>

        <main>

          {/* =====================================================
              HERO
          ===================================================== */}

          <section
            className="hero"
            aria-labelledby="hero-title"
          >

            <div className="hero-grid" />
            <div className="hero-glow" />

            <div className="container">

              <div className="hero-content">

                <Reveal>

                  <div className="hero-top-row">
                    <button 
                      className="hero-avatar" 
                      onClick={() => setAvatarOpen(true)}
                      aria-label="View profile picture"
                    >
                      <div className="avatar-ring">
                        {!avatarFailed ? (
                          <img 
                            src="./images/profile.png" 
                            alt="Mostafa Goda" 
                            onError={() => setAvatarFailed(true)}
                          />
                        ) : (
                          <div className="avatar-fallback">MG</div>
                        )}
                      </div>
                    </button>
                    
                    <div className="hero-kicker">
                      {PROFILE.title} ·{" "}
                      {PROFILE.positioning}
                    </div>
                  </div>

                  <h1 id="hero-title">
                    I build{" "}
                    <em>backend systems</em>{" "}
                    and secure software platforms.
                  </h1>

                  <p className="hero-subtitle">
                    Software engineer focused on{" "}
                    <strong>
                      backend architecture, secure
                      execution and infrastructure
                    </strong>
                    , with the ability to work across
                    the stack when the system requires it.
                  </p>

                  <div className="hero-actions">

                    <Button
                      href="#work"
                      primary
                    >
                      View flagship system
                      <ArrowIcon />
                    </Button>

                    <Button
                      href={`tel:${PROFILE.phone}`}
                    >
                      <PhoneIcon />
                      {PROFILE.phone}
                    </Button>

                    <Button
                      href={PROFILE.github}
                      external
                    >
                      <GithubIcon />
                      GitHub
                    </Button>

                    <Button
                      href={PROFILE.resume}
                      external
                    >
                      <DownloadIcon />
                      Resume
                    </Button>

                  </div>

                  <div
                    className="hero-proof"
                    aria-label="Selected engineering evidence"
                  >

                    <div className="proof-stat">
                      <strong>2026</strong>
                      <span>
                        Computer Science graduate
                      </span>
                    </div>

                    <div className="proof-stat">
                      <strong>5+ yrs</strong>
                      <span>
                        Real-world business &
                        operations
                      </span>
                    </div>

                    <div className="proof-stat">
                      <strong>10</strong>
                      <span>
                        Sandboxed security labs
                      </span>
                    </div>

                    <div className="proof-stat">
                      <strong>128</strong>
                      <span>
                        Documented SCALE API routes
                      </span>
                    </div>

                  </div>

                </Reveal>

              </div>

            </div>

          </section>

          {/* =====================================================
              WORK
          ===================================================== */}

          <section
            className="section"
            id="work"
            aria-labelledby="work-title"
          >

            <div className="container">

              <Reveal>

                <div className="section-header">

                  <div>
                    <p className="eyebrow">
                      SELECTED WORK
                    </p>

                    <h2
                      className="section-title"
                      id="work-title"
                    >
                      One flagship system.
                      <br />
                      Real engineering depth.
                    </h2>
                  </div>

                  <p className="section-intro">
                    SCALE is the strongest evidence
                    of my systems, backend and security
                    work. The portfolio keeps it at the
                    center rather than burying it under
                    a long project list.
                  </p>

                </div>

              </Reveal>

              <Reveal>

                <article className="scale-card">

                  <div className="scale-top">

                    <div className="scale-copy">

                      <div className="scale-label">
                        Flagship engineering case study
                      </div>

                      <h3 className="scale-name">
                        {SCALE.name}
                      </h3>

                      <div className="scale-fullname">
                        {SCALE.fullName}
                      </div>

                      <p className="scale-summary">
                        {SCALE.summary}
                      </p>

                      <div className="scale-actions">

                        <Button
                          href={SCALE.repo}
                          primary
                          external
                        >
                          Source code
                          <ExternalIcon />
                        </Button>

                        <Button href="#architecture">
                          Architecture
                          <ArrowIcon />
                        </Button>

                        <Button
                          onClick={() =>
                            setVideoOpen(true)
                          }
                        >
                          Watch preview
                          <PlayIcon />
                        </Button>

                      </div>

                      <div
                        className="tag-list"
                        aria-label="SCALE technology stack"
                      >
                        {SCALE.stack.map((item) => (
                          <span
                            className="tag"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                    </div>

                    <div className="scale-metrics">

                      {SCALE.metrics.map(
                        ([value, label]) => (
                          <div
                            className="metric"
                            key={label}
                          >
                            <div className="metric-value">
                              {value}
                            </div>

                            <div className="metric-label">
                              {label}
                            </div>
                          </div>
                        )
                      )}

                    </div>

                  </div>

                </article>

              </Reveal>

              {/* MEDIA */}

              <Reveal delay={90}>

                <div className="scale-media">

                  <ImageGallery
                    onOpen={(index) => {
                      setImageIndex(index);
                      setImageOpen(true);
                    }}
                  />

                  <VideoPanel
                    onOpen={() =>
                      setVideoOpen(true)
                    }
                  />

                </div>

              </Reveal>

              {/* CASE STUDY */}

              <Reveal delay={100}>

                <div className="case-study">

                  <div className="case-copy">

                    <p className="eyebrow">
                      ENGINEERING CASE STUDY
                    </p>

                    <h3>
                      Problem → boundary →
                      implementation.
                    </h3>

                    <p>
                      SCALE was engineered as a
                      complete platform rather than a
                      collection of isolated features.
                      Its central challenge was safely
                      executing and validating untrusted
                      learner code while keeping the
                      application, persistence and user
                      sessions isolated from execution
                      failures.
                    </p>

                  </div>

                  <div>

                    <div className="case-block">

                      <div className="case-label">
                        01 · Problem
                      </div>

                      <p>
                        {SCALE.problem}
                      </p>

                    </div>

                    <div className="case-block">

                      <div className="case-label">
                        02 · Solution
                      </div>

                      <p>
                        {SCALE.solution}
                      </p>

                    </div>

                    <div className="case-block">

                      <div className="case-label">
                        03 · Engineering result
                      </div>

                      <p>
                        The implementation satisfied
                        all 32 functional and 16
                        non-functional requirements
                        verified during evaluation.
                        User evaluation scores ranged
                        from 4.1 to 4.5 out of 5.
                      </p>

                    </div>

                  </div>

                </div>

              </Reveal>

              {/* PIPELINE */}

              <Reveal delay={130}>

                <div className="pipeline">

                  <div className="pipeline-header">

                    <span className="pipeline-title">
                      CORE EXECUTION PIPELINE
                    </span>

                    <span className="pipeline-note">
                      UNTRUSTED CODE → VALIDATED RESULT
                    </span>

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
                    ].map(
                      ([number, title, text]) => (
                        <div
                          className="pipeline-step"
                          key={number}
                        >
                          <small>{number}</small>
                          <strong>{title}</strong>
                          <span>{text}</span>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </Reveal>

            </div>

          </section>

          {/* =====================================================
              ARCHITECTURE
          ===================================================== */}

          <section
            className="section"
            id="architecture"
            aria-labelledby="architecture-title"
          >

            <div className="container">

              <Reveal>

                <div className="section-header">

                  <div>

                    <p className="eyebrow">
                      SYSTEM DESIGN
                    </p>

                    <h2
                      className="section-title"
                      id="architecture-title"
                    >
                      Architecture is a
                      <br />
                      decision, not a diagram.
                    </h2>

                  </div>

                  <p className="section-intro">
                    The useful part of architecture is
                    the reasoning behind the boundaries.
                    This section exposes the decisions an
                    engineering interviewer is likely to
                    ask about.
                  </p>

                </div>

              </Reveal>

              <div className="architecture-grid">

                {SCALE.architecture.map(
                  (item, index) => (
                    <Reveal
                      key={item.number}
                      delay={index * 60}
                    >
                      <article className="architecture-card">

                        <span className="architecture-number">
                          {item.number}
                        </span>

                        <h3>{item.title}</h3>

                        <p>{item.text}</p>

                      </article>
                    </Reveal>
                  )
                )}

              </div>

              <Reveal delay={100}>

                <div className="decision-list">

                  {SCALE.decisions.map(
                    (decision, index) => {

                      const open =
                        decisionOpen === index;

                      return (
                        <div
                          className="decision"
                          key={decision.title}
                        >

                          <button
                            className="decision-button"
                            type="button"
                            aria-expanded={open}
                            onClick={() =>
                              setDecisionOpen(
                                open
                                  ? null
                                  : index
                              )
                            }
                          >

                            <span>
                              {decision.title}
                            </span>

                            <span>
                              {open ? "−" : "+"}
                            </span>

                          </button>

                          {open && (
                            <div className="decision-content">
                              {decision.text}
                            </div>
                          )}

                        </div>
                      );
                    }
                  )}

                </div>

              </Reveal>

            </div>

          </section>

          {/* =====================================================
              SECURITY
          ===================================================== */}

          <section
            className="section"
            aria-labelledby="security-title"
          >

            <div className="container">

              <div className="security-layout">

                <Reveal>

                  <div>

                    <p className="eyebrow">
                      SECURITY ENGINEERING
                    </p>

                    <h2
                      className="security-title"
                      id="security-title"
                    >
                      Security is part of
                      the system boundary.
                    </h2>

                    <p className="security-intro">
                      SCALE treats learner submissions
                      as untrusted input and routes
                      remediation through a separate
                      execution environment rather than
                      executing it directly inside the
                      main application process.
                    </p>

                    <div className="security-boundary">

                      <strong>
                        Important boundary:
                      </strong>{" "}
                      Docker is not presented here as a
                      magical perfect security boundary.
                      The reference deployment still
                      shares the host kernel and requires
                      Docker access. Stronger production
                      isolation would require additional
                      hardening or stronger sandbox
                      technology.

                    </div>

                  </div>

                </Reveal>

                <Reveal delay={90}>

                  <div className="security-grid">

                    {SCALE.controls.map((item) => (
                      <div
                        className="security-item"
                        key={item}
                      >
                        {item}
                      </div>
                    ))}

                  </div>

                </Reveal>

              </div>

            </div>

          </section>

          {/* =====================================================
              ENGINEERING
          ===================================================== */}

          <section
            className="section"
            id="engineering"
            aria-labelledby="engineering-title"
          >

            <div className="container">

              <Reveal>

                <div className="section-header">

                  <div>

                    <p className="eyebrow">
                      ENGINEERING EVIDENCE
                    </p>

                    <h2
                      className="section-title"
                      id="engineering-title"
                    >
                      What I can prove,
                      <br />
                      not just what I can list.
                    </h2>

                  </div>

                  <p className="section-intro">
                    Technologies are supporting
                    evidence. The stronger signal is the
                    ability to reason about architecture,
                    failure, security and delivery.
                  </p>

                </div>

              </Reveal>

              <div className="proof-grid">

                {[
                  [
                    "01",
                    "Architecture decisions",
                    "Explain why a system is shaped the way it is—not merely which frameworks were used.",
                  ],
                  [
                    "02",
                    "Security boundaries",
                    "Model untrusted inputs and isolate high-risk execution paths rather than treating security as a final checklist.",
                  ],
                  [
                    "03",
                    "Engineering practice",
                    "Apply structured problem decomposition, technical research, formal UML/SRS documentation and testing methodologies.",
                  ],
                  [
                    "04",
                    "Real-world ownership",
                    "Professional responsibility outside university adds evidence of judgment, communication and operational ownership.",
                  ],
                ].map(
                  ([number, title, text], index) => (
                    <Reveal
                      key={number}
                      delay={index * 55}
                    >
                      <article className="proof-card">

                        <span className="proof-number">
                          {number}
                        </span>

                        <h3>{title}</h3>

                        <p>{text}</p>

                      </article>
                    </Reveal>
                  )
                )}

              </div>

              <div className="skills-grid">

                {SKILLS.map((skill, index) => (
                  <Reveal
                    key={skill.title}
                    delay={index * 45}
                  >

                    <article className="skill-card">

                      <h3>{skill.title}</h3>

                      <p className="skill-description">
                        {skill.description}
                      </p>

                      <div className="skill-tags">

                        {skill.items.map((item) => (
                          <span
                            className="tag"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}

                      </div>

                    </article>

                  </Reveal>
                ))}

              </div>

            </div>

          </section>

          {/* =====================================================
              EXPERIENCE
          ===================================================== */}

          <section
            className="section"
            id="experience"
            aria-labelledby="experience-title"
          >

            <div className="container">

              <Reveal>

                <div className="section-header">

                  <div>

                    <p className="eyebrow">
                      PROFESSIONAL EXPERIENCE
                    </p>

                    <h2
                      className="section-title"
                      id="experience-title"
                    >
                      Software engineer.
                      <br />
                      Real-world responsibility.
                    </h2>

                  </div>

                  <p className="section-intro">
                    Graduation is not the entire story.
                    Professional responsibility,
                    technical judgment and working with
                    real organizations are part of the
                    engineering profile.
                  </p>

                </div>

              </Reveal>

              <div className="experience-list">

                {EXPERIENCE.map(
                  (item, index) => (
                    <Reveal
                      key={`${item.company}-${item.period}`}
                      delay={index * 65}
                    >

                      <article className="experience-item">

                        <div>

                          <div className="experience-period">
                            {item.period}
                          </div>

                          <div className="experience-type">
                            {item.type}
                          </div>

                        </div>

                        <div>

                          <h3 className="experience-company">
                            {item.company}
                          </h3>

                          <p className="experience-role">
                            {item.role}
                          </p>

                          <p className="experience-description">
                            {item.description}
                          </p>

                          <div className="tag-list">

                            {item.tags.map((tag) => (
                              <span
                                className="tag"
                                key={tag}
                              >
                                {tag}
                              </span>
                            ))}

                          </div>

                        </div>

                      </article>

                    </Reveal>
                  )
                )}

              </div>

            </div>

          </section>

          {/* =====================================================
              PROJECTS
          ===================================================== */}

          <section
            className="section"
            id="projects"
            aria-labelledby="projects-title"
          >

            <div className="container">

              <Reveal>

                <div className="section-header">

                  <div>

                    <p className="eyebrow">
                      ADDITIONAL ENGINEERING WORK
                    </p>

                    <h2
                      className="section-title"
                      id="projects-title"
                    >
                      Supporting evidence,
                      <br />
                      not project inflation.
                    </h2>

                  </div>

                  <p className="section-intro">
                    Secondary projects stay intentionally
                    smaller. SCALE remains the primary
                    technical story.
                  </p>

                </div>

              </Reveal>

              <div className="project-list">

                {PROJECTS.map(
                  (project, index) => (
                    <Reveal
                      key={project.title}
                      delay={index * 50}
                    >

                      <article className="project-row">

                        <div className="project-category">
                          {project.category}
                        </div>

                        <div className="project-main">

                          <h3>
                            {project.title}
                          </h3>

                          <p>
                            {project.description}
                          </p>

                        </div>

                        <div className="project-actions">

                          {project.repo && (
                            <a
                              className="mini-button"
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Source
                              <ExternalIcon />
                            </a>
                          )}

                         
                        </div>

                      </article>

                    </Reveal>
                  )
                )}

              </div>

            </div>

          </section>

          {/* =====================================================
              ABOUT
          ===================================================== */}

          <section
            className="section"
            id="about"
            aria-labelledby="about-title"
          >

            <div className="container">

              <div className="about-grid">

                <Reveal>

                  <div>

                    <p className="eyebrow">
                      ABOUT
                    </p>

                    <h2
                      className="about-title"
                      id="about-title"
                    >
                      Understand the problem.
                      <br />
                      Design the boundary.
                      <br />
                      Build the system.
                    </h2>

                    <p className="about-text">
                      I am a Software Engineer with a
                      strong foundation in backend
                      engineering, software architecture,
                      cybersecurity and full-stack
                      development, complemented by
                      several years of real-world
                      experience in industrial automation,
                      technical procurement and
                      operations.
                    </p>

                    <p className="about-text">
                      My strongest technical experience
                      comes from developing SCALE, a
                      security-focused platform combining
                      containerized services, isolated
                      execution of untrusted code,
                      application security, SAST,
                      dependency vulnerability scanning,
                      AI integration, databases and
                      full-stack functionality.
                    </p>

                    <p className="about-text">
                      I am particularly strong at
                      understanding complex systems,
                      integrating multiple technologies,
                      troubleshooting difficult technical
                      problems and translating requirements
                      into practical implementations.
                    </p>

                  </div>

                </Reveal>

                <Reveal delay={100}>

                  <div>

                    <p className="eyebrow">
                      CORE TOOLKIT & SKILLS
                    </p>

                    <div className="toolkit">

                      {TOOLKIT.map(
                        ([label, value]) => (
                          <div
                            className="tool-row"
                            key={label}
                          >

                            <div className="tool-label">
                              {label}
                            </div>

                            <div className="tool-value">
                              {value}
                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </Reveal>

              </div>

              <Reveal delay={100}>

                <div style={{ marginTop: "78px" }}>

                  <p className="eyebrow">
                    EDUCATION & CREDENTIALS
                  </p>

                  <div className="credentials">

                    <article className="credential">

                      <div className="credential-label">
                        Credential
                      </div>

                      <h3>
                        B.Sc. Computer Science
                      </h3>

                      <p>
                        Misr International University
                      </p>

                      <p style={{ marginTop: "8px" }}>
                        Graduated June 2026. Foundation
                        in software architecture,
                        requirements engineering,
                        relational database design and
                        algorithmic problem solving.
                      </p>

                    </article>

                    <article className="credential">

                      <div className="credential-label">
                        Credential
                      </div>

                      <h3>
                        Minor in Software Engineering
                      </h3>

                      <p>
                        Misr International University
                      </p>

                      <p style={{ marginTop: "8px" }}>
                        Coursework centered on software
                        architecture, formal requirements
                        engineering, Agile/Scrum,
                        quality assurance and testing.
                      </p>

                    </article>

                  </div>

                </div>

              </Reveal>

            </div>

          </section>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <section
            className="contact"
            id="contact"
            aria-labelledby="contact-title"
          >

            <div className="container">

              <Reveal>

                <p className="eyebrow">
                  CONTACT
                </p>

                <h2 id="contact-title">
                  Building software
                  <br />
                  <em>worth engineering.</em>
                </h2>

                <p className="contact-copy">
                  Open to software engineering
                  opportunities across backend,
                  full-stack, systems, platform and
                  security-oriented roles.
                </p>

                <div className="contact-links">

                  <Button
                    href={`mailto:${PROFILE.email}`}
                    primary
                  >
                    <MailIcon />
                    Email me
                  </Button>

                  <Button
                    href={`tel:${PROFILE.phone}`}
                  >
                    <PhoneIcon />
                    {PROFILE.phone}
                  </Button>

                  <Button
                    href={PROFILE.github}
                    external
                  >
                    <GithubIcon />
                    GitHub
                  </Button>

                  <Button
                    href={PROFILE.linkedin}
                    external
                  >
                    <LinkedinIcon />
                    LinkedIn
                  </Button>

                  <Button
                    href={PROFILE.resume}
                    external
                  >
                    <DownloadIcon />
                    Resume
                  </Button>

                </div>

                <div className="availability">
                  {PROFILE.availability}
                </div>

              </Reveal>

            </div>

          </section>

        </main>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer>

          <div className="container footer-inner">

            <span>
              © 2026 {PROFILE.name} ·{" "}
              {PROFILE.title}
            </span>

            <div className="footer-links">

              <a href="#top">
                Back to top
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

            </div>

          </div>

        </footer>

      </div>

      {/* =====================================================
          IMAGE MODAL (For Gallery)
      ===================================================== */}

      {imageOpen && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${SCALE_GALLERY[imageIndex].label} image`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setImageOpen(false);
            }
          }}
        >
          <div className="image-modal-inner">
            <div className="modal-top">
              <span>
                SCALE · {SCALE_GALLERY[imageIndex].label.toUpperCase()}
              </span>

              <button
                className="modal-close"
                type="button"
                onClick={() => setImageOpen(false)}
                aria-label="Close image"
              >
                ×
              </button>
            </div>

            <div className="image-modal-stage">
              <img
                src={SCALE_GALLERY[imageIndex].src}
                alt={SCALE_GALLERY[imageIndex].alt}
              />

              <button
                type="button"
                className="modal-media-arrow modal-media-prev"
                onClick={() =>
                  setImageIndex((index) =>
                    (index - 1 + SCALE_GALLERY.length) % SCALE_GALLERY.length
                  )
                }
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                className="modal-media-arrow modal-media-next"
                onClick={() =>
                  setImageIndex((index) =>
                    (index + 1) % SCALE_GALLERY.length
                  )
                }
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="image-modal-footer">
              <span>{SCALE_GALLERY[imageIndex].label}</span>
              <span>
                {String(imageIndex + 1).padStart(2, "0")} / {String(SCALE_GALLERY.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          AVATAR MODAL
      ===================================================== */}

      {avatarOpen && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Profile picture"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setAvatarOpen(false);
            }
          }}
        >
          <div className="image-modal-inner" style={{ maxWidth: "500px" }}>
            <div className="modal-top">
              <span>
                PROFILE · {PROFILE.name.toUpperCase()}
              </span>

              <button
                className="modal-close"
                type="button"
                onClick={() => setAvatarOpen(false)}
                aria-label="Close profile picture"
              >
                ×
              </button>
            </div>

            <div className="image-modal-stage">
              <img
                src="./images/profile.png"
                alt={PROFILE.name}
                style={{
                  borderRadius: "50%",
                  width: "min(100%, 350px)",
                  aspectRatio: "1 / 1",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          VIDEO MODAL
      ===================================================== */}

      {videoOpen && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="SCALE marketing video"
          onClick={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setVideoOpen(false);
            }
          }}
        >

          <div className="video-modal-inner">

            <div className="modal-top">

              <span>
                SCALE · MARKETING PREVIEW
              </span>

              <button
                className="modal-close"
                type="button"
                onClick={() =>
                  setVideoOpen(false)
                }
                aria-label="Close video"
              >
                ×
              </button>

            </div>

            <video
              className="modal-video"
              controls
              autoPlay
              playsInline
              crossOrigin="anonymous"
              poster="./images/scale-poster.jpg"
            >
              <track
                kind="subtitles"
                src="./videos/scale-marketing.vtt"
                srcLang="en"
                label="English"
                default
              />
              <source
                src="./videos/scale-marketing.mp4"
                type="video/mp4"
              />

              Your browser does not support
              the video element.
            </video>

          </div>

        </div>
      )}

    </>
  );
}

export default App;
