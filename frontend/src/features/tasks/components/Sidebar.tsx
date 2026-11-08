import { NavLink } from "react-router";
import { Settings } from "lucide-react";
import BookIcon from "@/assets/BookOpen.svg?react";
import Logo from "@/ui/Logo";

const links = [
  { path: "/dashboard", icon: BookIcon },
  { path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="bg-nav row-span-2 flex w-23.5 flex-col items-center gap-37.75 p-3">
      <Logo dir="col" />
      <nav>
        <ul className="flex flex-col items-center gap-6">
          {links.map(({ path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `rounded-14 flex size-11.5 items-center justify-center transition-colors ${isActive ? "bg-action text-white" : "text-icon hover:bg-subtle"}`
                }
              >
                <Icon className="size-5" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
