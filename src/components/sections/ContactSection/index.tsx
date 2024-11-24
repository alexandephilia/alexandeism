import { Mail, Linkedin, Github, PhoneCall } from "lucide-react";
import { ContactCard } from "./ContactCard";
import { ContactForm } from "./ContactForm";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const blur = useTransform(scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["8px", "0px", "0px", "8px"]
  );

  const contactCards = [
    {
      title: "Email",
      icon: Mail,
      value: "0xnihilist@gmail.com",
      color: "hover:border-red-500/50",
      href: "mailto:0xnihilist@gmail.com"
    },
    {
      title: "LinkedIn",
      icon: Linkedin,
      value: "Connect with me",
      color: "hover:border-blue-500/50",
      href: "https://www.linkedin.com/in/alexandephilia/"
    },
    {
      title: "Whatsapp",
      icon: PhoneCall,
      value: "Chat with me",
      color: "hover:border-green-500/50",
      href: "https://wa.me/6285959300787"
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="container py-16 w-full"
      style={{
        opacity,
        filter: blur
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactCards.map((card, index) => (
            <ContactCard
              key={index}
              {...card}
              delay={index * 0.1}
            />
          ))}
        </div>
        <ContactForm />
      </div>
    </motion.section>
  );
}; 