"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Team() {
  const members = [
    {
      name: "Guntur Pangestu",
      role: "Senior Math Teacher",
      image: "guntur.jpeg",
      facebook: "google.com",
      instagram: "instagram.com/udintofa",
      linkedin: "google.com",
    },
    {
      name: "Udin Kedondong",
      role: "Junior Web Developer",
      image: "udin.jpg",
      facebook: "google.com",
      instagram: "instagram.com/udintofa",
      linkedin: "google.com",
    },
    {
      name: "Leticia Arnoldi",
      role: "Master of Designer",
      image: "leti.png",
      facebook: "google.com",
      instagram: "instagram.com/udintofa",
      linkedin: "google.com",
    },
    {
      name: "Siapa lagi Lupa aku",
      role: "Digital Animator",
      image: "https://picsum.photos/300/300?4",
      facebook: "google.com",
      instagram: "instagram.com/udintofa",
      linkedin: "google.com",
    },
  ];

  return (
    <section id="team" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold">Our Team</p>

          <h2 className="text-3xl md:text-4xl font-bold">Meet Our Experts</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={
                    member.image.startsWith("http")
                      ? member.image
                      : `/${member.image}`
                  }
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">
                  <a
                    href={`https://${member.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-indigo-600 hover:scale-110 transition"
                  >
                    <FaFacebookF />
                  </a>

                  <a
                    href={`https://${member.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-indigo-600 hover:scale-110 transition"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href={`https://${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-indigo-600 hover:scale-110 transition"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>

              <div className="p-6 text-center">
                <p className="text-indigo-600 text-sm font-medium mb-1">
                  {member.role}
                </p>

                <h3 className="font-semibold text-lg">{member.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
