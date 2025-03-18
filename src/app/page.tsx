import Slider from "@/components/Slider";
import Carousel from "@/components/TechCarousel";
import Courses from "@/components/Courses";
import Blogs from "@/components/Blogs";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { getAllBlogUser } from "@/services/blogService";
import { getAllSourceCodeUser } from "@/services/sourceCodeService";
import SourceCode from "@/components/SourceCode";
import { getAllCourseUser } from "@/services/courseService";
import { Metadata } from "next";
import { baseOpenGraph } from "./shared-metadata";

const url = process.env.NEXT_PUBLIC_URL;
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Thiết kế Website chuyên nghiệp giá rẻ - Snake Chain",
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

export default async function Home() {
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

  // Fetch data in server
  const [relatedBlogs, sourceCodes, courses] = await Promise.all([
    getAllBlogUser(""),
    getAllSourceCodeUser("", ""),
    getAllCourseUser("", ""),
  ]);

  return (
    <>
      <div>
        <Slider images={images} />
        <Carousel images={techImages} />
        <Courses
          courses={courses.data.results.slice(0, 4)}
          title="Khóa học nổi bật"
          allCoursesLink="/course"
          showButton={false}
        />
        <QuoteRequestForm />
        <SourceCode
          codes={sourceCodes.data.results.slice(0, 4)}
          title="Kho Source Code đa dạng"
          allCodeLink="/sourcecode"
          showButton={false}
        />
        <Blogs
          blogs={relatedBlogs.data.results.slice(0, 4)}
          title="Blog nổi bật"
          allBlogLink="/blog"
          showButton={true}
        />
      </div>
    </>
  );
}
