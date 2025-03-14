"use client";
import Slider from "@/components/Slider";
import Carousel from "@/components/TechCarousel";
import Courses from "@/components/Courses";
import Blogs from "@/components/Blogs";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { getAllBlogUser } from "@/services/blogService";
import { useEffect, useState } from "react";
import { getAllSourceCodeUser } from "@/services/sourceCodeService";
import SourceCode from "@/components/SourceCode";
import { getAllCourseUser } from "@/services/courseService";

export default function Home() {
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [sourceCodes, setSourceCodes] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const images = ["/images/banner-snake-chain.gif"];
  const techImages = [
    "/images/carousel/react-icon.png",
    "/images/carousel/nest-icon.png",
    "/images/carousel/next-icon.png",
    "/images/carousel/node.png",
    "/images/carousel/mongo-icon.png",
    "/images/carousel/mysql-icon.png",
    "/images/carousel/spring.png",
    "/images/carousel/vue-icon.png",
    "/images/carousel/hlf-icon.png",
    "/images/carousel/angular-icon.png",
    "/images/carousel/django-icon.png",
    "/images/carousel/solidity-icon.png",
  ];

  const fetchCourse = async (query: string, category: string) => {
    try {
      const response = await getAllCourseUser(query, category);
      setCourses(response.data.results);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchRelatedBlogs = async (query: string) => {
    try {
      const data = await getAllBlogUser(query);
      setRelatedBlogs(data.data.results);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách blog:", error);
    }
  };

  const fetchSourceCodes = async (query: string, field: string) => {
    try {
      const response = await getAllSourceCodeUser(query, field);
      setSourceCodes(response.data.results);
    } catch (error) {
      console.error("Error fetching source codes:", error);
    }
  };

  useEffect(() => {
    fetchRelatedBlogs("");
    fetchSourceCodes("", "");
    fetchCourse("", "");
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen">Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Slider images={images} />
      <Carousel images={techImages} />
      <Courses
        courses={courses.slice(0, 4)}
        title="Khóa học nổi bật"
        allCoursesLink="#allcourse"
        // showButton={true}
      />

      <SourceCode
        codes={sourceCodes.slice(0, 4)}
        title="Kho Source Code đa dạng"
        allCodeLink="/sourcecode"
        // showButton={true}
      />

      <Blogs
        blogs={relatedBlogs.slice(0, 4)}
        title="Blog nổi bật"
        allBlogLink="/blog"
        showButton={true}
      />
      <QuoteRequestForm />
    </div>
  );
}
