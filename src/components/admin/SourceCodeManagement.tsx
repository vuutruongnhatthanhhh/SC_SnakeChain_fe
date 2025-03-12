"use client";

import { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash, FiPlus, FiEye } from "react-icons/fi";
import dayjs from "dayjs";
import SearchAdmin from "@/components/admin/SearchAdmin";
import Pagination from "@/components/admin/Pagination";
import {
  createSourceCode,
  deleteSourceCode,
  getAllSourceCode,
  updateSourceCode,
  uploadImage,
  uploadImages,
} from "@/services/sourceCodeService";
import FilterAdmin from "./FilterAdmin";
import Table from "./Table";
import ImageServer from "./ImageServer";

interface SourceCode {
  _id: string;
  code: string;
  title: string;
  url: string;
  stack: string;
  field: string;
  description: string;
  extendedDescription: string;
  price: Number;
  originalPrice: Number;
  image: string;
  extendedImage: string[];
  linkDoc: string;
  linkYoutube: string;
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

const SourceCodeManagement = () => {
  const [sourceCodes, setSourceCodes] = useState<SourceCode[]>([]);
  const [newSourceCode, setNewSourceCode] = useState({
    code: "",
    title: "",
    url: "",
    stack: "",
    field: "FRONTEND",
    description: "",
    extendedDescription: "",
    price: 0,
    originalPrice: 0,
    image: "",
    extendedImage: [] as string[],
    linkDoc: "",
    linkYoutube: "",
    isHide: false,
  });
  const [meta, setMeta] = useState<Meta>({
    current: 1,
    pageSize: 10,
    pages: 1,
    total: 0,
  });
  const [editingSourceCode, setEditingSourceCode] = useState<SourceCode | null>(
    null
  );

  const [selectedSourceCode, setSelectedSourceCode] =
    useState<SourceCode | null>(null);
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

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageExtendedPath, setImageExtendedPath] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
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

  const resetSourceCodeState = () => {
    setNewSourceCode({
      code: "",
      title: "",
      url: "",
      stack: "",
      field: "FRONTEND",
      description: "",
      extendedDescription: "",
      price: 0,
      originalPrice: 0,
      image: "",
      extendedImage: [],
      linkDoc: "",
      linkYoutube: "",
      isHide: false,
    });
  };

  const resetImage = () => {
    setImagePath(null);
    setImagePreview(null);
    setImageExtendedPath([]);
    setImagePreviews([]);
  };

