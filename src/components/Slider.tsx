"use client";
import React from "react";
import styles from "@/styles/Slider.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import config from "@/config";

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  return (
    <div
      className={`${styles.sliderWrapper} relative w-full h-auto overflow-hidden`}
    >
      <img
        src={images[0]}
        alt="Slider Image"
        className="w-full h-auto object-cover"
      />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-6 text-white">
        <h2 className={styles.sliderTitle}>
          Nâng cao kỹ năng lập trình & Giải pháp công nghệ
        </h2>

        <p className={`${styles.sliderText} flex items-center space-x-2`}>
          <FaLongArrowAltRight />
          <span>Bạn muốn nâng cao kỹ năng lập trình?</span>
        </p>
        <p className={`${styles.sliderText} flex items-center space-x-2`}>
          <FaLongArrowAltRight />
          <span>Bạn có ý tưởng công nghệ muốn phát triển?</span>
        </p>

        <p className={`${styles.sliderText} flex items-center space-x-2`}>
          <FaLongArrowAltRight />
          <span>Bạn muốn có giải pháp Blockchain tiên tiến?</span>
        </p>

        <p className={`${styles.sliderText} mt-4`}>
          <span>
            {config.companyName} chia sẻ kiến thức và giúp bạn xây dựng ý tưởng
            với lập trình Web, App.
          </span>
        </p>
        <div className="mt-6">
          <a
            href="/course"
            className="px-6 py-2 bg-buttonRoot font-semibold rounded-full ho inline-block text-center
      hidden lg:block w-[200px]"
          >
            Khám phá ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
