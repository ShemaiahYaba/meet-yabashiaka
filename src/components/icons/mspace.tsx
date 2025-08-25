import type { IconProps } from './icon-props';

/**
 * Custom Mspace Icon Component
 * 
 * This is the fallback icon used for non-standard tech stack items
 * or "buzz words" like API development, databases, system design, etc.
 * Uses the official Mspace.svg design.
 */
export default function MspaceIcon({ className }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 810 810" 
      className={className}
      fill="currentColor"
    >
      <path d="M 434.445312 350.890625 L 243.050781 542.285156 L 243.050781 459.25 L 434.445312 267.703125 Z M 375.554688 458.953125 L 375.554688 542.285156 L 508.054688 409.933594 L 508.054688 542.285156 L 566.949219 483.394531 L 566.949219 267.703125 Z M 375.554688 458.953125" />
    </svg>
  );
}
