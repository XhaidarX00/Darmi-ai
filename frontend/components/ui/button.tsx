import * as React from "react"
import { cn } from "../../lib/utils"
import { ArrowUp } from 'lucide-react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "absolute right-1 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-700 h-10 w-10", // Background menjadi hitam dan hover menjadi abu-abu gelap
          className
        )}
        ref={ref}
        {...props}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    )
  }
)
Button.displayName = "Button"
export { Button }


// import * as React from "react"
// import { cn } from "../../lib/utils"
// import { ArrowUp } from 'lucide-react'

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   asChild?: boolean
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, asChild = false, ...props }, ref) => {
//     return (
//       <button
//         className={cn(
//           "absolute right-1 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-white hover:bg--600 h-10 w-10",
//           className
//         )}
//         ref={ref}
//         {...props}
//       >
//         <ArrowUp className="h-5 w-5" />
//       </button>
//     )
//   }
// )
// Button.displayName = "Button"

// export { Button }