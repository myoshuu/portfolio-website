'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SOCIALS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 3.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    href: 'https://github.com/myoshuu',
    label: 'GitHub'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: 'https://instagram.com/joevano_',
    label: 'Instagram'
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-2.05-3.06-2.05 0-2.36 1.6-2.36 2.96v5.7h-3.56V9h3.41v1.56h.05c.48-.91 1.63-1.86 3.39-1.86 3.63 0 4.31 2.39 4.31 5.5v6.25z"/>
      </svg>
    ),
    href: 'https://linkedin.com/in/joevano/',
    label: 'LinkedIn'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.13.57-.074 1.758-.706 2.003-1.388.245-.682.245-1.267.172-1.388-.073-.121-.267-.196-.563-.346"/>
        <path d="M12.004 0C5.378 0 .004 5.376.004 12c0 2.112.551 4.16 1.597 5.978L0 24l6.188-1.623c1.743.948 3.71 1.447 5.816 1.447 6.626 0 12-5.376 12-12s-5.374-12-12-12zm.004 21.992c-1.808 0-3.58-.485-5.123-1.401l-.367-.218-3.805.997 1.015-3.708-.24-.381a9.988 9.988 0 0 1-1.528-5.281c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
      </svg>
    ),
    href: 'https://wa.me/6289526970708',
    label: 'WhatsApp'
  },
];

export default function SocialSidebar() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-18 bottom-6 md:bottom-0 z-40 flex md:flex-col items-center gap-4 md:gap-6 bg-background/30 backdrop-blur-xl md:bg-transparent px-5 py-2.5 md:px-0 md:py-0 rounded-full border border-foreground/5 md:border-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex md:flex-col gap-5 md:gap-6"
      >
        {SOCIALS.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.1 }}
            className="text-foreground/40 hover:text-primary transition-colors duration-300 cursor-pointer"
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 96 }} // 24rem -> 96px
        transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
        className="hidden md:block w-[1px] bg-primary/30"
      />
    </div>
  );
}
