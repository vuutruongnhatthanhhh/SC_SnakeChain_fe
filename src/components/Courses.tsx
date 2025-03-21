import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Course {
  title: string;
  url: string;
  image: string;
  shortDescription: string;
  category: string;
  link: string;
}

interface FeaturedCoursesProps {
  courses: Course[];
  title: string;
  allCoursesLink: string;
  showButton?: boolean;
}

const Courses: React.FC<FeaturedCoursesProps> = ({
  courses,
  title,
  allCoursesLink,
  showButton,
}) => {
  if (courses.length === 0) {
    return null;
  }
  return (
    <div className="pb-6 px-4 sm:px-6 lg:px-8 w-full">
      {title && title.trim() !== "" && (
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            key={course.title}
            href={`/course/${course.url}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
          >
            <Image
              src={process.env.NEXT_PUBLIC_SERVER + course.image}
              alt={course.title}
              className="w-full aspect-[16/9] object-cover group-hover:opacity-75"
              layout="responsive"
              width={16}
              height={9}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                {course.title}
              </h2>
              <h3 className="mt-2 text-gray-600 line-clamp-2">
                {course.shortDescription}
              </h3>
              <span className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700">
                Khám phá khóa học
              </span>
            </div>
          </Link>
        ))}
      </div>
      {showButton && (
        <div className="text-center mt-8">
          <Link
            href="/course"
            className="inline-block bg-buttonRoot px-4 py-2 rounded-lg font-semibold "
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
};

export default Courses;
