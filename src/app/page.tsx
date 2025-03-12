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

export default function Home() {
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [sourceCodes, setSourceCodes] = useState<any[]>([]);
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

  const courses = [
    {
      title: "Khóa học lập trình React",
      description: "Học React từ cơ bản đến nâng cao",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/react",
    },
    {
      title: "Khóa học lập trình Node.js",
      description: "Lập trình backend với Node.js",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/nodejs",
    },
    {
      title: "Khóa học Python cho người mới bắt đầu",
      description: "Học Python dễ dàng với các bài tập thực hành",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/python",
    },
    {
      title: "Khóa học Machine Learning",
      description: "Khám phá thế giới học máy và AI",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/ml",
    },
  ];

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
  }, []);

  return (
    <div>
      <Slider images={images} />
      <Carousel images={techImages} />
      <Courses
        courses={courses}
        title="Khóa học nổi bật"
        allCoursesLink="#allcourse"
        showButton={true}
      />
      <QuoteRequestForm />
      <SourceCode
        codes={sourceCodes.slice(0, 4)}
        title="Kho Source Code đa dạng"
        allCodeLink="/sourcecode"
        showButton={true}
      />

      <Blogs
        blogs={relatedBlogs.slice(0, 4)}
        title="Blog nổi bật"
        allBlogLink="/blog"
        showButton={true}
      />
    </div>
  );
}
