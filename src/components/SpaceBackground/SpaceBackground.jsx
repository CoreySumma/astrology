import React from "react";
import "./SpaceBackground.css";

export default function SpaceBackground() {
  return (
    <div className="video-background">
      <video autoPlay playsInline muted loop preload="auto">
        <source
          src="/movies/starz.mp4"
          type="video/mp4"
          alt="space-background"
        />
      </video>
    </div>
  );
}
