"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

interface PointerPosition {
  x: number;
  y: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "#7C3AED",
  gradientOpacity = 0.35,
}: MagicCardProps) {
  const [position, setPosition] = useState<PointerPosition | null>(null);

  function track(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  return (
    <div
      className={cn("group/card relative rounded-[inherit]", className)}
      onPointerMove={track}
      onPointerEnter={track}
      onPointerLeave={() => setPosition(null)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: position ? gradientOpacity : 0,
          background: position
            ? `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 100%)`
            : undefined,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
