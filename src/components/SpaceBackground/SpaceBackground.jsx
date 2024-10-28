import React, {useState} from "react";
import "./SpaceBackground.css";

export default function SpaceBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="video-background">
      <video
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        className={isLoaded ? "loaded" : ""}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source
          src="/movies/starz.mp4"
          type="video/mp4"
          alt="space-background"
        />
      </video>
    </div>
  );
}
