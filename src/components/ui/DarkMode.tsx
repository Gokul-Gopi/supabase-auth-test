import React, { useEffect, useState } from "react";
import { Label } from "./Label";
import { Switch } from "./Switch";
import { useTheme } from "next-themes";

type mode = "light" | "dark";

const DarkMode = () => {
  const { setTheme, theme } = useTheme();

  const [mode, setMode] = useState<mode>("dark");

  // I may have to reconsider this pattern, if the
  // choices are more than 2, ie. light, dark, system

  // There is also seems to be an issue where the
  // color-scheme suddenly changes on page refresh.
  // To something closely related to the actual
  // color-scheme but not the actual color-scheme.
  // It seems, its only happenging on dev mode
  useEffect(() => {
    setMode(theme as mode);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="dark-mode">Embrace the dark side</Label>
      <Switch
        checked={mode === "dark"}
        id="dark-mode"
        onCheckedChange={(checked) =>
          checked ? setTheme("dark") : setTheme("light")
        }
      />
    </div>
  );
};

export default DarkMode;
