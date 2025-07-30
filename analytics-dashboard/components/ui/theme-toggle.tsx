'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function handleToggle() {
    document.body.classList.add('theme-transition');
    setTheme(theme === 'light' ? 'dark' : 'light');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 400); // matches your transition duration
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
