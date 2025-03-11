// components/Featuredcodes.tsx
import React from "react";

interface SourceCode {
  _id: string;
  code: string;
  title: string;
  url: string;
  stack: string;
  field: string;
  description: string;
  extendedDescription: string;
  image: string;
  link: string;
}

interface FeaturedSourceCodeProps {
  codes: SourceCode[];
  title: string;
  allCodeLink: string;
  showButton?: boolean;
}

const SourceCode: React.FC<FeaturedSourceCodeProps> = ({
  codes,
  title,
  allCodeLink,
  showButton,
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {title && title.trim() !== "" && (
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {codes.map((code) => (
          <a
            key={code._id}
            // href={code.link}
            href={`/sourcecode/${code.url}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
          >
            <img
              src={process.env.NEXT_PUBLIC_SERVER + code.image}
              alt={code.title}
              className="w-full aspect-[16/9] object-cover group-hover:opacity-75"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {`[${code.code}] `}
                {code.title}
              </h3>
              <p className="mt-2 text-gray-600">{code.stack}</p>
              <span className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700">
                Xem chi tiết
              </span>
            </div>
          </a>
        ))}
      </div>
      {showButton && (
        <div className="text-center mt-8">
          <a
            href={allCodeLink}
            className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700"
          >
            Xem tất cả
          </a>
        </div>
      )}
    </div>
  );
};

export default SourceCode;
