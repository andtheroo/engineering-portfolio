import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Download, Menu, X } from "lucide-react";

/* =====================================================================
   CONTENT
   Everything on the site lives in these objects. To change the site,
   edit text here. You shouldn't need to touch the layout code below.

   IMAGES (put files in your project's /public folder)
   - /public/experience/  photos for experience, projects, competitions
   - /public/updates/     photos for your LinkedIn posts (one folder per post)
   - /public/work/        organization logos
   File names must match exactly, including .jpg vs .jpeg and capitals.
   An item with no photos shows its organization's logo instead, and a
   missing logo shows the organization's initials.

   Each photo can have an optional caption shown in the pop-up:
     { src: "/experience/asme-ehpvc1.jpg", alt: "...", caption: "First frame weld" }

   Lines marked TODO need your real details.
   ===================================================================== */

const PROFILE = {
  name: ["Andrew", "Ikemoto"],
  headline:
    "Mechanical engineer building vehicles, assistive devices, and the student teams that make them.",
  intro:
    "I study mechanical engineering with a minor in computer science at Rutgers University–New Brunswick. My work sits where physical design meets computation: vehicle chassis, adaptive mobility equipment, and, more and more, AI tools that help engineers work faster. I like owning a problem from the first CAD sketch through fabrication and testing.",
  now:
    "Building an agentic AI system as an AI Studio Fellow at Abt Global, leading Rutgers eHPVC toward its spring competition, and looking for Summer 2027 internships in aerospace, robotics, and automotive engineering.",
  headshot: "/headshot.jpg",
  headshotCaption: "Rutgers University–New Brunswick, B.S. Mechanical Engineering, class of 2028",
  email: "andrew.l.ikemoto@gmail.com",
  linkedin: "https://www.linkedin.com/in/andrewikemoto/",
  linkedinActivity: "https://www.linkedin.com/in/andrewikemoto/recent-activity/all/",
  github: "https://github.com/andtheroo",
  resume: "/Andrew_Ikemoto_Resume (1) (1).pdf",
  resumeDownloadName: "Andrew_Ikemoto_Resume.pdf", // the file name people get when they download it
};

/* The moving drawing next to your name. "linkage" is the four-bar
   mechanism; "chassis" is the rotating tube-frame wireframe. */
const HERO_VISUAL = "chassis";

/* ---------------------------------------------------------------------
   ORGANIZATIONS AND LOGOS
   Every item below refers to an organization by its key (e.g. "rutgers").
   Save each logo to the path shown. Until then, initials appear.
   --------------------------------------------------------------------- */

const ORGS = {
  rutgers: { name: "Rutgers University", logo: "/work/rutgersnb_logo.jpg" },
  soe: { name: "Rutgers School of Engineering", logo: "/work/rutgers_school_of_engineering_logo.jpg" },
  abt: { name: "Abt Global", logo: "/work/abt-global.jpg" },
  rumfs: { name: "Rutgers Marine Field Station", logo: "/work/RUMFS-logo.jpg" },
  jstar: { name: "J-Star Research", logo: "/work/j_star_research_inc_logo.jpg" },
  btt: { name: "Break Through Tech", logo: "/work/break_through_tech_logo.jpg" },
  asme: { name: "Rutgers ASME", logo: "/work/asme_rutgersnb_logo.jpg" },
  ehpvc: { name: "Rutgers ASME eHPVC", logo: "/work/asme-ehpvc-team-logo.png" },
  a4a: { name: "Accessible 4 All", logo: "/work/rutgers-a4a-logo.jpg" },
  rfr: { name: "Rutgers Formula Racing", logo: "/work/rutgers_formula_racing_logo.jpg" },
  frc: { name: "FRC Team 2554", logo: "/work/2554-robotics-club-logo.jpg" },
  jps: { name: "John P. Stevens High School", logo: "/work/john-p-stevens-high-school.jpg" },
  idea: { name: "IDEA Academy", logo: "/work/innovation-design-entrepreneurship-academy-logo.jpg" },
  hsf: { name: "Hispanic Scholarship Fund", logo: "/work/hispanic_scholarship_fund_logo.jpg" },
  rsvp: { name: "Road to Silicon Valley", logo: "/work/road_to_silicon_valley_logo.jpg" }, // TODO: add this logo file
  columbia: { name: "Columbia University", logo: "/work/columbia_university_logo.jpg" },
  inspirit: { name: "Inspirit AI", logo: "/work/inspirit-ai-logo.jpg" },
  nyas: { name: "New York Academy of Sciences", logo: "/work/the-new-york-academy-of-sciences.jpg" },
};

// Logos shown in the strip under the intro, in order
const LOGO_STRIP = ["rutgers", "abt", "rumfs", "btt", "jstar", "ehpvc", "rfr", "a4a", "idea", "hsf", "columbia", "inspirit"];

/* ---------------------------------------------------------------------
   UPDATES ("What I've been up to")
   Paste new LinkedIn posts at the TOP of this list. Add as many images
   as the post has; the card shows up to three and a "+N" for the rest,
   and clicking opens all of them.
   --------------------------------------------------------------------- */

const POSTS = [
  {
    id: "hsf-stem-summit",
    date: "Sep 26, 2026",
    text: `Recently, I traveled to Los Angeles to spend the weekend at the HSF STEM Summit!

Throughout the event, I learned about career readiness and heard inspiring stories from students actively entering the workforce. Being surrounded by such talented and driven Hispanic peers in STEM showed me what's possible for my own career. I am leaving inspired to make an impact and develop my skills as an engineer.

A huge thank you to HSF for believing in scholars like me and supporting our growth as leaders. I also want to give a special thank you to Honda, ABM Industries, and all of HSF's sponsors for making these events possible. Thank you to LaTonya Tichavsky for interviewing me and sharing invaluable career advice, to Angela Delgado and Emily Juarez for helping me advocate for myself, and to Deklin Caban and Edward Celiz for your mentorship throughout the Summit.

Finally, thank you to my incredible group members: Jason Perez Mendez, Belen Quispe Almendro, Juliana Prada, Kevin Zamudio, and Melanie Castillo. Sharing this experience with all of you made it truly memorable.

I'm leaving the Summit with new connections and a lot of motivation to keep working hard!`,
    images: ["1", "2", "(3)", "4", "(5)", "(6)"].map((n) => ({ src: `/updates/HSF STEM Summit/HSF STEM Summit ${n}.jpg`, alt: "HSF STEM Summit in Los Angeles" })),
  },
  {
    id: "taiwan",
    date: "Sep 10, 2026",
    text: `Hi everyone! This summer, I visited Hsinchu and Taipei, Taiwan, to study semiconductors :)

Through Rutgers' Engineering Management in High-Tech Industries study abroad program, I explored the engineering and business behind Taiwan's semiconductor industry.

As a Mechanical Engineering major, the most interesting part of the trip to me was seeing semiconductor manufacturing up close. At the Minghsin University of Science and Technology Talent Base and MSSCORPS, I was able to step into cleanroom environments and see processes that I learned about in my mechatronics and physics classes.

I learned about how wafers are processed through steps such as photolithography, where masks are used to transfer microscopic patterns onto the wafer, as well as how those processes create individual dies containing billions of transistors. And learning about NMOS and PMOS transistors, material properties, and high-precision manufacturing methods (like deposition and etching) gave me a much deeper understanding and appreciation for the engineering required to produce modern integrated circuits.

An interesting realization I had was how closely related the manufacturing process was to chemistry R&D. The emphasis on materials, controlled environments, and nanoscale precision felt surprisingly similar. But the scale also raised new questions, like how engineers manage electromagnetic fields and how the industry can sustain Moore's Law as traditional scaling approaches physical limits. It was fascinating to learn about the directions the industry is exploring, including 3D integrated circuits like CFET architectures, advanced chiplet packaging, and quantum computing.

On the business side, visiting the Industrial Technology Research Institute (ITRI) Museum changed my view on innovation. Rather than proprietary competition, seeing how ITRI supported TSMC's early development revealed a powerful model of industry-wide cooperation, shared infrastructure, and specialization.

TSMC's foundry model was especially interesting to me. By focusing primarily on manufacturing rather than competing directly with its customers in chip design, TSMC helped create an environment where companies like NVIDIA can focus on the IC design while relying on the foundry's specialized manufacturing capabilities.

I want to thank Dr. Hae Chang Gea, Rutgers Global, Fulbright Taiwan (Foundation for Scholarly Exchange), and our guides for making this trip possible. I am also grateful to the faculty at Minghsin University of Science and Technology and National Taiwan University of Science and Technology for sharing their expertise, and to my fellow students for an unforgettable experience. I returned with a stronger curiosity about semiconductors, a new perspective on industry building, and many questions I'm excited to explore as I continue my engineering education!`,
    images: ["(1)", "(2)", "(3)", "(4)", "(5)", "(6)", "7", "(8)", "(9)"].map((n) => ({ src: `/updates/Taiwan/TaiwanStudyAbroad ${n}.jpg`, alt: "Semiconductor study abroad in Taiwan" })),
  },
  {
    id: "weeks-scholarship",
    date: "Apr 29, 2026",
    text: `I'm grateful to have attended the Weeks Scholarship Luncheon as a recipient of the Richard N. Weeks Endowed Scholarship.

This support means a lot and motivates me to keep working hard!

It was great getting the chance to meet Rich Weeks and hear his stories in person.

Thank you to the Weeks family and everyone who made the event possible.`,
    images: ["1", "(2)", "3"].map((n) => ({ src: `/updates/Weeks Scholarship/Weeks Scholarship ${n}.jpg`, alt: "Weeks Scholarship Luncheon" })),
  },
  {
    id: "break-through-tech",
    date: "Apr 7, 2026",
    text: `Excited to share that I'll be joining Cornell University's Break Through Tech AI Program as a Fellow for the 2026–2027 cohort!

I'll be practicing AI and ML through their 9-week course and industry projects.

Looking forward to building on what I learned with Inspirit AI.`,
    images: [{ src: "/updates/BreakThroughTech/BTT Im In.jpg", alt: "Break Through Tech AI Program announcement" }],
  },
  {
    id: "techstart",
    date: "Mar 27, 2026",
    text: `Two weeks ago I competed in TechStart 2026, a pitch competition hosted by Road to Silicon V/Alley (RSVP) and the Rutgers Entrepreneurial Society.

My team, Anushka John, Zoha Munawer, Dev Shah, and I, decided to take on a major problem in the trucking industry: optimizing routes for time, cost-efficiency, and regulatory compliance. With inefficiencies and accidents costing the industry an estimated $24.7B annually, we saw an opportunity to build something great.

We built FleetSovereign, a LEO-satellite powered mobile navigation system for commercial fleets designed to:
• Operate without reliable cell service
• Improve routing efficiency and safety
• Help drivers stay compliant with Hours of Service (HOS) and traffic regulations

And we won 2nd place! Let's go FleetSovereign!! 😁

Key takeaways:
• Strong team spirit makes a huge difference
• The truck routing problem is constraint-heavy (height limits, weight restrictions, HOS regulations)
• Emerging tech like Low Earth Orbit (LEO) satellite networks can improve navigation accuracy, but have their own challenges (cost, lifespan, coverage)
• AI can significantly speed up early-stage market research
• Offline capability is critical, meaning simplified routing computation has to be done on the device itself when connectivity drops
• It's crazy how much can be built in 1 weekend!

Thank you to the judges, Mitchell Bregman, Sahil Patel, and Himanshu Tandon, for their feedback and judging!`,
    images: [1, 2, 3].map((n) => ({ src: `/updates/TechStart 2026/TechStart ${n}.jpg`, alt: "TechStart 2026 pitch competition" })),
  },
];

/* ---------------------------------------------------------------------
   EXPERIENCE
   "images" can hold as many photos as you want; the first one shows on
   the page, and all of them appear in the pop-up gallery.
   "skills" are the skills you used or gained, shown as tags.
   --------------------------------------------------------------------- */

