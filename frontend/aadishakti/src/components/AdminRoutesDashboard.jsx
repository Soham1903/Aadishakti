import { useNavigate } from "react-router-dom";

const adminRoutes = [
  { path: "/upload", label: "Upload Image" },
  { path: "/transactiondashboard", label: "Transaction Dashboard" },
  { path: "/course-form", label: "Add/Edit Course" },
  { path: "/promocode-form", label: "Promo Code Form" },
];

function AdminRoutesDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#87161a]">Admin Panel</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {adminRoutes.map((route) => (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              className="bg-white relative overflow-hidden group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#87161a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative p-8 text-xl font-medium text-[#87161a] group-hover:text-white transition-colors duration-300 flex items-center justify-center min-h-[120px]">
                {route.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminRoutesDashboard;
