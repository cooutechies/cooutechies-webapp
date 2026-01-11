"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

const slides = [
  {
    id: 1,
    title: "Innovate. Create. Dominate.",
    subtitle: "Welcome to COOU Techies",
    description:
      "Where future tech leaders are born. Join the most vibrant tech community in Chukwuemeka Odumegwu Ojukwu University.",
    image: "/event-1.jpeg",
  },
  {
    id: 2,
    title: "Build The Future",
    subtitle: "Learn. Collaborate. Grow.",
    description:
      "Access cutting-edge workshops, hackathons, and mentorship programs designed to accelerate your tech journey.",
    image: "/event-2.jpeg",
  },
  {
    id: 3,
    title: "Community First",
    subtitle: "Together We Rise",
    description:
      "Connect with like-minded innovators, share knowledge, and build projects that make a difference.",
    image: "/event-3.jpeg",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme || "light";

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrentSlide((prev) => (prev + dir + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    },
    [currentSlide]
  );

  const slide = slides[currentSlide];

  // Slide animation variants
  const slideVariants = {
    enter: { opacity: 0 },
    center: { zIndex: 1, opacity: 1 },
    exit: { zIndex: 0, opacity: 0 },
  };

  // Text animation variants
  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Base layer - prevents flash, adapts to theme */}
      <div
        className={`absolute inset-0 z-0 transition-colors duration-500 ${
          theme === "dark" ? "bg-black" : "bg-background"
        }`}
      />

      {/* Background Images Stack */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 1,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="absolute inset-0"
          >
            {/* Image Layer */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.05 }}
              transition={{
                duration: 1,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            />

            {/* Overlay - Lighter to show more image */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/50" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60" />

            {/* Vignette - Moderate */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle animated glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-50">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary blur-[160px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex h-full items-start pt-32 pb-24 md:items-center md:pt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-4xl"
            >
              {/* Badge */}
              <motion.div
                variants={textVariants}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/20 backdrop-blur-xl px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-primary/20">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  {slide.subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={textVariants}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]"
              >
                {slide.title.includes(".") ? (
                  <>
                    <span className="block mb-2">
                      {slide.title.split(".")[0]}.
                    </span>
                    {slide.title.split(".")[1] && (
                      <span className="block text-gradient drop-shadow-lg">
                        {slide.title.split(".").slice(1).join(".").trim()}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="block text-gradient drop-shadow-lg">
                    {slide.title}
                  </span>
                )}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={textVariants}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-6 max-w-2xl text-base text-white/90 sm:text-lg leading-relaxed font-medium drop-shadow-md"
              >
                {slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={textVariants}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-wrap gap-4"
              >
                <button className="group relative overflow-hidden rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-base font-bold text-primary-foreground shadow-2xl shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-primary to-secondary"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
                <button className="group rounded-full border-2 border-white/40 bg-white/15 hover:bg-white/20 px-8 py-3.5 text-base font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="relative z-10">Meet The Team</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 z-30 flex items-center justify-between pointer-events-none sm:left-8 sm:right-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="pointer-events-auto group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-black/60"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(1)}
          className="pointer-events-auto group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-black/60"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="relative h-2 rounded-full transition-all duration-500"
            style={{
              width: index === currentSlide ? "48px" : "8px",
              backgroundColor:
                index === currentSlide
                  ? "hsl(var(--primary))"
                  : "rgba(255, 255, 255, 0.4)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/50"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 right-12 z-30 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-3 text-white/50"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] rotate-90 origin-center translate-y-8">
            Scroll
          </span>
          <div className="h-16 w-px bg-linear-to-b from-white/50 via-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Progress bar for autoplay */}
      {isAutoPlaying && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-secondary z-40 origin-left shadow-lg shadow-primary/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      )}
    </section>
  );
}
