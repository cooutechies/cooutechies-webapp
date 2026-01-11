import { motion } from "framer-motion";
import { Pencil, Eye, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export type EditorMode = "edit" | "preview";

interface ModeToggleProps {
  mode: EditorMode;
  onChange: (mode: EditorMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 glass rounded-xl border-glow">
      <ModeButton
        active={mode === "edit"}
        onClick={() => onChange("edit")}
        icon={<Pencil className="h-4 w-4" />}
        label="Editor"
      />
      <ModeButton
        active={mode === "preview"}
        onClick={() => onChange("preview")}
        icon={<Eye className="h-4 w-4" />}
        label="Preview"
      />
    </div>
  );
}

interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function ModeButton({ active, onClick, icon, label }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active && (
        <motion.div
          layoutId="mode-indicator"
          className="absolute inset-0 bg-primary/15 rounded-lg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}
