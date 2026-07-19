import { CATCH_ALL_PATHS } from "./routes";

/** Catch-all slug segments, derived from the route registry so the two cannot drift. */
export const RENOQO_STATIC_SLUGS: string[][] = CATCH_ALL_PATHS.map((path) => path.slice(1).split("/"));
