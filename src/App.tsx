import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useState } from "react";
function App() {
  const [itemsNum, setItemsNumber] = useState<number>(0)
  return (
    <>
      <header className="sticky top-0 left-0 z-500 dark:bg-[#242424]">
        <Navigation itemsNum={itemsNum}/>
      </header>
      <main>
        <Outlet context={{setItemsNumber}} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
