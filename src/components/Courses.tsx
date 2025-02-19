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
}

const Courses: React.FC<FeaturedCoursesProps> = ({ courses }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Khóa học nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.title}
            className="bg-white shadow-lg rounded-lg overflow-hidden group"
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
              <a
                href={course.link}
                className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700"
              >
                Khám phá khóa học
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
