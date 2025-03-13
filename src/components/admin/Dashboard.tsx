import { useEffect, useState } from "react";
import config from "@/config";
import React from "react";
import { countUsers } from "@/services/userService";
import { countBlogs } from "@/services/blogService";
import { countSourceCode } from "@/services/sourceCodeService";

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [sourceCodeCount, setSourceCodeCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const data = await countBlogs();
        setBlogCount(data?.data?.totalBlogs);
      } catch (error) {
        console.error("Error fetching blog count", error);
      }
    };
    const fetchSourceCodeCount = async () => {
      try {
        const data = await countSourceCode();
        setSourceCodeCount(data?.data?.totalSourceCode);
      } catch (error) {
        console.error("Error fetching sourcecode count", error);
      }
    };
    const fetchUserCount = async () => {
      try {
        const data = await countUsers();
        setUserCount(data?.data?.totalUsers);
      } catch (error) {
        console.error("Error fetching user count", error);
      }
    };
    fetchUserCount();
    fetchBlogCount();
    fetchSourceCodeCount();
  }, []);
  return (
    <div className="p-6  ">
      <header className="flex items-center space-x-4">
        <img src="/images/logo.png" alt="Logo công ty" className="h-12 w-12" />
        <h2 className="text-xl font-bold text-gray-800">
          {config.companyName}
        </h2>
      </header>

      <main className="mt-8">
        <div className="p-4 bg-gray-100 rounded shadow mb-4">
          <p className="text-xl">
            Tổng User:
            <span className="font-semibold text-blue-600 ml-2">
              {userCount !== null ? userCount : "Đang tải..."}
            </span>
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow mb-4">
          <p className="text-xl">
            Tổng Source Code:
            <span className="font-semibold text-blue-600 ml-2">
              {sourceCodeCount !== null ? sourceCodeCount : "Đang tải..."}
            </span>
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow mb-4">
          <p className="text-xl">
            Tổng Blog:
            <span className="font-semibold text-blue-600 ml-2">
              {blogCount !== null ? blogCount : "Đang tải..."}
            </span>
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow mb-4">
          <p className="text-xl">
            Tổng khóa học được mua:
            <span className="font-semibold text-blue-600 ml-2">99</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
