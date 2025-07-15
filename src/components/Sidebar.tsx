import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  Home,
  Users,
  Calendar,
  BarChart3,
  Settings,
  GraduationCap,
  FileText,
  MessageSquare,
  Star,
  UserCheck,
  Shield,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trophy,
} from "lucide-react";

interface SidebarProps {
  userRole: "student" | "instructor" | "admin";
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: "Dashboard", path: `/${userRole}` },
    ];

    switch (userRole) {
      case "student":
        return [
          ...baseItems,
          { icon: BookOpen, label: "My Courses", path: "/student/courses" },
          {
            icon: Star,
            label: "Bought Courses",
            path: "/student/bought-courses",
          },
          { icon: Calendar, label: "Schedule", path: "/student/schedule" },
          {
            icon: FileText,
            label: "Assignments",
            path: "/student/assignments",
          },
          { icon: Trophy, label: "Grades", path: "/student/grades" },
          {
            icon: BarChart3,
            label: "Analytics & Progress",
            path: "/student/analytics",
          },
          { icon: MessageSquare, label: "Messages", path: "/student/messages" },
          { icon: Settings, label: "Settings", path: "/student/settings" },
        ];
      case "instructor":
        return [
          ...baseItems,
          { icon: UserCheck, label: "Profile", path: "/instructor/profile" },
          { icon: BookOpen, label: "My Courses", path: "/instructor/courses" },
          { icon: Plus, label: "Upload Course", path: "/instructor/upload" },
          { icon: Users, label: "Students", path: "/instructor/students" },
          {
            icon: FileText,
            label: "Assignments",
            path: "/instructor/assignments",
          },
          { icon: TrendingUp, label: "Revenue", path: "/instructor/revenue" },
          {
            icon: BarChart3,
            label: "Analytics",
            path: "/instructor/analytics",
          },
          {
            icon: MessageSquare,
            label: "Messages",
            path: "/instructor/messages",
          },
          { icon: Settings, label: "Settings", path: "/instructor/settings" },
        ];
      case "admin":
        return [
          ...baseItems,
          { icon: Users, label: "Users", path: "/admin/users" },
          { icon: BookOpen, label: "Courses", path: "/admin/courses" },
          { icon: TrendingUp, label: "Analytics", path: "/admin/analytics" },
          { icon: Shield, label: "Security", path: "/admin/security" },
          { icon: Settings, label: "Settings", path: "/admin/settings" },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">Eduentum</h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Badge */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-600">Role</p>
            <p className="text-sm text-gray-800 capitalize">{userRole}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
