"use client";

import { motion } from "framer-motion";
import { Creepster } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const creepster = Creepster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-creepster",
});

const LogoComponent = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='flex items-center gap-3 shrink-0'>
      <Link href='/' className='flex items-center space-x-2'>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className='flex h-10 w-10 items-center justify-center shadow-lg'>
          <Image alt='logo' priority width={35} height={35} src='/logo.png' />
        </motion.div>

        <span
          className={`${creepster.className} text-2xl tracking-wide font-black bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent`}>
          OKARANIME
        </span>
      </Link>
    </motion.div>
  );
};

export default LogoComponent;
