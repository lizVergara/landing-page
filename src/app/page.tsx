"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ProfileForm from "./components/form/ProfileForm";
import Challenge from "./components/main";

const Home: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handleClick = () => {
    setStartAnimation(true);
    setTimeout(() => {
      setShowUpload(true);
    }, 400); // Duración de la animación
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg">
      {!showUpload ? (
        <motion.div
          initial={{ y: 0 }}
          animate={startAnimation ? { y: -1000 } : { y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center min-h-screen w-full"
          onClick={handleClick}
        >
          <Challenge />
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center min-h-screen w-full"
        >
          <ProfileForm />
        </motion.div>
      )}
    </div>
  );
};

export default Home;
