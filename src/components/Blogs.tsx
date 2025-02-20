// components/Featuredblogs.tsx
import React from "react";

interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface FeaturedblogsProps {
  blogs: Blog[];
  title: string;
  allBlogLink: string;
}

const Blogs: React.FC<FeaturedblogsProps> = ({ blogs, title, allBlogLink }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <a
            key={blog.title}
            href={blog.link}
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full aspect-[16/9] object-cover group-hover:opacity-75"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="mt-2 text-gray-600">{blog.description}</p>
              <span className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700">
                Khám phá ngay
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href={allBlogLink}
          className="cursor-pointer inline-block py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Xem tất cả
        </a>
      </div>
    </div>
  );
};

export default Blogs;
