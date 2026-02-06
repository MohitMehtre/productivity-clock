import { motion, type Easing } from "motion/react";
import { useState } from "react";

export default function BackgroundPattern() {
    const [plusSigns] = useState(() =>
        [...Array(6)].map((_, i) => ({
            key: `plus-${i}`,
            initial: {
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
            },
            transition: {
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear" as Easing,
                delay: i * 2,
            },
        }))
    );

    const [squares] = useState(() =>
        [...Array(4)].map((_, i) => ({
            key: `square-${i}`,
            initial: {
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
                rotate: 45,
            },
            transition: {
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut" as Easing,
                delay: i * 5,
            },
        }))
    );

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
            {/* Floating Plus Signs */}
            {plusSigns.map((item) => (
                <motion.div
                    key={item.key}
                    className="absolute text-zinc-900/5 dark:text-zinc-100/5 font-mono text-4xl select-none"
                    initial={item.initial}
                    animate={{
                        y: [50, -50, 50],
                        rotate: [0, 90, 180, 270, 360],
                        opacity: [0.03, 0.08, 0.03],
                    }}
                    transition={item.transition}
                >
                    +
                </motion.div>
            ))}

            {/* Floating Squares */}
            {squares.map((item) => (
                <motion.div
                    key={item.key}
                    className="absolute border border-zinc-900/5 dark:border-zinc-100/5 w-24 h-24"
                    initial={item.initial}
                    animate={{
                        y: [100, -100],
                        rotate: [45, 90, 135],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={item.transition}
                />
            ))}

            {/* Dashed Circle */}
            <motion.div
                className="absolute top-1/4 -right-20 w-96 h-96 border border-dashed border-zinc-900/5 dark:border-zinc-100/5 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            />

            {/* Reverse Dashed Circle */}
            <motion.div
                className="absolute bottom-1/4 -left-20 w-64 h-64 border border-dashed border-zinc-900/5 dark:border-zinc-100/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
