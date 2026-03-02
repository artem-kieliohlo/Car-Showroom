import { useMemo, useState } from "react";
import clsx from "clsx";
import "./VehicleGallery.css";

type Props = {
  images: string[];
  alt: string;
};

export function VehicleGallery({ images, alt }: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSrc = safeImages[activeIndex] ?? safeImages[0];

  if (safeImages.length === 0) {
    return <div className="vehicle-gallery__placeholder">No image</div>;
  }

  return (
    <section className="vehicle-gallery">
      <div className="vehicle-gallery__main">
        <img src={activeSrc} alt={alt} className="vehicle-gallery__main-img" />
      </div>

      {safeImages.length > 1 && (
        <div className="vehicle-gallery__thumbs">
          {safeImages.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={clsx(
                "vehicle-gallery__thumb-button",
                idx === activeIndex && "vehicle-gallery__thumb-button--active ",
              )}
            >
              <img
                src={src}
                alt=""
                className="vehicle-gallery-thumbs__thumb-img"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
