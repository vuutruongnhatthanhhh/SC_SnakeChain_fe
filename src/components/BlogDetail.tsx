import dayjs from "dayjs";

interface Blog {
  title: string;
  image: string;
  content: string;
  author: string;
  createdAt: string;
}

interface BlogCodeDetailProps {
  blog: Blog;
}

const BlogDetail: React.FC<BlogCodeDetailProps> = ({ blog }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h1 className="text-4xl font-bold ">{blog.title}</h1>
      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
        <span className="text-blue-700">{blog.author}</span>
        <span>{dayjs(blog.createdAt).format("DD-MM-YYYY HH:mm")}</span>
      </div>
      <div className=" text-gray-700 overflow-x-hidden break-words max-w-full">
        <div
          className="mt-6 text-gray-700 overflow-x-hidden break-words max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
