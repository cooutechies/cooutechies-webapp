"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface AnimatedFormFieldProps {
  children: React.ReactNode;
  index: number;
  icon: React.ElementType;
}

export function AnimatedFormField({
  children,
  index,
  icon: Icon,
}: AnimatedFormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <motion.div
        className="absolute -inset-0.5 rounded-lg bg-primary/10 blur-md pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative flex items-start gap-3">
        <motion.div
          className="mt-8 p-2 rounded-lg bg-primary/20 text-primary shrink-0"
          animate={{ scale: isFocused ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </motion.div>
  );
}
