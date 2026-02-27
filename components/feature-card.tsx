'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  className?: string
  index?: number
}

export default function FeatureCard({ icon, title, description, className, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      className={cn(
        'group relative bg-card border border-white/5 rounded-xl p-6 hover:border-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5',
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="font-semibold text-dim mb-2 group-hover:text-gold transition-colors duration-200">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
