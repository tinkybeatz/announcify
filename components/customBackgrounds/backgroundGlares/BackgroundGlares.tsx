import React from "react";
import "./BackgroundGlares.css";

interface BackgroundGlaresProps {
  yellowGlare?: string;
  redGlare?: string;
  className?: string;
}

const BackgroundGlares: React.FC<BackgroundGlaresProps> = ({
  yellowGlare = "#FCD34D", // main-yellow fallback
  redGlare = "#EF4444", // main-red fallback
  className = "",
}) => {
  return (
    <div className={`background-glares ${className}`}>
      <div
        className="glare glare-top-left-yellow"
        style={{ backgroundColor: yellowGlare }}
      />
      <div
        className="glare glare-top-left-red"
        style={{ backgroundColor: redGlare }}
      />
      <div
        className="glare glare-bottom-right-yellow"
        style={{ backgroundColor: yellowGlare }}
      />
      <div
        className="glare glare-bottom-right-red"
        style={{ backgroundColor: redGlare }}
      />
    </div>
  );
};

export default BackgroundGlares;
