import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  (window as unknown as { __ST?: typeof ScrollTrigger }).__ST = ScrollTrigger;
}
