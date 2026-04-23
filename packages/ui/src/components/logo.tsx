import { ComponentProps } from "solid-js"

export const Mark = (props: { class?: string }) => {
  return (
    <svg
      data-component="logo-mark"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="20" fill="var(--icon-strong-base)" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        fill="var(--icon-base)"
        font-family="'Barlow Condensed', sans-serif"
        font-weight="700"
        font-size="12"
      >
        S
      </text>
    </svg>
  )
}

export const Splash = (props: Pick<ComponentProps<"svg">, "ref" | "class">) => {
  return (
    <svg
      ref={props.ref}
      data-component="logo-splash"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="100" fill="var(--icon-strong-base)" />
      <text
        x="50%"
        y="52%"
        dominant-baseline="central"
        text-anchor="middle"
        fill="var(--icon-base)"
        font-family="'Barlow Condensed', sans-serif"
        font-weight="700"
        font-size="22"
        letter-spacing="1"
      >
        Singularity
      </text>
    </svg>
  )
}

export const Logo = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 234 42"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <text
        x="0"
        y="32"
        fill="var(--icon-base)"
        font-family="'Barlow Condensed', sans-serif"
        font-weight="700"
        font-size="40"
        letter-spacing="1"
      >
        Singularity
      </text>
    </svg>
  )
}
