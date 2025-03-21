import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  if (codes.length === 0) {
    return null;
  }
  return (
    <div className="pb-6 px-4 sm:px-6 lg:px-8">
      {title && title.trim() !== "" && (
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {codes.map((code) => (
          <Link
            key={code._id}
            href={`/sourcecode/${code.url}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
          >
            <Image
              src={process.env.NEXT_PUBLIC_SERVER + code.image}
              alt={code.title}
              className="w-full aspect-[16/9] object-cover group-hover:opacity-75"
              layout="responsive"
              width={16}
              height={9}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                {`[${code.code}] `}
                {code.title}
              </h2>
              <h3 className="mt-2 text-gray-600 line-clamp-2">{code.stack}</h3>
              <span className="mt-4 inline-block text-teal-600 font-semibold hover:text-teal-700">
                Xem chi tiết
              </span>
            </div>
          </Link>
        ))}
      </div>
      {showButton && (
        <div className="text-center mt-8">
          <Link
            href={allCodeLink}
            className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
};

export default SourceCode;
