"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" data-cursor="contact" className="py-40 px-6 bg-black">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 text-center text-white uppercase leading-[0.8] italic">
            INQUIRE <br /> <span className="text-zinc-800 NOT-italic">NOW</span>
          </h2>

          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 border-b border-zinc-900 pb-4 focus-within:border-white transition-colors">
                <label className="text-[10px] uppercase font-bold text-zinc-700 tracking-[0.4em]">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-zinc-100 text-sm tracking-widest placeholder:text-zinc-800"
                  placeholder="IDENTIFY YOURSELF"
                />
              </div>
              <div className="space-y-4 border-b border-zinc-900 pb-4 focus-within:border-white transition-colors">
                <label className="text-[10px] uppercase font-bold text-zinc-700 tracking-[0.4em]">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent outline-none text-zinc-100 text-sm tracking-widest placeholder:text-zinc-800"
                  placeholder="CONTACT POINT"
                />
              </div>
            </div>
            <div className="space-y-4 border-b border-zinc-900 pb-4 focus-within:border-white transition-colors">
              <label className="text-[10px] uppercase font-bold text-zinc-700 tracking-[0.4em]">
                Message
              </label>
              <textarea
                rows={1}
                className="w-full bg-transparent outline-none text-zinc-100 text-sm tracking-widest placeholder:text-zinc-800 resize-none"
                placeholder="REVEAL YOUR INTENT"
              />
            </div>

            <div className="flex justify-center pt-8">
              <button className="px-20 py-6 border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-[0.8em] uppercase hover:bg-white hover:text-black transition-all duration-700">
                TRANSMIT
              </button>
            </div>
          </form>
        </div>

        <div className="mt-40 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold tracking-[0.5em] text-zinc-800 uppercase">
          <p>© 2026 MonkDA ESTATE — ALL RIGHTS RESERVED</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-zinc-100 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-100 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-zinc-100 transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
