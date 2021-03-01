import Formatter from "./components/Formatter";
import "./App.css"
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <div style={{filter: theme ? 'invert(1) hue-rotate(180deg)' : '',backgroundColor:"white"}}>
        <Formatter changeTheme={() => setTheme(!theme)}></Formatter>
    </div>
  );
}

export default App;