const INTERNSHIPS = [
  {
    id: "abt-global",
    title: "AI Studio Fellow",
    org: "abt",
    period: "Aug 2026 – Present",
    location: "Remote",
    images: [], // add photos here when you have them
    summary:
      "Developing an agentic AI system that uses pre-trained large language models to automate the modernization of legacy analytics workflows from SAS to Python.",
    points: [
      "Building an agentic AI system on top of pre-trained large language models.",
      "Automating the migration of legacy SAS analytics workflows to Python.",
    ],
    skills: ["Python", "Large language models", "Agentic AI", "SAS", "Code migration"],
  },
  {
    id: "rumfs",
    title: "Design Research Intern",
    org: "rumfs",
    period: "May – Aug 2025",
    location: "New Jersey",
    images: [
      { src: "/experience/rumfs1.webp", alt: "Rutgers University Marine Field Station" },
      { src: "/experience/RUMFS-2.png", alt: "Ocean systems research at RUMFS" },
      { src: "/experience/RUMFS-3.png", alt: "Ocean systems research at RUMFS" }, // convert RUMFS-3.HEIF to this .jpg (see chat)
      { src: "/experience/RUMFS4.jpg", alt: "Ocean systems research at RUMFS" },
    ],
    summary:
      "Documented and communicated the design and capabilities of advanced ocean systems, including autonomous surface and underwater vehicles and offshore energy platforms, for researchers and entrepreneurs.",
    points: [
      "Analyzed marine vehicle architecture and engineering tradeoffs: modular and articulated hulls, propulsion, equipment mounting, transport mechanisms, and satellite communications.",
      "Examined Ocean Power Technologies' mechanical product development workflow, from SolidWorks CAD and internal design review through external manufacturing, including design integrity, cost, sourcing, and fabrication.",
      "Worked with 4 marine engineers and researchers at the Rutgers and Stockton University marine field stations.",
      "Researched 10+ systems, including REMUS AUVs, WAM-V, underwater gliders, and wave-energy buoys, and produced 30+ technical posts and a symposium poster.",
    ],
    skills: ["Systems analysis", "Design tradeoffs", "Technical writing", "Research", "Autonomous vehicles"],
  },
  {
    id: "jstar",
    title: "R&D Intern",
    org: "jstar",
    period: "Jun – Sep 2024",
    location: "New Jersey", // TODO: confirm location
    images: [{ src: "/experience/jstar (1).jpg", alt: "JSTAR R&D Internship" }, { src: "/experience/jstar (2).jpg", alt: "JSTAR R&D Internship" }],
    summary:
      "Conducted research and development on antibody–drug conjugation systems in a pharmaceutical R&D lab.",
    points: [
      "Used analytical instruments including NMR, mass spectrometry, and HPLC.",
      "Followed detailed lab protocols and kept documentation of experimental procedures and compound analyses.",
    ],
    skills: ["NMR", "Mass spectrometry", "HPLC", "Lab protocols", "Documentation"],
  },
];

const TEAMS = [
  {
    id: "ehpvc",
    title: "Team Lead, Rutgers eHPVC",
    org: "ehpvc",
    orgLabel: "Rutgers ASME",
    period: "Aug 2025 – Present",
    images: [
      { src: "/experience/asme-ehpvc1.jpg", alt: "Rutgers eHPVC team" },
      { src: "/experience/asme-ehpvc-2.jpg", alt: "Rutgers eHPVC team" },
      { src: "/experience/asme-ehpvc-3.jpg", alt: "Rutgers eHPVC team" },
      { src: "/experience/asme-ehpvc-4.jpg", alt: "Rutgers eHPVC team" },
    ],
    summary:
      "I started Rutgers' participation in ASME's Electric and Human-Powered Vehicle Challenge and lead the 30-member team designing and building our first competition vehicle.",
    points: [
      "Lead a 30-member team through the vehicle's design, chassis, handling, and ergonomics.",
      "Oversee manufacturing, communications, and logistics as we prepare to compete in the spring.",
      "Selected subteam leads for mechanical, CAD and aerodynamics, electrical, and logistics.",
    ],
    skills: ["SolidWorks", "Chassis design", "FEA", "Metal fabrication", "Team leadership", "Project management"],
    story: [
      {
        heading: "The challenge",
        body: "The eHPVC asks teams to build a practical, efficient vehicle that balances rider power with electric assist, then prove it in design, endurance, and speed events. Rutgers didn't have a team, so we're starting from zero: no inherited vehicle and no established build process.",
      },
      {
        heading: "What I'm doing",
        body: "I initiated Rutgers' entry, built the team's structure, and chose the subteam leads. I oversee the design of the chassis, handling, and ergonomics, and I'm making the mechanical subteam more technically rigorous, so newer members learn real design, CAD, and fabrication instead of watching from the side.",
      },
      {
        heading: "Where it stands",
        body: "The team is building toward its first competition in the spring. I'll post frame CAD, analysis, and build photos here as the vehicle comes together.",
      },
    ],
  },
  {
    id: "a4a",
    title: "Project Lead (x2)",
    org: "a4a",
    period: "Feb 2024 – Present",
    images: [
      { src: "/experience/a4a-1.jpeg", alt: "Accessible 4 All adaptive tricycle project" },
      { src: "/experience/a4a-2.jpg", alt: "Accessible 4 All adaptive tricycle project" },
      { src: "/experience/a4a-3.jpg", alt: "Accessible 4 All adaptive tricycle project" },
    ],
    summary:
      "Accessible 4 All adapts mobility equipment for people who can't use off-the-shelf options. I've led two projects, taking each from the first conversation with a family to a finished, tested build.",
    points: [
      "Led a 25-member team in the redesign of an adaptive tricycle, overseeing CAD, fabrication, and testing.",
      "Designed and fabricated with SolidWorks, 80/20 aluminum framing, PVC, and 3D printing to meet safety and usability requirements.",
      "Previously redesigned an RC vehicle with custom structural supports.",
      "Turned feedback from parents, riders, and occupational therapists into design revisions.",
    ],
    skills: ["SolidWorks", "80/20 framing", "PVC fabrication", "3D printing", "Prototyping and testing", "User-centered design"],
    links: [
      { label: "Project Trike 2 on Instagram", href: "https://www.instagram.com/p/DbWHX78IDr1/" },
      { label: "Project Trike 1 on Instagram", href: "https://www.instagram.com/p/DZ2sqHgDi1J/" },
      { label: "Project Car on Instagram", href: "https://www.instagram.com/p/DRSUhIBjle8/" },
    ],
    story: [
      {
        heading: "The problem",
        body: "Every rider's needs are different: trunk support, foot placement, steering reach, how a parent helps with transfers. A standard tricycle rarely fits, and adaptive equipment from a catalog is expensive and slow to arrive.",
      },
      {
        heading: "What I do",
        body: "I meet with the family and their occupational therapist, turn what I hear into requirements, model the changes in CAD, and lead the team through fabrication and testing. When something doesn't work at the fitting, we redesign and try again.",
      },
      {
        heading: "Why it matters to me",
        body: "This is the project where engineering stops being abstract. The success criterion is a specific person riding safely and comfortably, and the feedback is immediate.",
      },
    ],
  },
  {
    id: "formula",
    title: "Chassis Subteam Member",
    org: "rfr",
    orgLabel: "Rutgers Formula Racing, Formula SAE",
    period: "Mar 2026 – Present",
    images: [{ src: "/experience/rfr-1.jpg", alt: "Rutgers Formula Racing, Formula SAE" }],
    summary:
      "Contributing to the mechanical design of the chassis for Rutgers' Formula SAE competition car.",
    points: [
      "Working on chassis mechanical design for the Formula SAE competition.",
      "Building on four years of FRC robotics experience in CAD and collaborative engineering design.",
      // TODO: add a specific part, calculation, or fixture you worked on once you have one
    ],
    skills: ["SolidWorks", "Chassis design", "Manufacturing", "Collaborative design"],
    links: [{ label: "Rutgers Formula Racing website", href: "https://www.rutgersformularacing.com/" }],
  },
  {
    id: "frc",
    title: "Mechanical Team Member and Operations Associate",
    org: "frc",
    orgLabel: "FRC Team 2554, the Warhawks, JP Stevens High School",
    period: "Sep 2020 – Jun 2024",
    tag: "High school",
    images: [{ src: "/experience/warhawks1.jpg", alt: "FRC Team 2554" }, { src: "/experience/warhawks2.jpg", alt: "FRC Team 2554" }, { src: "/experience/warhawks3.jpeg", alt: "FRC Team 2554" }],
    summary:
      "Four years designing and manufacturing the mechanical structure of competition robots for the FIRST Robotics Competition. This is where I fell in love with engineering.",
    points: [
      "Designed and manufactured the mechanical structure of the team's robots.",
      "Built the robot's testing props so the team could practice and tune before competition.",
      "Held the Operations Associate leadership role.",
    ],
    skills: ["CAD", "Machining", "Fabrication", "Prototyping", "Team operations"],
    links: [
      { label: "Charged Up 2023 mechanical documentation", href: "https://docs.jpsrobotics2554.org/mechanical/docs-by-year/charged-up-2023/" },
    ],
  },
];

// Smaller leadership and mentoring roles, shown as compact rows
const ROLES = [
  {
    title: "Fellow Leader",
    org: "idea",
    orgLabel: "Innovation, Design, & Entrepreneurship Academy",
    period: "Sep 2024 – May 2026",
    summary:
      "Mentored a cohort of 20 students in product design, innovation, and entrepreneurship through hands-on projects.",
  },
  {
    title: "Engineering Governing Council Representative",
    org: "asme",
    orgLabel: "Rutgers ASME",
    period: "August 2025 – May 2026",
    summary:
      "Represented Rutgers' 400-member ASME chapter on the Governing Council, advocating for student opportunities. ASME member since Oct 2025.",
  },
];

/* ---------------------------------------------------------------------
   PROJECTS (small cards)
   Smaller builds and side projects. Add new ones to the top.
   --------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "corolla-headlights",
    title: "Headlight replacement",
    org: null,
    orgLabel: "Car maintenance, Toyota Corolla",
    period: "2026", // TODO: confirm date
    images: [{ src: "/experience/corolla-headlights.jpg", alt: "Replacing the headlights on a Toyota Corolla" }],
    summary:
      "Replaced the headlights on my Corolla myself, working through the wiring and the plastic housing without breaking anything.",
    points: [
      "Learned why the headlight connector has three wires: along with the powered terminals, one is a dedicated ground.",
      "Found that the car's outer shell comes off more easily than it looks, which opened up access to the lights.",
      "Tightened fasteners into plastic carefully, since overtightening strips the threads.",
    ],
    skills: ["Automotive maintenance", "Automotive wiring", "Hand tools"],
  },
  {
    id: "website",
    title: "This website",
    org: null,
    orgLabel: "Personal project",
    period: "2026",
    images: [{ src: "/experience/thiswebsite.png", alt: "andrewikemoto.com" }],
    summary:
      "I built andrewikemoto.com from a blank HTML file, rebuilt it in React, and deployed it on my own domain.",
    points: [
      "Learned HTML, CSS, and JavaScript line by line before moving to React, Vite, and Tailwind with Claude AI.",
      "Deployed on GitHub Pages with a custom domain configured through DNS.",
      "All content is data-driven, so adding a project means adding one object.",
    ],
    skills: ["HTML and CSS", "JavaScript", "React", "Vite", "Git and GitHub", "DNS and hosting"],
    links: [
      // TODO: confirm this matches your repository name
      { label: "View the code on GitHub", href: "https://github.com/andtheroo/engineering-portfolio" },
    ],
  },
  {
    id: "junior-academy",
    title: "Post-flood air purification",
    org: "nyas",
    orgLabel: "New York Academy of Sciences, Junior Academy",
    period: "Sep 2022 – Aug 2024",
    tag: "High school",
    images: [],
    summary:
      "Designed air purification devices to help prevent the lung diseases caused by mold growth in homes after flooding, with an international team in an online environmental challenge.",
    points: [
      "Collaborated with an international team through the New York Academy of Sciences.",
      "Designed device concepts and submitted the team's deliverables for the challenge.",
    ],
    skills: ["Product design", "Research", "International collaboration"],
  },
  {
    id: "inspirit-ai",
    title: "AI research project",
    org: "inspirit",
    orgLabel: "Inspirit AI",
    period: "Aug – Sep 2023",
    tag: "High school",
    images: [{ src: "/experience/inspiritai-1.png", alt: "Inspirit AI project" }],
    // TODO: replace with the actual project once you find it
    summary: "Conducted research and studied AI in a machine learning mentorship program.",
    points: ["Project-based AI and machine learning research with a mentor."],
    skills: ["Python", "Machine learning", "Research"],
  },
  // TODO: add your current side project here, for example:
  // {
  //   id: "side-project",
  //   title: "Project name",
  //   orgLabel: "Personal project",
  //   period: "2026",
  //   images: [{ src: "/experience/side-project-1.jpg", alt: "..." }],
  //   summary: "One or two sentences on what it is.",
  //   points: ["What you did", "What you learned"],
  //   skills: ["Skill", "Skill"],
  // },
];

/* ---------------------------------------------------------------------
   SKILLS
   --------------------------------------------------------------------- */

