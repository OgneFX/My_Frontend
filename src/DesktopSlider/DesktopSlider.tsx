import React, { useState } from "react";
import type { Slide } from "../interfaces/interfaces";
import styles from "./desktopSlider.module.scss";

interface SliderProps {
  slides: Slide[];
}

export const DesktopSlider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <button
        className={styles.arrow}
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        ‹
      </button>

      <div className={styles.slider}>
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === currentIndex - 1;
          const isNext = index === currentIndex + 1;

          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${
                isActive
                  ? styles.active
                  : isPrev || isNext
                  ? styles.side
                  : styles.hidden
              }`}
            >
              <img src={slide.image} alt={slide.title || ""} />
              {slide.title && <p>{slide.title}</p>}
            </div>
          );
        })}
      </div>

      <button
        className={styles.arrow}
        onClick={nextSlide}
        disabled={currentIndex === slides.length - 1}
      >
        ›
      </button>
    </div>
  );
};
