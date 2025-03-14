"use client";

import { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";
import SearchAdmin from "@/components/admin/SearchAdmin";
import Pagination from "@/components/admin/Pagination";
import FilterAdmin from "./FilterAdmin";
import Table from "./Table";

import Editor from "./Editor";
import ImageServer from "./ImageServer";
import { Shojumaru } from "next/font/google";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "@/services/courseService";
import { LiaEggSolid } from "react-icons/lia";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
  updateLesson,
} from "@/services/lessonService";

interface Lesson {
  _id: string;
  title: string;
  content: string;
  videoUrl: string;
  price: Number;
  isHide: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

const LessonsManagement = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
    price: 0,
    isHide: false,
  });
  const [meta, setMeta] = useState<Meta>({
    current: 1,
    pageSize: 10,
    pages: 1,
    total: 0,
  });

  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isHide, setIsHide] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    const fullImageUrl = process.env.NEXT_PUBLIC_SERVER + imageUrl;
    setImagePreview(fullImageUrl);
    setImagePath(imageUrl);
  };

  const handleClearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
    setImageFile(null);
  };

  const resetLessonState = () => {
    setNewLesson({
      title: "",
      content: "",
      videoUrl: "",
      price: 0,
      isHide: false,
    });
  };

  const resetImage = () => {
    setImagePath(null);
    setImagePreview(null);
    // setImageFiles([]);
    // setImagePreviews([]);
  };

  const fetchLessons = async () => {
    try {
      const fetchedData = await getAllLessons(
        meta.current,
        meta.pageSize,
        searchTerm,
        isHide,
        course
      );
      if (fetchedData.data.results) {
        setLessons(fetchedData.data.results);
        setMeta(fetchedData.data.meta);
      } else {
        alert("Tải danh sách lessons không thành công");
      }
    } catch (error: any) {
      console.log("Refresh token hết hạn hoặc lỗi không xác định");
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [meta.current, meta.pageSize, searchTerm, isHide, course]);

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsEditing(true);
  };

  const handleUpdateLesson = async () => {
    if (!editingLesson) return;
    try {
      setIsLoadingUpdate(true);

      const updatedLesson = await updateLesson({
        _id: editingLesson._id,
        title: editingLesson.title,
        content: editingLesson.content,
        videoUrl: editingLesson.videoUrl,
        price: editingLesson.price,
        isHide: editingLesson.isHide,
      });
      if (updatedLesson) {
        alert("Cập nhật thông tin thành công");
        setEditingLesson(null);
        fetchLessons();
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleDeleteLesson = async (id: string, title: string) => {
    const confirmed = window.confirm(`Bạn muốn xóa Bài Học: ${title}?`);

    if (confirmed) {
      try {
        await deleteLesson(id);
        fetchLessons();
      } catch (error: any) {
        alert(
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    }
  };

  const handleViewLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedLesson(null);
    setIsAdding(false);
    resetLessonState();
    resetImage();
  };

  const handleAddLesson = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoadingAdd(true);

      setNewLesson((prevState) => ({
        ...prevState,
      }));
      await createLesson(newLesson);
      setIsAdding(false);
      fetchLessons();
      alert("Thêm Bài Học thành công");
      resetLessonState();
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    } finally {
      setIsLoadingAdd(false);
    }
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModalImage = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModalImage = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const validateForm = () => {
    if (!newLesson.title || !newLesson.content || !newLesson.videoUrl) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return false;
    }

    return true;
  };

  const convertToUrl = (title: string) => {
    return title
      .toLowerCase()
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleContentChange = (content: string) => {
    setNewLesson((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Quản lý bài học
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
          value={isHide}
          options={[
            { value: "", label: "Trạng thái" },
            { value: "true", label: "Ẩn" },
            { value: "false", label: "Hiện" },
          ]}
          onChange={(e) => setIsHide(e.target.value)}
        />
      </div>

      <SearchAdmin
        onSearch={handleSearch}
        placeholder="Tìm kiếm theo mã, tên..."
        initialValue={searchTerm}
      />

      <p>
        Số lượng:{" "}
        <span className="text-blue-700 font-bold"> {lessons.length}</span>
      </p>

      <Table
        columns={[{ label: "Tên", key: "title" }]}
        data={lessons}
        handleView={handleViewLesson}
        handleEdit={handleEditLesson}
        handleDelete={(lesson: Lesson) =>
          handleDeleteLesson(lesson._id, lesson.title)
        }
      />

      <Pagination
        currentPage={meta.current}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={meta.pageSize}
      />

      {/* popup view lesson */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4  sticky top-0">
              Thông tin Bài Học
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <p className="break-words">
                <strong>Id:</strong> {selectedLesson._id}
              </p>
              <p className="break-words">
                <strong>Tiêu đề:</strong>{" "}
                <span className="text-green-600 font-bold">
                  {selectedLesson.title}
                </span>
              </p>
              {/* <p className="break-words">
                <strong>Nội dung:</strong> {selectedLesson.content}
              </p> */}
              <p className="break-words">
                <strong>Video url:</strong> {selectedLesson.videoUrl}
              </p>
              <p className="break-words">
                <strong>Giá tiền: </strong>
                <span className="text-green-600 font-bold">
                  {selectedLesson.price.toLocaleString("vi-VN")}
                </span>
              </p>
              <p className="break-words">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedLesson.isHide ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {selectedLesson.isHide ? "Ẩn" : "Hiện"}
                </span>
              </p>
              <p className="break-words">
                <strong>Ngày tạo:</strong>{" "}
                {dayjs(selectedLesson.createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="break-words">
                <strong>Cập nhật:</strong>{" "}
                {dayjs(selectedLesson.updatedAt).format("DD-MM-YYYY HH:mm")}
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

      {/* popup edit lesson */}
      {isEditing && editingLesson && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Chỉnh sửa Bài Học
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block">
                    Tiêu đề <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingLesson.title}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block">
                    Nội dung <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingLesson.content}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block">
                    Video url <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingLesson.videoUrl}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        videoUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block">
                    Giá tiền <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={String(editingLesson.price)}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block">Trạng thái</label>
                  <select
                    className="border p-2 w-full"
                    value={
                      editingLesson.isHide !== undefined
                        ? String(editingLesson.isHide)
                        : "false"
                    }
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        isHide: e.target.value === "true",
                      })
                    }
                  >
                    <option value="false">Hiện</option>
                    <option value="true">Ẩn</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleUpdateLesson}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isLoadingUpdate}
              >
                {isLoadingUpdate ? (
                  <div className="flex items-center justify-center">
                    Đang cập nhật...
                  </div>
                ) : (
                  "Cập nhật"
                )}
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

      {/* popup add lesson */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Thêm Bài Học mới
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block">
                    Tiêu đề <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={newLesson.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewLesson({
                        ...newLesson,
                        title: title,
                      });
                    }}
                  />
                </div>

                <div>
                  <label className="block">
                    Video url <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={newLesson.videoUrl}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        videoUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block">
                    Giá tiền <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    className="border p-2 w-full"
                    value={Number(newLesson.price)}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block">Trạng thái</label>
                  <select
                    className="border p-2 w-full"
                    value={
                      newLesson.isHide !== undefined
                        ? String(newLesson.isHide)
                        : "false"
                    }
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        isHide: e.target.value === "true",
                      })
                    }
                  >
                    <option value="false">Hiện</option>
                    <option value="true">Ẩn</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block">
                  Nội dung <span className="text-red-600">*</span>
                </label>
                <Editor
                  folder="uploadCourse"
                  onContentChange={handleContentChange}
                />
                {/* <input
                    type="text"
                    className="border p-2 w-full"
                    value={newLesson.content}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        content: e.target.value,
                      })
                    }
                  /> */}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleAddLesson}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isLoadingAdd}
              >
                {isLoadingAdd ? (
                  <div className="flex items-center justify-center">
                    Đang thêm...
                  </div>
                ) : (
                  "Thêm"
                )}
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

export default LessonsManagement;
