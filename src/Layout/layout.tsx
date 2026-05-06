import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const location = useLocation();
  const { logout } = useAuth();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Subscriptions", path: "/subscriptions" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
         <div>

        <h2 className="text-xl font-bold mb-8">Subscriptify</h2>

        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
         </div>
         <button
  onClick={logout}
  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
>
  {/* Logout Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15M18 12l3-3m0 0l-3-3m3 3H9"
    />
  </svg>

  Logout
</button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}