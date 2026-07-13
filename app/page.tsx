'use client';

import DotField from "@/components/DotField";
import PhysicsIcons from "@/components/PhysicsIcons";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Base Background Layer */}
      <div className="absolute inset-0 bg-background -z-20" />

      {/* Background Dot Pattern */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1}
          dotSpacing={24}
          waveAmplitude={0}
          maxScale={2.5}
          cursorRadius={120}
        />
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
        <PhysicsIcons />
      </div>

      <section className="relative z-20 flex flex-col justify-center min-h-screen px-8 sm:px-12 lg:px-24 pointer-events-none">
        <div id="hero-text-area" className="flex flex-col pointer-events-auto w-fit pl-12 sm:pl-28 md:pl-26 lg:pl-42">
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
            >
              {/* The "Liquid" background circle that spreads */}
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 22 }
                }}
                transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
                className="absolute right-[4px] top-1.5 w-9 h-9 bg-foreground rounded-full z-0 origin-center pointer-events-none"
              />

              <span className="relative z-10 text-sm font-medium text-foreground group-hover:text-background transition-colors duration-400 tracking-tight ">
                Let's begin
              </span>

              <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-foreground transition-all duration-300 group-hover:bg-foreground">
                <ArrowRight size={16} className="text-background transition-colors duration-300" />
              </div>
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
