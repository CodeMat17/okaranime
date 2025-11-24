"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import LogoComponent from "./LogoComponent";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Impact", href: "/impact" },
  { name: "Programs", href: "/programs" },

  // { name: "Partners", href: "/partners" },
  { name: "News", href: "/news" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
  { name: "Apply", href: "/apply" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b shadow-2xl py-2"
          : "bg-transparent border-transparent py-4"
      }`}>
      <div className='w-full  px-4 sm:px-6'>
        <div className='flex h-14 lg:h-16 items-center justify-between'>
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-1'>
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-primary"
                      : "text-foreground/80"
                  } relative px-2 xl:px-4 py-2 text-sm font-semibold  hover:text-foreground transition-colors group`}>
                  {item.name}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    // whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className='hidden lg:flex items-center gap-3 shrink-0'>
            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='ghost'
                size='icon'
                className='h-10 w-10 rounded-xl'
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              </Button>
            </motion.div>

            {/* Donate Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}>
              <Button
                size='sm'
                className='rounded-xl px-4 font-semibold bg-linear-to-r from-primary to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300'
                asChild>
                <Link href='/donate'>Donate Now</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className='flex items-center gap-2 lg:hidden'>
            {/* Theme Toggle - Mobile */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant='ghost'
                size='icon'
                className='h-10 w-10 rounded-xl'
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              </Button>
            </motion.div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-10 w-10 rounded-xl'>
                    <Menu className='h-5 w-5' />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-[85vw] max-w-sm sm:max-w-md border-l-0 bg-background/95 backdrop-blur-xl p-5'>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className='flex flex-col h-full'>
                  {/* Mobile Navigation Links */}
                  <nav className='flex-1 mt-8'>
                    <div className=''>
                      {navigationItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}>
                          <Link
                            href={item.href}
                            className='block py-4 text-lg font-semibold transition-all duration-300 border-b border-border/30 hover:border-primary hover:text-primary hover:pl-4'
                            onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Actions */}
                  <div className='space-y-4 pt-6 border-t border-border/50'>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        asChild
                        className='w-full h-11 rounded-xl font-semibold bg-linear-to-r from-primary to-primary/70'
                        onClick={() => setIsOpen(false)}>
                        <Link href='/donate'>Donate Now</Link>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
