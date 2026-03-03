"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "PRIVATE ACQUISITIONS",
    desc: "Discrete sourcing of off-market architectural landmarks.",
  },
  {
    title: "GLOBAL CONCIERGE",
    desc: "Comprehensive management of international property portfolios.",
  },
  {
    title: "STRUCTURAL ADVISORY",
    desc: "Expert analysis of architectural integrity and historical value.",
  },
  {
    title: "DIGITAL TWIN TOURS",
    desc: "Ultra-high-fidelity virtual explorations for global clients.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-40 px-6 bg-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1px bg-zinc-900 border border-zinc-900">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-black p-12 transition-all duration-700 hover:bg-zinc-950"
            >
              <span className="text-[10px] text-zinc-700 font-bold mb-4 block tracking-widest">
                0{index + 1}
              </span>
              <h3 className="text-sm font-bold mb-6 text-zinc-100 tracking-[0.3em] uppercase">
                {service.title}
              </h3>
              <p className="text-zinc-600 text-xs leading-relaxed tracking-wider">
                {service.desc}
              </p>
              <div className="mt-12 w-0 h-[1px] bg-zinc-600 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
