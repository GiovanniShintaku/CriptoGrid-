import { IconContext } from "react-icons";
import { ReactNode } from "react";

interface IconProviderProps {
  children: ReactNode;
}

export default function IconProvider({ children }: IconProviderProps) {
  return (
    <IconContext.Provider
      value={{
        color: "var(--accent)",
        size: "1.5rem",
        className: "react-icon",
      }}
    >
      {children}
    </IconContext.Provider>
  );
}