const SKILLS = [
  { group: "Design and analysis", items: ["SolidWorks", "Onshape", "AutoCAD", "KiCad", "ANSYS", "Ftool", "MATLAB"] },
  {
    group: "Programming and AI",
    items: ["Python", "Java", "Arduino", "JavaScript", "React", "Git and GitHub", "LLM apps and RAG", "Agentic AI workflows"],
  },
  {
    group: "Fabrication",
    items: ["Band saw", "Miter saw", "Drill press", "Jigsaw", "Dremel", "Tapping and dies", "Machining", "CNC", "3D printing", "80/20 and PVC framing"],
  },
  { group: "Lab and analytical", items: ["NMR", "Mass spectrometry", "HPLC", "Lab documentation"] },
];

/* ---------------------------------------------------------------------
   ENTREPRENEURSHIP
   One object per competition. Entries with a "story" get a pop-up.
   --------------------------------------------------------------------- */

const ENTREPRENEURSHIP_INTRO =
  "Competitions push me past \u201ccan we build this?\u201d to the harder questions: who needs it, how it pays for itself, and how it actually gets deployed.";

const COMPETITIONS = [
  {
    id: "safenet",
    year: "2026",
    event: "Rutgers Undergraduate Student Innovation Award",
    result: "Winner",
    title: "SafeNet",
    org: "rutgers",
    orgLabel: "Drone-based emergency response",
    period: "2026",
    award: "Winner, 2026 Rutgers Undergraduate Student Innovation Award",
    images: [],
    summary:
      "An AI-enabled drone system for the first hours after a disaster: it finds survivors with thermal imaging, maps hazard zones, relays survivor vitals to responders, and delivers first aid. I first pitched it to industry professionals through the IDEA Academy.",
    points: [
      "Won the 2026 Rutgers Undergraduate Student Innovation Award.",
      "Designed the system concept across thermal imaging, hazard-zone mapping, survivor detection, and first-aid delivery.",
      "Pitched the drone-based search-and-rescue system to industry professionals.",
    ],
    skills: ["Computer vision", "UAV systems", "Thermal imaging", "Pitching", "Product strategy"],
    story: [
      {
        heading: "The problem",
        body: "The early period after a disaster is when rescues matter most, and it's also when responders have the least information: where survivors are, which areas are unsafe, and who needs help first.",
      },
      {
        heading: "The system",
        body: "SafeNet sends drones in ahead of responders. Thermal imaging and AI detection locate survivors, the fleet builds a hazard map of the area, survivor vital information goes back to the response team, and drones can drop first-aid supplies before people arrive.",
      },
    ],
  },
  {
    id: "fleetsovereign",
    year: "2026",
    event: "TechStart, hosted by RSVP and the Rutgers Entrepreneurial Society",
    result: "2nd place",
    title: "FleetSovereign",
    org: "rsvp",
    orgLabel: "LEO-satellite navigation for commercial fleets",
    period: "Mar 2026",
    award: "2nd place, TechStart 2026",
    images: [1, 2, 3].map((n) => ({ src: `/updates/TechStart 2026/TechStart ${n}.jpg`, alt: "FleetSovereign team at TechStart 2026" })),
    summary:
      "A LEO-satellite powered navigation system for commercial fleets that keeps trucks routed, safe, and compliant where cell service drops out. Built in one weekend with Anushka John, Zoha Munawer, and Dev Shah.",
    points: [
      "Won 2nd place at TechStart 2026.",
      "Targeted a problem that costs the trucking industry an estimated $24.7B a year in inefficiencies and accidents.",
      "Designed for offline use: simplified routing runs on the device itself when connectivity drops.",
      "Built routing around real constraints: height limits, weight restrictions, and Hours of Service regulations.",
    ],
    skills: ["Market research", "Route optimization", "Satellite communications", "Pitching", "Teamwork"],
    story: [
      {
        heading: "The problem",
        body: "Truck routing is constraint-heavy: height limits, weight restrictions, and Hours of Service rules all shape where a driver can go and when. Most navigation also assumes a cell connection, which breaks on the rural routes where trucks spend much of their time.",
      },
      {
        heading: "What we built",
        body: "FleetSovereign uses low-Earth-orbit satellite connectivity so routing and compliance keep working without cell service. We also learned that LEO networks bring their own challenges, like cost, satellite lifespan, and coverage, so the system falls back to simplified on-device routing when the link drops.",
      },
      {
        heading: "What I took away",
        body: "Strong team spirit makes a huge difference, AI can dramatically speed up early market research, and it's surprising how much can be built in a single weekend.",
      },
    ],
  },
  // TODO: add your other competitions, for example:
  // { id: "hackru-2025", year: "2025", event: "HackRU", result: "Finalist", title: "Project name", org: "rutgers", summary: "One sentence." },
];

/* ---------------------------------------------------------------------
   EDUCATION
   EDUCATION is the main timeline (university and high school).
   "stats" show as bold tags under the school name.
   PROGRAMS are shorter programs, shown in a side column. Their "points"
   stay tucked behind a "Details" toggle.
   --------------------------------------------------------------------- */

const EDUCATION = [
  {
    when: "Expected May 2028",
    title: "B.S. Mechanical Engineering, minor in Computer Science",
    org: "soe",
    orgLabel: "Rutgers University–New Brunswick, School of Engineering",
    points: ["Interests: mechanical design, controls and mechatronics, CAD, manufacturing, and programming."],
  },
  {
    when: "Sep 2020 – Jun 2024",
    title: "John P. Stevens High School",
    org: "jps",
    orgLabel: "High school, class of 2024",
    stats: ["GPA 5.44 / 6.05", "SAT 1500", "AP Capstone Diploma", "AP Scholar with Distinction"],
    points: [
      "Mechanical Team Member and Operations Associate, Robotics Club (FRC Team 2554).",
      "Principal Cellist, Chamber Orchestra.",
      "Tutoring Chair, Spanish Honors Society.",
      "National Honor Society, National English Honors Society, Music Honors Society, and Math Honors Society.",
    ],
  },
];

const PROGRAMS = [
  {
    when: "2026 – 2027",
    title: "Break Through Tech AI Program",
    org: "btt",
    orgLabel: "Fellow, Cornell Tech",
    summary: "Machine Learning Foundations Certification covering ML, LLM applications, and agentic AI.",
    points: [
      "The machine learning life cycle and common ML packages.",
      "Training and optimizing supervised learning algorithms, including k-nearest neighbors and decision trees.",
      "Building LLM applications, including chatbots and retrieval-augmented generation (RAG) systems.",
      "Designing agentic AI workflows that reason, use tools, and execute multi-step tasks.",
    ],
  },
  {
    when: "Summer 2026",
    title: "Engineering Management in High-Tech Industries",
    org: "rutgers",
    orgLabel: "Study abroad in Hsinchu and Taipei, Taiwan",
    summary: "Semiconductor manufacturing and industry study, including cleanroom visits.",
    points: [
      "Stepped into cleanrooms at the Minghsin University of Science and Technology Talent Base and MSSCORPS, and learned from faculty at NTUST.",
      "Studied wafer processing, photolithography, deposition and etching, NMOS and PMOS transistors, and emerging directions like CFET and chiplet packaging.",
      "Visited the ITRI Museum and studied how industry-wide cooperation and TSMC's foundry model shaped Taiwan's semiconductor industry.",
    ],
  },
  {
    when: "Aug – Sep 2023",
    title: "Inspirit AI",
    org: "inspirit",
    orgLabel: "Scholar",
    tag: "High school",
    summary: "Project-based AI and machine learning research with a mentor. See the project under Projects.",
  },
  {
    when: "Aug 2021 – Aug 2024",
    title: "Columbia University Science Honors Program",
    org: "columbia",
    orgLabel: "Saturday program admitting about 10% of applicants",
    tag: "High school",
    summary: "Six courses at Columbia across engineering, computing, and physics.",
    points: [
      "Biotechnology and Bioengineering",
      "Computer Programming in Java",
      "Astronomy and Astrophysics",
      "Quantum Physics and Relativity",
      "Science of Materials",
      "Electrical Engineering",
    ],
  },
];

/* ---------------------------------------------------------------------
   HONORS AND SCHOLARSHIPS
   --------------------------------------------------------------------- */

const HONORS = [
  { year: "2026", title: "Rutgers Undergraduate Student Innovation Award", note: "Winner, for SafeNet", org: "rutgers" },
  { year: "2026", title: "TechStart, 2nd place", note: "For FleetSovereign", org: "rsvp" },
  { year: "2026", title: "Break Through Tech Scholar", note: "AI and ML at Cornell Tech", org: "btt" },
  { year: "2026", title: "Road to Silicon Valley (RSVP)", note: "Cohort 7 member", org: "rsvp" },
  { year: "2025", title: "Richard N. Weeks Endowed Scholarship", note: "Recipient", org: "rutgers" },
  {
    year: "2023 – 26",
    title: "Hispanic Scholarship Fund Scholar",
    note: "Selected four years in a row. Youth Leadership Initiative at UChicago (2024), STEM Summit in Los Angeles (2026).",
    org: "hsf",
  },
  { year: "2023", title: "AI Inspirit Scholar", note: "Project-based AI and ML program", org: "inspirit" },
];

/* Sections, in page order. "top: true" puts a section in the desktop
   header; every section appears in the side rail and mobile menu. */
const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "updates", label: "Updates" },
  { id: "experience", label: "Experience", top: true },
  { id: "projects", label: "Projects", top: true },
  { id: "skills", label: "Skills", top: true },
  { id: "entrepreneurship", label: "Entrepreneurship", top: true },
  { id: "education", label: "Education", top: true },
  { id: "honors", label: "Honors", top: true },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact", top: true },
];

/* =====================================================================
   STYLES
   Design tokens are at the top. Change a color here and it updates
   everywhere.
   ===================================================================== */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&display=swap");

/* Custom side rail replaces the default scrollbar on desktop */
@media (min-width: 981px) and (pointer: fine) {
  html { scrollbar-width: none; }
  html::-webkit-scrollbar { display: none; }
}

.ai-root {
  --chalk: #EEEFEA;
  --card: #F7F7F4;
  --panel: #E1E3DD;
  --graphite: #1C1F22;
  --steel: #565D64;
  --rule: #C6C9C2;
  --scarlet: #C8102E;
  --scarlet-dark: #A00C24;
  --font: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --wrap: 1360px;
  --gutter: clamp(20px, 4vw, 56px);

  background: var(--chalk);
  color: var(--graphite);
  font-family: var(--font);
  font-size: 17px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
/* Resets use :where() so they have zero specificity and never override component classes */
:where(.ai-root) *, :where(.ai-root) *::before, :where(.ai-root) *::after { box-sizing: border-box; }
:where(.ai-root) :where(h1, h2, h3, h4, p, ul, ol, figure) { margin: 0; padding: 0; }
:where(.ai-root) :where(ul, ol) { list-style: none; }
:where(.ai-root) :where(img) { display: block; max-width: 100%; }
:where(.ai-root) :where(a) { color: inherit; }
:where(.ai-root) :where(button) { font: inherit; color: inherit; }
.ai-root :focus-visible { outline: 2px solid var(--scarlet); outline-offset: 3px; border-radius: 2px; }

.ai-wrap { max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter); }
.ai-display { font-stretch: 125%; font-weight: 800; letter-spacing: -0.02em; line-height: 0.95; }

