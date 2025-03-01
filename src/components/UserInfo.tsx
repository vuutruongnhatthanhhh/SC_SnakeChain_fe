// components/UserProfile.tsx
"use client";
import React, { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { changePasswordProfile, getUserInfo } from "@/services/authService";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/services/userService";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const UserInfo: React.FC = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState<any | null>(null);
  const [originalUser, setOriginalUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async () => {
    if (!oldPassword) {
      alert("Vui lòng nhập mật khẩu cũ");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và mật khẩu xác nhận không khớp");
      return;
    }

    try {
      await changePasswordProfile({
        email: user.email,
        oldPassword,
        password: newPassword,
        confirmPassword,
      });

      alert("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  const handleProfileChange = async () => {
    try {
      const updatedUser = await updateUserProfile({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        address: user.address,
      });

      if (updatedUser) {
        alert("Cập nhật thông tin thành công");
        fetchUserInfo();
        setUser(updatedUser);
        setIsEditingProfile(false);
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  const handleCancelProfileEdit = () => {
    setUser(originalUser);
    setIsEditingProfile(false);
  };

  const getUserIdFromToken = (token: string): string | null => {
    try {
      const decoded: any = jwt_decode.jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/");
    setUser(null);
    window.location.reload();
  };

  const token = localStorage.getItem("access_token");
  const userId = token ? getUserIdFromToken(token) : null;

  const fetchUserInfo = async () => {
    if (!token || !userId) {
      router.push("/");
      return;
    }

    try {
      const userData = await getUserInfo(userId);
      if (userData) {
        setUser(userData.data);
        setOriginalUser(userData.data);
      } else {
        alert("Có lỗi xảy ra, vui lòng đăng nhập lại");
        logoutUser();
      }
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng đăng nhập lại");
      logoutUser();
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  const handleCancelPasswordEdit = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Thông tin cá nhân
        </h2>
        {!isEditingProfile ? (
          <div className="mt-4">
            <p className="text-gray-600">Tên: {user?.name}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Số điện thoại: {user?.phone}</p>
            <p className="text-gray-600">Địa chỉ: {user?.address}</p>
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
                type="text"
                placeholder="Số điện thoại"
                value={user.phone || ""}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Địa chỉ"
                value={user.address || ""}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
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
              onClick={handleCancelProfileEdit}
              className="ml-2 mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      {/* <div className="mb-8">
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
      </div> */}

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Đổi mật khẩu</h2>

        {!isEditingPassword ? (
          <button
            className="mt-4 px-4 py-2 rounded-md bg-buttonRoot"
            onClick={() => setIsEditingPassword(true)}
          >
            Đổi mật khẩu
          </button>
        ) : (
          <div className="mt-4">
            {/* Trường mật khẩu cũ */}
            <div className="relative mb-4">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-2 top-3"
              >
                {showOldPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Trường mật khẩu mới */}
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-3"
              >
                {showNewPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Trường xác nhận mật khẩu mới */}
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            <button
              onClick={handlePasswordChange}
              className="mt-4 px-4 py-2 rounded-md bg-buttonRoot"
            >
              Lưu mật khẩu mới
            </button>
            <button
              onClick={handleCancelPasswordEdit}
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
