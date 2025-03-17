import { getAllImage } from "@/services/imageService";
import React, { useState, useEffect, useRef } from "react";
import { FaImage } from "react-icons/fa";
import { CiBoxList, CiImageOn } from "react-icons/ci";
import SearchAdmin from "./SearchAdmin";
import { deleteUploadedImage, uploadImage } from "@/services/blogService";
import path from "path";

interface UploadedImage {
  _id: string;
  name: string;
  category: string;
}

interface ImageButtonProps {
  handleImageSelect: (imageUrl: string) => void;
  folder: string;
}

const ImageServer: React.FC<ImageButtonProps> = ({
  handleImageSelect,
  folder,
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(folder);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"image" | "name">("image");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  const fetchUploadedImages = async () => {
    const images = await getAllImage(search, selectedCategory);
    setUploadedImages(images.data.data);
  };

  useEffect(() => {
    if (showImageModal) {
      fetchUploadedImages();
    }
  }, [showImageModal, selectedCategory, search]);

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleDeleteImage = async (imageUrl: string) => {
    const filename = imageUrl.split("/").pop();
    if (!filename) return;
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa ảnh: " + filename);
    if (isConfirmed) {
      try {
        const result = await deleteUploadedImage(filename, selectedCategory);
        if (result.data.success) {
          fetchUploadedImages();
        } else {
          console.error("Không thể xóa file:", result.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa file:", error);
      }
    }
  };

  const handleImageUpload = async () => {
    if (imageToUpload) {
      try {
        const imagePath = await uploadImage(imageToUpload, selectedCategory);

        setImageToUpload(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchUploadedImages();
      } catch (error) {
        alert("Có lỗi xảy ra");
      }
    } else {
      alert("Vui lòng chọn ảnh để tải lên");
    }
  };

  const handleImageSelectAndClose = (imageUrl: string) => {
    handleImageSelect(imageUrl);
    closeImageModal();
  };

  return (
    <>
      <button
        onClick={openImageModal}
        className="p-2 border rounded hover:bg-gray-200"
      >
        <FaImage size={20} />
      </button>
      {showImageModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "800px",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <button
              onClick={() => setShowImageModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                zIndex: 1010,
              }}
            >
              X
            </button>
            <h3>Chọn ảnh từ server</h3>

            <div className="mt-2 flex space-x-2 mb-2">
              <button
                onClick={() => setViewMode("image")}
                className={`p-2 rounded ${
                  viewMode === "image"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              >
                <CiImageOn />
              </button>

              <button
                onClick={() => setViewMode("name")}
                className={`p-2 rounded ${
                  viewMode === "name"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              >
                <CiBoxList />
              </button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="uploadBlog">Blog</option>
                <option value="uploadSourceCode">Source code</option>
                <option value="uploadCourse">Khóa học</option>
              </select>
            </div>
            <SearchAdmin
              onSearch={(query: string) =>
                handleSearchChange({
                  target: { value: query },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            <div
              style={{
                marginTop: "20px",
                maxHeight: "400px",
                overflowY: "auto",
              }}
              className={`${
                viewMode === "image" ? "grid" : "block"
              } gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-5`}
            >
              {uploadedImages.length === 0 ? (
                <div className="block text-gray-500">Không có dữ liệu</div>
              ) : (
                uploadedImages.map((image, index) => (
                  <div
                    key={index}
                    className=" mb-2 relative"
                    onClick={() => handleImageSelectAndClose(image.name)}
                  >
                    {viewMode === "image" ? (
                      <div className="relative">
                        <img
                          src={process.env.NEXT_PUBLIC_SERVER + image.name}
                          alt={image.name}
                          className="w-full h-24 object-cover cursor-pointer rounded-lg shadow-md transition-transform duration-200 ease-in-out"
                        />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.name);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="block py-2 cursor-pointer">
                        {" "}
                        • {path.basename(image.name)}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.name);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {/* Upload image to server */}
            <div className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImageToUpload(e.target.files[0]);
                  }
                }}
              />
              <button
                onClick={handleImageUpload}
                className="p-2 bg-blue-500 text-white rounded mt-2"
              >
                Tải ảnh lên
              </button>
              <span className="text-red-600 ml-2">
                (đặt tên ảnh không dấu và cách nhau bởi dấu -)
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageServer;
