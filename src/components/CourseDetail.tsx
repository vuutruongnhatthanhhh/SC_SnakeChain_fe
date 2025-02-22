"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { RiVipCrownLine } from "react-icons/ri";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoId: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Giới thiệu khóa học",
    duration: "5:30",
    videoId: "PyoJ0fDnzR8",
    completed: false,
  },
  {
    id: 2,
    title: "Cài đặt môi trường",
    duration: "10:15",
    videoId: "MoWApyUb5w8",
    completed: false,
  },
  {
    id: 3,
    title: "Tổng quan về React",
    duration: "15:45",
    videoId: "VIDEO_ID_3",
    completed: false,
  },
  {
    id: 4,
    title: "Components và Props",
    duration: "20:00",
    videoId: "VIDEO_ID_4",
    completed: true,
  },
  {
    id: 5,
    title: "State và Lifecycle",
    duration: "18:30",
    videoId: "VIDEO_ID_5",
    completed: false,
  },
];

const CourseContent = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-15 left-0 z-50 p-2 rounded-lg shadow-lg bg-buttonRoot"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={15} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative w-96 h-96 bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}
      >
        <div className="p-4 ">
          <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full p-3 rounded-lg text-left transition-all
                  ${
                    selectedLesson.id === lesson.id
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
                        lesson.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }
                    `}
                    >
                      {lesson.completed ? <RiVipCrownLine /> : lesson.id}
                    </div>
                    <span className="font-medium">{lesson.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {lesson.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="w-full">
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden mb-6">
            <iframe
              src={`https://www.youtube.com/embed/${selectedLesson.videoId}`}
              className="w-full h-[500px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-2">{selectedLesson.title}</h1>
            <p className="text-gray-600">
              Thời lượng: {selectedLesson.duration}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
