"use client";
import { useState } from "react";

const services = [
  {
    id: "website",
    name: "Thiết Kế Website",
    description: "Tạo website chuyên nghiệp cho doanh nghiệp và cá nhân.",
    plans: [
      {
        name: "Cơ Bản",
        price: "5.000.000 VNĐ",
        features: ["Giao diện đơn giản", "Tối ưu SEO cơ bản", "Bảo mật SSL"],
      },
      {
        name: "Nâng Cao",
        price: "10.000.000 VNĐ",
        features: ["Tích hợp CMS", "Giao diện tuỳ chỉnh", "Tối ưu tốc độ cao"],
      },
      {
        name: "Doanh Nghiệp",
        price: "20.000.000 VNĐ",
        features: [
          "Website đa ngôn ngữ",
          "Tích hợp thanh toán",
          "Tối ưu bảo mật cao",
        ],
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Thiết Kế App Di Động",
    description: "Phát triển ứng dụng mobile Android & iOS.",
    plans: [
      {
        name: "Cơ Bản",
        price: "15.000.000 VNĐ",
        features: ["Giao diện cơ bản", "Chạy trên Android", "Hỗ trợ Firebase"],
      },
      {
        name: "Nâng Cao",
        price: "25.000.000 VNĐ",
        features: [
          "Chạy trên Android & iOS",
          "Realtime Database",
          "Tối ưu hiệu suất",
        ],
      },
      {
        name: "Doanh Nghiệp",
        price: "50.000.000 VNĐ",
        features: ["Cloud Hosting", "Bảo mật cao", "Tích hợp AI/ML"],
      },
    ],
  },
  {
    id: "blockchain",
    name: "Giải Pháp Blockchain",
    description: "Tích hợp và phát triển giải pháp Blockchain.",
    plans: [
      {
        name: "Cơ Bản",
        price: "30.000.000 VNĐ",
        features: [
          "Smart Contract đơn giản",
          "Ethereum Network",
          "Ví lưu trữ crypto",
        ],
      },
      {
        name: "Nâng Cao",
        price: "50.000.000 VNĐ",
        features: ["Tích hợp DeFi", "Custom Token", "Bảo mật cao"],
      },
      {
        name: "Doanh Nghiệp",
        price: "100.000.000 VNĐ",
        features: [
          "Hệ thống Blockchain riêng",
          "Smart Contract nâng cao",
          "Tích hợp Oracle",
        ],
      },
    ],
  },
  {
    id: "desktop-software",
    name: "Phần Mềm Desktop",
    description: "Phát triển phần mềm trên Windows và macOS.",
    plans: [
      {
        name: "Cơ Bản",
        price: "10.000.000 VNĐ",
        features: [
          "Ứng dụng offline",
          "Giao diện đơn giản",
          "Tích hợp database",
        ],
      },
      {
        name: "Nâng Cao",
        price: "20.000.000 VNĐ",
        features: [
          "Đồng bộ dữ liệu cloud",
          "Giao diện tuỳ chỉnh",
          "Bảo mật nâng cao",
        ],
      },
      {
        name: "Doanh Nghiệp",
        price: "40.000.000 VNĐ",
        features: ["Ứng dụng đa nền tảng", "Tích hợp API", "Hỗ trợ dài hạn"],
      },
    ],
  },
];

export default function TablePricing() {
  const [selectedService, setSelectedService] = useState(services[0].id);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">
        BẢNG GIÁ DỊCH VỤ
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {services.map((service) => (
          <button
            key={service.id}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedService === service.id
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            {service.name}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        {services
          .filter((service) => service.id === selectedService)
          .map((service) => (
            <div key={service.id}>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
                {service.name}
              </h3>
              <p className="text-center text-gray-500 mb-6">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {service.plans.map((plan, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
                  >
                    <h4 className="text-xl font-semibold text-gray-700">
                      {plan.name}
                    </h4>
                    <p className="text-green-600 text-lg font-bold mt-2">
                      {plan.price}
                    </p>
                    <ul className="mt-4 text-sm text-gray-500">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          ✅ {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
                      Chọn gói này
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
