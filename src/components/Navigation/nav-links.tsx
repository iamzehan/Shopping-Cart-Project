import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function NavLinks({
  setMenu, itemsNum
}: {
  setMenu(show:boolean):void;
  itemsNum:number;
}) {
  const location = useLocation();
  const pages = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "Cart",
      link: "/cart",
    },
  ];
  return (
    <>
      {pages.map((page) => (
        <Link
          onClick={()=>setMenu(false)}
          to={page.link}
          className={clsx(
            "text-xl flex gap-2 items-center justify-center py-2 px-4 h-15 xl:h-fit xl:w-30 xl:rounded-full hover:font-bold hover:text-white hover:bg-blue-300",
            { "bg-blue-300 text-white font-bold": location.pathname === page.link }
          )}
        >
          {page.name}
          {
            (page.name==="Cart" && itemsNum>0)?<span className="rounded-full flex items-center text-white justify-center bg-red-500 h-5 aspect-square text-sm font-normal">{itemsNum}</span>:null
          }
        </Link>
      ))}
    </>
  );
}
