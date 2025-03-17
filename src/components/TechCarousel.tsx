import React from "react";
import styles from "../styles/TechCarousel.module.css";

const Carousel = ({ images }: { images: string[] }) => {
  const loopedImages = [...images, ...images];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTrack}>
        {loopedImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`tech-${index}`}
            className={styles.techImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
