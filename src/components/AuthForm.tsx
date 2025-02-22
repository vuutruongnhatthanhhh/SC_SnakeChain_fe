"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${isLogin ? "Đăng nhập" : "Đăng ký"} với dữ liệu:`, formData);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quên mật khẩu với email:", formData.email);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isForgotPassword
            ? "Quên Mật Khẩu"
            : isLogin
            ? "Đăng Nhập"
            : "Đăng Ký"}
        </h2>

        {!isForgotPassword && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 top-2 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 top-2 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-buttonRoot font-semibold py-2 rounded-md transition-all"
            >
              {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline font-semibold"
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </p>

            {isLogin && (
              <p className="text-sm text-blue-600 text-center mt-4">
                <button
                  onClick={() => setIsForgotPassword(true)}
                  className="hover:underline font-semibold"
                >
                  Quên mật khẩu?
                </button>
              </p>
            )}
          </form>
        )}

        {/* Form quên mật khẩu */}
        {isForgotPassword && (
          <form
            onSubmit={handleForgotPasswordSubmit}
            className="mt-4 space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Nhập email của bạn
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-buttonRoot font-semibold py-2 rounded-md transition-all"
            >
              Gửi yêu cầu thay đổi mật khẩu
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-blue-600 hover:underline font-semibold"
              >
                Quay lại đăng nhập
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
