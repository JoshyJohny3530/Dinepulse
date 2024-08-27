import { toast } from "react-toastify";

const Notify = (message) => {
  const playSound = () => {
    //Ref:https://pixabay.com/users/universfield-28281460/
    const audio = new Audio("/Notification.mp3");
    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });
  };

  playSound();

  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default Notify;
