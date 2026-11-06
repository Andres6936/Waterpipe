import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { Provider } from "./Context";

function App() {
  return (
    <Provider>
      <Controls />
      <Canvas />
    </Provider>
  );
}

export default App;
