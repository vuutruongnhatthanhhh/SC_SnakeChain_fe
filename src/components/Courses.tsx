// components/FeaturedCourses.tsx
import React from "react";

interface Course {
  title: string;
  description: string;
  imageUrl: string;
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
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 w-full">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <a
            key={course.title}
            // href={course.link}
            href="/courseDetail"
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full aspect-[16/9] object-cover group-hover:opacity-75"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {course.title}
              </h3>
              <p className="mt-2 text-gray-600">{course.description}</p>
              <span className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700">
                Khám phá khóa học
              </span>
            </div>
          </a>
        ))}
      </div>
      {showButton && (
        <div className="text-center mt-8">
          <a
            href={allCoursesLink}
            className="inline-block bg-buttonRoot px-4 py-2 rounded-lg font-semibold "
          >
            Xem tất cả
          </a>
        </div>
      )}
    </div>
  );
};

export default Courses;
