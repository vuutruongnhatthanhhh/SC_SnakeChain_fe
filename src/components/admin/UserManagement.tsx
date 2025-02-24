"use client";

import { useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
    { id: 2, name: "Trần Thị B", email: "b@example.com" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: newUserId, ...newUser }]);
    setNewUser({ name: "", email: "" });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    setUsers(
      users.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
      {/* <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Tên"
          className="border p-2"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
        {editingUser ? (
          <button
            onClick={handleUpdateUser}
            className="bg-blue-500 text-white p-2"
          >
            Cập nhật
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white p-2"
          >
            <FiPlus />
          </button>
        )}
      </div> */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="border p-2">ID</th> */}
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              {/* <td className="border p-2">{user.id}</td> */}
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-500"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
