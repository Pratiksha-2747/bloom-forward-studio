import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Home Page Images", path: "/admin/services/home" },
    { label: "Our Work Images", path: "/admin/services/work" },
    { label: "Our Journey Images", path: "/admin/services/journey" },
    { label: "Services Page Images", path: "/admin/services/services" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="p-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Services
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose which page images you want to edit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {items.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="cursor-pointer rounded-xl bg-card p-6 shadow-soft hover:shadow-lg transition"
            >
              <h2 className="text-lg font-medium">{item.label}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
