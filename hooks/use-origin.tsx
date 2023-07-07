import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  // checking if window is available, if true then use window location origin, otherwise pass empty string
  const origin = typeof window != "undefined" && window.location.origin ? window.location.origin : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;
};
