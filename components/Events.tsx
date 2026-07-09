"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const events = [
  {
    title: "Tryout UTBK Nasional 2026",
    category: "TPS & Literasi",
    date: "10 Januari 2026",
    duration: "120 Menit",
    price: "Gratis",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1200",
  },
  {
    title: "Tryout TKA Saintek & Soshum",
    category: "Matematika & Pengetahuan",
    date: "24 Januari 2026",
    duration: "150 Menit",
    price: "Rp25.000",
    image:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1200",
  },
  {
    title: "Kelas Umum: Strategi Lolos PTN",
    category: "Webinar Motivasi",
    date: "5 Februari 2026",
    duration: "90 Menit",
    price: "Gratis",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200",
  },
];

export default function Events() {
  return (
    <section id="events" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-purple-600 font-semibold uppercase tracking-wider">
            Schedule
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
        </div>

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center"
            >
              {/* Image */}
              <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <span className="text-sm text-purple-600 font-semibold">
                  {event.category}
                </span>

                <h3 className="text-xl font-bold mt-1 mb-3">{event.title}</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>{event.date}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Duration</p>
                    <p>{event.duration}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Price</p>
                    <p>{event.price}</p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition"
                aria-label={`Lihat detail ${event.title}`}
              >
                <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
