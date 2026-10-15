import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Character-by-character animated text using Framer Motion
// (replaced GSAP SplitText which requires premium license)
function AnimatedText({ children, tag = 'h1', className = '', delay = 0 }) {
  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    }),
  }

  const child = {
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)', transition: { type: 'spring', damping: 12, stiffness: 200 } },
  }

  const Tag = tag

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline', overflow: 'visible' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

export default AnimatedText

