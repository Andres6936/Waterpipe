import React from "react";
import { defaults, type Defaults } from "./defaults";

type ContextProps = Defaults & {};

const Context = React.createContext<ContextProps | null>(null);

const Provider = (props: React.PropsWithChildren<{}>) => {
  return (
    <Context.Provider
      value={{
        ...defaults,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const useContext = () => {
  const context = React.useContext(Context);
  if (!context)
    throw new Error("The component must be called inside <Context/>");
  return context;
};

export { Provider, useContext };
