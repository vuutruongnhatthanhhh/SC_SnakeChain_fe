// components/UserProfile.tsx
"use client";
import React, { useState } from "react";

const UserInfo: React.FC = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyen@example.com",
    purchasedCourses: [
      { title: "Khóa học React JS", link: "/courses/react-js" },
      { title: "Khóa học Node JS", link: "/courses/node-js" },
      { title: "Khóa học TypeScript", link: "/courses/typescript" },
    ],
  });

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và mật khẩu xác nhận không khớp");
      return;
    }
    if (!oldPassword) {
      alert("Vui lòng nhập mật khẩu cũ");
      return;
    }
    // Xử lý đổi mật khẩu ở đây
    alert(`Đổi mật khẩu thành công: ${newPassword}`);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  const handleProfileChange = () => {
    // Xử lý cập nhật thông tin cá nhân ở đây
    alert(`Cập nhật thông tin thành công`);
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-10">
      {/* Thông tin cá nhân */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Thông tin cá nhân
        </h2>
        {!isEditingProfile ? (
          <div className="mt-4">
            <p className="text-gray-600">Tên: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <button
              className="mt-4 px-4 py-2 rounded-md bg-buttonRoot"
              onClick={() => setIsEditingProfile(true)}
            >
              Chỉnh sửa thông tin
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div>
              <input
                type="text"
                placeholder="Họ và tên"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <button
              onClick={handleProfileChange}
              className="mt-4 px-4 py-2 rounded-md bg-buttonRoot"
            >
              Lưu thông tin
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="ml-2 mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      {/* Khóa học đã mua */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Khóa học đã mua
        </h2>
        <ul className="space-y-2 mt-4">
          {user.purchasedCourses.map((course, index) => (
            <li key={index}>
              <a
                href={course.link}
                className="text-blue-600 hover:text-blue-800"
              >
                {course.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Đổi mật khẩu */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Đổi mật khẩu</h2>
        {!isEditingPassword ? (
          <button
            className="mt-4 px-4 py-2  rounded-md bg-buttonRoot"
            onClick={() => setIsEditingPassword(true)}
          >
            Đổi mật khẩu
          </button>
        ) : (
          <div className="mt-4">
            <div>
              <input
                type="password"
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="mt-4 px-4 py-2 rounded-md bg-buttonRoot"
            >
              Lưu mật khẩu mới
            </button>
            <button
              onClick={() => setIsEditingPassword(false)}
              className="ml-2 mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
