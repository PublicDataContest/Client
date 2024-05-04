import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [callbackFn, setCallbackFn] = useState(null);

  const openModal = (text, callbackFn) => {
    setModalText(text);
    setCallbackFn(callbackFn);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, modalText, callbackFn, openModal, closeModal };
};
