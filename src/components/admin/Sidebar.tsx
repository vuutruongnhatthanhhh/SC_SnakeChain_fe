"use client";
import * as jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import {
  Home,
  Settings,
  Users,
  Menu,
  X,
  Code,
  Newspaper,
  School,
  Book,
  GraduationCap,
} from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/admin/Dashboard";
import SourceCodeManagement from "@/components/admin/SourceCodeManagement";
import BlogManagement from "@/components/admin/BlogManagement";
import CourseManagement from "@/components/admin/CourseManagement";
import LessonsManagement from "./LessonsManagement";

const menuItems = [
  {
    name: "Tổng quan",
    icon: <Home size={20} />,
    component: <Dashboard />,
  },
  {
    name: "Người dùng",
    icon: <Users size={20} />,
    component: <UserManagement />,
  },
  {
    name: "Source code",
    icon: <Code size={20} />,
    component: <SourceCodeManagement />,
  },
  {
    name: "Blog",
    icon: <Newspaper size={20} />,
    component: <BlogManagement />,
  },
  {
    name: "Khóa học",
    icon: <GraduationCap size={20} />,
    component: <CourseManagement />,
  },
  {
    name: "Bài học",
    icon: <Book size={20} />,
    component: <LessonsManagement />,
  },
  {
    name: "Cài đặt",
    icon: <Settings size={20} />,
    component: <SettingsPage />,
  },
];

function UsersPage() {
  return <div className="p-5">Users Management</div>;
}

function SettingsPage() {
  return <div className="p-5">Settings Panel</div>;
}

export default function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(
    menuItems[0].component
  );

  const router = useRouter();

  const handleMenuClick = (component: any) => {
    setActiveComponent(component);
    setIsSidebarOpen(false);
  };

  const getUserRoleFromToken = (token: string): string | null => {
    try {
      const decoded: any = jwt_decode.jwtDecode(token);
      return decoded.role;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const fetchPage = async () => {
    const token = localStorage.getItem("access_token");
    if (
      !token ||
      !(
        getUserRoleFromToken(token) === "SNAKE" ||
        getUserRoleFromToken(token) === "WORM"
      )
    ) {
      router.push("/");
      return;
    }
  };

  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <div className="relative  bg-gray-100">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full bg-white shadow-md z-20 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4 flex items-center justify-between">
          <span
            className={`text-xl font-bold ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin
          </span>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mt-5">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center w-full p-3 hover:bg-gray-200"
              onClick={() => handleMenuClick(item.component)}
            >
              {item.icon}
              <span className={`ml-3 ${isSidebarOpen ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Toggle button */}
      {!isSidebarOpen && (
        <div className="absolute top-4 left-4 z-30">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md">{activeComponent}</div>
    </div>
  );
}
