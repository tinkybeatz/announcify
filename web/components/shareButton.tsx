import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Copy, Check } from "lucide-react";
import { ca } from "zod/locales";

export default function ShareButton({
  shareUrl,
  onClose,
}: {
  shareUrl: string;
  onClose?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState(false);

  //   const socialNetworks = [
  //     {
  //       name: "Facebook",
  //       color: "bg-blue-600",
  //       icon: "📘",
  //       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //         shareUrl
  //       )}`,
  //     },
  //     {
  //       name: "Twitter",
  //       color: "bg-sky-500",
  //       icon: "𝕏",
  //       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  //         shareUrl
  //       )}`,
  //     },
  //     {
  //       name: "LinkedIn",
  //       color: "bg-blue-700",
  //       icon: "💼",
  //       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  //         shareUrl
  //       )}`,
  //     },
  //     {
  //       name: "WhatsApp",
  //       color: "bg-green-500",
  //       icon: "💬",
  //       url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
  //     },
  //     {
  //       name: "Telegram",
  //       color: "bg-sky-400",
  //       icon: "✈️",
  //       url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
  //     },
  //   ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const handleOpen = async () => {
    try {
      window.open(shareUrl, "_blank");
      setOpened(true);
    } catch (err) {
      console.error("Erreur lors de l'ouverture du lien:", err);
    }
  };

  //   const handleShare = (url: string) => {
  //     window.open(url, "_blank", "width=600,height=400");
  //   };

  return (
    <>
      <AnimatePresence>
        {true && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <motion.h2
                    className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Partager
                  </motion.h2>
                  <motion.button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} className="text-gray-500" />
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-gray-600 mb-2">Copier le lien</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-200"
                    />
                    <motion.button
                      onClick={handleCopy}
                      className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-violet-600 text-white hover:bg-violet-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check size={20} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <motion.button
                      onClick={handleOpen}
                      className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                        opened
                          ? "bg-green-500 text-white"
                          : "bg-violet-600 text-white hover:bg-violet-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence mode="wait">
                        {opened ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check size={20} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="open"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <ExternalLink size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>

                {/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-gray-600 mb-3">Partager sur</p>
                  <div className="grid grid-cols-5 gap-3">
                    {socialNetworks.map((network, index) => (
                      <motion.button
                        key={network.name}
                        onClick={() => handleShare(network.url)}
                        className={`${network.color} text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-1 hover:shadow-lg transition-shadow`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-2xl">{network.icon}</span>
                        <span className="text-xs font-medium">{network.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div> */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
