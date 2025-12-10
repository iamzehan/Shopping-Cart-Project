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
            "text-xl flex gap-2 items-center justify-center px-4 h-full text-white md:rounded-none hover:bg-orange-300",
            { "bg-orange-300 font-bold": location.pathname === page.link }
          )}
        >
          {page.name}
          {
            (page.name==="Cart" && itemsNum>0)?<span className="rounded-full flex items-center justify-center bg-red-500 h-5 aspect-square text-sm font-normal">{itemsNum}</span>:null
          }
        </Link>
      ))}
    </>
  );
}
