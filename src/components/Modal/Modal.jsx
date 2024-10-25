import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

export default function Modal({ showModal, setShowModal }) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="overlay"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className="custom-modal">
            <div className="modal-title-container">
              <h2>The Gods Cannot Find You...</h2>
            </div>
            <div className="modal-body-container">
              <p>
                This app uses your location so the heavens can accurately make a
                prediction.
                <br />
                <em>
                  Please allow location access through your settings if you
                  experience issues.
                </em>
              </p>
            </div>
            <div className="modal-button-container">
              <button
                type="button"
                className="modal-button"
                onClick={() => {
                  setShowModal(false);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
