"use client";

import { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";
import SearchAdmin from "@/components/admin/SearchAdmin";
import Pagination from "@/components/admin/Pagination";
import FilterAdmin from "./FilterAdmin";
import Table from "./Table";
import Select from "react-select";

import ImageServer from "./ImageServer";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "@/services/courseService";
import { getAllLessons } from "@/services/lessonService";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  url: string;
  image: string;
  shortDescription: string;
  category: string;
  isHide: boolean;
  lessons: string[];
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [newCourse, setNewCourse] = useState({
    title: "",
    url: "",
    image: "",
    shortDescription: "",
    category: "WEBSITE",
    isHide: false,
    lessons: [] as string[],
  });
  const [meta, setMeta] = useState<Meta>({
    current: 1,
    pageSize: 10,
    pages: 1,
    total: 0,
  });

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isHide, setIsHide] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const [lessons, setLessons] = useState<{ value: string; label: string }[]>(
    []
  );

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

  const resetCourseState = () => {
    setNewCourse({
      title: "",
      url: "",
      image: "",
      shortDescription: "",
      category: "WEBSITE",
      isHide: false,
      lessons: [] as string[],
    });
  };

  const resetImage = () => {
    setImagePath(null);
    setImagePreview(null);
  };

  const fetchCourses = async () => {
    try {
      const fetchedData = await getAllCourse(
        meta.current,
        meta.pageSize,
        searchTerm,
        isHide,
        category
      );
      if (fetchedData.data.results) {
        setCourses(fetchedData.data.results);
        setMeta(fetchedData.data.meta);
      } else {
        alert("Tải danh sách course không thành công");
      }
    } catch (error: any) {
      console.log("Refresh token hết hạn hoặc lỗi không xác định");
      return { error: error.message };
    }
  };

  const handleFetchLessons = async () => {
    const fetchedData = await getAllLessons(1, 1000, "", "", "");
    if (fetchedData.data.results) {
      const formattedLessons = fetchedData.data.results.map(
        (lesson: { _id: string; title: string }) => ({
          value: lesson._id,
          label: lesson.title,
        })
      );
      setLessons(formattedLessons);
    } else {
      alert("Tải danh sách lessons không thành công");
    }
  };

  useEffect(() => {
    fetchCourses();
    handleFetchLessons();
  }, [meta.current, meta.pageSize, searchTerm, isHide, category]);

  const handleEditBlog = (course: Course) => {
    setEditingCourse(course);
    setIsEditing(true);
  };

  const handleUpdateCourse = async () => {
    if (!editingCourse) return;
    try {
      setIsLoadingUpdate(true);

      if (!editingCourse.image) {
        if (imagePath) {
          const updatedCourse = await updateCourse({
            _id: editingCourse._id,
            title: editingCourse.title,
            url: editingCourse.url,
            image: imagePath,
            shortDescription: editingCourse.shortDescription,
            category: editingCourse.category,
            isHide: editingCourse.isHide,
            lessons: editingCourse.lessons,
          });
          if (updatedCourse) {
            alert("Cập nhật thông tin thành công");
            setEditingCourse(null);
            resetImage();
            fetchCourses();
          }
        } else {
          alert("Vui lòng chọn hình ảnh để tải lên.");
        }
      } else {
        const updatedCourse = await updateCourse({
          _id: editingCourse._id,
          title: editingCourse.title,
          url: editingCourse.url,
          image: editingCourse.image,
          shortDescription: editingCourse.shortDescription,
          category: editingCourse.category,

          isHide: editingCourse.isHide,
          lessons: editingCourse.lessons,
        });
        if (updatedCourse) {
          alert("Cập nhật thông tin thành công");
          setEditingCourse(null);
          resetImage();
          fetchCourses();
        }
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleDeleteCourse = async (id: string, title: string) => {
    const confirmed = window.confirm(`Bạn muốn xóa Khóa Học: ${title}?`);

    if (confirmed) {
      try {
        await deleteCourse(id);
        fetchCourses();
      } catch (error: any) {
        alert(
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    }
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedCourse(null);
    setIsAdding(false);
    resetCourseState();
    resetImage();
  };

  const handleAddCourse = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoadingAdd(true);

      if (imagePath) {
        setNewCourse((prevState) => ({
          ...prevState,
          image: imagePath,
        }));
      } else {
        alert("Vui lòng chọn hình ảnh để tải lên.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAdd(false);
    }
  };

  useEffect(() => {
    if (newCourse.image) {
      const createCourseHandler = async () => {
        try {
          await createCourse(newCourse);
          setIsAdding(false);
          fetchCourses();
          alert("Thêm Khóa Học thành công");
          resetCourseState();
          setImageFile(null);
          setImagePreview(null);
        } catch (error: any) {
          alert(
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
          );
        }
      };

      createCourseHandler();
    }
  }, [
    newCourse.image,
    // newBlog.extendedImage
  ]);

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
    if (
      !newCourse.title ||
      !newCourse.url ||
      !newCourse.shortDescription ||
      !newCourse.category
    ) {
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

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Quản lý khóa học
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

        <FilterAdmin
          value={category}
          options={[
            { value: "", label: "Loại" },
            { value: "WEBSITE", label: "Website" },
            { value: "BLOCKCHAIN", label: "Blockchain" },
            { value: "MOBILE", label: "Mobile" },
            { value: "SOFTWARE", label: "Software" },
          ]}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <SearchAdmin
        onSearch={handleSearch}
        placeholder="Tìm kiếm theo mã, tên..."
        initialValue={searchTerm}
      />

      <p>
        Số lượng:{" "}
        <span className="text-blue-700 font-bold"> {courses.length}</span>
      </p>

      <Table
        columns={[{ label: "Tên", key: "title" }]}
        data={courses}
        handleView={handleViewCourse}
        handleEdit={handleEditBlog}
        handleDelete={(course: Course) =>
          handleDeleteCourse(course._id, course.title)
        }
      />

      <Pagination
        currentPage={meta.current}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={meta.pageSize}
      />

      {/* popup view course */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4  sticky top-0">
              Thông tin Khóa Học
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <p className="break-words">
                <strong>Id:</strong> {selectedCourse._id}
              </p>
              <p className="break-words">
                <strong>Tiêu đề:</strong>{" "}
                <span className="text-green-600 font-bold">
                  {selectedCourse.title}
                </span>
              </p>
              <p className="break-words">
                <strong>Url:</strong> {selectedCourse.url}
              </p>
              <p className="break-words">
                <strong>Hình ảnh</strong>
                {selectedCourse.image ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_SERVER + selectedCourse.image}
                    alt="Hình ảnh chính"
                    className=" object-cover mt-2 cursor-pointer"
                    width={150}
                    height={150}
                    onClick={() =>
                      openModalImage(
                        process.env.NEXT_PUBLIC_SERVER + selectedCourse.image
                      )
                    }
                  />
                ) : (
                  <span className="text-gray-500">Chưa có hình ảnh chính</span>
                )}
              </p>
              <p className="break-words">
                <strong>Mô tả ngắn:</strong> {selectedCourse.shortDescription}
              </p>
              <p className="break-words">
                <strong>Loại: </strong>

                {selectedCourse.category}
              </p>

              <p className="break-words">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedCourse.isHide ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {selectedCourse.isHide ? "Ẩn" : "Hiện"}
                </span>
              </p>
              <p className="break-words">
                <strong>Ngày tạo:</strong>{" "}
                {dayjs(selectedCourse.createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="break-words">
                <strong>Cập nhật:</strong>{" "}
                {dayjs(selectedCourse.updatedAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="break-words">
                <strong>Bài học:</strong>
              </p>
              <ul className="list-disc list-inside">
                {selectedCourse.lessons.map(
                  (lessonId: string, index: number) => {
                    const lesson = lessons.find((l) => l.value === lessonId);
                    return (
                      <li key={index}>
                        {lesson ? lesson.label : "Không tìm thấy"}
                      </li>
                    );
                  }
                )}
              </ul>

              {/* Modal view image*/}
              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-end">
                      <button
                        onClick={closeModalImage}
                        className="text-red-600 font-bold"
                      >
                        Đóng
                      </button>
                    </div>
                    <Image
                      src={modalImage}
                      alt="Modal Image"
                      className="w-full h-auto object-contain"
                      width={272}
                      height={181}
                    />
                  </div>
                </div>
              )}
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

      {/* popup edit course */}
      {isEditing && editingCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Chỉnh sửa Khóa Học
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
                    value={editingCourse.title}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block">
                    Url <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingCourse.url}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        url: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-2">
                  <label className="block">
                    Hình ảnh <span className="text-red-600">* (800x400)</span>
                  </label>

                  {editingCourse.image && (
                    <div className="mt-2 flex items-center">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER + editingCourse.image
                        }
                        alt="Hình ảnh chính"
                        className="sobject-cover"
                        width={150}
                        height={150}
                      />
                      <button
                        onClick={() => {
                          const newCourse = { ...editingCourse };
                          newCourse.image = "";
                          setEditingCourse(newCourse);
                        }}
                        className="bg-red-500 text-white rounded-full w-6 h-6"
                      >
                        X
                      </button>
                    </div>
                  )}
                  {!editingCourse.image && (
                    <div className="mt-2">
                      {!imagePreview && (
                        <ImageServer
                          handleImageSelect={handleImageSelect}
                          folder="uploadCourse"
                        />
                      )}

                      {imagePreview && (
                        <div className="flex items-center mt-2">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            className=" object-cover mr-2"
                            width={150}
                            height={150}
                          />
                          <button
                            onClick={handleClearImage}
                            className=" bg-red-500 text-white rounded-full w-6 h-6"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block">
                    Mô tả ngắn <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingCourse.shortDescription}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        shortDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block">Loại</label>
                  <select
                    className="border p-2 w-full"
                    value={editingCourse.category}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="WEBSITE">Website</option>
                    <option value="BLOCKCHAIN">Blockchain</option>
                    <option value="MOBILE">Mobile</option>
                    <option value="SOFTWARE">Software</option>
                  </select>
                </div>

                <div>
                  <label className="block">Trạng thái</label>
                  <select
                    className="border p-2 w-full"
                    value={
                      editingCourse.isHide !== undefined
                        ? String(editingCourse.isHide)
                        : "false"
                    }
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        isHide: e.target.value === "true",
                      })
                    }
                  >
                    <option value="false">Hiện</option>
                    <option value="true">Ẩn</option>
                  </select>
                </div>
                <div>
                  <label className="block">
                    Bài học <span className="text-red-600">*</span>
                  </label>

                  <Select
                    isMulti
                    options={lessons}
                    value={editingCourse.lessons.map((lessonId) =>
                      lessons.find((l) => l.value === lessonId)
                    )}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(
                        (option: any) => option.value
                      );
                      setEditingCourse({
                        ...editingCourse,
                        lessons: selectedValues,
                      });
                    }}
                    className="border p-2 w-full"
                    placeholder="Tìm kiếm bài học..."
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleUpdateCourse}
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

      {/* popup add course */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Thêm Khóa Học mới
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
                    value={newCourse.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewCourse({
                        ...newCourse,
                        title: title,
                        url: convertToUrl(title),
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block">
                    Url <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={newCourse.url}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        url: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-2">
                  <label className="block">
                    Hình ảnh <span className="text-red-600">* (800x400)</span>
                  </label>
                  <div className="relative">
                    {!imagePreview && (
                      <ImageServer
                        folder="uploadCourse"
                        handleImageSelect={handleImageSelect}
                      />
                    )}
                  </div>

                  {imagePreview && (
                    <div className="flex items-center mt-2">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className=" object-cover mr-2"
                        width={150}
                        height={150}
                      />
                      <button
                        onClick={handleClearImage}
                        className=" bg-red-500 text-white rounded-full w-6 h-6"
                      >
                        X
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block">
                    Mô tả ngắn <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={newCourse.shortDescription}
                    onChange={(e) => {
                      const shortDescription = e.target.value;
                      setNewCourse({
                        ...newCourse,
                        shortDescription: shortDescription,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block">Bài học</label>

                  {/* Select lessons and search lesson */}
                  <Select
                    isMulti
                    options={lessons}
                    value={newCourse.lessons.map((lessonId) =>
                      lessons.find((l) => l.value === lessonId)
                    )}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(
                        (option: any) => option.value
                      );
                      setNewCourse({ ...newCourse, lessons: selectedValues });
                    }}
                    className="border p-2 w-full"
                    placeholder="Tìm kiếm bài học..."
                    styles={{
                      menuList: (base) => ({
                        ...base,
                        maxHeight: "200px",
                        overflowY: "auto",
                      }),
                    }}
                  />
                </div>
                <div>
                  <label className="block">Loại</label>
                  <select
                    className="border p-2 w-full"
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="WEBSITE">Website</option>
                    <option value="BLOCKCHAIN">Blockchain</option>
                    <option value="MOBILE">Mobile</option>
                    <option value="SOFTWARE">Software</option>
                  </select>
                </div>

                <div>
                  <label className="block">Trạng thái</label>
                  <select
                    className="border p-2 w-full"
                    value={
                      newCourse.isHide !== undefined
                        ? String(newCourse.isHide)
                        : "false"
                    }
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
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
                onClick={handleAddCourse}
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

export default CourseManagement;
