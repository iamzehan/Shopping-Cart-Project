import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <header className="sticky top-0 left-0 z-500 dark:bg-[#242424]">
        <Navigation/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
