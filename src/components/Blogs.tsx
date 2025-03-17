import dayjs from "dayjs";
import React from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  url: string;
  image: string;
  link: string;
  createdAt: string;
}

interface FeaturedblogsProps {
  blogs: Blog[];
  title: string;
  allBlogLink: string;
  showButton?: boolean;
}

const Blogs: React.FC<FeaturedblogsProps> = ({
  blogs,
  title,
  allBlogLink,
  showButton,
}) => {
  if (blogs.length === 0) {
    return null;
  }
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {title && title.trim() !== "" && (
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.url}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
          >
            <img
              src={process.env.NEXT_PUBLIC_SERVER + blog.image}
              alt={blog.title}
              className="w-full aspect-[16/9] object-cover group-hover:opacity-75"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                📅 {dayjs(blog.createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="mt-2 text-gray-600 line-clamp-2">
                {blog.shortDescription}
              </p>
              <span className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700">
                Khám phá ngay
              </span>
            </div>
          </Link>
        ))}
      </div>
      {showButton && (
        <div className="text-center mt-8">
          <Link
            href={allBlogLink}
            className="inline-block bg-buttonRoot px-4 py-2 rounded-lg font-semibold "
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blogs;
