import Image from "next/image";

const services = [
  {
    title: "Kursus Interaktif",
    description:
      "Belajar dengan cara yang menyenangkan melalui kursus interaktif kami yang dirancang untuk semua usia.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    title: "Sumber Belajar Gratis",
    description:
      "Akses ke berbagai sumber belajar gratis, termasuk video, artikel, dan latihan untuk mendukung proses belajar Anda.",
    image: "https://cdn-icons-png.flaticon.com/512/2436/2436874.png",
  },
  {
    title: "Komunitas Belajar",
    description:
      "Bergabung dengan komunitas belajar kami untuk berdiskusi, berbagi pengetahuan, dan mendapatkan dukungan dari sesama pelajar.",
    image: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-10 px-6 z-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-2 text-center"
          >
            <Image
              src={service.image}
              alt={service.title}
              width={80}
              height={80}
              className="mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
