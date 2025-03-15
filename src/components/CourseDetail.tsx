"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { RiVipCrownLine } from "react-icons/ri";
import { getLessonsUser } from "@/services/lessonService";
import dayjs from "dayjs";

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
  const [videoError, setVideoError] = useState(false);

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
        fixed lg:relative w-96 h-96 bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:block
      `}
      >
        <div className="p-4 ">
          <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <button
                key={lesson._id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  setIsSidebarOpen(false);
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
                  !videoError ? (
                    <iframe
                      src={selectedLesson.videoUrl}
                      className="w-full h-[700px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onError={() => setVideoError(true)}
                    />
                  ) : (
                    <div className="text-white text-center p-4 bg-red-500">
                      Không thể hiển thị video
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
            <h1 className="text-2xl font-bold mb-2">{selectedLesson?.title}</h1>
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
  );
};

export default CourseContent;
