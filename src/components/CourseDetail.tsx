"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { RiVipCrownLine } from "react-icons/ri";
import { getLessonsUser } from "@/services/lessonService";
import dayjs from "dayjs";
import * as jwt_decode from "jwt-decode";
import { checkUserLesson } from "@/services/userService";
import AuthForm from "@/components/AuthForm";

interface Course {
  _id: number;
  title: string;
  url: string;
  image: string;
  shortDescription: string;
  category: string;
  isHide: boolean;
  lessons: string[];
}

interface CourseDetailProps {
  course: Course;
}

interface Lesson {
  _id: string;
  title: string;
  code: string;
  content: string;
  videoUrl: string;
  price: number;
  isHide: boolean;
  createdAt: string;
}

const CourseContent: React.FC<CourseDetailProps> = ({ course }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean>(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const getUserIdFromToken = (token: string): string | null => {
    try {
      const decoded: any = jwt_decode.jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const handleSelectLesson = async (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsSidebarOpen(false);
    setHasAccess(true);

    if (lesson.price !== 0) {
      if (userId) {
        const access = await checkUserLesson(userId, lesson._id);
        if (!access) {
          alert("Bạn chưa mua khóa học này!");
          setHasAccess(false);
          return;
        }
      } else {
        const confirmLogin = window.confirm(
          "Đây là khóa học trả phí, vui lòng đăng nhập để thực hiện"
        );
        setIsAuthOpen(true);
        setHasAccess(false);
        return;
      }
    }
  };

  const token = localStorage.getItem("access_token");
  const userId = token ? getUserIdFromToken(token) : null;

  const fetchLessonsOnCourse = async () => {
    try {
      const lessonDetails = await Promise.all(
        course.lessons.map((lesson) => getLessonsUser(lesson))
      );
      const lessonData = lessonDetails.map((res) => res.data);
      setLessons(lessonData);
      if (lessonData.length > 0) {
        setSelectedLesson(lessonData[0]);
      }
    } catch (error) {
      console.error("Lỗi khi tải bài học:", error);
    }
  };

  useEffect(() => {
    fetchLessonsOnCourse();
  }, [course.lessons]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const extractYouTubeId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden fixed top-15 left-0 z-50 p-2 rounded-lg shadow-lg bg-buttonRoot"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={15} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <div
          className={`
        fixed lg:relative w-96 h-[880px] bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:block
      `}
        >
          <div className="p-4 ">
            <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
            <div className="space-y-2 max-h-[800px] overflow-y-auto overflow-x-hidden">
              {lessons.map((lesson) => (
                <button
                  key={lesson._id}
                  onClick={() => {
                    handleSelectLesson(lesson);
                  }}
                  className={`
                  w-full p-3 rounded-lg text-left transition-all
                  ${
                    selectedLesson?._id === lesson._id
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }
                `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-sm
                      ${
                        lesson.price !== 0
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }
                    `}
                      >
                        {lesson.price !== 0 ? (
                          <RiVipCrownLine />
                        ) : (
                          <RiVipCrownLine />
                        )}
                      </div>
                      <span className="font-medium truncate max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {lesson.title}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 ">
          <div className="w-full">
            <div className="aspect-w-16 aspect-h-9 max-w-[1200px] bg-black rounded-lg overflow-hidden mb-6">
              {selectedLesson && (
                <>
                  {selectedLesson.price !== 0 ? (
                    hasAccess ? (
                      <iframe
                        src={
                          selectedLesson.videoUrl +
                          "/" +
                          selectedLesson._id +
                          "/" +
                          userId
                        }
                        // src={getVideoInServer(selectedLesson.videoUrl)}
                        className="w-full h-[700px]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-black  p-4 bg-white">
                        Đây là video trả phí. Giá:{" "}
                        <strong>
                          {" "}
                          {selectedLesson.price.toLocaleString("vi-VN")} VNĐ
                        </strong>
                        <p>
                          Sau khi đã đăng nhập, vui lòng thanh toán phí trên để
                          có thể xem khóa học. Nội dung chuyển khoản:{" "}
                          <strong>Email {selectedLesson.code}</strong> (ví dụ:
                          snakechain@gmail.com {selectedLesson.code} - lưu ý
                          dùng email bạn đăng ký tài khoản ở{" "}
                          <strong>Snake Chain</strong>)
                        </p>
                        <div className="flex justify-center mt-4">
                          <a href="/images/qr_code.png" download="qr_code.png">
                            <img
                              src="/images/qr_code.png"
                              alt="QR Code"
                              className="w-70 h-70 object-contain rounded-lg"
                            />
                          </a>
                        </div>
                        <p>
                          Sau khi thanh toán, vui lòng chờ trong khoảng 10-20
                          phút để hệ thống kiểm tra và gửi thông báo thanh toán
                          thành công qua email cũng như mở khóa video cho bạn.{" "}
                          <strong>
                            Cảm ơn bạn đã ủng hộ Snake Chain! ❤️❤️❤️
                          </strong>
                        </p>
                      </div>
                    )
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        selectedLesson.videoUrl
                      )}`}
                      className="w-full h-[700px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg max-w-[1200px]">
              <h1 className="text-2xl font-bold mb-2">
                {selectedLesson?.title}
              </h1>
              <p className="text-gray-600 mb-2">
                Ngày xuất bản:{" "}
                {dayjs(selectedLesson?.createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <div
                className="text-black"
                dangerouslySetInnerHTML={{
                  __html: selectedLesson?.content || "",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Auth Modal */}
      {isAuthOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAuthOpen(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>
            <div className="w-full">
              <AuthForm onLoginSuccess={() => setIsAuthOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContent;
