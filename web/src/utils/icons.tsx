import * as LucideIcons from "lucide-react";
import React from "react";

export function getIconElement(iconName: string, size: number = 16): React.ReactNode {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return null;
  return React.createElement(IconComponent, { size });
}
