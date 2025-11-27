import * as React from "react"

export type ButtonVariant = "white" | "default" | "main" | "danger" | "save" | "outline" | "primary" | "link" | "black" | "disabled" | "transition-yellow"
export type ButtonSize = "default" | "sm" | "md" | "lg" | "inline" | "icon" | "full" | "null" | "xs"
// In deiner Button-Datei
export const getButtonClasses = (variant: ButtonVariant = "default", size: ButtonSize = "lg", className?: string) => {
  const baseClasses =
    variant === "disabled" ? "rounded-[8px] inline-flex items-center justify-center text-center" :
    variant === "link"
      ? "cursor-pointer"
      : "rounded-[8px] cursor-pointer inline-flex items-center justify-center text-center"
  const variantClasses = getVariantClasses(variant)
  const sizeClasses = getSizeClasses(size)

  return [baseClasses, variantClasses, sizeClasses, className]
    .filter(Boolean)
    .join(" ")
}

export const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case "default":
    case "main":
      return "bg-primary-600 text-white-base hover:bg-primary-700"
    case "link":
      return "bg-transparent text-gray-600 underline hover:text-primary-900"

    case "danger":
      return "bg-red-500 text-white-base hover:bg-red-800"
    case "save":
      return "bg-green-500 text-white-base hover:bg-green-600"
    case "outline":
      return "border border-sec-800 hover:border-primary-500 hover:text-primary-500 transition-colors font-semibold text-black"
    case "primary":
      return "bg-primary-600 text-white-base hover:bg-primary-700 font-semibold"
  case "disabled":
      return "bg-gray-600 text-white-base font-semibold"
  case "transition-yellow":
      return "button-transition-blue-green hover:opacity-90 font-semibold text-white"

    case "black":
      return "bg-black text-white hover:bg-black/80 font-semibold"

         case "white":
      return "bg-white text-black hover:bg-sec-100 font-semibold"

    default:
      return "bg-primary-500 text-white hover:bg-primary-700"
  }
}

const getSizeClasses = (size: ButtonSize): string => {
  switch (size) {
    case "null":
      return "py-0 px-0"
    case "xs":
      return "px-0.25 py-0.25 text-xs"
    case "sm":
      return "py-3 px-4"
    case "md":
      return "py-3 px-4 "
    case "lg":
      return "pt-1 pb-0.75 pl-1 pr-1 text-[14px]"
  
    case "inline":
      return "inline-flex h-full w-auto"
    case "icon":
      return "h-10 w-10"
    case "full":
      return "w-full  py-3 px-4"
    case "default":
    default:
      return "py-3 px-4"
  }
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "lg", ...props }, ref) => {
    const variantClasses = getButtonClasses(variant, size, className)


    return (
      <button
        className={variantClasses}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }