'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import DotField from "@/components/DotField";
import PhysicsIcons from "@/components/PhysicsIcons";
import { ArrowRight, FileText, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
  { name: 'Golang', icon: 'https://cdn.simpleicons.org/go' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', invertInDark: true },
  { name: 'React.js', icon: 'https://cdn.simpleicons.org/react' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs' },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma', invertInDark: true },
  { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb' },
  { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
];

const PROJECTS_EN = [
  {
    title: "SPEKTRE",
    subtitle: "PPG Administration Platform",
    date: "Jan 2026 - Apr 2026",
    description: "Developed a microteaching management and reporting platform for the Teacher Professional Education (PPG) program, streamlining workflows for university administrators and students.",
    responsibilities: [
      "Designed and implemented microteaching administration and reporting workflows.",
      "Optimized document and grade management for 15+ active lecturers, staff, and students.",
      "Built reliable API endpoints and structured PostgreSQL databases via Prisma ORM."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    link: "https://ppguksw.cloud/spektre",
    linkLabel: "ppguksw.cloud/spektre"
  },
  {
    title: "iCAST 2025",
    subtitle: "Conference Website",
    date: "Nov 2025 - Dec 2025",
    description: "Built the official international conference portal for iCAST 2025, enabling participant registrations and secure administrative processing.",
    responsibilities: [
      "Streamlined participant registration and payment proof submission workflows.",
      "Managed conference administration dashboards for 20+ organizers from multiple countries.",
      "Containerized application environments using Docker to ensure seamless deployment."
    ],
    stack: ["Vue.js", "PHP", "SQLite", "Docker"],
    link: "https://icast2025.uksw.edu",
    linkLabel: "icast2025.uksw.edu"
  },
  {
    title: "KampuskuFloraku",
    subtitle: "Asset & Research Platform",
    date: "Sept 2025 - Jan 2026",
    description: "Developed a campus vegetation management system to document campus flora and aid botanical research and university asset tracking.",
    responsibilities: [
      "Enabled interactive campus vegetation documentation and plant taxonomy cataloging.",
      "Designed QR-code-based plant identification sheets for visitor accessibility.",
      "Built database structures supporting flora asset location tracking and research data."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    link: "https://kampuskufloraku.uksw.edu",
    linkLabel: "kampuskufloraku.uksw.edu"
  },
  {
    title: "Eventra",
    subtitle: "UISPP 2025 Event Management",
    date: "Jun 2025 - Nov 2025",
    description: "Developed a high-performance event management system for the UISPP 2025 conference to support large-scale attendee check-ins.",
    responsibilities: [
      "Supported conference attendee registration and real-time event administration.",
      "Created QR-based attendance tracking, checking in 400+ international researchers.",
      "Engineered high-performance relational database structures in PostgreSQL."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"]
  },
  {
    title: "GKMI Sion Church",
    subtitle: "Information & Management System",
    date: "Feb 2024 - May 2024",
    description: "Built an administrative management system to digitize and manage church congregation records, marriages, and educational programs.",
    responsibilities: [
      "Streamlined congregation directories and catechism class registrations.",
      "Developed legal and administrative forms processing for marriage registration.",
      "Provided an administration panel supporting 15+ active church managers."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    link: "https://gkmision.org",
    linkLabel: "gkmision.org"
  }
];

const PROJECTS_ID = [
  {
    title: "SPEKTRE",
    subtitle: "Platform Administrasi PPG",
    date: "Jan 2026 - Apr 2026",
    description: "Mengembangkan platform manajemen dan pelaporan microteaching untuk program Pendidikan Profesi Guru (PPG), menyederhanakan alur kerja bagi administrator universitas dan mahasiswa.",
    responsibilities: [
      "Merancang dan mengimplementasikan alur kerja administrasi dan pelaporan microteaching.",
      "Mengoptimalkan manajemen dokumen dan nilai untuk 15+ dosen aktif, staf, dan mahasiswa.",
      "Membangun endpoint API yang andal dan struktur database PostgreSQL melalui Prisma ORM."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    link: "https://ppguksw.cloud/spektre",
    linkLabel: "ppguksw.cloud/spektre"
  },
  {
    title: "iCAST 2025",
    subtitle: "Situs Web Konferensi",
    date: "Nov 2025 - Dec 2025",
    description: "Membangun portal resmi konferensi internasional untuk iCAST 2025, memfasilitasi registrasi peserta dan pemrosesan administrasi yang aman.",
    responsibilities: [
      "Menyederhanakan alur kerja registrasi peserta dan pengiriman bukti pembayaran.",
      "Mengelola dasbor administrasi konferensi untuk 20+ penyelenggara dari berbagai negara.",
      "Melakukan kontainerisasi lingkungan aplikasi menggunakan Docker untuk memastikan penyebaran yang lancar."
    ],
    stack: ["Vue.js", "PHP", "SQLite", "Docker"],
    link: "https://icast2025.uksw.edu",
    linkLabel: "icast2025.uksw.edu"
  },
  {
    title: "KampuskuFloraku",
    subtitle: "Platform Aset & Penelitian",
    date: "Sept 2025 - Jan 2026",
    description: "Mengembangkan sistem manajemen vegetasi kampus untuk mendokumentasikan flora kampus dan membantu penelitian botani serta pelacakan aset universitas.",
    responsibilities: [
      "Memungkinkan dokumentasi vegetasi kampus interaktif dan katalogisasi taksonomi tumbuhan.",
      "Merancang lembar identifikasi tanaman berbasis kode QR untuk aksesibilitas pengunjung.",
      "Membangun struktur database yang mendukung pelacakan lokasi aset flora dan data penelitian."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    link: "https://kampuskufloraku.uksw.edu",
    linkLabel: "kampuskufloraku.uksw.edu"
  },
  {
    title: "Eventra",
    subtitle: "UISPP 2025 Manajemen Acara",
    date: "Jun 2025 - Nov 2025",
    description: "Mengembangkan sistem manajemen acara berkinerja tinggi untuk konferensi UISPP 2025 guna mendukung check-in peserta dalam skala besar.",
    responsibilities: [
      "Mendukung pendaftaran peserta konferensi dan administrasi acara secara waktu nyata.",
      "Membuat pelacakan kehadiran berbasis QR, melakukan check-in untuk 400+ peneliti internasional.",
      "Merekayasa struktur database relasional berkinerja tinggi di PostgreSQL."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"]
  },
  {
    title: "GKMI Sion Church",
    subtitle: "Sistem Informasi & Manajemen",
    date: "Feb 2024 - May 2024",
    description: "Membangun sistem manajemen administratif untuk mendigitalisasi dan mengelola catatan jemaat gereja, pernikahan, dan program pendidikan.",
    responsibilities: [
      "Menyederhanakan direktori jemaat dan pendaftaran kelas katekisasi.",
      "Mengembangkan pemrosesan formulir hukum dan administratif untuk pendaftaran pernikahan.",
      "Menyediakan panel administrasi yang mendukung 15+ pengelola gereja aktif."
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    link: "https://gkmision.org",
    linkLabel: "gkmision.org"
  }
];

const TRANSLATIONS = {
  EN: {
    hero: {
      greeting: "Hello",
      nameIntroduce: ", My name is",
      cta: "Let's begin"
    },
    about: {
      prefix: "01. Biography",
      title: "About Me",
      p1: "I am a passionate full-stack developer with 3+ years of experience building scalable web applications for academic and institutional projects. I specialize in end-to-end development, stakeholder collaboration, and transforming ideas into reliable, user-focused digital solutions.",
      p2: "My philosophy is simple: Every detail has a purpose, and every line of code has a reason. I believe that software should not only function flawlessly but also feel satisfying, responsive, and delightful to interact with.",
      p3: "Currently, I collaborate with university stakeholders to build web-based systems supporting academic operations while maintaining a strong academic focus.",
      cvButton: "Curriculum Vitae",
      techHeader: "Technical Stack",
      locHeader: "Current Location",
      eduHeader: "Education",
      uni: "Satya Wacana Christian University",
      degree: "Bachelor of Informatics Engineering (Aug 2023 - Present)"
    },
    works: {
      prefix: "02. Selected Works",
      title: "Selected Works",
      detailsPrefix: "02. Project details",
      detailsTitle: "Project Details",
      contributions: "Key Contributions"
    },
    journal: {
      prefix: "03. Journal",
      title: "The Journal",
      quote: "“Writing about web architecture, developer workflows, and the mechanics of interaction design. Coming soon.”"
    },
    contact: {
      credits: "Designed & Developed by",
      cta: "Let's begin.",
      tagline: "“Every detail has a purpose.\nEvery line of code has a reason.”"
    }
  },
  ID: {
    hero: {
      greeting: "Halo",
      nameIntroduce: ", Nama saya",
      cta: "Mari mulai"
    },
    about: {
      prefix: "01. Biografi",
      title: "Tentang Saya",
      p1: "Saya adalah pengembang full-stack yang antusias dengan pengalaman 3+ tahun dalam membangun aplikasi web yang skalabel untuk proyek akademis dan institusional. Saya berspesialisasi dalam pengembangan end-to-end, kolaborasi pemangku kepentingan, dan mengubah ide menjadi solusi digital yang andal dan berfokus pada pengguna.",
      p2: "Filosofi saya sederhana: Setiap detail memiliki tujuan, dan setiap baris kode memiliki alasan. Saya percaya bahwa perangkat lunak tidak hanya harus berfungsi tanpa cela tetapi juga terasa memuaskan, responsif, dan menyenangkan saat digunakan.",
      p3: "Saat ini, saya berkolaborasi dengan pemangku kepentingan universitas untuk membangun sistem berbasis web yang mendukung operasi akademik sambil mempertahankan fokus akademik yang kuat.",
      cvButton: "Curriculum Vitae",
      techHeader: "Keahlian Teknis",
      locHeader: "Lokasi Saat Ini",
      eduHeader: "Pendidikan",
      uni: "Universitas Kristen Satya Wacana",
      degree: "Sarjana Teknik Informatika (Agu 2023 - Sekarang)"
    },
    works: {
      prefix: "02. Karya Pilihan",
      title: "Karya Pilihan",
      detailsPrefix: "02. Detail proyek",
      detailsTitle: "Detail Proyek",
      contributions: "Kontribusi Utama"
    },
    journal: {
      prefix: "03. Jurnal",
      title: "Jurnal",
      quote: "“Menulis tentang arsitektur web, alur kerja pengembang, dan mekanika desain interaksi. Segera hadir.”"
    },
    contact: {
      credits: "Didesain & Dikembangkan oleh",
      cta: "Mari mulai.",
      tagline: "“Setiap detail memiliki tujuan.\nSetiap baris kode memiliki alasan.”"
    }
  }
};

const Home = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isProgrammatic, setIsProgrammatic] = useState(false);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');

  useEffect(() => {
    const handleLangEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLang(customEvent.detail.lang);
    };
    window.addEventListener('language-change', handleLangEvent);
    return () => window.removeEventListener('language-change', handleLangEvent);
  }, []);

  const PROJECTS = lang === 'EN' ? PROJECTS_EN : PROJECTS_ID;
  const t = lang === 'EN' ? TRANSLATIONS.EN : TRANSLATIONS.ID;

  useEffect(() => {
    const handleScrollEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsProgrammatic(customEvent.detail.active);
      if (customEvent.detail.active && typeof customEvent.detail.targetIdx === 'number') {
        setActiveProjectIdx(customEvent.detail.targetIdx);
      }
    };
    window.addEventListener('programmatic-scroll', handleScrollEvent);
    return () => window.removeEventListener('programmatic-scroll', handleScrollEvent);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (isProgrammatic) return;

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (rect.top > window.innerHeight) {
        setActiveProjectIdx(0);
        return;
      }
      if (rect.bottom < 0) {
        setActiveProjectIdx(PROJECTS.length - 1);
        return;
      }

      const idx = Math.min(
        Math.floor(latest * PROJECTS.length),
        PROJECTS.length - 1
      );
      setActiveProjectIdx(idx);
    });
  }, [scrollYProgress, isProgrammatic, PROJECTS]);

  const bgY = useTransform(scrollY, [0, 1000], [0, -250]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.65]);

  const iconsY = useTransform(scrollY, [0, 1000], [0, -450]);
  const iconsOpacity = useTransform(scrollY, [0, 600], [1, 0.35]);

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-background -z-20" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: bgY, opacity: bgOpacity }}
          className="absolute inset-0 z-5"
        >
          <DotField
            dotRadius={1}
            dotSpacing={24}
            waveAmplitude={0}
            maxScale={2.5}
            cursorRadius={120}
          />
        </motion.div>

        <motion.div
          style={{ y: iconsY, opacity: iconsOpacity }}
          className="absolute inset-0 z-10 overflow-hidden"
        >
          <PhysicsIcons />
        </motion.div>
      </div>

      <section className="relative z-20 flex flex-col justify-center min-h-screen px-8 sm:px-12 lg:px-24 pointer-events-none">
        <div id="hero-text-area" className="flex flex-col pointer-events-auto w-fit pl-2 sm:pl-10 md:pl-26 lg:pl-42">
          <p className="text-lg md:text-xl mb-2 opacity-60">
            {t.hero.greeting} <span className="animate-wave-scale inline-block">👋</span>{t.hero.nameIntroduce}
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-heading leading-[1.1] lg:leading-26 tracking-tighter">
            Joevano <br />
            <span className="text-primary ml-4 md:ml-6">Pangangkat</span>
          </h1>

          <div className="mt-10">
            <motion.button
              whileHover="hover"
              initial="initial"
              className="relative group flex items-center gap-4 pl-6 pr-1.5 py-1.5 rounded-full border border-primary/10 bg-primary/2 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/20"
              onClick={() => {
                const contactEl = document.getElementById('contact-section');
                if (contactEl) {
                  window.dispatchEvent(new CustomEvent('programmatic-scroll', { detail: { active: true, targetIdx: 4 } }));
                  const targetTop = window.scrollY + contactEl.getBoundingClientRect().top;
                  window.scrollTo({ top: targetTop, behavior: 'smooth' });
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('programmatic-scroll', { detail: { active: false } }));
                  }, 1000);
                }
              }}
            >
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 22 }
                }}
                transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
                className="absolute right-1 top-1.5 w-9 h-9 bg-foreground rounded-full z-0 origin-center pointer-events-none"
              />

              <span className="relative z-10 text-sm font-medium text-foreground group-hover:text-background transition-colors duration-400 tracking-tight ">
                {t.hero.cta}
              </span>

              <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-foreground transition-all duration-300 group-hover:bg-foreground">
                <ArrowRight size={16} className="text-background transition-colors duration-300" />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      <section
        id="about-section"
        className="relative z-10 min-h-screen px-8 sm:px-12 lg:px-24 py-32 flex flex-col justify-center"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-foreground/3 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-background -z-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-20">
          <div className="flex flex-col mb-16 lg:max-w-[58.33%] w-full items-center text-center">
            <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
              {t.about.prefix}
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-none">
              {lang === 'EN' ? (
                <>About <span className="italic font-serif text-foreground/80">Me</span></>
              ) : (
                <>Tentang <span className="italic font-serif text-foreground/80">Saya</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 flex flex-col gap-6 text-base md:text-lg text-foreground/75 leading-relaxed font-sans text-justify">
              <p>{t.about.p1}</p>
              <p>
                {lang === 'EN' ? (
                  <>My philosophy is simple: <strong className="text-foreground font-semibold">Every detail has a purpose, and every line of code has a reason.</strong> I believe that software should not only function flawlessly but also feel satisfying, responsive, and delightful to interact with.</>
                ) : (
                  <>Filosofi saya sederhana: <strong className="text-foreground font-semibold">Setiap detail memiliki tujuan, dan setiap baris kode memiliki alasan.</strong> Saya percaya bahwa perangkat lunak tidak hanya harus berfungsi tanpa cela tetapi juga terasa memuaskan, responsif, dan menyenangkan saat digunakan.</>
                )}
              </p>
              <p>{t.about.p3}</p>

              <div className="mt-8 flex justify-center lg:justify-start w-full">
                <a
                  href="/Joevano_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center gap-4 pl-1.5 pr-6 py-1.5 rounded-full border border-primary/10 bg-primary/2 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/20 cursor-pointer pointer-events-auto"
                >
                  <div
                    className="absolute left-1 top-1.5 w-9 h-9 bg-foreground rounded-full z-0 origin-center pointer-events-none transition-transform duration-400 ease-[0.77,0,0.175,1] scale-1 group-hover:scale-[22]"
                  />

                  <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-foreground transition-all duration-300 group-hover:bg-foreground">
                    <FileText size={16} className="text-background transition-colors duration-300" />
                  </div>

                  <span className="relative z-10 text-sm font-medium text-foreground group-hover:text-background transition-colors duration-400 tracking-tight">
                    {t.about.cvButton}
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase opacity-45 mb-4">{t.about.techHeader}</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill.name}
                      className="tech-tag inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-foreground/10 bg-foreground/2 hover:bg-foreground/5 hover:border-foreground/20 transition-all duration-300 cursor-default"
                    >
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className={`w-3.5 h-3.5 object-contain ${skill.invertInDark ? 'dark:invert' : ''}`}
                        width={14}
                        height={14}
                        unoptimized
                      />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <h3 className="text-xs font-semibold tracking-wider opacity-45 mb-3">{t.about.locHeader}</h3>
                <p className="text-sm font-medium text-foreground/85">Salatiga, Central Java, Indonesia</p>
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase opacity-45 mb-3">{t.about.eduHeader}</h3>
                <p className="text-sm font-medium text-foreground/85 leading-relaxed">
                  {t.about.uni} <br />
                  <span className="opacity-60 text-xs font-normal">{t.about.degree}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="work-section"
        ref={containerRef}
        className="relative z-10 lg:h-[350vh] min-h-screen"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-foreground/3 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-background -z-20 pointer-events-none" />

        <div className={`hidden lg:flex w-full flex-col justify-start overflow-hidden pt-32 pb-12 z-20 ${isProgrammatic ? 'relative h-screen' : 'sticky top-0 h-screen'}`}>
          <div className="flex flex-col mb-12 items-center text-center w-full z-20">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">{t.works.prefix}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-none">
              {lang === 'EN' ? (
                <>Selected <span className="italic font-serif text-foreground/80">Works</span></>
              ) : (
                <>Karya <span className="italic font-serif text-foreground/80">Pilihan</span></>
              )}
            </h2>
          </div>

          <div className="max-w-7xl mx-auto w-full px-8 sm:px-16 lg:px-24 grid grid-cols-12 gap-16 items-center">

            <div className="col-span-7 h-[60vh] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />

              <div
                className="flex flex-col gap-0 transition-transform duration-700 ease-[0.25,1,0.5,1]"
                style={{ transform: `translateY(calc(30vh - ${activeProjectIdx * 192}px - 96px))` }}
              >
                {PROJECTS.map((project, idx) => {
                  const isActive = activeProjectIdx === idx;
                  return (
                    <div
                      key={project.title}
                      className="h-48 flex flex-col justify-center transition-all duration-500 select-none cursor-pointer pointer-events-auto origin-left"
                      onClick={() => {
                        if (containerRef.current) {
                          const rect = containerRef.current.getBoundingClientRect();
                          const scrollTop = window.scrollY + rect.top;
                          const scrollRange = rect.height - window.innerHeight;
                          const targetScroll = scrollTop + (idx / (PROJECTS.length - 1)) * scrollRange;
                          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className={`font-mono text-xs mb-2 transition-colors duration-500 ${
                        isActive ? 'text-primary' : 'text-foreground/20'
                      }`}>
                        0{idx + 1} / 0{PROJECTS.length}
                      </span>
                      <h3 className={`text-4xl lg:text-6xl font-sans font-extrabold tracking-tighter transition-all duration-500 origin-left ${
                        isActive
                          ? 'text-foreground scale-100 opacity-100'
                          : 'text-foreground/10 hover:text-foreground/25 scale-[0.96] opacity-30'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm font-medium tracking-tight mt-2 transition-colors duration-500 ${
                        isActive ? 'text-primary' : 'text-foreground/15'
                      }`}>
                        {project.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-span-5 pl-12 flex flex-col items-start justify-start py-4 self-start relative">
              <div className="absolute left-0 top-4 w-px h-[48vh] bg-foreground/5 pointer-events-none" />

              <div className="mb-6">
                <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-1.5 block">{t.works.detailsPrefix}</span>
                <h3 className="text-2xl lg:text-3xl font-heading tracking-tight leading-none text-foreground/95">
                  {lang === 'EN' ? (
                    <>Project <span className="italic font-serif text-foreground/85">Details</span></>
                  ) : (
                    <>Detail <span className="italic font-serif text-foreground/85">Proyek</span></>
                  )}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIdx}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col gap-6"
                >
                  <p className="text-base text-foreground/75 leading-relaxed font-sans text-justify">
                    {PROJECTS[activeProjectIdx].description}
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-xs font-semibold tracking-wider uppercase opacity-45">{t.works.contributions}</h4>
                    <ul className="list-disc pl-5 text-sm text-foreground/70 leading-relaxed font-sans flex flex-col gap-2">
                      {PROJECTS[activeProjectIdx].responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-wrap gap-2">
                      {PROJECTS[activeProjectIdx].stack.map((tech) => {
                        const skillData = SKILLS.find(s => s.name.toLowerCase() === tech.toLowerCase());
                        return (
                          <span
                            key={tech}
                            className="tech-tag inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-foreground/10 bg-foreground/2 hover:bg-foreground/5 hover:border-foreground/20 transition-all duration-300 cursor-default"
                          >
                            {skillData && (
                              <Image
                                src={skillData.icon}
                                alt={`${tech} icon`}
                                className={`w-3.5 h-3.5 object-contain ${skillData.invertInDark ? 'dark:invert' : ''}`}
                                width={14}
                                height={14}
                                unoptimized
                              />
                            )}
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {PROJECTS[activeProjectIdx].link && (
                    <a
                      href={PROJECTS[activeProjectIdx].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-primary/20 bg-primary/2 backdrop-blur-md hover:bg-foreground hover:text-background hover:border-transparent transition-all duration-300 w-fit pointer-events-auto mt-4"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        <div className="lg:hidden block px-8 sm:px-12 py-24 max-w-xl mx-auto w-full relative z-20">
          <div className="flex flex-col mb-16 items-center text-center">
            <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">{t.works.prefix}</span>
            <h2 className="text-3xl font-heading tracking-tight leading-none">
              {lang === 'EN' ? (
                <>Selected <span className="italic font-serif text-foreground/80">Works</span></>
              ) : (
                <>Karya <span className="italic font-serif text-foreground/80">Pilihan</span></>
              )}
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.title}
                className="flex flex-col gap-5 border-b border-foreground/5 pb-12 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-primary mb-0.5">02. Project 0{idx + 1}</span>
                  <h3 className="text-2xl font-sans font-bold tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-primary font-medium tracking-tight">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex flex-col gap-5 border-l border-primary/20 pl-4 py-1">
                  <p className="text-sm text-foreground/75 leading-relaxed text-justify">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-[10px] font-semibold tracking-wider uppercase opacity-45">{t.works.contributions}</h4>
                    <ul className="list-disc pl-4 text-xs text-foreground/70 leading-relaxed flex flex-col gap-1">
                      {project.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => {
                        const skillData = SKILLS.find(s => s.name.toLowerCase() === tech.toLowerCase());
                        return (
                          <span
                            key={tech}
                            className="tech-tag inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded-lg border border-foreground/10 bg-foreground/2"
                          >
                            {skillData && (
                              <Image
                                src={skillData.icon}
                                alt={`${tech} icon`}
                                className={`w-3 h-3 object-contain ${skillData.invertInDark ? 'dark:invert' : ''}`}
                                width={12}
                                height={12}
                                unoptimized
                              />
                            )}
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-primary/20 bg-primary/2 w-fit pointer-events-auto mt-2"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="blog-section"
        className="relative z-10 min-h-screen px-8 sm:px-12 lg:px-24 py-32 flex flex-col justify-center animate-fade-in"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-foreground/3 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-background -z-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center text-center">
          <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 block">{t.journal.prefix}</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-none mb-12">
            {lang === 'EN' ? (
              <>The <span className="italic font-serif text-foreground/80">Journal</span></>
            ) : (
              <>Jurnal</>
            )}
          </h2>

          <p className="text-2xl md:text-4xl text-foreground/60 italic leading-relaxed max-w-2xl mt-4 font-heading">
            {t.journal.quote}
          </p>
        </div>
      </section>

      <section
        id="contact-section"
        className="relative z-10 min-h-screen px-8 sm:px-12 lg:px-24 py-32 flex flex-col justify-center"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-foreground/3 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-background -z-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            <div className="lg:col-span-7 flex flex-col items-start select-none">
              <span className="text-foreground/45 text-xs font-sans tracking-wide mb-4 block">
                {t.contact.credits}
              </span>
              <div className="flex flex-col gap-0 font-sans font-light tracking-tight leading-[0.95] text-6xl md:text-8xl lg:text-9xl">
                <span className="text-foreground/80">Joevano</span>
                <span className="text-primary font-medium">Alfeus</span>
                <span className="text-foreground/80">Pangangkat</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between h-full gap-12 lg:gap-24 py-8 lg:py-0 pl-8 lg:pl-16">

              <div className="flex flex-col items-start gap-4">
                <h3 className="text-4xl md:text-5xl font-heading tracking-tight leading-none text-foreground">
                  {lang === 'EN' ? (
                    <>Let&apos;s <span className="italic font-serif text-foreground/80">begin.</span></>
                  ) : (
                    <>Mari <span className="italic font-serif text-foreground/80">mulai.</span></>
                  )}
                </h3>
                <a
                  href="mailto:usvaino@gmail.com"
                  className="group flex items-baseline gap-2 text-xl md:text-2xl font-medium text-foreground/60 hover:text-primary transition-all duration-300 font-sans break-all"
                >
                  <span className="border-b border-foreground/15 group-hover:border-primary transition-colors pb-0.5">usvaino@gmail.com</span>
                  <span className="text-primary font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>

              <p className="text-sm md:text-base text-foreground/45 leading-relaxed font-sans max-w-sm italic">
                {t.contact.tagline.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx === 0 && <br />}
                  </span>
                ))}
              </p>

              <div className="flex flex-col gap-1 text-xs font-sans tracking-wide text-foreground/35 mt-6">
                <span>Salatiga, Indonesia — 2026</span>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
