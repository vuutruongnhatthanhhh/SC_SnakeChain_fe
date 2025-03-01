"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  changePassword,
  checkCode,
  retryActive,
  retryPassword,
} from "@/services/authService";

interface AuthFormProps {
  onLoginSuccess: () => void;
}

export default function AuthForm({ onLoginSuccess }: AuthFormProps) {
  const { handleLogin, handleRegister } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifyingPass, setIsVerifyingPass] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      if (isLogin) {
        await handleLogin(formData.email, formData.password);

        window.location.reload();
        onLoginSuccess();
      } else {
        const response = await handleRegister(
          formData.email,
          formData.password,
          formData.name
        );
        setIsVerifying(true);
      }
    } catch (err: any) {
      if (err === "Tài khoản chưa được kích hoạt") {
        setIsVerifying(true);
      } else {
        setError(err);
      }
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await retryPassword(formData.email);
      setIsVerifyingPass(true);
    } catch (err: any) {
      console.log("err", err);
      setError(err.response.data.message);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await checkCode(formData.email, verificationCode);

      await handleLogin(formData.email, formData.password);
      onLoginSuccess();
      alert("Kích hoạt tài khoản thành công!");
      window.location.reload();
    } catch (err: any) {
      setError("Mã xác thực không hợp lệ");
    }
  };

  const handleVerifyCodeChangePass = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await checkCode(formData.email, verificationCode);
      setIsChangePass(true);
      // await handleLogin(formData.email, formData.password);
      // window.location.reload();
    } catch (err: any) {
      setError("Mã xác thực không hợp lệ");
    }
  };

  const handleResendCode = async () => {
    try {
      await retryActive(formData.email);
      alert("Mã xác thực mới đã được gửi!");
    } catch (err) {
      setError("Không thể gửi lại mã. Vui lòng thử lại.");
    }
  };

  const handleChangePass = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      const data = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        code: verificationCode,
      };
      await changePassword(data);
      alert("Đổi mật khẩu thành công!");
      onLoginSuccess();
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isChangePass
            ? "Đổi Mật Khẩu"
            : isVerifying || isVerifyingPass
            ? "Xác Thực Email"
            : isForgotPassword
            ? "Quên Mật Khẩu"
            : isLogin
            ? "Đăng Nhập"
            : "Đăng Ký"}
        </h2>

        {isChangePass && (
          <form onSubmit={handleChangePass} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu mới"
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
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu mới"
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
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-buttonRoot font-semibold py-2 rounded-md transition-all"
            >
              Đổi mật khẩu
            </button>
          </form>
        )}

        {isVerifyingPass && !isChangePass && (
          <form
            onSubmit={handleVerifyCodeChangePass}
            className="mt-4 space-y-4"
          >
            <p className="text-center text-gray-600">
              Nhập mã xác thực đã gửi đến email
            </p>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Mã xác thực
              </label>
              <input
                type="text"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Nhập mã xác thực"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-buttonRoot font-semibold py-2 rounded-md transition-all"
            >
              Xác thực
            </button>
          </form>
        )}

        {isVerifying && (
          <form onSubmit={handleVerifyCode} className="mt-4 space-y-4">
            <p className="text-center text-gray-600">
              Nhập mã xác thực đã gửi đến email
            </p>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Mã xác thực
              </label>
              <input
                type="text"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Nhập mã xác thực"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-buttonRoot font-semibold py-2 rounded-md transition-all"
            >
              Xác thực
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Không nhận được mã?{" "}
              <button
                onClick={handleResendCode}
                className="text-blue-600 hover:underline font-semibold"
              >
                Gửi lại mã
              </button>
            </p>
          </form>
        )}

        {!isForgotPassword && !isVerifying && (
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

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên của bạn"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                />
              </div>
            )}

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

            {!isLogin && !isVerifying && (
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
            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-buttonRoot font-semibold py-2 rounded-md transition-all"
            >
              {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    name: "",
                  });
                  setError(null);
                }}
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

        {/* Form forget pass */}
        {isForgotPassword && !isVerifyingPass && (
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
            {error && <p className="text-red-500 text-center">{error}</p>}
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
