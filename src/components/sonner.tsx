import * as React from "react";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"
import { CircleCheck, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react"
import { Spinner } from "./spinner"

type Theme = "light" | "dark" | "system";

function getDocumentTheme(): Theme {
  if (typeof document === "undefined") return "system";
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return "system";
}

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = getDocumentTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className: "!text-white",
        descriptionClassName: "!text-white/80",
      }}
      icons={{
        success: <CircleCheck className="!size-4 text-emerald-400" />,
        info: <InfoIcon className="!size-4 text-blue-400" />,
        warning: <TriangleAlertIcon className="!size-4 text-amber-400" />,
        error: <OctagonXIcon className="!size-4 text-red-400" />,
        loading: <Spinner size="sm" className="!text-amber-400/60" />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "oklch(0.97 0 0)",
          "--normal-border": "oklch(1 0 0 / 0.1)",
          "--success-bg": "var(--toast-success-bg)",
          "--success-text": "oklch(0.97 0 0)",
          "--success-border": "var(--toast-success-border)",
          "--info-bg": "var(--toast-info-bg)",
          "--info-text": "oklch(0.97 0 0)",
          "--info-border": "var(--toast-info-border)",
          "--warning-bg": "var(--toast-warning-bg)",
          "--warning-text": "oklch(0.97 0 0)",
          "--warning-border": "var(--toast-warning-border)",
          "--error-bg": "var(--toast-error-bg)",
          "--error-text": "oklch(0.97 0 0)",
          "--error-border": "var(--toast-error-border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }
