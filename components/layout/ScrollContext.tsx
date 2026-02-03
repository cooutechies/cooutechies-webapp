"use client";

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

interface ScrollContextType {
  registerSection: (id: string, ref: HTMLElement | null) => void;
  scrollToSection: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const pathname = usePathname();

  const registerSection = useCallback((id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionsRef.current.set(id, ref);
    } else {
      sectionsRef.current.delete(id);
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = sectionsRef.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Handle hash in URL on mount and route change
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Small delay to ensure sections are registered
      const timeout = setTimeout(() => {
        scrollToSection(hash);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [pathname, scrollToSection]);

  return (
    <ScrollContext.Provider value={{ registerSection, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within ScrollProvider");
  }
  return context;
}

// Custom hook for registering sections
export function useScrollSection(id: string) {
  const { registerSection } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerSection(id, sectionRef.current);
    return () => registerSection(id, null);
  }, [id, registerSection]);

  return sectionRef;
}
