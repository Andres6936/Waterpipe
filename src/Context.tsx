import React from "react";
import { defaults, type Defaults } from "./defaults";

type ContextProps = Defaults & {
  setValue: (key: keyof Defaults, value: Defaults[keyof Defaults]) => void;
};

const Context = React.createContext<ContextProps | null>(null);

const Provider = (props: React.PropsWithChildren<{}>) => {
  const [values, setValues] = React.useState(defaults);

  const setValue = (key: keyof Defaults, value: Defaults[keyof Defaults]) =>
    setValues({
      ...values,
      [key]: value,
    });

  return (
    <Context.Provider
      value={{
        ...values,
        setValue,
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
