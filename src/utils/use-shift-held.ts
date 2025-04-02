import { useEffect, useState } from "react";

export const useShiftHeld = () => {
  const [shiftHeld, setShiftHeld] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Shift") setShiftHeld(true);
      },
      { signal: abort.signal },
    );
    document.addEventListener(
      "keyup",
      (e) => {
        if (e.key === "Shift") setShiftHeld(false);
      },
      { signal: abort.signal },
    );
    return () => abort.abort();
  }, []);

  return shiftHeld;
};
