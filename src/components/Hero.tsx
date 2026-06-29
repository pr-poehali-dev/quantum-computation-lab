import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/21b48f8c-ed29-439c-97c9-a40b68401acc/files/320af665-4e7e-4e76-b691-332fdfcf00f5.jpg"
          alt="Грузовик на трассе"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          ДОВЕЗЁМ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Грузовое такси по всей России. Междугородние перевозки любых грузов — быстро, надёжно, без посредников.
        </p>
      </div>
    </div>
  );
}