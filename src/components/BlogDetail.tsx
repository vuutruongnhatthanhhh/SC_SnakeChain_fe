// pages/blog.tsx

import { NextPage } from "next";

const BlogDetail: NextPage = () => {
  const title = "Sample Blog Title";
  const author = "John Doe";
  const date = "February 22, 2025";
  const content =
    "This is the content of the blog post. You can write the blog content here and add some details. " +
    "Feel free to format it with paragraphs, images, and any other elements.";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
        <span>by {author}</span>
        <span>{date}</span>
      </div>
      <div className="mt-6 text-gray-700">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
