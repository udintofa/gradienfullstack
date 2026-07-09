"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Courses() {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Literasi", "Matematika", "Strategi"];

  const courses = [
    {
      id: 1,
      title: "Penalaran Umum TPS",
      author: "Mentor GradienNol",
      category: "TPS",
      price: 0,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    },
    {
      id: 2,
      title: "Literasi Bahasa Indonesia UTBK",
      author: "Mentor GradienNol",
      category: "Literasi",
      price: 0,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    },
    {
      id: 3,
      title: "Penalaran Matematika UTBK",
      author: "Mentor GradienNol",
      category: "Matematika",
      price: 0,
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
    },
    {
      id: 4,
      title: "Literasi Bahasa Inggris UTBK",
      author: "Mentor GradienNol",
      category: "Literasi",
      price: 0,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      id: 5,
      title: "Strategi Lolos PTN Impian",
      author: "Mentor GradienNol",
      category: "Strategi",
      price: 0,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
    },
    {
      id: 6,
      title: "Tryout UTBK Prediksi 2026",
      author: "Tim Akademik",
      category: "Tryout",
      price: 0,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136",
    },
  ];

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.category === filter);

  return (
    <section id="courses" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-600 font-semibold">Latest Courses</p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Explore Our Courses
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                filter === cat
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat === "all" ? "Show All" : cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Category */}
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full z-10">
                    {course.category}
                  </span>

                  {/* Price */}
                  <span className="absolute top-4 right-4 bg-white text-indigo-600 font-semibold px-3 py-1 rounded-full shadow z-10">
                    ${course.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{course.author}</p>

                  <h3 className="font-semibold text-lg">{course.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
