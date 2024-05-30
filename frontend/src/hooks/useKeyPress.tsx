import { useEffect } from "react";

const useKeyPress = (targetKey: string, action: () => void) => {
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        action();
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [targetKey, action]);
};

export default useKeyPress;
