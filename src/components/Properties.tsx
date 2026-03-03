"use client";

import { motion } from "framer-motion";

const properties = [
  {
    id: 1,
    title: "THE MONOLITH",
    location: "Malibu, CA",
    price: "$24.5M",
  },
  {
    id: 2,
    title: "VOID RESIDENCE",
    location: "Stockholm, SE",
    price: "$11.2M",
  },
  {
    id: 3,
    title: "OBSIDIAN BAY",
    location: "Tokyo, JP",
    price: "$38.0M",
  },
];

export default function Properties() {
  return (
    <section
      id="properties"
      data-cursor="properties"
      className="py-40 px-6 bg-black"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase italic">
              CURATED
            </h2>
            <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase mt-4">
              Selected architectural masterpieces
            </p>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 hover:text-white border-b border-zinc-800 pb-2 transition-all">
            ALL LISTINGS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border-y border-zinc-900">
          {properties.map((prop, index) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-black pt-20 pb-12 px-8 overflow-hidden hover:bg-zinc-950 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 text-zinc-900 text-6xl font-black select-none group-hover:text-zinc-800 transition-colors">
                0{index + 1}
              </div>
              <div className="aspect-[3/4] bg-zinc-950 border border-zinc-900 mb-12 flex items-center justify-center group-hover:border-zinc-700 transition-all duration-700">
                <span className="text-[10px] text-zinc-800 tracking-[1em] uppercase -rotate-90">
                  Architecture
                </span>
              </div>
              <h3 className="text-xs font-bold mb-2 text-white tracking-[0.5em] uppercase italic">
                {prop.title}
              </h3>
              <p className="text-zinc-600 text-[10px] mb-8 tracking-[0.2em] uppercase">
                {prop.location}
              </p>
              <div className="flex justify-between items-center text-sm font-bold text-zinc-400">
                <span className="font-mono tracking-tighter italic">
                  {prop.price}
                </span>
                <button className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
