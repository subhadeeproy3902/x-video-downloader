import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-[6px] border border-[#262626] bg-[#1a1a1a] px-4 py-2 text-sm text-[#FAFAFA] placeholder:text-[#A1A1AA] transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#8B5CF6]/30 focus-visible:border-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
