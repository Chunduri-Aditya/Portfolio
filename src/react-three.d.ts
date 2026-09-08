import type { ThreeElements } from "@react-three/fiber";

// @react-three/fiber v8 augments the legacy global `JSX` namespace. With
// jsx: "react-jsx" and @types/react v19, TS resolves intrinsics against
// `React.JSX` instead, so re-apply the augmentation there.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
