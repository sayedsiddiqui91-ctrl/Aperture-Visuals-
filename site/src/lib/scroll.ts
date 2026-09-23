import type Lenis from "lenis";

/** The single Lenis instance, shared so modals / menus can pause scrolling. */
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };
export const getLenis = () => instance;
