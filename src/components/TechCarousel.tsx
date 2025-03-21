import React from "react";
import styles from "../styles/TechCarousel.module.css";
import Image from "next/image";

const Carousel = ({ images }: { images: string[] }) => {
  const loopedImages = [...images, ...images];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTrack}>
        {loopedImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`tech-${index}`}
            className={styles.techImage}
            width={150}
            height={73.89}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
