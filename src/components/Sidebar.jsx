import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Tab definitions with their routes
  const tabs = [
    { name: "Chats", path: "/dashboard/chats" },
    { name: "Documents", path: "/dashboard/documents" },
    { name: "Grants", path: "/dashboard/grants" },
    { name: "Conferences", path: "/dashboard/conferences" },
    { name: "Help", path: "/dashboard/help" }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-indigo-950 p-4 border-b border-indigo-800">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-indigo-300">Re-Assist</div>
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-4 py-2 rounded-md ${
                currentPath === tab.path || (currentPath === "/app" && tab.path === "/")
                  ? "bg-indigo-600 font-semibold"
                  : "hover:bg-indigo-900 text-indigo-200"
              }`}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="w-32">
          {/* Empty div for balance */}
        </div>
      </div>
    </div>
  );
}
