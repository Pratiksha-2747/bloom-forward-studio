import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-card border-r border-border p-6">
      <nav className="space-y-2">
        <Link
          to="/admin"
          className={`block px-4 py-2 rounded-lg transition ${
            isActive("/admin")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/leads"
          className={`block px-4 py-2 rounded-lg transition ${
            isActive("/admin/leads")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          }`}
        >
          Leads
        </Link>
        <Link
          to="/admin/services"
          className={`block px-4 py-2 rounded-lg transition ${
            isActive("/admin/services")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          }`}
        >
          Services
        </Link>
        <Link
          to="/admin/instagram"
          className={`block px-4 py-2 rounded-lg transition ${
            isActive("/admin/instagram")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          }`}
        >
          Instagram
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
