import React from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string; // Thêm thuộc tính link để nhận đường dẫn
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  return (
    <a href={link} className="block">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="flex justify-center items-center text-4xl text-green-500 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </a>
  );
};

export default ServiceCard;
