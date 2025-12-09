import { Link } from "react-router-dom";
export default function Navigation() {
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
    <ul className="w-full h-10 bg-orange-500 flex items-center justify-end">
      <li className="flex h-full *:flex *:items-center *:transition-colors *:duration-300">
        {pages.map((page) => (
          <Link to={page.link} className="text-xl px-4 h-full hover:bg-orange-300">{page.name}</Link>
        ))}
      </li>
    </ul>
  );
}
