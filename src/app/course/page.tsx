import React from "react";
import { getAllCourseUser } from "@/services/courseService";
import Courses from "@/components/Courses";
import SearchBar from "./CourseSearchBar";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/course";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Khóa học lập trình miễn phí",
  description:
    "Khóa học lập trình miễn phí tại Snake Chain giúp bạn thành thạo từ cơ bản đến nâng cao, bao gồm lập trình Web, Mobile và Blockchain, ứng dụng thực tế nhanh chóng",
  openGraph: {
    ...baseOpenGraph,
    url: url,
    siteName: "Snake Chain",
    images: [
      {
        url: urlImage,
        // width: 800,
        // height: 600,
      },
    ],
  },
  alternates: {
    canonical: url,
  },
};

const CoursePage = async ({
  searchParams,
}: {
  searchParams: { query?: string; category?: string };
}) => {
  const searchTerm = searchParams.query || "";
  const category = searchParams.category || "";

  // Fetch dữ liệu từ API
  const response = await getAllCourseUser(searchTerm, category);
  const courses = response?.data?.results || [];

  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        <SearchBar searchTerm={searchTerm} category={category} />
        <Courses courses={courses} title="" allCoursesLink="#allcourse" />
      </div>
    </div>
  );
};

export default CoursePage;
