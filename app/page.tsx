'use client';

import DotField from "@/components/DotField";
import PhysicsIcons from "@/components/PhysicsIcons";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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
];

const Home = () => {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 1000], [0, -250]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.65]);

  const iconsY = useTransform(scrollY, [0, 1000], [0, -450]);
  const iconsOpacity = useTransform(scrollY, [0, 600], [1, 0.35]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 bg-background -z-20" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="theme-wipe-target absolute inset-0 z-0" />

        <motion.div
          style={{ y: bgY, opacity: bgOpacity }}
          className="absolute inset-0 z-0"
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
          <p className="text-lg md:text-xl mb-2 opacity-60">Hello <span className="animate-wave-scale">👋</span>, My name</p>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-heading leading-[1.1] lg:leading-26 tracking-tighter">
            Joevano <br />
            <span className="text-primary ml-4 md:ml-6">Pangangkat</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg max-w-sm opacity-60 font-sans leading-relaxed">
            Every detail has a purpose. <br /> Every line of code has a reason
          </p>

          <div className="mt-10">
            <motion.button
              whileHover="hover"
              initial="initial"
              className="relative group flex items-center gap-4 pl-6 pr-1.5 py-1.5 rounded-full border border-primary/10 bg-primary/2 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/20"
              onClick={() => {
                const aboutEl = document.getElementById('about-section');
                aboutEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 22 }
                }}
                transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
                className="absolute right-[4px] top-1.5 w-9 h-9 bg-foreground rounded-full z-0 origin-center pointer-events-none"
              />

              <span className="relative z-10 text-sm font-medium text-foreground group-hover:text-background transition-colors duration-400 tracking-tight ">
                Let&apos;s begin
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
        className="relative z-10 min-h-screen px-8 sm:px-12 lg:px-24 py-32 flex flex-col justify-center border-t border-foreground/3"
      >
        <div className="absolute inset-0 bg-background -z-20 pointer-events-none" />
        <div className="theme-wipe-target absolute inset-0 -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-20">
          <div className="flex flex-col mb-16">
            <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">01. Biography</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-none">
              About <span className="italic font-serif text-foreground/80">Me</span>
            </h2>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-base md:text-lg text-foreground/75 leading-relaxed font-sans">
              <p>
                I am a passionate full-stack developer with 3+ years of experience building scalable web applications for academic and institutional projects. I specialize in end-to-end development, stakeholder collaboration, and transforming ideas into reliable, user-focused digital solutions.
              </p>
              <p>
                My philosophy is simple: <strong className="text-foreground font-semibold">Every detail has a purpose, and every line of code has a reason.</strong> I believe that software should not only function flawlessly but also feel satisfying, responsive, and delightful to interact with.
              </p>
              <p>
                Currently, I collaborate with university stakeholders to build web-based systems supporting academic operations while maintaining a strong academic focus.
              </p>
            </div>

            {/* Right Details/Focus Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase opacity-45 mb-4">Technical Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill.name}
                      className="tech-tag inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] hover:border-foreground/20 transition-all duration-300 cursor-default"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className={`w-3.5 h-3.5 object-contain ${skill.invertInDark ? 'dark:invert' : ''}`}
                      />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase opacity-45 mb-3">Current Location</h3>
                <p className="text-sm font-medium text-foreground/85">Salatiga, Central Java, Indonesia</p>
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase opacity-45 mb-3">Education</h3>
                <p className="text-sm font-medium text-foreground/85 leading-relaxed">
                  Satya Wacana Christian University <br />
                  <span className="opacity-60 text-xs font-normal">Bachelor of Informatics Engineering (Aug 2023 - Present)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
