import React from "react";
import { Smoke } from "./Smoke";
import { defaults, type Defaults } from "./defaults";

type ContextProps = Defaults & {
  start: () => void;
  stop: () => void;
  update: () => void;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setValue: (key: keyof Defaults, value: Defaults[keyof Defaults]) => void;
};

const Context = React.createContext<ContextProps | null>(null);

const Provider = (props: React.PropsWithChildren<{}>) => {
  const [values, setValues] = React.useState(defaults);
  const smoke = React.useRef(new Smoke(values));

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
        setCanvas: (canvas: HTMLCanvasElement) =>
          smoke.current.setCanvas(canvas),
        start: () => smoke.current.start(),
        stop: () => smoke.current.stop(),
        update: () => {
          smoke.current.setSettings(values);
          smoke.current.clear();
          smoke.current.start();
        },
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
