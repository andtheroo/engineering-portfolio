import React, { useState, useMemo } from "react";
import {
  Menu, X, Download, Link, Mail,
  Cog, Cpu, Bot, Code2, FileText, ChevronRight, ExternalLink
} from "lucide-react";

/* =========================================================
   DESIGN TOKENS
   Change these to re-theme the whole site.
   ========================================================= */
const THEME = {
  void: "#0D0F11",     // page background
  panel: "#16191C",    // card / sidebar background
  panelLine: "#272B2F",// borders on dark panels
  ink: "#F3F1EA",      // primary text on dark
  steel: "#8A939B",    // secondary / muted text
  signal: "#F2B705",   // single accent: amber, used for CTAs + active states only
  paper: "#EDEBE4",    // light section background (Qualifications/Certs)
  paperInk: "#14161A", // text on light background
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

/* =========================================================
   CONTENT — placeholder data, meant to be edited
   ========================================================= */
const PROFILE = {
  name: "Jordan Ellis",
  titles: ["Systems Engineer", "Robotics Specialist", "SolidWorks / CAD"],
  years: "7",
  statement:
    "I design and build hardware that has to actually work — from CAD model to CNC toolpath to the firmware that drives it. Seven years across mechanical design, mechatronics, and robotics, on teams shipping physical products.",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resumeUrl: "#", // replace with a real link to your PDF resume
};

const CATEGORIES = [
  "All",
  "Mechanical Design",
  "Mechatronics",
  "Robotics",
  "Electronics",
  "Software",
  "Patents/Publications",
];

const CATEGORY_ICON = {
  "Mechanical Design": Cog,
  Mechatronics: Cog,
  Robotics: Bot,
  Electronics: Cpu,
  Software: Code2,
  "Patents/Publications": FileText,
};

const PROJECTS = [
  {
    id: "cnc-router",
    title: "Desktop CNC Router",
    categories: ["Mechanical Design", "Mechatronics"],
    year: "2024",
    role: "Design, machining, controller integration",
    summary:
      "A 3-axis desktop CNC router designed from scratch in CAD, machined on a manual mill, and driven by an open-source controller board.",
    specs: { Travel: "300 × 300 × 80 mm", Repeatability: "±0.1 mm", Frame: "Aluminum extrusion" },
    stack: ["Fusion 360", "GRBL", "NEMA 17 steppers"],
    highlights: [
      "Designed the full gantry and lead-screw assembly before cutting any material",
      "Tuned steps-per-mm and acceleration to eliminate resonance at cutting speed",
      "Wrote a custom G-code post-processor for a CAM tool without native controller support",
    ],
    links: { repo: "https://github.com/yourusername/cnc-router" },
  },
  {
    id: "robotic-arm",
    title: "Modular 5-DOF Robotic Arm",
    categories: ["Robotics", "Mechatronics"],
    year: "2024",
    role: "Mechanical design, kinematics, motor control",
    summary:
      "A desktop robotic arm with swappable end effectors, designed for reproducible pick-and-place demos in a university lab.",
    specs: { "Degrees of freedom": "5 + gripper", Payload: "500 g", Reach: "420 mm" },
    stack: ["SolidWorks", "ROS2", "Python", "Dynamixel servos"],
    highlights: [
      "Derived and implemented inverse kinematics for the full 5-DOF chain",
      "Designed a quick-swap end-effector mount used across three separate demos",
      "Integrated with ROS2 MoveIt for path planning around lab fixtures",
    ],
    links: { repo: "https://github.com/yourusername/robotic-arm" },
  },
  {
    id: "battery-monitor",
    title: "Battery Pack Monitor",
    categories: ["Electronics"],
    year: "2023",
    role: "PCB design, firmware",
    summary:
      "A custom PCB that monitors cell voltage and temperature across a 6S lithium pack, with passive balancing and a UART link to a host controller.",
    specs: { Cells: "6S", Interface: "UART / I2C", Layers: "2-layer" },
    stack: ["KiCad", "STM32", "C"],
    highlights: [
      "Designed and routed the board in KiCad, then hand-assembled and reflowed it",
      "Wrote firmware for per-cell voltage sampling and passive balancing",
      "Traced an ADC noise issue back to a missing ground-plane split",
    ],
    links: { repo: "https://github.com/yourusername/battery-monitor" },
  },
  {
    id: "ground-rover",
    title: "Autonomous Ground Rover",
    categories: ["Robotics", "Software", "Electronics"],
    year: "2023",
    role: "Systems integration, navigation stack",
    summary:
      "A four-wheel rover that maps and navigates a fixed indoor course using LIDAR and wheel odometry, built for a robotics club competition.",
    specs: { Sensors: "2D LIDAR, IMU, wheel encoders", Compute: "Raspberry Pi 4" },
    stack: ["ROS2", "Python", "SLAM Toolbox"],
    highlights: [
      "Integrated LIDAR-based SLAM for real-time mapping of the competition course",
      "Tuned the navigation stack's costmap to reliably avoid a moving obstacle",
      "Placed 2nd of 14 teams on course completion time",
    ],
    links: { repo: "https://github.com/yourusername/ground-rover" },
  },
  {
    id: "fleet-dashboard",
    title: "Fleet Telemetry Dashboard",
    categories: ["Software"],
    year: "2023",
    role: "Full-stack development",
    summary:
      "A real-time dashboard for a small delivery fleet — live position, battery state, and route history — replacing a spreadsheet drivers updated by hand.",
    specs: { "Update rate": "1 Hz", "Fleet size": "12 vehicles" },
    stack: ["React", "Node.js", "PostgreSQL", "MQTT"],
    highlights: [
      "Ingested live MQTT telemetry into a time-series table",
      "Built a map view with full route replay for any past trip",
      "Cut manual dispatch time from ~20 min/day to under 2",
    ],
    links: { repo: "https://github.com/yourusername/fleet-dashboard", demo: "https://example.com" },
  },
  {
    id: "compliant-gripper",
    title: "Compliant Gripper Mechanism",
    categories: ["Mechanical Design", "Patents/Publications"],
    year: "2022",
    role: "Mechanism design, patent drafting",
    summary:
      "A single-piece compliant gripper mechanism that grasps irregular objects without a traditional linkage — designed for 3D printing in one shot.",
    specs: { Material: "Nylon (SLS)", "Grasp force": "adjustable, 2–8 N" },
    stack: ["Fusion 360", "FEA"],
    highlights: [
      "Replaced a 6-part linkage with a single compliant mechanism",
      "Validated grip-force range against target payloads using FEA",
      "Co-authored a provisional patent filing on the mechanism geometry",
    ],
    links: { patent: "#" },
  },
];

const STACK = {
  "CAD & Simulation": ["SolidWorks", "Fusion 360", "Ansys FEA"],
  "Electronics": ["Altium Designer", "KiCad", "MATLAB / Simulink"],
  "Software": ["Python", "C / C++ (embedded)", "ROS2", "Git"],
  "Manufacturing": ["CNC Machining", "3D Printing (FDM/SLA)", "Sheet Metal Fab", "PCB Assembly & Reflow"],
};

const CERTIFICATIONS = [
  { name: "Certified SolidWorks Expert (CSWE)", year: "2023" },
  { name: "Professional Engineer (PE) — Mechanical", year: "2022" },
  { name: "OSHA 30 — General Industry", year: "2021" },
];

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function NavLinks({ onNavigate }) {
  const items = [
    ["home", "Home"],
    ["work", "Work"],
    ["about", "Qualifications"],
    ["certs", "Certifications"],
    ["contact", "Contact"],
  ];
  return (
    <nav className="flex flex-col gap-1">
      {items.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={onNavigate}
          className="px-3 py-2 rounded text-sm font-medium transition-colors"
          style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = THEME.ink)}
          onMouseLeave={(e) => (e.currentTarget.style.color = THEME.steel)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-30"
        style={{ background: THEME.void, borderBottom: `1px solid ${THEME.panelLine}` }}
      >
        <span style={{ fontFamily: "'Archivo', sans-serif", color: THEME.ink, fontWeight: 700 }}>
          {PROFILE.name}
        </span>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ color: THEME.ink }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden px-4 pb-4" style={{ background: THEME.void, borderBottom: `1px solid ${THEME.panelLine}` }}>
          <NavLinks onNavigate={() => setOpen(false)} />
          <div className="flex gap-4 mt-3">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: THEME.steel }}><Github size={18} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: THEME.steel }}><Link size={18} /></a>
            <a href={`mailto:${PROFILE.email}`} style={{ color: THEME.steel }}><Mail size={18} /></a>
          </div>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <aside
        className="hidden lg:flex flex-col justify-between fixed left-0 top-0 h-screen w-64 px-6 py-8 z-30"
        style={{ background: THEME.panel, borderRight: `1px solid ${THEME.panelLine}` }}
      >
        <div>
          <img
             src="/headshot.jpg"
              alt={PROFILE.name}
             className="w-16 h-16 rounded-full object-cover mb-4"
             style={{ border: `2px solid ${THEME.signal}` }}
          />
          <div style={{ fontFamily: "'Archivo', sans-serif", color: THEME.ink, fontWeight: 700, fontSize: "1.1rem" }}>
            {PROFILE.name}
          </div>
          <div className="mt-1 mb-8" style={{ color: THEME.steel, fontSize: "0.85rem", fontFamily: "'Public Sans', sans-serif" }}>
            {PROFILE.titles[0]}
          </div>
          <NavLinks />
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={PROFILE.resumeUrl}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm font-semibold"
            style={{ background: THEME.signal, color: THEME.paperInk, fontFamily: "'Public Sans', sans-serif" }}
          >
            <Download size={16} /> Resume (PDF)
          </a>
          <div className="flex gap-4 justify-center">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: THEME.steel }}><Link size={18} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: THEME.steel }}><Link size={18} /></a>
            <a href={`mailto:${PROFILE.email}`} style={{ color: THEME.steel }}><Mail size={18} /></a>
          </div>
        </div>
      </aside>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="px-6 lg:px-16 pt-16 pb-20 scroll-mt-16" style={{ background: THEME.void }}>
      <p style={{ color: THEME.signal, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>
        {PROFILE.years} years in mechanical &amp; robotic systems
      </p>
      <h1
        className="mt-4 max-w-3xl"
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
          lineHeight: 1.08,
          color: THEME.ink,
        }}
      >
        {PROFILE.titles.join(" · ")}
      </h1>
      <p className="mt-6 max-w-xl" style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.65 }}>
        {PROFILE.statement}
      </p>
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  const Icon = CATEGORY_ICON[project.categories[0]] || Cog;
  return (
    <button
      onClick={() => onOpen(project)}
      className="text-left rounded p-5 flex flex-col gap-4 transition-transform"
      style={{ background: THEME.panel, border: `1px solid ${THEME.panelLine}` }}
    >
      <div
        className="w-full h-32 rounded flex items-center justify-center"
        style={{ background: THEME.void, border: `1px solid ${THEME.panelLine}` }}
      >
        <Icon size={32} style={{ color: THEME.signal }} />
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: THEME.ink, fontSize: "1.05rem" }}>
            {project.title}
          </h3>
          <span style={{ color: THEME.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>
            {project.year}
          </span>
        </div>
        <p className="mt-2" style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.5 }}>
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.categories.map((c) => (
            <span key={c} style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif", fontSize: "0.75rem" }}>
              {c}{c !== project.categories[project.categories.length - 1] ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start lg:items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(13,15,17,0.85)" }}
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full rounded p-6 lg:p-8 my-8"
        style={{ background: THEME.panel, border: `1px solid ${THEME.panelLine}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: THEME.ink, fontSize: "1.5rem" }}>
              {project.title}
            </h3>
            <p className="mt-1" style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif", fontSize: "0.9rem" }}>
              {project.role} · {project.year}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ color: THEME.steel }}>
            <X size={22} />
          </button>
        </div>

        <p className="mt-5" style={{ color: THEME.ink, fontFamily: "'Public Sans', sans-serif", lineHeight: 1.7 }}>
          {project.summary}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {Object.entries(project.specs).map(([k, v]) => (
            <div key={k}>
              <div style={{ color: THEME.steel, fontSize: "0.7rem", fontFamily: "'Public Sans', sans-serif" }}>{k}</div>
              <div style={{ color: THEME.ink, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>{v}</div>
            </div>
          ))}
        </div>

        <ul className="mt-6 flex flex-col gap-2">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2" style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.5 }}>
              <ChevronRight size={16} className="shrink-0 mt-0.5" style={{ color: THEME.signal }} />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded text-xs"
              style={{ border: `1px solid ${THEME.panelLine}`, color: THEME.steel, fontFamily: "'JetBrains Mono', monospace" }}
            >
              {s}
            </span>
          ))}
        </div>

        {project.links && Object.keys(project.links).length > 0 && (
          <div className="flex gap-5 mt-6 pt-6" style={{ borderTop: `1px solid ${THEME.panelLine}` }}>
            {Object.entries(project.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium"
                style={{ color: THEME.signal, fontFamily: "'Public Sans', sans-serif" }}
              >
                {key === "repo" ? "View code" : key === "demo" ? "Live demo" : "View patent"}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="work" className="px-6 lg:px-16 py-16 scroll-mt-16" style={{ background: THEME.void }}>
      <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: THEME.ink, fontSize: "1.75rem" }}>
        Work
      </h2>

      <div className="flex flex-wrap gap-2 mt-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-3.5 py-1.5 rounded text-sm font-medium transition-colors"
            style={{
              background: filter === cat ? THEME.signal : "transparent",
              color: filter === cat ? THEME.paperInk : THEME.steel,
              border: `1px solid ${filter === cat ? THEME.signal : THEME.panelLine}`,
              fontFamily: "'Public Sans', sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setSelected} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Qualifications() {
  return (
    <section id="about" className="px-6 lg:px-16 py-16 scroll-mt-16" style={{ background: THEME.paper }}>
      <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: THEME.paperInk, fontSize: "1.75rem" }}>
        Qualifications
      </h2>
      <div className="grid sm:grid-cols-2 gap-8 mt-8">
        {Object.entries(STACK).map(([group, items]) => (
          <div key={group}>
            <h3 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 600, color: THEME.paperInk, fontSize: "1rem" }}>
              {group}
            </h3>
            <ul className="mt-3 flex flex-col gap-1.5">
              {items.map((item) => (
                <li key={item} style={{ color: "#4A4F55", fontFamily: "'Public Sans', sans-serif", fontSize: "0.95rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certs" className="px-6 lg:px-16 py-16 scroll-mt-16" style={{ background: THEME.void }}>
      <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: THEME.ink, fontSize: "1.75rem" }}>
        Certifications
      </h2>
      <div className="flex flex-col mt-6" style={{ borderTop: `1px solid ${THEME.panelLine}` }}>
        {CERTIFICATIONS.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between py-4"
            style={{ borderBottom: `1px solid ${THEME.panelLine}` }}
          >
            <span style={{ color: THEME.ink, fontFamily: "'Public Sans', sans-serif", fontSize: "1rem" }}>{c.name}</span>
            <span style={{ color: THEME.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>{c.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer id="contact" className="px-6 lg:px-16 py-16 scroll-mt-16" style={{ background: THEME.panel, borderTop: `1px solid ${THEME.panelLine}` }}>
      <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: THEME.ink, fontSize: "1.75rem" }}>
        Get in touch
      </h2>
      <p className="mt-3 max-w-md" style={{ color: THEME.steel, fontFamily: "'Public Sans', sans-serif" }}>
        Open to conversations about mechanical design, robotics, or systems integration roles.
      </p>
      <div className="flex flex-wrap gap-6 mt-6">
        <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2" style={{ color: THEME.signal, fontFamily: "'Public Sans', sans-serif", fontWeight: 500 }}>
          <Mail size={16} /> {PROFILE.email}
        </a>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ color: THEME.signal, fontFamily: "'Public Sans', sans-serif", fontWeight: 500 }}>
          <Link size={18} /> GitHub
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ color: THEME.signal, fontFamily: "'Public Sans', sans-serif", fontWeight: 500 }}>
          <Link size={18} /> LinkedIn
        </a>
      </div>
    </footer>
  );
}

/* =========================================================
   ROOT
   ========================================================= */
export default function PortfolioSite() {
  return (
    <div style={{ background: THEME.void, minHeight: "100vh" }}>
      <style>{FONTS}</style>
      <Sidebar />
      <main className="lg:ml-64">
        <Hero />
        <Portfolio />
        <Qualifications />
        <Certifications />
        <ContactFooter />
      </main>
    </div>
  );
}