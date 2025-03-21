"use client";

import { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";
import SearchAdmin from "@/components/admin/SearchAdmin";
import Pagination from "@/components/admin/Pagination";
import FilterAdmin from "./FilterAdmin";
import Table from "./Table";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  uploadImage,
} from "@/services/blogService";
import Editor from "./Editor";
import ImageServer from "./ImageServer";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  url: string;
  image: string;
  shortDescription: string;
  content: string;
  author: string;
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

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [newBlog, setNewBlog] = useState({
    title: "",
    url: "",
    image: "",
    shortDescription: "",
    content: "",
    author: user?.email,
    isHide: false,
  });
  const [meta, setMeta] = useState<Meta>({
    current: 1,
    pageSize: 10,
    pages: 1,
    total: 0,
  });

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isHide, setIsHide] = useState<string>("");
  const [field, setField] = useState<string>("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("uploadBlog");

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

  const resetBlogState = () => {
    setNewBlog({
      title: "",
      url: "",
      image: "",
      shortDescription: "",
      content: "",
      author: user?.email,
      isHide: false,
    });
  };

  const resetImage = () => {
    setImagePath(null);
    setImagePreview(null);
  };

  const fetchBlog = async () => {
    try {
      const fetchedData = await getAllBlogs(
        meta.current,
        meta.pageSize,
        searchTerm,
        isHide
      );
      if (fetchedData.data.results) {
        setBlogs(fetchedData.data.results);
        setMeta(fetchedData.data.meta);
      } else {
        alert("Tải danh sách blog không thành công");
      }
    } catch (error: any) {
      console.log("Refresh token hết hạn hoặc lỗi không xác định");
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [meta.current, meta.pageSize, searchTerm, isHide, field]);

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditing(true);
  };

  const handleUpdateBlog = async () => {
    if (!editingBlog) return;
    try {
      setIsLoadingUpdate(true);

      if (!editingBlog.image) {
        if (imagePath) {
          const updatedBlog = await updateBlog({
            _id: editingBlog._id,
            title: editingBlog.title,
            url: editingBlog.url,
            image: imagePath,
            shortDescription: editingBlog.shortDescription,
            content: editingBlog.content,
            author: editingBlog.author,
            isHide: editingBlog.isHide,
          });
          if (updatedBlog) {
            alert("Cập nhật thông tin thành công");
            setEditingBlog(null);
            resetImage();
            fetchBlog();
          }
        } else {
          alert("Vui lòng chọn hình ảnh để tải lên.");
        }
      } else {
        const updatedBlog = await updateBlog({
          _id: editingBlog._id,
          title: editingBlog.title,
          url: editingBlog.url,
          image: editingBlog.image,
          shortDescription: editingBlog.shortDescription,
          content: editingBlog.content,
          author: editingBlog.author,
          isHide: editingBlog.isHide,
        });
        if (updatedBlog) {
          alert("Cập nhật thông tin thành công");
          setEditingBlog(null);
          resetImage();
          fetchBlog();
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

  const handleDeleteSourceCode = async (id: string, code: string) => {
    const confirmed = window.confirm(`Bạn muốn xóa Blog: ${code}?`);

    if (confirmed) {
      try {
        await deleteBlog(id);
        fetchBlog();
      } catch (error: any) {
        alert(
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    }
  };

  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedBlog(null);
    setIsAdding(false);
    resetBlogState();
    resetImage();
  };

  const handleAddImage = async () => {
    if (!imageFile) {
      alert("Vui lòng chọn hình ảnh chính để tải lên.");
      return;
    }
    try {
      const imagePath = await uploadImage(imageFile, "uploadBlog");

      return imagePath;
    } catch (err) {
      alert("Có lỗi xảy ra");
    }
  };

  const handleContentChange = (content: string) => {
    setNewBlog((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const handleContentUpdate = (content: string) => {
    setEditingBlog((prevState) =>
      prevState ? { ...prevState, content } : null
    );
  };

  const handleAddBlog = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoadingAdd(true);

      if (imagePath) {
        setNewBlog((prevState) => ({
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
    if (newBlog.image) {
      const createBlogHandler = async () => {
        try {
          await createBlog(newBlog);
          setIsAdding(false);
          fetchBlog();
          alert("Thêm Blog thành công");
          resetBlogState();
          setImageFile(null);
          setImagePreview(null);
          setImageFiles([]);
          setImagePreviews([]);
        } catch (error: any) {
          alert(
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
          );
        }
      };

      createBlogHandler();
    }
  }, [newBlog.image]);

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
      !newBlog.title ||
      !newBlog.url ||
      !newBlog.shortDescription ||
      !newBlog.content ||
      !newBlog.author
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
        Quản lý Blog
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
        <span className="text-blue-700 font-bold"> {blogs.length}</span>
      </p>

      <Table
        columns={[{ label: "Tên", key: "title" }]}
        data={blogs}
        handleView={handleViewBlog}
        handleEdit={handleEditBlog}
        handleDelete={(blog: Blog) =>
          handleDeleteSourceCode(blog._id, blog.title)
        }
      />

      <Pagination
        currentPage={meta.current}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={meta.pageSize}
      />

      {/* popup view blog */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4  sticky top-0">
              Thông tin Blog
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <p className="break-words">
                <strong>Id:</strong> {selectedBlog._id}
              </p>
              <p className="break-words">
                <strong>Tiêu đề:</strong>{" "}
                <span className="text-green-600 font-bold">
                  {selectedBlog.title}
                </span>
              </p>
              <p className="break-words">
                <strong>Url:</strong> {selectedBlog.url}
              </p>
              <p className="break-words">
                <strong>Hình ảnh</strong>
                {selectedBlog.image ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_SERVER + selectedBlog.image}
                    alt="Hình ảnh chính"
                    className=" object-cover mt-2 cursor-pointer"
                    width={150}
                    height={150}
                    onClick={() =>
                      openModalImage(
                        process.env.NEXT_PUBLIC_SERVER + selectedBlog.image
                      )
                    }
                  />
                ) : (
                  <span className="text-gray-500">Chưa có hình ảnh chính</span>
                )}
              </p>
              <p className="break-words">
                <strong>Mô tả ngắn:</strong> {selectedBlog.shortDescription}
              </p>
              <p className="break-words">
                <strong>Nội dung:</strong>
                {/* {selectedBlog.content} */}{" "}
                <Link
                  className="text-blue-600 hover:underline"
                  href={`/blog/${selectedBlog.url}`}
                  target="_blank"
                >
                  Xem chi tiết
                </Link>
              </p>
              <p className="break-words">
                <strong>Tác giả:</strong> {selectedBlog.author}
              </p>
              <p className="break-words">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedBlog.isHide ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {selectedBlog.isHide ? "Ẩn" : "Hiện"}
                </span>
              </p>
              <p className="break-words">
                <strong>Ngày tạo:</strong>{" "}
                {dayjs(selectedBlog.createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="break-words">
                <strong>Cập nhật:</strong>{" "}
                {dayjs(selectedBlog.updatedAt).format("DD-MM-YYYY HH:mm")}
              </p>

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

      {/* popup edit source code */}
      {isEditing && editingBlog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Chỉnh sửa Blog
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
                    value={editingBlog.title}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
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
                    value={editingBlog.url}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        url: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-2">
                  <label className="block">
                    Hình ảnh <span className="text-red-600">* (800x400)</span>
                  </label>

                  {editingBlog.image && (
                    <div className="mt-2 flex items-center">
                      <Image
                        src={process.env.NEXT_PUBLIC_SERVER + editingBlog.image}
                        alt="Hình ảnh chính"
                        className=" object-cover"
                        width={150}
                        height={150}
                      />
                      <button
                        onClick={() => {
                          const newBlog = { ...editingBlog };
                          newBlog.image = "";
                          setEditingBlog(newBlog);
                        }}
                        className="bg-red-500 text-white rounded-full w-6 h-6"
                      >
                        X
                      </button>
                    </div>
                  )}
                  {!editingBlog.image && (
                    <div className="mt-2">
                      {!imagePreview && (
                        <ImageServer
                          handleImageSelect={handleImageSelect}
                          folder="uploadBlog"
                        />
                      )}

                      {imagePreview && (
                        <div className="flex items-center mt-2">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover mr-2"
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
                  <label className="block">Tác giả</label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingBlog.author}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        author: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block">Trạng thái</label>
                  <select
                    className="border p-2 w-full"
                    value={
                      editingBlog.isHide !== undefined
                        ? String(editingBlog.isHide)
                        : "false"
                    }
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
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
                    Mô tả ngắn <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={editingBlog.shortDescription}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        shortDescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block">
                  Nội dung <span className="text-red-600">*</span>
                </label>
                <Editor
                  folder="uploadBlog"
                  initialContent={`${editingBlog.content}`}
                  onContentChange={handleContentUpdate}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleUpdateBlog}
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

      {/* popup add blog */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Thêm Blog mới
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
                    value={newBlog.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewBlog({
                        ...newBlog,
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
                    value={newBlog.url}
                    onChange={(e) =>
                      setNewBlog({
                        ...newBlog,
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
                        folder="uploadBlog"
                        handleImageSelect={handleImageSelect}
                      />
                    )}
                  </div>

                  {imagePreview && (
                    <div className="flex items-center mt-2">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover mr-2"
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
                    Tác giả <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={newBlog.author}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block">Trạng thái</label>
                  <select
                    className="border p-2 w-full"
                    value={
                      newBlog.isHide !== undefined
                        ? String(newBlog.isHide)
                        : "false"
                    }
                    onChange={(e) =>
                      setNewBlog({
                        ...newBlog,
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
                    Mô tả ngắn <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={newBlog.shortDescription}
                    onChange={(e) => {
                      const shortDescription = e.target.value;
                      setNewBlog({
                        ...newBlog,
                        shortDescription: shortDescription,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block">
                  Nội dung <span className="text-red-600">*</span>
                </label>

                <Editor
                  folder="uploadBlog"
                  onContentChange={handleContentChange}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleAddBlog}
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

export default BlogManagement;
