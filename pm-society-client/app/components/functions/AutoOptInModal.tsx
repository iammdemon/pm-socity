"use client";

import { useEffect, useState } from "react";
import OptInModal from "../home/OptInModal";

// Main component that auto-opens the modal
export default function AutoOptInModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show modal after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000); // 1 second delay - you can adjust this

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    
      <OptInModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}