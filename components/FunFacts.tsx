"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  target: number;
  duration?: number;
}

function Counter({ target, duration = 1 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function FunFacts() {
  const stats = [
    { number: 15, label: "Happy Students" },
    { number: 80, label: "Course Hours" },
    { number: 25, label: "Employed Students" },
    { number: 1.5, label: "Years Experience" },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center shadow-lg"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <Counter target={stat.number} />+
            </h2>

            <p className="text-white/80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
