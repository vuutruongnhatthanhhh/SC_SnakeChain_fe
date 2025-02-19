import Slider from "@/components/Slider";
import Carousel from "@/components/TechCarousel";
import Courses from "@/components/Courses";

export default function Home() {
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
      imageUrl: "/images/courses/course-reactjs.png", // Thay bằng đường dẫn thực tế
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
    {
      title: "Khóa học Machine Learning 2",
      description: "Khám phá thế giới học máy và AI",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/ml",
    },
  ];
  return (
    <div>
      <Slider images={images} />
      <Carousel images={techImages} />
      <Courses courses={courses} />
    </div>
  );
}
