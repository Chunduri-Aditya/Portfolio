import type { ThreeElements } from "@react-three/fiber";

// @react-three/fiber v8 augments the legacy global `JSX` namespace. With
// jsx: "react-jsx" and @types/react v19, TS resolves intrinsics against
// `React.JSX` instead, so re-apply the augmentation there.
declare module "react" {
  namespace JSX {
    // The empty body is the whole point: this interface exists only to widen
    // React.JSX.IntrinsicElements with ThreeElements. Adding a member would
    // change what it declares.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends ThreeElements {}
  }
}
