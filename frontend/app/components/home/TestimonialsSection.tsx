"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Frontend Developer",
    text:
      "This platform finally made open source contribution feel approachable. The AI roadmap explained exactly where I needed to start.",
  },
  {
    name: "Priya Mehta",
    role: "Computer Science Student",
    text:
      "I was always confused by large GitHub repositories. The AI explanations made everything much easier to understand.",
  },
  {
    name: "Rohan Verma",
    role: "React Developer",
    text:
      "The issue matching system is incredibly accurate. It recommended beginner issues perfectly aligned with my skills.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold md:text-6xl">
            Developers Love The
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              AI Contribution Experience
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Developers and beginners use OpenSource AI
            to confidently contribute to real-world projects.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-1 text-cyan-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>

                <Quote className="text-cyan-400" size={24} />
              </div>

              <p className="leading-8 text-gray-300">
                “{testimonial.text}”
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold">
                  {testimonial.name}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}