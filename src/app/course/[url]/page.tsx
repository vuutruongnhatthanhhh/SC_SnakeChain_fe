"use client";
import React, { useEffect, useState } from "react";
import CourseDetail from "@/components/CourseDetail";
import { useParams } from "next/navigation";
import { getAllCourseUser, getCourseUser } from "@/services/courseService";
const CourseDetailPage: React.FC = () => {
  const { url } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCourse = async () => {
      if (url) {
        try {
          const data = await getCourseUser(url as string);
          setCourse(data.data);
          setLoading(false);
        } catch (err: any) {
          setError("Không tìm thấy course hoặc có lỗi xảy ra.");
          setLoading(false);
        }
      }
    };

    fetchCourse();
  }, [url]);
  if (loading) return <div className="min-h-screen">Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return <CourseDetail course={course} />;
};

export default CourseDetailPage;
