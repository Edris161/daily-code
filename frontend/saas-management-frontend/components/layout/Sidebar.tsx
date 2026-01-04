import Link from "next/link";
import { HomeIcon, CubeIcon, UsersIcon, CurrencyDollarIcon, BellIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "SaaS Apps", href: "/apps", icon: CubeIcon },
    { name: "Subscriptions", href: "/subscriptions", icon: CurrencyDollarIcon },
    { name: "Users", href: "/users", icon: UsersIcon },
    { name: "Billing", href: "/billing", icon: CurrencyDollarIcon },
    { name: "Notifications", href: "/notifications", icon: BellIcon },
    { name: "Reports", href: "/reports", icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">SaaS Manager</h2>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
