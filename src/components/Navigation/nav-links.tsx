import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function NavLinks({
  setMenu,
}: {
  setMenu(show:boolean):void;
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
            "text-xl px-4 h-full md:rounded-none hover:bg-orange-300",
            { "bg-orange-300": location.pathname === page.link }
          )}
        >
          {page.name}
        </Link>
      ))}
    </>
  );
}
