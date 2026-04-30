import { useEffect } from "react";
// Custom Hook
export function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", callback);

    // Clean up function
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}
