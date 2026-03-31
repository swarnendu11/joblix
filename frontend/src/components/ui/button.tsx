import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      default: "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-[0_16px_40px_rgba(79,70,229,0.22)] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(79,70,229,0.28)]",
      outline: "border border-white/70 bg-white/80 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:bg-white",
      secondary: "bg-indigo-50 text-indigo-700 shadow-[0_10px_30px_rgba(79,70,229,0.10)] hover:-translate-y-0.5 hover:bg-indigo-100",
      ghost: "text-slate-500 hover:bg-white/80 hover:text-indigo-600"
    }

    const sizes = {
      default: "px-4 py-2.5",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-5 py-3 text-base",
      icon: "h-10 w-10 p-0"
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
