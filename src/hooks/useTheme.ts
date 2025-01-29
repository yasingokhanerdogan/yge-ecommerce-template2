"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

const useTheme = (): any => {
  const [themeMounted, setThemeMount] = useState(false);
  const { theme, setTheme } = useNextTheme();

  useEffect(() => {
    setThemeMount(true);
  }, []);

  return {
    themeMounted,
    theme,
    setTheme,
  };
};

export default useTheme;
