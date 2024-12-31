import React, { forwardRef } from 'react'
import { cn } from "../../lib/utils"
import { Paperclip } from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {/* Label untuk input file */}
        <label htmlFor="file-upload" className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <Paperclip className="text-gray-400 w-5 h-5" />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
        />

        {/* Input teks */}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-full border border-black-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }



// import React, { forwardRef } from 'react'
// import { cn } from "../../lib/utils"
// import { Paperclip } from 'lucide-react'

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <div className="relative w-full">
//         <Paperclip className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type={type}
//           className={cn(
//             "flex h-12 w-full rounded-full border border-sky-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
//       </div>
//     )
//   }
// )
// Input.displayName = "Input"

// export { Input }

// import React, { forwardRef } from 'react'
// import { cn } from "../../lib/utils"
// import { Paperclip } from 'lucide-react'

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <div className="relative w-full">
//         <Paperclip className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type={type}
//           className={cn(
//             "flex h-12 w-full rounded-full border border-sky-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
//       </div>
//     )
//   }
// )
// Input.displayName = "Input"

// export { Input }