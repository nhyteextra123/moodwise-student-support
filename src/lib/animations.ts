
import { useState, useEffect } from 'react';

// Custom hook for staggered animations
export const useStaggeredAnimation = (itemCount: number, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => {
          const newItems = [...prev];
          newItems[i] = true;
          return newItems;
        });
      }, i * delay);
      
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [itemCount, delay]);

  return visibleItems;
};

// Animation variants for scroll reveal
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeInOut"
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Transition between routes
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};
