"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "@/styles/WebCard.module.css";

interface WebCard {
  title: string;
  imageUrl: string;
}

const WebCard: React.FC<WebCard> = ({ title, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <div>
      <div className="relative hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="cursor-pointer" onClick={openModal}>
          <span className="absolute top-2 left-2 bg-[#111827] text-white p-2 rounded">
            {title}
          </span>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Web Image"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalImageContainer}>
          <img src={imageUrl} alt={title} className={styles.modalImage} />
        </div>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
        >
          X
        </button>
      </Modal>
    </div>
  );
};

export default WebCard;
