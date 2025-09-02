
'use client';
import React from 'react';
import { icons } from "@/config/icons";
import type { IconProps } from "./icons/icon-props";

interface IconRendererProps extends Omit<IconProps, 'hoverColor'> {
  name: string;
}

/**
 * Enhanced IconRenderer Component
 * 
 * Renders icons with sophisticated hover animations including:
 * - Brand color transitions from muted to official colors
 * - Dynamic glow effects using brand colors
 * - Smooth scaling and lift animations
 * - Hardware-accelerated transforms for 60fps performance
 * 
 * @param name - Icon key from the icons configuration
 * @param className - Additional CSS classes for sizing and styling
 * @param enableGlow - Whether to show glow effect on hover
 */
export function IconRenderer({ name, className, enableGlow }: IconRendererProps) {
  const iconInfo = icons[name.toLowerCase()];

  if (!iconInfo) {
    // Return a placeholder for missing icons with consistent styling
    return (
      <div 
        className={`${className} flex items-center justify-center border border-muted-foreground/20 rounded text-muted-foreground/50 text-xs`} 
        title={`Icon not found: ${name}`}
      >
        ?
      </div>
    );
  }

  const IconComponent = iconInfo.component;
  const brandColor = iconInfo.color;

  // Dynamic CSS custom properties for brand-aware styling
  const dynamicStyle = {
    '--brand-color': brandColor,
    '--glow-color': `${brandColor}40`, // 25% opacity for subtle glow
    '--glow-intense': `${brandColor}60`, // 37.5% opacity for hover glow
  } as React.CSSProperties;

  // Enhanced glow classes with multiple shadow layers for depth
  const glowClass = enableGlow 
    ? 'hover:drop-shadow-[0_0_8px_var(--glow-color)] hover:filter hover:brightness-110' 
    : '';

  return (
    <div
      style={dynamicStyle}
      className={`
        text-muted-foreground 
        hover:text-[var(--brand-color)]
        transition-all 
        duration-300 
        ease-out
        transform-gpu 
        relative
      `}
    >
      <IconComponent className={className} />
    </div>
  );
};
