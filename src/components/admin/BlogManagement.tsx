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
  uploadImage,
} from "@/services/blogService";
import Editor from "./Editor";
import ImageServer from "./ImageServer";

interface Blog {
  _id: string;
  title: string;
  url: string;
  image: string;
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
  const [newBlog, setNewBlog] = useState({
    title: "",
    url: "",
    image: "",
    content: "",
    author: "",
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

  const handleExtendedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);

      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setImagePreviews((prevState) => [...prevState, ...previewUrls]);
      setImageFiles((prevState) => [...prevState, ...selectedFiles]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImagePreviews((prevState) => prevState.filter((_, i) => i !== index));
    setImageFiles((prevState) => prevState.filter((_, i) => i !== index));
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
      content: "",
      author: "",
      isHide: false,
    });
  };

  const resetImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageFiles([]);
    setImagePreviews([]);
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

  // const handleUpdateBlog = async () => {
  //   if (!editingBlog) return;
  //   try {
  //     setIsLoadingUpdate(true);
  //     let imagePath;
  //     let imageExtendedPath: string[] = [];

  //     imageExtendedPath = (await handleAddImages()) || [];

  //     if (!editingSourceCode.image) {
  //       imagePath = await handleAddImage();

  //       if (imagePath) {
  //         const updatedSourceCode = await updateSourceCode({
  //           _id: editingSourceCode._id,
  //           code: editingSourceCode.code,
  //           title: editingSourceCode.title,
  //           url: editingSourceCode.url,
  //           stack: editingSourceCode.stack,
  //           field: editingSourceCode.field,
  //           description: editingSourceCode.description,
  //           extendedDescription: editingSourceCode.extendedDescription,
  //           price: editingSourceCode.price,
  //           originalPrice: editingSourceCode.originalPrice,
  //           image: imagePath,
  //           extendedImage: [
  //             ...editingSourceCode.extendedImage,
  //             ...imageExtendedPath,
  //           ],
  //           linkDoc: editingSourceCode.linkDoc,
  //           linkYoutube: editingSourceCode.linkYoutube,
  //           isHide: editingSourceCode.isHide,
  //         });
  //         if (updatedSourceCode) {
  //           alert("Cập nhật thông tin thành công");
  //           setEditingSourceCode(null);
  //           resetImage();
  //           fetchBlog();
  //         }
  //       }
  //     } else {
  //       const updatedSourceCode = await updateSourceCode({
  //         _id: editingSourceCode._id,
  //         code: editingSourceCode.code,
  //         title: editingSourceCode.title,
  //         url: editingSourceCode.url,
  //         stack: editingSourceCode.stack,
  //         field: editingSourceCode.field,
  //         description: editingSourceCode.description,
  //         extendedDescription: editingSourceCode.extendedDescription,
  //         price: editingSourceCode.price,
  //         originalPrice: editingSourceCode.originalPrice,
  //         image: editingSourceCode.image,
  //         extendedImage: [
  //           ...editingSourceCode.extendedImage,
  //           ...imageExtendedPath,
  //         ],
  //         linkDoc: editingSourceCode.linkDoc,
  //         linkYoutube: editingSourceCode.linkYoutube,
  //         isHide: editingSourceCode.isHide,
  //       });
  //       if (updatedSourceCode) {
  //         alert("Cập nhật thông tin thành công");
  //         setEditingSourceCode(null);
  //         resetImage();
  //         fetchBlog();
  //       }
  //     }
  //   } catch (error: any) {
  //     alert(
  //       error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
  //     );
  //   } finally {
  //     setIsLoadingUpdate(false);
  //   }
  // };

  const handleDeleteSourceCode = async (id: string, code: string) => {
    const confirmed = window.confirm(`Bạn muốn xóa Source Code ${code}?`);

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
      content: content, // Cập nhật nội dung của bài blog
    }));
  };

  const handleAddBlog = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoadingAdd(true);
      // let imageExtendedPath: string[] = [];
      // const imagePath = await handleAddImage();
      // if (imagePath) {
      //   imageExtendedPath = (await handleAddImages()) || [];
      // }

      if (imagePath) {
        setNewBlog((prevState) => ({
          ...prevState,
          image: imagePath,
          // extendedImage: imageExtendedPath || [],
        }));
      } else {
        alert("Vui lòng chọn hình ảnh chính để tải lên.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAdd(false);
    }
  };

  useEffect(() => {
    if (newBlog.image) {
      const createSourceCodeHandler = async () => {
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

      createSourceCodeHandler();
    }
  }, [
    newBlog.image,
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
    if (!newBlog.title || !newBlog.url || !newBlog.content || !newBlog.author) {
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

        <FilterAdmin
          value={field}
          options={[
            { value: "", label: "Loại" },
            { value: "FRONTEND", label: "Front end" },
            { value: "BACKEND", label: "Back end" },
            { value: "FULLSTACK", label: "Full stack" },
            { value: "MOBILE", label: "Mobile" },
            { value: "BLOCKCHAIN", label: "Blockchain" },
          ]}
          onChange={(e) => setField(e.target.value)}
        />
      </div>

      <SearchAdmin
        onSearch={handleSearch}
        placeholder="Tìm kiếm theo mã, tên..."
        initialValue={searchTerm}
      />
      {/* <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {sourceCodes.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center p-4 text-gray-500">
                Không tìm thấy Source Code
              </td>
            </tr>
          ) : (
            sourceCodes.map((sourceCode) => (
              <tr key={sourceCode._id} className="text-center">
                <td className="border p-2">{sourceCode.code}</td>
                <td className="border p-2">{sourceCode.title}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleViewSourceCode(sourceCode)}
                    className="text-orange-500"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => handleEditSourceCode(sourceCode)}
                    className="text-blue-500"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteSourceCode(sourceCode._id, sourceCode.code)
                    }
                    className="text-red-500"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> */}

      <Table
        columns={[{ label: "Tên", key: "title" }]}
        data={blogs}
        handleView={handleViewBlog}
        handleEdit={handleEditBlog}
        // handleDelete={(sourceCode: Blog) =>
        //   handleDeleteSourceCode(sourceCode._id, sourceCode.code)
        // }
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thông tin Blog</h2>
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
                <img
                  src={process.env.NEXT_PUBLIC_SERVER + selectedBlog.image}
                  alt="Hình ảnh chính"
                  className="w-32 h-32 object-cover mt-2 cursor-pointer"
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
              <strong>Nội dung:</strong>
              {/* {selectedBlog.content} */} Xem chi tiết
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
                  <img
                    src={modalImage}
                    alt="Modal Image"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            )}

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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-auto">
            {" "}
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {" "}
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
              <div>
                <label className="block">
                  Hình ảnh <span className="text-red-600">* (800x400)</span>
                </label>

                {editingBlog.image && (
                  <div className="mt-2 flex items-center">
                    <img
                      src={process.env.NEXT_PUBLIC_SERVER + editingBlog.image}
                      alt="Hình ảnh chính"
                      className="w-32 h-32 object-cover"
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
                    {/* <input
                      ref={fileInputRef}
                      type="file"
                      className="border p-2 w-full"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="file-upload-main"
                    />
                    <label
                      htmlFor="file-upload-main"
                      className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Chọn ảnh
                    </label> */}

                    {!imagePreview && (
                      <ImageServer handleImageSelect={handleImageSelect} />
                    )}

                    {imagePreview && (
                      <div className="flex items-center mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover mr-2"
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
                <label className="block">Trạng thái:</label>
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
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                // onClick={handleUpdateBlog}
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
                    {/* <input
                      ref={fileInputRef}
                      type="file"
                      className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Chọn ảnh
                    </button> */}
                    {!imagePreview && (
                      <ImageServer handleImageSelect={handleImageSelect} />
                    )}
                  </div>

                  {imagePreview && (
                    <div className="flex items-center mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover mr-2"
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
                    onChange={(e) =>
                      setNewBlog({
                        ...newBlog,
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
              </div>
              <div>
                <label className="block">
                  Nội dung <span className="text-red-600">*</span>
                </label>

                <Editor onContentChange={handleContentChange} />
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
