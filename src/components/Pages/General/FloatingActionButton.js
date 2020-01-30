import React, { useState } from "react";

import { Button } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import { motion } from "framer-motion";

const fabVariants = {
  open: {
    zIndex: 10,
    transition: { staggerChildren: 0.05, delayChildren: 0.0 }
  },
  closed: {
    zIndex: -10,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  closed: {
    y: 50,
    opacity: 0,
    scale: 0
  }
};

export const FloatingActionButton = props => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="mobile-only"
        style={{
          bottom: "100px",
          position: "fixed",
          right: "30px",
          transform: "translateX(50%)",
          zIndex: 5
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Button icon="edit" circular size="large" />
      </div>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={fabVariants}
        style={{
          bottom: "150px",
          position: "fixed",
          transform: "translateX(50%)",
          right: "30px"
        }}
      >
        {props.children.map(child => {
          return (
            <motion.div
              style={{ margin: "5px" }}
              variants={liVariants}
              key={child.props.id}
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

FloatingActionButton.propTypes = {
  children: PropTypes.array
};
