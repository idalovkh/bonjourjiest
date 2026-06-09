import { useEffect } from "react";

/** Cream paper on the landing page; plain white on secondary routes. */
export function useWhitePageBackground() {
  useEffect(() => {
    document.documentElement.classList.add("page-white");
    return () => document.documentElement.classList.remove("page-white");
  }, []);
}
