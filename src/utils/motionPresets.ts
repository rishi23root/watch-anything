import { ForwardRefComponent, HTMLMotionProps } from 'framer-motion';
// cointains all the framer motion animation presets

// breathe animation
export const topToPossition: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: {
        type: "spring",
        stiffness: 100,
        damping: 40,
        mass: 0.1,
        delay: 1,
    }
};
export const breathe: HTMLMotionProps<"div"> = {
    animate: { y: -10, scale: 1.003 },
    transition: {
        ease: "easeInOut",
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        deay: 3,
    }
};


export const bottomToPossition: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: {
        type: "spring",
        stiffness: 100,
        damping: 40,
        mass: 0.1,
        delay: 2,
        staggerChildren: 0.5,
    }
};

// duration: 1,
// repeat: Infinity,
// repeatType: 'reverse',
// ease: 'easeInOut',
