'use client';
// components/common/PopupWrapper.tsx
import React, { useEffect, useState } from "react";
import Popup from "../layout/Popup";


const PopupWrapper = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if there is a last order in localStorage
    const lastOrder = localStorage.getItem("lastOrder");

    if (lastOrder) {
      // If there is a last order, show the popup
      setShowPopup(true);
    }
  }, []);

  if (!showPopup) return null; // Don't render anything if the condition isn't met

  return <Popup />; // Render the Popup component
};

export default PopupWrapper;
