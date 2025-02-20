import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef, useStyleConfig } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { keyframes } from "@emotion/react"

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

interface SpinnerOptions {
  /**
   * The color of the empty area in the spinner
   * @default "transparent"
   */
  emptyColor?: string
  /**
   * The color of the spinner
   */
  color?: string
  /**
   * The thickness of the spinner
   * @default "2px"
   * @example
   * ```jsx
   * <Spinner thickness="4px"/>
   * ```
   */
  thickness?: string
  /**
   * The speed of the spinner.
   * @default "0.45s"
   * @example
   * ```jsx
   * <Spinner speed="0.2s"/>
   * ```
   */
  speed?: string
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string
}

export interface SpinnerProps
  extends Omit<HTMLChakraProps<"div">, keyof SpinnerOptions>,
    SpinnerOptions,
    ThemingProps<"Spinner"> {}

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/spinner
 */
export const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => {
  const styles = useStyleConfig("Spinner", props)

  const {
    label = "Loading...",
    thickness = "2px",
    speed = "0.45s",
    emptyColor = "transparent",
    className,
    ...rest
  } = omitThemingProps(props)

  const _className = cx("chakra-spinner", className)

  const spinnerStyles = {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animation: `${spin} ${speed} linear infinite`,
    ...styles,
  }

  return (
    <chakra.div
      ref={ref}
      __css={spinnerStyles}
      className={_className}
      {...rest}
    >
      {label && <chakra.span srOnly>{label}</chakra.span>}
    </chakra.div>
  )
})

Spinner.displayName = "Spinner"
