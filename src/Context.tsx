import React from "react";
import { Smoke } from "./Smoke";
import { defaults, type Defaults } from "./defaults";

type ContextProps = Defaults & {
  start: () => void;
  stop: () => void;
  update: (settings?: Partial<Defaults>) => void;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setValue: (key: keyof Defaults, value: Defaults[keyof Defaults]) => void;
};

const Context = React.createContext<ContextProps | null>(null);

const Provider = (props: React.PropsWithChildren<{}>) => {
  const [values, setValues] = React.useState(defaults);
  const [smoke] = React.useState(() => new Smoke(values));

  const setValue = (key: keyof Defaults, value: Defaults[keyof Defaults]) =>
    setValues({
      ...values,
      [key]: value,
    });

  React.useEffect(function cleanUp() {
    return () => smoke.destroy();
  }, []);

  return (
    <Context.Provider
      value={{
        ...values,
        setValue,
        setCanvas: (canvas: HTMLCanvasElement) => smoke.setCanvas(canvas),
        start: () => smoke.start(),
        stop: () => smoke.stop(),
        update: (settings) => smoke.update(settings ? settings : values),
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
