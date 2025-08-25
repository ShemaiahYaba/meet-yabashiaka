
'use client';
import { icons } from "@/config/icons";
import type { IconProps } from "./icons/icon-props";

interface IconRendererProps extends Omit<IconProps, 'hoverColor'> {
  name: string;
}

export function IconRenderer({ name, className, enableGlow }: IconRendererProps) {
  const iconInfo = icons[name.toLowerCase()];

  if (!iconInfo) {
    // Return a placeholder or null if the icon name is not found
    return <div className={className} style={{ width: '24px', height: '24px', border: '1px solid #ccc' }} title={`icon not found: ${name}`}>?</div>;
  }

  const IconComponent = iconInfo.component;
  const hoverColor = iconInfo.color;

  const dynamicStyle = {
    '--hover-color': hoverColor,
    '--glow-color': `${hoverColor}33` // Add alpha for glow
  } as React.CSSProperties;

  const glowClass = enableGlow ? 'hover:drop-shadow-[0_0_5px_var(--glow-color)]' : '';

  return (
    <div
      style={dynamicStyle}
      className={`text-muted-foreground transition-all duration-300 transform-gpu hover:-translate-y-1 hover:text-[var(--hover-color)] ${glowClass}`}
    >
      <IconComponent className={className} />
    </div>
  );
};
