import NavLinks from "./nav-links";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import clsx from "clsx";
export default function Navigation({ itemsNum }: { itemsNum: number }) {
  const [show, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!show);
  };
  return (
    <ul
      className={clsx(
        "w-full h-8 md:h-10 lg:bg-orange-500 flex items-center justify-end transition-all ease-in-out duration-200",
        { "bg-orange-500": show }
      )}
    >
      {/* PC Navs */}
      <li className="hidden lg:flex h-full *:flex *:items-center *:transition-colors *:duration-300">
        <NavLinks setMenu={setMenu} itemsNum={itemsNum} />
      </li>
      {/* Mobile Navs */}
      <li className="lg:hidden flex gap-2 w-full h-full *:flex *:items-center *:transition-colors *:duration-300 ">
        <div className="flex flex-col w-full">
          <span
            onClick={handleMenu}
            className="hamburger-menu h-full w-full flex justify-end active:*:bg-gray-200/10 *:transition-all *:duration-300"
          >
            <Icon show={show} itemsNum={itemsNum} />
          </span>
          <div
            className={clsx(
              "z-500  border-orange-500 bg-orange-500 flex flex-col w-screen text-center rounded-b border-3 transition-all ease-in-out duration-300",
              {
                "origin-top opacity-100 translate-y-0": show,
              },
              { "-translate-y-200 opacity-0": !show }
            )}
          >
            <NavLinks setMenu={setMenu} itemsNum={itemsNum} />
          </div>
        </div>
      </li>
    </ul>
  );
}

function Icon({ show, itemsNum }: { show: boolean; itemsNum: number }) {
  if (show) {
    return <CloseIcon fontSize="large" className="rounded" />;
  } else {
    return (
      <div className="flex flex-col">
        <MenuIcon fontSize="large" className="rounded hamburger relative" />
        {itemsNum ?(
          <div className="absolute top-5 right-0 rounded-full flex items-center justify-center bg-red-500/60 h-5 aspect-square text-sm font-normal">
            {itemsNum}
          </div>
        ):null}
      </div>
    );
  }
}