/* ---------- Header ---------- */
.ai-header { position: sticky; top: 0; z-index: 30; background: rgba(238,239,234,.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--rule); }
.ai-header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.ai-mark { font-stretch: 125%; font-weight: 800; font-size: 1.05rem; letter-spacing: -0.01em; text-decoration: none; }
.ai-nav { display: flex; gap: 24px; align-items: center; }
.ai-nav a { text-decoration: none; font-size: 0.95rem; color: var(--steel); transition: color .15s; }
.ai-nav a:hover { color: var(--graphite); }
.ai-menu-btn { display: none; background: none; border: 0; padding: 8px; margin-right: -8px; cursor: pointer; }
.ai-mobile-nav { display: none; }

/* ---------- Buttons ---------- */
.ai-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 18px; border-radius: 4px;
  font: 600 0.95rem/1 var(--font);
  text-decoration: none; cursor: pointer;
  border: 1.5px solid var(--graphite); background: transparent; color: var(--graphite);
  transition: background .15s, color .15s, border-color .15s;
}
.ai-btn:hover { background: var(--graphite); color: var(--chalk); }
.ai-btn:disabled { opacity: .35; cursor: default; }
.ai-btn:disabled:hover { background: transparent; color: var(--graphite); }
.ai-btn-primary { background: var(--scarlet); border-color: var(--scarlet); color: #fff; }
.ai-btn-primary:hover { background: var(--scarlet-dark); border-color: var(--scarlet-dark); color: #fff; }
.ai-btn-small { padding: 9px 14px; font-size: 0.9rem; }
.ai-btn-icon { padding: 0; width: 42px; height: 42px; justify-content: center; border-radius: 50%; }
.ai-btn.is-done { border-color: #2F7D4F; color: #2F7D4F; }
.ai-btn.is-done:hover { background: transparent; }
.ai-textlink { display: inline-flex; align-items: center; gap: 5px; font-weight: 600; text-decoration: none; }
.ai-textlink:hover { color: var(--scarlet); }

/* ---------- Logos ---------- */
.ai-logo {
  --s: 44px;
  width: var(--s); height: var(--s); flex: none;
  display: grid; place-items: center; overflow: hidden;
  background: #fff; border: 1px solid var(--rule); border-radius: 10px;
}
.ai-logo img { width: 100%; height: 100%; object-fit: contain; }
.ai-logo-initials { font-stretch: 125%; font-weight: 800; font-size: calc(var(--s) * 0.32); color: var(--steel); letter-spacing: -0.02em; }

/* ---------- Skill chips ---------- */
.ai-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.ai-chip {
  font-size: 0.82rem; font-weight: 500; line-height: 1.3;
  padding: 4px 10px; border-radius: 999px;
  background: var(--card); border: 1px solid var(--rule); color: #33383C;
}

/* ---------- Hero ---------- */
.ai-hero { padding: clamp(36px, 6vw, 72px) 0 clamp(40px, 6vw, 72px); }
.ai-hero-top {
  display: grid; grid-template-columns: auto minmax(0, 1fr);
  gap: clamp(24px, 4vw, 64px); align-items: center;
  margin-bottom: clamp(32px, 5vw, 56px);
}
.ai-name { font-size: clamp(3rem, 8.2vw, 8rem); }
.ai-name .ai-mask { display: block; width: fit-content; }
.ai-mask { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.06em; }
.ai-mask > span { display: inline-block; animation: ai-rise .9s cubic-bezier(.2,.7,.1,1) both; }
.ai-mask + .ai-mask > span { animation-delay: .08s; }
@keyframes ai-rise { from { transform: translateY(105%); } to { transform: translateY(0); } }

.ai-viewport { position: relative; }
.ai-viewport canvas { display: block; width: 100%; height: clamp(220px, 24vw, 340px); cursor: grab; touch-action: pan-y; }
.ai-viewport canvas:active { cursor: grabbing; }
.ai-viewport figcaption { font-size: 0.82rem; color: var(--steel); text-align: right; }

.ai-hero-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: clamp(32px, 6vw, 96px); align-items: start; }
.ai-lede { font-size: clamp(1.35rem, 2.2vw, 1.8rem); line-height: 1.3; font-weight: 500; max-width: 32ch; margin-bottom: 24px; }
.ai-intro { color: var(--steel); max-width: 62ch; margin-bottom: 32px; }
.ai-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px; }
.ai-now { border-left: 3px solid var(--scarlet); padding: 4px 0 4px 18px; max-width: 60ch; font-size: 0.98rem; }
.ai-now strong { font-weight: 700; }
.ai-portrait { max-width: 400px; justify-self: end; width: 100%; }
.ai-portrait figcaption { font-size: 0.85rem; color: var(--steel); margin-top: 12px; line-height: 1.45; }

.ai-strip { margin-top: clamp(48px, 6vw, 72px); padding-top: 24px; border-top: 1px solid var(--rule); display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.ai-strip-label { color: var(--steel); font-size: 0.9rem; }
.ai-strip-logos { display: flex; flex-wrap: wrap; gap: 12px; }
.ai-strip .ai-logo { --s: 52px; filter: grayscale(1); opacity: .8; transition: filter .2s, opacity .2s; }
.ai-strip .ai-logo:hover { filter: none; opacity: 1; }

/* ---------- Photos ---------- */
.ai-photo { position: relative; width: 100%; overflow: hidden; border-radius: 4px; background: var(--panel); }
.ai-photo img { width: 100%; height: 100%; object-fit: cover; }
.ai-photo-empty {
  position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 18px;
  background-color: var(--panel);
  background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px);
  background-size: 24px 24px; background-position: -1px -1px;
}
.ai-photo-empty.has-logo { align-items: center; justify-content: center; }
.ai-photo-empty.has-logo .ai-logo { box-shadow: 0 8px 24px rgba(28,31,34,.08); }
.ai-photo-empty span { font-stretch: 125%; font-weight: 800; font-size: clamp(1.3rem, 2.6vw, 2.2rem); line-height: 0.95; letter-spacing: -0.02em; color: rgba(28,31,34,.16); }
.ai-photo-btn { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: zoom-in; position: relative; border-radius: 4px; }
.ai-photo-count { position: absolute; right: 12px; bottom: 12px; background: rgba(28,31,34,.82); color: #fff; font-size: 0.8rem; font-weight: 600; padding: 5px 9px; border-radius: 4px; }

/* ---------- Sections ---------- */
.ai-section { padding: clamp(64px, 8vw, 104px) 0; border-top: 1px solid var(--rule); }
.ai-root section[id] { scroll-margin-top: 64px; }
/* Heading and description sit side by side when there's room and stack when there isn't,
   so a long heading can never run into the description */
.ai-section-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px 48px; margin-bottom: clamp(36px, 5vw, 56px); }
.ai-h2 { font-size: clamp(1.9rem, 6.6vw, 3.6rem); font-stretch: 118%; max-width: 100%; overflow-wrap: anywhere; }
.ai-section-sub { color: var(--steel); max-width: 48ch; }
.ai-group-title { font-size: 1.3rem; font-weight: 700; padding-bottom: 14px; border-bottom: 2px solid var(--graphite); margin-bottom: 8px; }
.ai-group + .ai-group { margin-top: clamp(56px, 7vw, 88px); }

/* ---------- Updates slider ---------- */
.ai-slider-controls { display: flex; gap: 10px; align-items: center; }
.ai-track {
  display: grid; grid-auto-flow: column; grid-auto-columns: min(380px, 84vw);
  gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain;
  padding: 4px 4px 12px; margin: 0 -4px; scrollbar-width: none;
}
.ai-track::-webkit-scrollbar { display: none; }
.ai-post { scroll-snap-align: start; display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule); border-radius: 8px; overflow: hidden; }
.ai-post-head { display: flex; gap: 12px; align-items: center; padding: 16px 18px 0; }
.ai-avatar { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; background: var(--panel); flex: none; }
.ai-post-name { font-weight: 700; font-size: 0.95rem; line-height: 1.2; }
.ai-post-date { color: var(--steel); font-size: 0.82rem; }
.ai-post-text { padding: 12px 18px 0; font-size: 0.95rem; line-height: 1.55; white-space: pre-line; }
.ai-post-text.is-clamped { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.ai-more { align-self: flex-start; margin: 4px 18px 0; padding: 0; border: 0; background: none; color: var(--steel); font-size: 0.9rem; font-weight: 600; cursor: pointer; }
.ai-more:hover { color: var(--graphite); }
.ai-post-spacer { flex: 1; min-height: 14px; }

.ai-mosaic { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding: 0; border: 0; background: var(--card); cursor: zoom-in; width: 100%; }
.ai-mosaic .ai-photo { border-radius: 0; }
.ai-mosaic-cell { position: relative; }
.ai-mosaic.n1 .ai-mosaic-cell, .ai-mosaic.n3 .ai-mosaic-cell:first-child { grid-column: span 2; }
.ai-mosaic-more { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(28,31,34,.55); color: #fff; font-weight: 700; font-size: 1.3rem; }

/* ---------- Big rows (experience and teams) ---------- */
.ai-row { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(28px, 4.5vw, 64px); padding: clamp(32px, 4.5vw, 48px) 0; border-top: 1px solid var(--rule); }
.ai-row:first-of-type { border-top: 0; }
.ai-row > .ai-photo-btn { align-self: start; }
.ai-row-body { display: flex; flex-direction: column; }
.ai-orghead { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.ai-orghead-name { font-weight: 600; line-height: 1.3; }
.ai-orghead-meta { color: var(--steel); font-size: 0.9rem; line-height: 1.3; }
.ai-h3 { font-size: clamp(1.45rem, 2.3vw, 1.9rem); font-stretch: 118%; margin-bottom: 14px; }
.ai-tag { display: inline-block; font-size: 0.75rem; font-weight: 600; color: var(--steel); border: 1px solid var(--rule); border-radius: 4px; padding: 1px 6px; margin-left: 8px; vertical-align: 1px; }
.ai-summary { margin-bottom: 16px; max-width: 70ch; }
.ai-points { display: grid; gap: 10px; margin-bottom: 20px; max-width: 72ch; }
.ai-points li { position: relative; padding-left: 20px; font-size: 0.97rem; }
.ai-points li::before { content: ""; position: absolute; left: 0; top: 0.72em; width: 9px; height: 2px; background: var(--scarlet); }
.ai-row .ai-chips { margin-bottom: 22px; }
.ai-row-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.ai-award { align-self: flex-start; font-size: 0.82rem; font-weight: 600; color: var(--scarlet); border: 1.5px solid currentColor; border-radius: 4px; padding: 5px 9px; line-height: 1.3; margin-bottom: 14px; }

/* Compact rows for smaller roles */
.ai-roles { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 16px; margin-top: 16px; }
.ai-role { display: flex; gap: 16px; align-items: flex-start; padding: 20px; background: var(--card); border: 1px solid var(--rule); border-radius: 8px; }
.ai-role-title { font-weight: 700; line-height: 1.3; }
.ai-role-meta { color: var(--steel); font-size: 0.9rem; margin-bottom: 8px; }
.ai-role p:last-child { font-size: 0.95rem; }

/* ---------- Project cards ---------- */
.ai-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: clamp(20px, 3vw, 32px); }
.ai-card { display: flex; flex-direction: column; text-align: left; cursor: pointer; background: none; border: 0; padding: 0; }
.ai-card .ai-photo { margin-bottom: 16px; transition: transform .2s; }
.ai-card:hover .ai-photo { transform: translateY(-3px); }
.ai-card-title { font-stretch: 112%; font-weight: 800; font-size: 1.25rem; line-height: 1.15; letter-spacing: -0.01em; margin-bottom: 4px; }
.ai-card:hover .ai-card-title { color: var(--scarlet); }
.ai-card-meta { color: var(--steel); font-size: 0.88rem; margin-bottom: 10px; }
.ai-card-summary { font-size: 0.95rem; color: #33383C; margin-bottom: 14px; }

/* ---------- Skills ---------- */
.ai-skillgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; }
.ai-skillcard { padding: 22px; background: var(--card); border: 1px solid var(--rule); border-radius: 8px; }
.ai-skillcard h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 14px; }
.ai-skillcard .ai-chip { background: var(--chalk); font-size: 0.88rem; padding: 5px 11px; }

/* ---------- Entrepreneurship ---------- */
.ai-comps > li { display: grid; grid-template-columns: 170px minmax(0, 1fr) auto; gap: 32px; align-items: start; padding: 28px 0; border-top: 1px solid var(--rule); }
.ai-comps > li:last-child { border-bottom: 1px solid var(--rule); }
.ai-comp-result { color: var(--scarlet); font-weight: 700; font-size: 1.05rem; line-height: 1.3; }
.ai-comp-year { color: var(--steel); font-size: 0.95rem; margin-top: 2px; }
.ai-comp-side { display: flex; gap: 14px; align-items: flex-start; }
.ai-comp-event { font-weight: 700; font-size: 1.2rem; line-height: 1.3; }
.ai-comp-title { color: var(--steel); margin: 2px 0 10px; }
.ai-comp-summary { max-width: 68ch; margin-bottom: 12px; }

/* ---------- Education timeline ---------- */
.ai-timeline > li { display: grid; grid-template-columns: 170px minmax(0, 1fr); gap: 32px; padding: 30px 0; border-top: 1px solid var(--rule); }
.ai-timeline > li:first-child { border-top: 0; padding-top: 0; }
.ai-when { color: var(--steel); font-size: 0.95rem; padding-top: 4px; }
.ai-edu { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 18px; align-items: start; }
.ai-exp-title { font-weight: 700; font-size: 1.2rem; line-height: 1.3; }
.ai-org { color: var(--steel); margin-bottom: 14px; }
.ai-timeline .ai-points { margin-bottom: 0; }
.ai-stats { margin: -4px 0 16px; }
.ai-stats .ai-chip { font-weight: 700; background: #fff; color: var(--graphite); }

/* Main timeline beside a narrower column of shorter programs */
.ai-edu-layout { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
.ai-edu-layout .ai-timeline > li { grid-template-columns: 160px minmax(0, 1fr); gap: 24px; }
.ai-programs-title { font-size: 1.05rem; font-weight: 700; padding-bottom: 12px; border-bottom: 2px solid var(--graphite); margin-bottom: 14px; }
.ai-programs { display: grid; gap: 12px; }
.ai-program { padding: 16px 18px; background: var(--card); border: 1px solid var(--rule); border-radius: 8px; }
.ai-program-head { display: flex; gap: 12px; align-items: flex-start; }
.ai-program-title { font-weight: 700; line-height: 1.3; }
.ai-program-meta { color: var(--steel); font-size: 0.88rem; line-height: 1.4; }
.ai-program-summary { font-size: 0.93rem; margin-top: 10px; }
.ai-program details { margin-top: 8px; }
.ai-program summary { cursor: pointer; font-size: 0.88rem; font-weight: 600; color: var(--steel); width: fit-content; }
.ai-program summary:hover { color: var(--graphite); }
.ai-program .ai-points { margin: 10px 0 0; gap: 6px; }
.ai-program .ai-points li { font-size: 0.9rem; }

/* Extra links under an experience row */
.ai-links { display: flex; flex-wrap: wrap; gap: 8px 20px; margin: -8px 0 20px; font-size: 0.92rem; }

/* ---------- Honors ---------- */
.ai-honors { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 16px; }
.ai-honor { display: flex; gap: 16px; align-items: flex-start; padding: 20px; background: var(--card); border: 1px solid var(--rule); border-radius: 8px; }
.ai-honor-year { color: var(--scarlet); font-weight: 700; font-size: 0.88rem; }
.ai-honor-title { font-weight: 700; line-height: 1.3; margin: 2px 0 4px; }
.ai-honor-note { color: var(--steel); font-size: 0.92rem; line-height: 1.45; }

/* ---------- Resume ---------- */
.ai-resume { background: var(--graphite); color: var(--chalk); padding: clamp(64px, 9vw, 104px) 0; }
.ai-resume-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
.ai-resume-copy p { color: #B7BCC1; max-width: 42ch; margin: 16px 0 28px; }
.ai-resume .ai-btn { border-color: var(--chalk); color: var(--chalk); }
.ai-resume .ai-btn:hover { background: var(--chalk); color: var(--graphite); }
.ai-resume .ai-btn-primary { border-color: var(--scarlet); color: #fff; }
.ai-resume .ai-btn-primary:hover { background: var(--scarlet-dark); border-color: var(--scarlet-dark); color: #fff; }
.ai-paper { background: #fff; border-radius: 4px; overflow: hidden; aspect-ratio: 8.5 / 11; max-width: 680px; box-shadow: 0 30px 60px rgba(0,0,0,.35); }
.ai-paper object { width: 100%; height: 100%; display: block; border: 0; }
.ai-paper-fallback { height: 100%; display: grid; place-items: center; text-align: center; color: var(--steel); padding: 24px; }

/* ---------- Contact ---------- */
.ai-contact { padding: clamp(72px, 10vw, 128px) 0 40px; }
.ai-contact-lede { font-size: clamp(1.2rem, 2vw, 1.45rem); max-width: 46ch; margin: 20px 0 36px; }
.ai-email {
  display: inline-flex; align-items: center; gap: 14px;
  font: 700 clamp(1.2rem, 3.4vw, 2.5rem)/1.2 var(--font); font-stretch: 112%; letter-spacing: -0.01em;
  background: none; border: 0; padding: 0 0 4px; cursor: copy;
  border-bottom: 3px solid var(--scarlet); text-align: left; word-break: break-all;
}
.ai-email:hover { color: var(--scarlet); }
.ai-email-hint { display: block; margin-top: 10px; font-size: 0.9rem; color: var(--steel); min-height: 1.5em; }
.ai-email-hint.is-done { color: #2F7D4F; font-weight: 600; }
.ai-socials { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 28px; }
.ai-footer { margin-top: clamp(64px, 9vw, 112px); padding-top: 20px; border-top: 1px solid var(--rule); color: var(--steel); font-size: 0.85rem; }

/* ---------- Side rail (custom scrollbar) ---------- */
.ai-rail { display: none; }
@media (min-width: 981px) and (pointer: fine) {
  .ai-rail { display: block; position: fixed; z-index: 20; right: 14px; top: 50%; transform: translateY(-50%); height: min(64vh, 560px); width: 28px; cursor: pointer; touch-action: none; user-select: none; }
}
.ai-rail-track { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: var(--rule); border-radius: 2px; }
.ai-rail-fill { position: absolute; left: 0; top: 0; width: 100%; background: var(--scarlet); border-radius: 2px; }
.ai-rail-thumb { position: absolute; left: 50%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: var(--scarlet); box-shadow: 0 0 0 3px var(--chalk); transition: transform .15s; }
.ai-rail:hover .ai-rail-thumb, .ai-rail.is-dragging .ai-rail-thumb { transform: scale(1.35); }
.ai-rail-mark { position: absolute; right: 0; width: 100%; height: 14px; margin-top: -7px; padding: 0; border: 0; background: none; cursor: pointer; }
.ai-rail-mark::before { content: ""; position: absolute; left: 50%; top: 50%; width: 10px; height: 2px; margin: -1px 0 0 -5px; background: var(--steel); border-radius: 2px; transition: width .15s, margin .15s, background .15s; }
.ai-rail-mark.is-active::before { background: var(--scarlet); width: 16px; margin-left: -8px; }
.ai-rail-label { position: absolute; right: 30px; top: 50%; transform: translateY(-50%); white-space: nowrap; font-size: 0.8rem; font-weight: 600; color: var(--graphite); background: var(--card); border: 1px solid var(--rule); border-radius: 4px; padding: 3px 8px; opacity: 0; pointer-events: none; transition: opacity .15s; }
.ai-rail:hover .ai-rail-label, .ai-rail-mark:focus-visible .ai-rail-label { opacity: 1; }
.ai-rail-mark.is-active .ai-rail-label { color: var(--scarlet); }

/* ---------- Detail pop-up with gallery ---------- */
.ai-scrim { position: fixed; inset: 0; z-index: 60; background: rgba(20,22,24,.72); display: grid; place-items: center; padding: 24px; animation: ai-fade .2s ease both; }
.ai-modal { position: relative; width: min(1080px, 100%); max-height: calc(100vh - 48px); overflow-y: auto; background: var(--chalk); border-radius: 6px; animation: ai-pop .25s cubic-bezier(.2,.7,.1,1) both; }
.ai-modal-close { position: sticky; top: 0; height: 0; z-index: 3; }
.ai-modal-close .ai-close { position: absolute; right: 12px; top: 12px; }
.ai-close { background: var(--chalk); border: 1.5px solid var(--graphite); border-radius: 4px; width: 42px; height: 42px; display: grid; place-items: center; cursor: pointer; }
.ai-close:hover { background: var(--graphite); color: var(--chalk); }
.ai-gallery { background: var(--graphite); }
.ai-gallery-main { position: relative; }
.ai-gallery-main .ai-photo { border-radius: 0; aspect-ratio: auto !important; height: min(62vh, 600px); background: var(--graphite); }
.ai-gallery-main .ai-photo img { object-fit: contain; }
.ai-gallery-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; border: 0; cursor: pointer; background: rgba(247,247,244,.92); color: var(--graphite); display: grid; place-items: center; }
.ai-gallery-nav:hover { background: #fff; }
.ai-gallery-prev { left: 14px; }
.ai-gallery-next { right: 14px; }
.ai-gallery-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 16px; color: #C9CDD1; font-size: 0.88rem; }
.ai-thumbs { display: flex; gap: 8px; padding: 0 16px 16px; overflow-x: auto; }
.ai-thumb { flex: none; width: 88px; padding: 0; border: 2px solid transparent; border-radius: 4px; background: none; cursor: pointer; opacity: .6; }
.ai-thumb.is-active { border-color: var(--scarlet); opacity: 1; }
.ai-thumb .ai-photo-empty span { font-size: 0.7rem; }
.ai-modal-body { padding: clamp(24px, 4vw, 44px) clamp(20px, 5vw, 56px) clamp(32px, 5vw, 56px); display: flex; flex-direction: column; }
.ai-modal-body .ai-summary { font-size: 1.05rem; }
.ai-modal-body .ai-post-text { padding: 0; font-size: 1rem; max-width: 70ch; }
.ai-modal-body .ai-post-head { padding: 0; }
.ai-story { margin: 12px 0 8px; display: grid; gap: 24px; }
.ai-story h4 { margin: 0 0 6px; font-size: 1.05rem; font-weight: 700; }
.ai-story p { color: #33383C; max-width: 68ch; }
.ai-modal-body .ai-points { margin-top: 24px; padding-top: 22px; border-top: 1px solid var(--rule); }
.ai-modal-body .ai-chips { margin-bottom: 22px; }
@keyframes ai-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ai-pop { from { transform: translateY(16px) scale(.985); opacity: 0; } to { transform: none; opacity: 1; } }

/* ---------- Responsive ---------- */
@media (max-width: 1140px) {
  .ai-nav { display: none; }
  .ai-menu-btn { display: inline-flex; }
  .ai-mobile-nav { display: block; border-top: 1px solid var(--rule); padding: 8px var(--gutter) 16px; max-height: calc(100vh - 64px); overflow-y: auto; }
  .ai-mobile-nav a { display: block; padding: 12px 0; font-size: 1.05rem; text-decoration: none; border-bottom: 1px solid var(--rule); }
}
@media (max-width: 980px) {
  .ai-hero-top, .ai-hero-grid, .ai-row, .ai-resume-grid { grid-template-columns: minmax(0, 1fr); }
  .ai-portrait { max-width: 380px; justify-self: start; }
  .ai-timeline > li, .ai-comps > li, .ai-edu-layout .ai-timeline > li { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .ai-edu-layout { grid-template-columns: minmax(0, 1fr); }
  .ai-paper { display: none; }
  .ai-scrim { padding: 0; }
  .ai-modal { max-height: 100vh; height: 100%; border-radius: 0; }
}
@media (max-width: 600px) {
  .ai-gallery-nav { width: 38px; height: 38px; }
  .ai-strip { gap: 14px; }
  .ai-strip .ai-logo { --s: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .ai-root *, .ai-root *::before, .ai-root *::after { animation: none !important; transition: none !important; }
}
`;

/* =====================================================================
   COMPONENTS
   ===================================================================== */

// Every item that can open in the pop-up, so any section can open any item by id
const ALL_ITEMS = [...INTERNSHIPS, ...TEAMS, ...PROJECTS, ...COMPETITIONS];

const firstImage = (item) => (item.images && item.images[0]) || {};
const orgName = (item) => item.orgLabel || (ORGS[item.org] && ORGS[item.org].name) || "";

function Photo({ src, alt, label, ratio = "4 / 3", org }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className="ai-photo" style={{ aspectRatio: ratio }}>
      {failed ? (
        <div className={`ai-photo-empty${org && ORGS[org] ? " has-logo" : ""}`} aria-hidden="true">
          {org && ORGS[org] ? <Logo org={org} size={112} /> : <span>{label}</span>}
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

// Organization logo in a white tile. Shows initials until the logo file exists.
function Logo({ org, size = 44, named = false }) {
  const o = ORGS[org];
  const [failed, setFailed] = useState(false);
  if (!o) return null;
  const words = o.name.split(/[\s-]+/);
  const initials = words.length === 1 ? words[0].slice(0, 4) : words.map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return (
    <span className="ai-logo" style={{ "--s": `${size}px` }} title={o.name}>
      {failed ? (
        <span className="ai-logo-initials" aria-label={named ? o.name : undefined}>{initials}</span>
      ) : (
        <img src={o.logo} alt={named ? o.name : ""} loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

function Chips({ items }) {
  if (!items || !items.length) return null;
  return (
    <ul className="ai-chips" aria-label="Skills">
      {items.map((s) => <li key={s} className="ai-chip">{s}</li>)}
    </ul>
  );
}

/* Copies text to the clipboard. Returns the current status
   ("copied", "failed", or false) and the copy function. */
function useCopy() {
  const [status, setStatus] = useState(false);
  const timer = useRef(null);
  const copy = useCallback(async (text) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Older browsers and some embedded previews block the clipboard API, so fall back
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    setStatus(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(false), 2400);
  }, []);
  return [status, copy];
}

/* Scrolls to a section with JavaScript instead of relying on the browser's
   built-in #anchor jump, which some embeds and previews block. */
function goTo(e, id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (e) e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {
    /* some sandboxed previews don't allow URL changes; scrolling still works */
  }
}

function Header() {
  const [open, setOpen] = useState(false);
  const navClick = (e, id) => {
    setOpen(false);
    goTo(e, id);
  };
  return (
    <header className="ai-header">
      <div className="ai-wrap ai-header-inner">
        <a href="#top" className="ai-mark" onClick={(e) => navClick(e, "top")}>{PROFILE.name.join(" ")}</a>
        <nav className="ai-nav" aria-label="Main">
          {SECTIONS.filter((s) => s.top).map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => navClick(e, s.id)}>{s.label}</a>
          ))}
          <a className="ai-btn ai-btn-small" href={PROFILE.resume} target="_blank" rel="noreferrer">
            Resume <Download size={15} />
          </a>
        </nav>
        <button className="ai-menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="ai-mobile-nav" aria-label="Mobile">
          {SECTIONS.slice(1).map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => navClick(e, s.id)}>{s.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* The side rail: shows how far down the page you are, marks each section,
   and lets you click a mark or drag anywhere on the rail to move. */
function ScrollRail() {
  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [marks, setMarks] = useState([]);
  const [active, setActive] = useState("top");
  const [dragging, setDragging] = useState(false);

  const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  useEffect(() => {
    const measure = () => {
      const max = maxScroll();
      setMarks(
        SECTIONS.map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          const top = el.getBoundingClientRect().top + window.scrollY - 64;
          return { ...s, pos: Math.min(1, Math.max(0, top / max)) };
        }).filter(Boolean)
      );
    };
    const onScroll = () => {
      const max = maxScroll();
      setProgress(Math.min(1, window.scrollY / max));
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
      }
      if (window.scrollY >= max - 2) current = SECTIONS[SECTIONS.length - 1].id;
      setActive(current);
    };
    measure();
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scrubTo = (clientY) => {
    const r = railRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    window.scrollTo({ top: ratio * maxScroll(), behavior: "auto" });
  };

  return (
    <nav
      ref={railRef}
      className={`ai-rail${dragging ? " is-dragging" : ""}`}
      aria-label="Page sections"
      onPointerDown={(e) => {
        if (e.target.closest(".ai-rail-mark")) return; // marks handle their own clicks
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        scrubTo(e.clientY);
      }}
      onPointerMove={(e) => dragging && scrubTo(e.clientY)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="ai-rail-track">
        <div className="ai-rail-fill" style={{ height: `${progress * 100}%` }} />
      </div>
      {marks.map((m) => (
        <button
          key={m.id}
          className={`ai-rail-mark${active === m.id ? " is-active" : ""}`}
          style={{ top: `${m.pos * 100}%` }}
          aria-label={`Go to ${m.label}`}
          aria-current={active === m.id ? "true" : undefined}
          onClick={(e) => goTo(e, m.id)}
        >
          <span className="ai-rail-label">{m.label}</span>
        </button>
      ))}
      <div className="ai-rail-thumb" style={{ top: `${progress * 100}%` }} />
    </nav>
  );
}

/* ---------------------------------------------------------------------
   CHASSIS VIEWPORT
   A tube-frame chassis drawn as a 3D wireframe that slowly turns, like a
   CAD viewport. Visitors can drag it to spin it. The geometry is just a
   list of points (x forward, y up, z sideways) and the lines joining
   them, so you could swap in your own frame's node coordinates later.
   --------------------------------------------------------------------- */

const CHASSIS = (() => {
  const nodes = [
    [-1.9, 0, -0.55], [-1.9, 0, 0.55], //  0, 1  rear lower
    [-0.5, 0, -0.6], [-0.5, 0, 0.6], //  2, 3  main hoop base
    [0.9, 0, -0.45], [0.9, 0, 0.45], //  4, 5  front hoop base
    [2.0, 0.08, -0.25], [2.0, 0.08, 0.25], //  6, 7  nose lower
    [-1.8, 0.65, -0.5], [-1.8, 0.65, 0.5], //  8, 9  rear upper
    [-0.55, 1.25, -0.45], [-0.55, 1.25, 0.45], // 10, 11 main hoop top
    [0.8, 0.6, -0.4], [0.8, 0.6, 0.4], // 12, 13 front hoop top
    [1.9, 0.42, -0.22], [1.9, 0.42, 0.22], // 14, 15 nose upper
    [-0.5, 0.55, -0.62], [-0.5, 0.55, 0.62], // 16, 17 main hoop mid
  ];
  const edges = [
    [0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], // lower rails
    [0, 1], [2, 3], [4, 5], [6, 7], // lower cross members
    [2, 16], [16, 10], [10, 11], [11, 17], [17, 3], // main hoop
    [0, 8], [1, 9], [8, 9], [8, 16], [9, 17], [8, 10], [9, 11], // rear box and hoop braces
    [16, 12], [17, 13], [4, 12], [5, 13], [12, 13], // side rails and front hoop
    [12, 14], [13, 15], [14, 15], [6, 14], [7, 15], // nose
    [0, 16], [1, 17], [16, 4], [17, 5], [4, 14], [5, 15], [10, 12], [11, 13], // triangulation
  ];
  // Wheels: two rings per tire joined by short lines, plus suspension links to the frame
  const wheelLines = [];
  const hubs = [
    { c: [-1.55, 0.05, -1.0], mounts: [0, 8] },
    { c: [-1.55, 0.05, 1.0], mounts: [1, 9] },
    { c: [1.55, 0.05, -0.95], mounts: [4, 12] },
    { c: [1.55, 0.05, 0.95], mounts: [5, 13] },
  ];
  const R = 0.36;
  const SEG = 28;
  hubs.forEach(({ c, mounts }) => {
    const ring = (dz) =>
      Array.from({ length: SEG }, (_, i) => {
        const t = (i / SEG) * Math.PI * 2;
        return [c[0] + R * Math.cos(t), c[1] + R * Math.sin(t), c[2] + dz];
      });
    const a = ring(-0.1);
    const b = ring(0.1);
    for (let i = 0; i < SEG; i++) {
      wheelLines.push([a[i], a[(i + 1) % SEG]], [b[i], b[(i + 1) % SEG]]);
      if (i % 4 === 0) wheelLines.push([a[i], b[i]]);
    }
    mounts.forEach((m) => wheelLines.push([nodes[m], c]));
  });
  return { nodes, edges, wheelLines, groundY: 0.05 - R };
})();

function ChassisViewport() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let yaw = 0.75;
    let pitch = -0.36;
    let raf = 0;
    let visible = true;
    let drag = null;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const scale = Math.min(w / 5.4, h / 2.7);
      const cam = 7;
      const project = ([x, y, z]) => {
        const x1 = x * cy - z * sy;
        const z1 = x * sy + z * cy;
        const y0 = y - 0.45;
        const y1 = y0 * cp - z1 * sp;
        const z2 = y0 * sp + z1 * cp;
        const k = cam / (cam - z2);
        return [w / 2 + x1 * scale * k, h * 0.54 - y1 * scale * k, z2];
      };
      // Lines farther from the viewer are drawn fainter, which reads as depth
      const line = (a, b, rgb, strength = 1) => {
        const p = project(a);
        const q = project(b);
        const depth = Math.min(1, Math.max(0, ((p[2] + q[2]) / 2 + 2.2) / 4.4));
        ctx.strokeStyle = `rgba(${rgb},${(strength * (0.25 + 0.65 * depth)).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
        ctx.stroke();
      };

      // Ground grid
      ctx.lineWidth = 1;
      const g = CHASSIS.groundY;
      for (let i = -4; i <= 4; i++) {
        line([i * 0.6, g, -1.8], [i * 0.6, g, 1.8], "86,93,100", 0.3);
        line([-2.4, g, i * 0.45], [2.4, g, i * 0.45], "86,93,100", 0.3);
      }
      // Wheels and suspension
      ctx.lineWidth = 1;
      CHASSIS.wheelLines.forEach(([a, b]) => line(a, b, "86,93,100"));
      // Frame tubes
      ctx.lineWidth = 1.6;
      CHASSIS.edges.forEach(([a, b]) => line(CHASSIS.nodes[a], CHASSIS.nodes[b], "28,31,34"));
      // Welded nodes
      ctx.fillStyle = "#C8102E";
      CHASSIS.nodes.forEach((n) => {
        const [x, y] = project(n);
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      if (!drag) yaw += 0.0035;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onDown = (e) => {
      drag = { x: e.clientX, y: e.clientY, yaw, pitch };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag) return;
      yaw = drag.yaw + (e.clientX - drag.x) * 0.01;
      pitch = Math.min(-0.08, Math.max(-0.8, drag.pitch - (e.clientY - drag.y) * 0.006));
      if (reduce) draw();
    };
    const onUp = () => {
      drag = null;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
    });
    const ro = new ResizeObserver(resize);

    resize();
    ro.observe(canvas);
    io.observe(canvas);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <figure className="ai-viewport">
      <canvas ref={canvasRef} role="img" aria-label="Rotating 3D wireframe of a tube-frame vehicle chassis" />
      <figcaption>Tube-frame chassis study. Drag to rotate.</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------
   LINKAGE VIEWPORT
   A four-bar linkage (crank, coupler, rocker, and fixed ground link)
   solved in real time. A point on the coupler traces its coupler curve,
   drawn in scarlet. Visitors can grab the drawing to turn the crank.
   Link lengths below satisfy the Grashof condition (s + l <= p + q),
   so the short crank can rotate all the way around.
   --------------------------------------------------------------------- */

const LINKAGE = { crank: 1, coupler: 3.1, rocker: 2.6, ground: 3, px: 1.7, py: 1.3 };

function solveLinkage(theta) {
  const { crank, coupler, rocker, ground, px, py } = LINKAGE;
  const A = [0, 0];
  const D = [ground, 0];
  const B = [crank * Math.cos(theta), crank * Math.sin(theta)];
  // C sits where a circle around B (coupler length) meets a circle around D (rocker length)
  const dx = D[0] - B[0];
  const dy = D[1] - B[1];
  const dist = Math.hypot(dx, dy);
  const along = (coupler * coupler - rocker * rocker + dist * dist) / (2 * dist);
  const h = Math.sqrt(Math.max(0, coupler * coupler - along * along));
  const mx = B[0] + (along * dx) / dist;
  const my = B[1] + (along * dy) / dist;
  const C = [mx - (h * dy) / dist, my + (h * dx) / dist];
  // The tracer point rides on the coupler plate, offset from B
  const ux = (C[0] - B[0]) / coupler;
  const uy = (C[1] - B[1]) / coupler;
  const P = [B[0] + ux * px - uy * py, B[1] + uy * px + ux * py];
  return { A, B, C, D, P };
}

function LinkageViewport() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const STEPS = 360;
    const curve = Array.from({ length: STEPS }, (_, i) => solveLinkage((i / STEPS) * Math.PI * 2));

    // Fit the whole motion into the canvas
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    curve.forEach((s) => [s.A, s.B, s.C, s.D, s.P].forEach(([x, y]) => {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }));
    minY -= 0.45; // room for the ground symbols

    let w = 0, h = 0, scale = 1, ox = 0, oy = 0;
    let theta = 1.1;
    let raf = 0;
    let visible = true;
    let dragging = false;

    const toScreen = ([x, y]) => [ox + x * scale, oy - y * scale];
    const toWorld = (sx, sy) => [(sx - ox) / scale, (oy - sy) / scale];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pad = 18;
      scale = Math.min((w - pad * 2) / (maxX - minX), (h - pad * 2 - 18) / (maxY - minY));
      ox = (w - (maxX - minX) * scale) / 2 - minX * scale;
      oy = pad + maxY * scale;
      draw();
    };

    const ground = ([x, y]) => {
      const [sx, sy] = toScreen([x, y]);
      ctx.strokeStyle = "rgba(28,31,34,.8)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - 11, sy + 16);
      ctx.lineTo(sx + 11, sy + 16);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx - 17, sy + 16);
      ctx.lineTo(sx + 17, sy + 16);
      ctx.stroke();
      ctx.lineWidth = 1;
      for (let i = -15; i <= 15; i += 6) {
        ctx.beginPath();
        ctx.moveTo(sx + i, sy + 16);
        ctx.lineTo(sx + i - 5, sy + 22);
        ctx.stroke();
      }
    };

    // Links are drawn as outlined bars, like a mechanism drawing
    const bar = (a, b) => {
      const [x1, y1] = toScreen(a);
      const [x2, y2] = toScreen(b);
      ctx.lineCap = "round";
      ctx.strokeStyle = "#1C1F22";
      ctx.lineWidth = 13;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.strokeStyle = "#F7F7F4";
      ctx.lineWidth = 10;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    };

    const joint = (p) => {
      const [x, y] = toScreen(p);
      ctx.fillStyle = "#F7F7F4";
      ctx.strokeStyle = "#1C1F22";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#1C1F22";
      ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
    };

    const draw = () => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const s = solveLinkage(theta);

      // Full coupler curve, dashed
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = "rgba(86,93,100,.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      curve.forEach((c, i) => {
        const [x, y] = toScreen(c.P);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Scarlet trail behind the tracer point, fading out
      const k = Math.round((((theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * STEPS);
      const TRAIL = 110;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      for (let i = TRAIL; i > 0; i--) {
        const a = curve[(k - i + STEPS) % STEPS].P;
        const b = curve[(k - i + 1 + STEPS) % STEPS].P;
        const [x1, y1] = toScreen(a);
        const [x2, y2] = toScreen(b);
        ctx.strokeStyle = `rgba(200,16,46,${(1 - i / TRAIL).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }

      // Ground link (dashed centerline) and pivots
      ctx.setLineDash([10, 4, 2, 4]);
      ctx.strokeStyle = "rgba(86,93,100,.6)";
      ctx.lineWidth = 1;
      const [ax, ay] = toScreen(s.A);
      const [dx, dy] = toScreen(s.D);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(dx, dy); ctx.stroke();
      ctx.setLineDash([]);
      ground(s.A);
      ground(s.D);

      // Coupler plate
      const tri = [s.B, s.C, s.P].map(toScreen);
      ctx.fillStyle = "rgba(200,16,46,.07)";
      ctx.strokeStyle = "rgba(28,31,34,.85)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(tri[0][0], tri[0][1]); ctx.lineTo(tri[1][0], tri[1][1]); ctx.lineTo(tri[2][0], tri[2][1]);
      ctx.closePath(); ctx.fill(); ctx.stroke();

      bar(s.D, s.C);
      bar(s.B, s.C);
      bar(s.A, s.B);
      [s.A, s.B, s.C, s.D].forEach(joint);

      const [px, py] = toScreen(s.P);
      ctx.fillStyle = "#C8102E";
      ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();

      // Crank angle readout
      const deg = Math.round(((((theta * 180) / Math.PI) % 360) + 360) % 360);
      ctx.fillStyle = "#565D64";
      ctx.font = "600 12px Archivo, Helvetica, Arial, sans-serif";
      ctx.fillText(`Crank angle ${String(deg).padStart(3, "\u2007")}\u00b0`, Math.max(4, ox + minX * scale), h - 4);
    };

    const loop = () => {
      if (!dragging) theta += 0.013;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    // Grab anywhere to turn the crank toward the pointer
    const pointerAngle = (e) => {
      const r = canvas.getBoundingClientRect();
      const [x, y] = toWorld(e.clientX - r.left, e.clientY - r.top);
      return Math.atan2(y, x);
    };
    const onDown = (e) => {
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
      theta = pointerAngle(e);
      if (reduce) draw();
    };
    const onMove = (e) => {
      if (!dragging) return;
      // Keep the angle continuous so the trail doesn't jump
      const target = pointerAngle(e);
      let delta = target - (theta % (Math.PI * 2));
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      theta += delta;
      if (reduce) draw();
    };
    const onUp = () => {
      dragging = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
    });
    const ro = new ResizeObserver(resize);

    resize();
    ro.observe(canvas);
    io.observe(canvas);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <figure className="ai-viewport">
      <canvas ref={canvasRef} role="img" aria-label="Animated four-bar linkage tracing its coupler curve" />
      <figcaption>Four-bar linkage tracing its coupler curve. Grab it to turn the crank.</figcaption>
    </figure>
  );
}

function CopyEmailButton() {
  const [status, copy] = useCopy();
  return (
    <button className={`ai-btn${status === "copied" ? " is-done" : ""}`} onClick={() => copy(PROFILE.email)} aria-live="polite">
      {status === "copied" ? <><Check size={17} /> Email copied</> : <><Copy size={17} /> Copy email</>}
    </button>
  );
}

function Hero() {
  return (
    <section className="ai-hero" id="top">
      <div className="ai-wrap">
        <div className="ai-hero-top">
          <h1 className="ai-name ai-display">
            <span className="ai-mask"><span>{PROFILE.name[0]}</span></span>
            <span className="ai-mask"><span>{PROFILE.name[1]}</span></span>
          </h1>
          {HERO_VISUAL === "chassis" ? <ChassisViewport /> : <LinkageViewport />}
        </div>
        <div className="ai-hero-grid">
          <div>
            <p className="ai-lede">{PROFILE.headline}</p>
            <p className="ai-intro">{PROFILE.intro}</p>
            <div className="ai-actions">
              <a className="ai-btn ai-btn-primary" href={PROFILE.resume} download={PROFILE.resumeDownloadName}>
                <Download size={17} /> Download resume
              </a>
              <CopyEmailButton />
            </div>
            <p className="ai-now"><strong>Now:</strong> {PROFILE.now}</p>
          </div>
          <figure className="ai-portrait">
            <Photo src={PROFILE.headshot} alt={`Portrait of ${PROFILE.name.join(" ")}`} label="" ratio="4 / 5" />
            <figcaption>{PROFILE.headshotCaption}</figcaption>
          </figure>
        </div>
        <div className="ai-strip">
          <p className="ai-strip-label">Where I've worked, studied, and competed</p>
          <div className="ai-strip-logos">
            {LOGO_STRIP.map((k) => <Logo key={k} org={k} size={52} named />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mosaic({ images, onOpen, label }) {
  if (!images || !images.length) return null;
  const shown = images.slice(0, 3);
  const extra = images.length - shown.length;
  const ratioFor = (i) => (shown.length === 1 || (shown.length === 3 && i === 0) ? "1.91 / 1" : shown.length === 2 ? "1 / 1" : "4 / 3");
  return (
    <button className={`ai-mosaic n${shown.length}`} onClick={onOpen} aria-label={`Open ${images.length} photos from ${label}`}>
      {shown.map((im, i) => (
        <span className="ai-mosaic-cell" key={im.src || i}>
          <Photo src={im.src} alt={im.alt} label="" ratio={ratioFor(i)} />
          {i === shown.length - 1 && extra > 0 && <span className="ai-mosaic-more">+{extra}</span>}
        </span>
      ))}
    </button>
  );
}

function PostHead({ post }) {
  return (
    <div className="ai-post-head">
      <img src={PROFILE.headshot} alt="" className="ai-avatar" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
      <div>
        <p className="ai-post-name">{PROFILE.name.join(" ")}</p>
        <p className="ai-post-date">{post.date}</p>
      </div>
    </div>
  );
}

function Post({ post, onOpen }) {
  const long = post.text.length > 200 || post.text.split("\n").length > 4;
  return (
    <article className="ai-post">
      <PostHead post={post} />
      <p className={`ai-post-text${long ? " is-clamped" : ""}`}>{post.text}</p>
      {long && <button className="ai-more" onClick={onOpen}>See more</button>}
      <div className="ai-post-spacer" />
      <Mosaic images={post.images} onOpen={onOpen} label={`the ${post.date} update`} />
    </article>
  );
}

function Updates({ onOpenPost }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft <= 4);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const slide = (dir) => {
    const t = trackRef.current;
    const card = t.querySelector(".ai-post");
    const step = card ? card.getBoundingClientRect().width + 18 : t.clientWidth * 0.8;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="ai-section" id="updates">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <div>
            <h2 className="ai-h2 ai-display">What I've been up to</h2>
            <p className="ai-section-sub" style={{ marginTop: 12 }}>
              Recent posts, also on{" "}
              <a className="ai-textlink" href={PROFILE.linkedinActivity} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={14} />
              </a>
            </p>
          </div>
          <div className="ai-slider-controls">
            <button className="ai-btn ai-btn-icon" onClick={() => slide(-1)} disabled={atStart} aria-label="Previous posts">
              <ArrowLeft size={18} />
            </button>
            <button className="ai-btn ai-btn-icon" onClick={() => slide(1)} disabled={atEnd} aria-label="Next posts">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="ai-track" ref={trackRef} onScroll={update} tabIndex={0} aria-label="Posts, scroll sideways">
          {POSTS.map((p) => <Post key={p.id} post={p} onOpen={() => onOpenPost(p.id)} />)}
        </div>
      </div>
    </section>
  );
}

function PhotoButton({ item, onOpen, ratio }) {
  const img = firstImage(item);
  const count = item.images ? item.images.length : 0;
  return (
    <button className="ai-photo-btn" onClick={() => onOpen(item.id)} aria-label={`Open ${item.title}`}>
      <Photo src={img.src} alt={img.alt} label={item.title} ratio={ratio} org={item.org} />
      {count > 1 && <span className="ai-photo-count">{count} photos</span>}
    </button>
  );
}

function OrgHead({ item, size = 48 }) {
  return (
    <div className="ai-orghead">
      {item.org && <Logo org={item.org} size={size} />}
      <div>
        <p className="ai-orghead-name">{orgName(item)}</p>
        <p className="ai-orghead-meta">
          {item.period}
          {item.location ? `, ${item.location}` : ""}
          {item.tag && <span className="ai-tag">{item.tag}</span>}
        </p>
      </div>
    </div>
  );
}

function BigRow({ item, onOpen }) {
  return (
    <article className="ai-row">
      <PhotoButton item={item} onOpen={onOpen} ratio="4 / 3" />
      <div className="ai-row-body">
        {item.award && <p className="ai-award">{item.award}</p>}
        <OrgHead item={item} />
        <h3 className="ai-h3 ai-display">{item.title}</h3>
        <p className="ai-summary">{item.summary}</p>
        <ul className="ai-points">
          {item.points.slice(0, 3).map((p) => <li key={p}>{p}</li>)}
        </ul>
        <Chips items={item.skills} />
        {item.links?.length > 0 && (
          <div className="ai-links">
            {item.links.map((l) => (
              <a key={l.href} className="ai-textlink" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
        <div className="ai-row-actions">
          <button className="ai-btn ai-btn-small" onClick={() => onOpen(item.id)}>View details</button>
        </div>
      </div>
    </article>
  );
}

function Experience({ onOpen }) {
  return (
    <section className="ai-section" id="experience">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <h2 className="ai-h2 ai-display">Experience</h2>
          <p className="ai-section-sub">Internships, fellowships, and the engineering teams I've led or built on.</p>
        </div>
        <div className="ai-group">
          <h3 className="ai-group-title">Internships and fellowships</h3>
          {INTERNSHIPS.map((i) => <BigRow key={i.id} item={i} onOpen={onOpen} />)}
        </div>
        <div className="ai-group">
          <h3 className="ai-group-title">Engineering teams</h3>
          {TEAMS.map((i) => <BigRow key={i.id} item={i} onOpen={onOpen} />)}
        </div>
        <div className="ai-group">
          <h3 className="ai-group-title">Leadership and mentoring</h3>
          <div className="ai-roles">
            {ROLES.map((r) => (
              <article key={r.title} className="ai-role">
                <Logo org={r.org} size={48} />
                <div>
                  <p className="ai-role-title">{r.title}</p>
                  <p className="ai-role-meta">{r.orgLabel}, {r.period}</p>
                  <p>{r.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpen }) {
  return (
    <section className="ai-section" id="projects">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <h2 className="ai-h2 ai-display">Projects</h2>
          <p className="ai-section-sub">Smaller builds and side projects. Select one for photos and details.</p>
        </div>
        <div className="ai-cards">
          {PROJECTS.map((p) => {
            const img = firstImage(p);
            return (
              <button key={p.id} className="ai-card" onClick={() => onOpen(p.id)}>
                <Photo src={img.src} alt={img.alt} label={p.title} ratio="3 / 2" org={p.org} />
                <span className="ai-card-title">{p.title}</span>
                <span className="ai-card-meta">
                  {orgName(p)}, {p.period}
                  {p.tag && <span className="ai-tag">{p.tag}</span>}
                </span>
                <span className="ai-card-summary">{p.summary}</span>
                <Chips items={p.skills} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="ai-section" id="skills">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <h2 className="ai-h2 ai-display">Skills</h2>
          <p className="ai-section-sub">The software, tools, and shop equipment I work with.</p>
        </div>
        <div className="ai-skillgrid">
          {SKILLS.map((g) => (
            <div key={g.group} className="ai-skillcard">
              <h3>{g.group}</h3>
              <Chips items={g.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Entrepreneurship({ onOpen }) {
  return (
    <section className="ai-section" id="entrepreneurship">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <h2 className="ai-h2 ai-display">Entrepreneurship</h2>
          <p className="ai-section-sub">{ENTREPRENEURSHIP_INTRO}</p>
        </div>
        <ul className="ai-comps">
          {COMPETITIONS.map((c) => (
            <li key={c.id}>
              <div>
                <p className="ai-comp-result">{c.result}</p>
                <p className="ai-comp-year">{c.year}</p>
              </div>
              <div className="ai-comp-side">
                {c.org && <Logo org={c.org} size={48} />}
                <div>
                  <h3 className="ai-comp-event">{c.event}</h3>
                  <p className="ai-comp-title">{c.title}</p>
                  <p className="ai-comp-summary">{c.summary}</p>
                  <Chips items={c.skills} />
                </div>
              </div>
              {c.story && (
                <button className="ai-btn ai-btn-small" onClick={() => onOpen(c.id)}>View details</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="ai-section" id="education">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <h2 className="ai-h2 ai-display">Education</h2>
          <p className="ai-section-sub">My degree and high school, plus the shorter programs I've completed along the way.</p>
        </div>
        <div className="ai-edu-layout">
          <ol className="ai-timeline">
            {EDUCATION.map((e) => (
              <li key={e.title}>
                <p className="ai-when">{e.when}</p>
                <div className="ai-edu">
                  <Logo org={e.org} size={56} />
                  <div>
                    <h3 className="ai-exp-title">{e.title}</h3>
                    <p className="ai-org">{e.orgLabel}</p>
                    {e.stats && (
                      <ul className="ai-chips ai-stats" aria-label="Highlights">
                        {e.stats.map((x) => <li key={x} className="ai-chip">{x}</li>)}
                      </ul>
                    )}
                    <ul className="ai-points">
                      {e.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <aside aria-labelledby="ai-programs-title">
            <h3 id="ai-programs-title" className="ai-programs-title">Programs and certifications</h3>
            <ul className="ai-programs">
              {PROGRAMS.map((p) => (
                <li key={p.title} className="ai-program">
                  <div className="ai-program-head">
                    <Logo org={p.org} size={40} />
                    <div>
                      <p className="ai-program-title">{p.title}</p>
                      <p className="ai-program-meta">{p.orgLabel}</p>
                      <p className="ai-program-meta">
                        {p.when}
                        {p.tag && <span className="ai-tag">{p.tag}</span>}
                      </p>
                    </div>
                  </div>
                  <p className="ai-program-summary">{p.summary}</p>
                  {p.points?.length > 0 && (
                    <details>
                      <summary>Details</summary>
                      <ul className="ai-points">
                        {p.points.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    </details>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Honors() {
  return (
    <section className="ai-section" id="honors">
      <div className="ai-wrap">
        <div className="ai-section-head">
          <h2 className="ai-h2 ai-display">Honors</h2>
          <p className="ai-section-sub">Awards, scholarships, and selective programs.</p>
        </div>
        <ul className="ai-honors">
          {HONORS.map((h) => (
            <li key={h.title} className="ai-honor">
              <Logo org={h.org} size={48} />
              <div>
                <p className="ai-honor-year">{h.year}</p>
                <p className="ai-honor-title">{h.title}</p>
                <p className="ai-honor-note">{h.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="ai-resume" id="resume">
      <div className="ai-wrap ai-resume-grid">
        <div className="ai-resume-copy">
          <h2 className="ai-h2 ai-display">Resume</h2>
          <p>Everything on this site on one page, formatted for applications and career fairs.</p>
          <div className="ai-actions" style={{ marginBottom: 0 }}>
            <a className="ai-btn ai-btn-primary" href={PROFILE.resume} download={PROFILE.resumeDownloadName}>
              <Download size={17} /> Download PDF
            </a>
            <a className="ai-btn" href={PROFILE.resume} target="_blank" rel="noreferrer">
              Open in new tab <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="ai-paper">
          <object data={`${PROFILE.resume}#view=FitH&toolbar=0`} type="application/pdf" aria-label="Resume preview">
            <div className="ai-paper-fallback">
              <p>
                Your browser can't show the PDF here.{" "}
                <a href={PROFILE.resume} target="_blank" rel="noreferrer">Open the resume</a>.
              </p>
            </div>
          </object>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, copy] = useCopy();
  const hint =
    status === "copied"
      ? "Copied to your clipboard."
      : status === "failed"
      ? "Couldn't copy automatically. Select the address above to copy it."
      : "Click the address to copy it.";
  return (
    <section className="ai-contact" id="contact">
      <div className="ai-wrap">
        <h2 className="ai-h2 ai-display">Get in touch</h2>
        <p className="ai-contact-lede">
          I'm looking for Summer 2027 internships, and I'm always glad to talk about vehicles, robots, AI tools,
          or starting a student engineering team.
        </p>
        <button className="ai-email" onClick={() => copy(PROFILE.email)}>
          {PROFILE.email}
          {status === "copied" ? <Check size={28} /> : <Copy size={26} />}
        </button>
        <span className={`ai-email-hint${status === "copied" ? " is-done" : ""}`} aria-live="polite">{hint}</span>
        <div className="ai-socials">
          <a className="ai-textlink" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
          <a className="ai-textlink" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
        </div>
        <footer className="ai-footer">
          © {new Date().getFullYear()} {PROFILE.name.join(" ")}. Designed and built with React, Vite, and Claude AI.
        </footer>
      </div>
    </section>
  );
}

function Gallery({ images, label, org }) {
  const list = images && images.length ? images : [{}];
  const [idx, setIdx] = useState(0);
  const many = list.length > 1;
  const go = useCallback((d) => setIdx((i) => (i + d + list.length) % list.length), [list.length]);

  useEffect(() => {
    if (!many) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [many, go]);

  const current = list[idx];
  return (
    <div className="ai-gallery">
      <div className="ai-gallery-main">
        <Photo key={current.src || idx} src={current.src} alt={current.alt} label={label} ratio="16 / 10" org={current.src ? undefined : org} />
        {many && (
          <>
            <button className="ai-gallery-nav ai-gallery-prev" onClick={() => go(-1)} aria-label="Previous photo">
              <ArrowLeft size={20} />
            </button>
            <button className="ai-gallery-nav ai-gallery-next" onClick={() => go(1)} aria-label="Next photo">
              <ArrowRight size={20} />
            </button>
          </>
        )}
      </div>
      {(many || current.caption) && (
        <div className="ai-gallery-bar">
          <span>{current.caption || ""}</span>
          {many && <span>{idx + 1} / {list.length}</span>}
        </div>
      )}
      {many && (
        <div className="ai-thumbs">
          {list.map((im, i) => (
            <button key={im.src || i} className={`ai-thumb${i === idx ? " is-active" : ""}`} onClick={() => setIdx(i)} aria-label={`Show photo ${i + 1}`}>
              <Photo src={im.src} alt="" label={String(i + 1)} ratio="4 / 3" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Shared pop-up shell: dims the page, closes on Escape or a click outside
function Modal({ onClose, labelledBy, children }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="ai-scrim" onClick={onClose}>
      <div className="ai-modal" role="dialog" aria-modal="true" aria-labelledby={labelledBy} onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-close">
          <button ref={closeRef} className="ai-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ItemModal({ item, onClose }) {
  return (
    <Modal onClose={onClose} labelledBy="ai-modal-title">
      <Gallery images={item.images} label={item.title} org={item.org} />
      <div className="ai-modal-body">
        {item.award && <p className="ai-award">{item.award}</p>}
        <OrgHead item={item} />
        <h3 id="ai-modal-title" className="ai-h3 ai-display">{item.title}</h3>
        <p className="ai-summary">{item.summary}</p>
        {item.story && (
          <div className="ai-story">
            {item.story.map((s) => (
              <div key={s.heading}>
                <h4>{s.heading}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        )}
        {item.points?.length > 0 && (
          <ul className="ai-points">
            {item.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}
        <Chips items={item.skills} />
        {item.links?.length > 0 && (
          <div className="ai-row-actions">
            {item.links.map((l) => (
              <a key={l.href} className="ai-btn ai-btn-small" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

function PostModal({ post, onClose }) {
  return (
    <Modal onClose={onClose} labelledBy="ai-post-title">
      <Gallery images={post.images} label="" />
      <div className="ai-modal-body">
        <div id="ai-post-title"><PostHead post={post} /></div>
        <p className="ai-post-text" style={{ marginTop: 16 }}>{post.text}</p>
      </div>
    </Modal>
  );
}

export default function PortfolioSite() {
  const [open, setOpen] = useState(null); // { kind: "item" | "post", id }
  const close = useCallback(() => setOpen(null), []);
  const openItem = useCallback((id) => setOpen({ kind: "item", id }), []);
  const openPost = useCallback((id) => setOpen({ kind: "post", id }), []);

  const item = open?.kind === "item" && ALL_ITEMS.find((i) => i.id === open.id);
  const post = open?.kind === "post" && POSTS.find((p) => p.id === open.id);

  return (
    <div className="ai-root">
      <style>{CSS}</style>
      <Header />
      <ScrollRail />
      <main>
        <Hero />
        <Updates onOpenPost={openPost} />
        <Experience onOpen={openItem} />
        <Projects onOpen={openItem} />
        <Skills />
        <Entrepreneurship onOpen={openItem} />
        <Education />
        <Honors />
        <Resume />
        <Contact />
      </main>
      {item && <ItemModal item={item} onClose={close} />}
      {post && <PostModal post={post} onClose={close} />}
    </div>
  );
}
