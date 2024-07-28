"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ProfileForm from "./components/form/ProfileForm";

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
          <main className="text-center p-4 cursor-pointer">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-slate-400">
              Challenge
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mt-4">
              TRD
            </h2>
          </main>
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