  const fetchSourceCode = async () => {
    try {
      const fetchedData = await getAllSourceCode(
        meta.current,
        meta.pageSize,
        searchTerm,
        isHide,
        field
      );
      if (fetchedData.data.results) {
        setSourceCodes(fetchedData.data.results);
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
    fetchSourceCode();
  }, [meta.current, meta.pageSize, searchTerm, isHide, field]);

  const handleEditSourceCode = (sourceCode: SourceCode) => {
    setEditingSourceCode(sourceCode);
    setIsEditing(true);
  };

  const handleUpdateSourceCode = async () => {
    if (!editingSourceCode) return;
    try {
      setIsLoadingUpdate(true);
      // let imagePath;
      // let imageExtendedPath: string[] = [];

      // imageExtendedPath = (await handleAddImages()) || [];

      if (!editingSourceCode.image) {
        // imagePath = await handleAddImage();

        if (imagePath) {
          const updatedSourceCode = await updateSourceCode({
            _id: editingSourceCode._id,
            code: editingSourceCode.code,
            title: editingSourceCode.title,
            url: editingSourceCode.url,
            stack: editingSourceCode.stack,
            field: editingSourceCode.field,
            description: editingSourceCode.description,
            extendedDescription: editingSourceCode.extendedDescription,
            price: editingSourceCode.price,
            originalPrice: editingSourceCode.originalPrice,
            image: imagePath,
            extendedImage: [
              ...editingSourceCode.extendedImage,
              ...imageExtendedPath,
            ],
            linkDoc: editingSourceCode.linkDoc,
            linkYoutube: editingSourceCode.linkYoutube,
            isHide: editingSourceCode.isHide,
          });
          if (updatedSourceCode) {
            alert("Cập nhật thông tin thành công");
            setEditingSourceCode(null);
            resetImage();
            fetchSourceCode();
          }
        } else {
          alert("Vui lòng chọn hình ảnh chính để tải lên.");
        }
      } else {
        const updatedSourceCode = await updateSourceCode({
          _id: editingSourceCode._id,
          code: editingSourceCode.code,
          title: editingSourceCode.title,
          url: editingSourceCode.url,
          stack: editingSourceCode.stack,
          field: editingSourceCode.field,
          description: editingSourceCode.description,
          extendedDescription: editingSourceCode.extendedDescription,
          price: editingSourceCode.price,
          originalPrice: editingSourceCode.originalPrice,
          image: editingSourceCode.image,
          extendedImage: [
            ...editingSourceCode.extendedImage,
            ...imageExtendedPath,
          ],
          linkDoc: editingSourceCode.linkDoc,
          linkYoutube: editingSourceCode.linkYoutube,
          isHide: editingSourceCode.isHide,
        });
        if (updatedSourceCode) {
          alert("Cập nhật thông tin thành công");
          setEditingSourceCode(null);
          resetImage();
          fetchSourceCode();
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
    const confirmed = window.confirm(`Bạn muốn xóa Source Code ${code}?`);

    if (confirmed) {
      try {
        await deleteSourceCode(id);
        fetchSourceCode();
      } catch (error: any) {
        alert(
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    }
  };

  const handleViewSourceCode = (sourceCode: SourceCode) => {
    setSelectedSourceCode(sourceCode);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedSourceCode(null);
    setIsAdding(false);
    resetSourceCodeState();
    resetImage();
  };

  const handleAddImage = async () => {
    if (!imageFile) {
      alert("Vui lòng chọn hình ảnh chính để tải lên.");
      return;
    }
    try {
      const imagePath = await uploadImage(imageFile);

      return imagePath;
    } catch (err) {
      alert("Có lỗi xảy ra");
    }
  };

  const handleAddImages = async () => {
    try {
      const imagePath = await uploadImages(imageFiles);

      return imagePath;
    } catch (err) {
      alert("Có lỗi xảy ra");
    }
  };

  const handleAddSourceCode = async () => {
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
        setNewSourceCode((prevState) => ({
          ...prevState,
          image: imagePath,
          extendedImage: imageExtendedPath || [],
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
    if (newSourceCode.image) {
      const createSourceCodeHandler = async () => {
        try {
          await createSourceCode(newSourceCode);
          setIsAdding(false);
          fetchSourceCode();
          alert("Thêm Source Code thành công");
          resetSourceCodeState();
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
  }, [newSourceCode.image, newSourceCode.extendedImage]);

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
      !newSourceCode.code ||
      !newSourceCode.title ||
      !newSourceCode.stack ||
      !newSourceCode.description ||
      !newSourceCode.price ||
      !newSourceCode.originalPrice ||
      !newSourceCode.linkDoc ||
      !newSourceCode.linkYoutube
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

  const handleImageSelect = (imageUrl: string) => {
    const fullImageUrl = process.env.NEXT_PUBLIC_SERVER + imageUrl;
    setImagePreview(fullImageUrl);
    setImagePath(imageUrl);
  };

  const handleImageExtendSelect = (imageUrls: string[]) => {
    const fullImageUrls = imageUrls.map(
      (url) => process.env.NEXT_PUBLIC_SERVER + url
    );
    setImagePreviews((prevState) => [...prevState, ...fullImageUrls]);
    setImageExtendedPath((prevState) => [...prevState, ...imageUrls]);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Quản lý Source Code
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
        columns={[
          { label: "Mã", key: "code" },
          { label: "Tên", key: "title" },
        ]}
        data={sourceCodes}
        handleView={handleViewSourceCode}
        handleEdit={handleEditSourceCode}
        handleDelete={(sourceCode: SourceCode) =>
          handleDeleteSourceCode(sourceCode._id, sourceCode.code)
        }
      />

      <Pagination
        currentPage={meta.current}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={meta.pageSize}
      />

      {/* popup view source code */}
      {selectedSourceCode && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thông tin Source Code</h2>
            <p className="break-words">
              <strong>Id:</strong> {selectedSourceCode._id}
            </p>
            <p className="break-words">
              <strong>Mã:</strong>{" "}
              <span className="text-green-600 font-bold">
                {selectedSourceCode.code}
              </span>
            </p>
            <p className="break-words">
              <strong>Tên:</strong> {selectedSourceCode.title}
            </p>
            <p className="break-words">
              <strong>Url:</strong> {selectedSourceCode.url}
            </p>
            <p className="break-words">
              <strong>Công nghệ:</strong> {selectedSourceCode.stack}
            </p>
            <p className="break-words">
              <strong>Loại:</strong> {selectedSourceCode.field}
            </p>
            <p className="break-words">
              <strong>Mô tả chính:</strong> {selectedSourceCode.description}
            </p>
            <p className="break-words">
              <strong>Mô tả phụ:</strong>{" "}
              {selectedSourceCode?.extendedDescription}
            </p>
            <p className="break-words">
              <strong>Giá bán:</strong>{" "}
              <span className="text-green-600 font-bold">
                {selectedSourceCode.price.toLocaleString("vi-VN")}
              </span>
            </p>
            <p className="break-words">
              <strong>Giá gốc:</strong>{" "}
              {selectedSourceCode?.originalPrice !== undefined &&
              selectedSourceCode?.originalPrice !== null
                ? selectedSourceCode.originalPrice.toLocaleString("vi-VN")
                : "Chưa có giá"}
            </p>
            <p className="break-words">
              <strong>Hình ảnh chính:</strong>
              {selectedSourceCode.image ? (
                <img
                  src={
                    process.env.NEXT_PUBLIC_SERVER + selectedSourceCode.image
                  }
                  alt="Hình ảnh chính"
                  className="w-32 h-32 object-cover mt-2 cursor-pointer"
                  onClick={() =>
                    openModalImage(
                      process.env.NEXT_PUBLIC_SERVER + selectedSourceCode.image
                    )
                  }
                />
              ) : (
                <span className="text-gray-500">Chưa có hình ảnh chính</span>
              )}
            </p>

            <div className="break-words">
              <strong>Hình ảnh phụ:</strong>
              <div className="flex flex-wrap mt-2">
                {Array.isArray(selectedSourceCode.extendedImage) &&
                selectedSourceCode.extendedImage.length > 0 ? (
                  selectedSourceCode.extendedImage.map((image, index) => (
                    <div key={index} className="mr-2 mb-2">
                      <img
                        src={process.env.NEXT_PUBLIC_SERVER + image}
                        alt={`Hình ảnh phụ ${index}`}
                        className="w-32 h-32 object-cover cursor-pointer"
                        onClick={() =>
                          openModalImage(process.env.NEXT_PUBLIC_SERVER + image)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">Chưa có hình ảnh phụ</span>
                )}
              </div>
            </div>

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

            <p className="break-words">
              <strong>Link doc:</strong> {selectedSourceCode.linkDoc}
            </p>
            <p className="break-words">
              <strong>Link Youtube:</strong> {selectedSourceCode.linkYoutube}
            </p>
            <p className="break-words">
              <strong>Trạng thái:</strong>{" "}
              <span
                className={`font-bold ${
                  selectedSourceCode.isHide ? "text-red-600" : "text-blue-600"
                }`}
              >
                {selectedSourceCode.isHide ? "Ẩn" : "Hiện"}
              </span>
            </p>
            <p className="break-words">
              <strong>Ngày tạo:</strong>{" "}
              {dayjs(selectedSourceCode.createdAt).format("DD-MM-YYYY HH:mm")}
            </p>
            <p className="break-words">
              <strong>Cập nhật:</strong>{" "}
              {dayjs(selectedSourceCode.updatedAt).format("DD-MM-YYYY HH:mm")}
            </p>
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
      {isEditing && editingSourceCode && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-auto">
            {" "}
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa Source Code</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {" "}
              <div>
                <label className="block">
                  Mã <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.code}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      code: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Tên <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.title}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Công nghệ <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.stack}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      stack: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Mô tả chính <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.description}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Giá bán <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  className="border p-2 w-full"
                  value={String(editingSourceCode.price)}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block">Giá gốc</label>
                <input
                  type="number"
                  className="border p-2 w-full"
                  value={String(editingSourceCode?.originalPrice) || ""}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      originalPrice: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Hình ảnh chính{" "}
                  <span className="text-red-600">* (800x400)</span>
                </label>

                {editingSourceCode.image && (
                  <div className="mt-2 flex items-center">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_SERVER + editingSourceCode.image
                      }
                      alt="Hình ảnh chính"
                      className="w-32 h-32 object-cover"
                    />
                    <button
                      onClick={() => {
                        const newSourceCode = { ...editingSourceCode };
                        newSourceCode.image = "";
                        setEditingSourceCode(newSourceCode);
                      }}
                      className="bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      X
                    </button>
                  </div>
                )}
                {!editingSourceCode.image && (
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

                    <div className="relative">
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
                )}
              </div>
              <div>
                <label className="block">
                  Hình ảnh phụ{" "}
                  <span className="text-red-600"> (600x400, tối đa 10)</span>
                </label>
                {editingSourceCode.extendedImage ? (
                  <div className="flex flex-wrap mt-2">
                    {editingSourceCode.extendedImage.map((image, index) => (
                      <div key={index} className="relative mr-2 mb-2">
                        <img
                          src={process.env.NEXT_PUBLIC_SERVER + image}
                          alt={`Hình ảnh phụ ${index}`}
                          className="w-32 h-32 object-cover"
                        />
                        <button
                          onClick={() => {
                            const newSourceCode = { ...editingSourceCode };
                            newSourceCode.extendedImage =
                              newSourceCode.extendedImage.filter(
                                (_, i) => i !== index
                              );
                            setEditingSourceCode(newSourceCode);
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    {imagePreviews.length > 0 ? (
                      imagePreviews.map((image, index) => (
                        <div key={index} className="relative w-32 h-32 p-2">
                          <img
                            src={image}
                            alt={`Preview ${index}`}
                            className="object-cover w-full h-full rounded"
                          />
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            X
                          </button>
                        </div>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-500"></span>
                )}
                <div className="mt-2">
                  {/* <input
                    type="file"
                    className="border p-2 w-full"
                    onChange={(e) => handleExtendedImageChange(e)}
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Chọn ảnh
                  </label> */}
                  <ImageServer
                    handleImageSelect={(imageUrl) =>
                      handleImageExtendSelect([imageUrl])
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block">Loại</label>
                <select
                  className="border p-2 w-full"
                  value={editingSourceCode.field}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      field: e.target.value,
                    })
                  }
                >
                  <option value="FRONTEND">Front end</option>
                  <option value="BACKEND">Back end</option>
                  <option value="FULLSTACK">Full stack</option>
                  <option value="MOBILE">Mobile</option>
                  <option value="BLOCKCHAIN">Blockchain</option>
                </select>
              </div>
              <div>
                <label className="block">Mô tả phụ</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode?.extendedDescription || ""}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      extendedDescription: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Link doc <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.linkDoc}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      linkDoc: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Link youtube <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.linkYoutube}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      linkYoutube: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">Trạng thái:</label>
                <select
                  className="border p-2 w-full"
                  value={
                    editingSourceCode.isHide !== undefined
                      ? String(editingSourceCode.isHide)
                      : "false"
                  }
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
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
                  Url <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editingSourceCode.url}
                  onChange={(e) =>
                    setEditingSourceCode({
                      ...editingSourceCode,
                      url: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleUpdateSourceCode}
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

      {/* popup add source code */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm Source Code mới</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block">
                  Mã <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.code}
                  onChange={(e) =>
                    setNewSourceCode({ ...newSourceCode, code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Tên<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setNewSourceCode({
                      ...newSourceCode,
                      title: title,
                      url: convertToUrl(title),
                    });
                  }}
                />
              </div>
              <div>
                <label className="block">
                  Công nghệ <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.stack}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      stack: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Mô tả chính <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.description}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Giá bán<span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  className="border p-2 w-full"
                  value={String(newSourceCode.price)}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block">Giá gốc</label>
                <input
                  type="number"
                  className="border p-2 w-full"
                  value={String(newSourceCode.originalPrice)}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      originalPrice: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mt-2">
                <label className="block">
                  Hình ảnh chính{" "}
                  <span className="text-red-600">* (800x400)</span>
                </label>
                {/* <div className="relative">
                  <input
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
                  </button>
                </div> */}
                <div className="relative">
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
                  Hình ảnh phụ{" "}
                  <span className="text-red-600">(600x400, tối đa 10)</span>
                </label>
                {/* <div className="relative">
                  <input
                    type="file"
                    className="border p-2 w-full opacity-0 absolute top-0 left-0 cursor-pointer"
                    onChange={handleExtendedImageChange}
                    accept="image/*"
                    multiple
                  />
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Chọn ảnh
                  </button>
                </div> */}
                <div className="relative">
                  <ImageServer
                    handleImageSelect={(imageUrl) =>
                      handleImageExtendSelect([imageUrl])
                    }
                  />
                </div>
                <div className="flex flex-wrap mt-4">
                  {imagePreviews.length > 0 ? (
                    imagePreviews.map((image, index) => (
                      <div key={index} className="relative w-24 h-24 p-2">
                        <img
                          src={image}
                          alt={`Preview ${index}`}
                          className="object-cover w-full h-full rounded"
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div>
                <label className="block">Loại</label>
                <select
                  className="border p-2 w-full"
                  value={newSourceCode.field}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      field: e.target.value,
                    })
                  }
                >
                  <option value="FRONTEND">Front end</option>
                  <option value="BACKEND">Back end</option>
                  <option value="FULLSTACK">Full stack</option>
                  <option value="MOBILE">Mobile</option>
                  <option value="BLOCKCHAIN">Blockchain</option>
                </select>
              </div>

              <div>
                <label className="block">Mô tả phụ</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.extendedDescription}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      extendedDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block">
                  Link doc <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.linkDoc}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      linkDoc: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">
                  Link youtube <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.linkYoutube}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      linkYoutube: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block">Trạng thái</label>
                <select
                  className="border p-2 w-full"
                  value={
                    newSourceCode.isHide !== undefined
                      ? String(newSourceCode.isHide)
                      : "false"
                  }
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
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
                  Url <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newSourceCode.url}
                  onChange={(e) =>
                    setNewSourceCode({
                      ...newSourceCode,
                      url: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleAddSourceCode}
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

export default SourceCodeManagement;
