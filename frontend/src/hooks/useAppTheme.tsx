/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { ThemeProvider } from "@emotion/react";
import React, { createContext, Dispatch, SetStateAction } from "react";
import appTheme from "../utils/theme";

interface ThemeContextProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme === "light" ? appTheme.light : appTheme.dark}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
