"use client";

import {
  countUsers,
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/services/userService";
import { useState, useEffect } from "react";
import { FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import dayjs from "dayjs";
import SearchAdmin from "@/components/admin/SearchAdmin";
import Pagination from "@/components/admin/Pagination";
import FilterAdmin from "@/components/admin/FilterAdmin";
import Table from "@/components/admin/Table";
import Select from "react-select";
import { getAllLessons } from "@/services/lessonService";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  accountType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
  address: string;
  lessons: string[];
}

interface Meta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "USER",
  });
  const [meta, setMeta] = useState<Meta>({
    current: 1,
    pageSize: 10,
    pages: 1,
    total: 0,
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [role, setRole] = useState("");
  const [accountType, setAccountType] = useState("");
  const [isActive, setIsActive] = useState<string>("");
  const [lessons, setLessons] = useState<
    { value: string; label: string; code: string }[]
  >([]);

  const resetNewUser = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "USER",
    });
  };

  const fetchUsers = async () => {
    try {
      const fetchedData = await getAllUsers(
        meta.current,
        meta.pageSize,
        searchTerm,
        role,
        accountType,
        isActive
      );
      if (fetchedData.data.results) {
        setUsers(fetchedData.data.results);
        setMeta(fetchedData.data.meta);
      } else {
        alert("Tải danh sách người dùng không thành công");
      }
    } catch (error: any) {
      console.log("Refresh token hết hạn hoặc lỗi không xác định");
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchUsers();
    handleFetchLessons();
  }, [meta.current, meta.pageSize, searchTerm, role, accountType, isActive]);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const updatedUser = await updateUser({
        _id: editingUser._id,
        name: editingUser.name,
        phone: editingUser.phone,
        address: editingUser.address,
        role: editingUser.role,
        lessons: editingUser.lessons,
      });

      if (updatedUser) {
        alert("Cập nhật thông tin thành công");
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    const confirmed = window.confirm(`Bạn muốn xóa người dùng ${name}?`);

    if (confirmed) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error: any) {
        alert(
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleAddUser = async () => {
    try {
      await createUser(newUser);
      setIsAdding(false);
      fetchUsers();
      alert("Thêm người dùng thành công");
      resetNewUser();
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setIsAdding(false);
    resetNewUser();
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setMeta((prev) => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page: number) => {
    setMeta((prev) => ({ ...prev, current: page }));
  };

  const handlePageSizeChange = (size: number) => {
    setMeta((prev) => ({ ...prev, pageSize: size, current: 1 }));
  };

  const handleFetchLessons = async () => {
    const fetchedData = await getAllLessons(1, 1000, "", "", "");

    if (fetchedData.data.results) {
      const filteredLessons = fetchedData.data.results
        .filter((lesson: { price: number }) => lesson.price !== 0)
        .map((lesson: { _id: string; title: string; code: string }) => ({
          value: lesson._id,
          label: lesson.title,
          code: lesson.code,
        }));

      setLessons(filteredLessons);
    } else {
      alert("Tải danh sách lessons không thành công");
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Quản lý người dùng
        <button
          onClick={() => setIsAdding(true)}
          className="ml-2 text-green-500"
        >
          <FiPlus />
        </button>
      </h2>

      {/* Filter */}
      <div className="mb-4 flex-col space-y-4 space-x-1">
        <FilterAdmin
          value={role}
          options={[
            { value: "", label: "Chọn quyền" },
            { value: "SNAKE", label: "SNAKE" },
            { value: "WORM", label: "WORM" },
            { value: "USER", label: "USER" },
          ]}
          onChange={(e) => setRole(e.target.value)}
        />
        <FilterAdmin
          value={accountType}
          options={[
            { value: "", label: "Chọn loại tài khoản" },
            { value: "LOCAL", label: "LOCAL" },
            { value: "GOOGLE", label: "GOOGLE" },
          ]}
          onChange={(e) => setAccountType(e.target.value)}
        />
        <FilterAdmin
          value={isActive}
          options={[
            { value: "", label: "Chọn trạng thái kích hoạt" },
            { value: "true", label: "Kích hoạt" },
            { value: "false", label: "Chưa kích hoạt" },
          ]}
          onChange={(e) => setIsActive(e.target.value)}
        />
      </div>

      <SearchAdmin
        onSearch={handleSearch}
        placeholder="Tìm kiếm theo tên, email..."
        initialValue={searchTerm}
      />
      <p>
        Số lượng:{" "}
        <span className="text-blue-700 font-bold"> {users.length}</span>
      </p>

      <Table
        columns={[{ label: "Tên", key: "name" }]}
        data={users}
        handleView={handleViewUser}
        handleEdit={handleEditUser}
        handleDelete={(user: User) => handleDeleteUser(user._id, user.name)}
      />

      <Pagination
        currentPage={meta.current}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={meta.pageSize}
      />

      {/* popup view user */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Thông tin người dùng
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <p className="break-words">
                <strong>Id:</strong> {selectedUser._id}
              </p>
              <p className="break-words">
                <strong>Tên:</strong> {selectedUser.name}
              </p>
              <p className="break-words">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="break-words">
                <strong>Số điện thoại:</strong> {selectedUser?.phone}
              </p>
              <p className="break-words">
                <strong>Địa chỉ:</strong> {selectedUser?.address}
              </p>
              <p className="break-words">
                <strong>Quyền:</strong>{" "}
                <span className="text-blue-700 font-bold">
                  {selectedUser.role}
                </span>
              </p>
              <p className="break-words">
                <strong>Tài khoản:</strong> {selectedUser.accountType}
              </p>
              <p className="break-words">
                <strong>Kích hoạt:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedUser.isActive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {selectedUser.isActive ? "YES" : "NO"}
                </span>
              </p>
              <p className="break-words">
                <strong>Bài học:</strong>
              </p>
              <ul className="list-disc list-inside">
                {selectedUser.lessons.map((lessonId: string, index: number) => {
                  const lesson = lessons.find((l) => l.value === lessonId);
                  return (
                    <li key={index}>
                      {lesson
                        ? `[${lesson.code}] ` + lesson.label
                        : "Không tìm thấy"}
                    </li>
                  );
                })}
              </ul>
              <p className="break-words">
                <strong>Ngày tạo:</strong>{" "}
                {dayjs(selectedUser.createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="break-words">
                <strong>Cập nhật:</strong>{" "}
                {dayjs(selectedUser.updatedAt).format("DD-MM-YYYY HH:mm")}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* popup edit user */}
      {isEditing && editingUser && (
        <div className="fixed inset-0 bg-gray-500  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Chỉnh sửa người dùng
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <div>
                <label className="block">Tên:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
              </div>

              <div className="mt-2">
                <label className="block">Số điện thoại:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingUser?.phone || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, phone: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">Địa chỉ:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingUser?.address || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, address: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">Quyền:</label>
                <select
                  className="border p-2 w-full"
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="SNAKE">SNAKE</option>
                  <option value="WORM">WORM</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div>
                <label className="block">
                  Bài học <span className="text-red-600">*</span>
                </label>

                <Select
                  isMulti
                  // options={lessons}
                  options={lessons.map((lesson) => ({
                    value: lesson.value,
                    label: lesson.label,
                    code: lesson.code,
                  }))}
                  value={editingUser.lessons.map((lessonId) =>
                    lessons.find((l) => l.value === lessonId)
                  )}
                  getOptionLabel={(option) =>
                    `[${option?.code}] ${option?.label}`
                  }
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option: any) => option.value
                    );
                    setEditingUser({
                      ...editingUser,
                      lessons: selectedValues,
                    });
                  }}
                  className="border p-2 w-full"
                  placeholder="Tìm kiếm bài học..."
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Cập nhật
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* popup add user */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Thêm người dùng mới
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <div>
                <label className="block">Tên:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">Email:</label>
                <input
                  type="email"
                  className="border p-2 w-full"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">Mật khẩu:</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border p-2 w-full"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <label className="block">Số điện thoại:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">Địa chỉ:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newUser.address}
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">Quyền:</label>
                <select
                  className="border p-2 w-full"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="SNAKE">SNAKE</option>
                  <option value="WORM">WORM</option>
                  <option value="USER">USER</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Thêm
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
