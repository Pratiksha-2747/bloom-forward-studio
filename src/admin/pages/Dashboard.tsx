import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="p-8">
        <h1 className="text-3xl font-semibold text-foreground">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome to the Bloom Branding admin panel.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Leads */}
          <Link to="/admin/leads" className="block">
            <div className="rounded-xl bg-card p-6 shadow-soft hover:shadow-md transition cursor-pointer">
              <h2 className="text-lg font-medium">Leads</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                View and manage contact form submissions.
              </p>
            </div>
          </Link>

          {/* Services */}
          <Link to="/admin/services" className="block">
            <div className="rounded-xl bg-card p-6 shadow-soft hover:shadow-md transition cursor-pointer">
              <h2 className="text-lg font-medium">Services</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Edit services shown on the website.
              </p>
            </div>
          </Link>

          {/* Instagram */}
          <Link to="/admin/instagram" className="block">
            <div className="rounded-xl bg-card p-6 shadow-soft hover:shadow-md transition cursor-pointer">
              <h2 className="text-lg font-medium">Instagram</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage Instagram posts displayed on the homepage.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
