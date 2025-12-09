import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <header>
        <Navigation/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>I am footer</footer>
    </>
  );
}

export default App;
