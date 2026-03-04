import { motion } from 'framer-motion'
import { useState } from 'react'

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Mark Johnson",
      position: "Owner",
      company: "Pizza Palace",
      image: "/images/client1.jpg",
      video: "#",
      rating: 5,
      text: "Webenox created an amazing website for our restaurant! The online ordering system works perfectly and our customers love the easy-to-use interface. Sales increased by 200% in the first month!",
      project: "Restaurant Website",
      duration: "3 weeks"
    },
    {
      id: 2,
      name: "Sarah Chen",
      position: "Founder",
      company: "TechStart",
      image: "/images/client2.jpg",
      video: "#",
      rating: 5,
      text: "Working with Webenox was fantastic! They delivered our landing page on time and the design exceeded our expectations. The conversion rate optimization really helped us get more customers.",
      project: "Startup Landing Page",
      duration: "2 weeks"
    },
    {
      id: 3,
      name: "David Rodriguez",
      position: "CEO",
      company: "FashionStore",
      image: "/images/client3.jpg",
      video: "#",
      rating: 5,
      text: "Webenox built our e-commerce platform from scratch. The team was professional, responsive, and delivered exactly what we needed. Our online sales have never been better!",
      project: "E-Commerce Platform",
      duration: "6 weeks"
    },
    {
      id: 4,
      name: "Emma Wilson",
      position: "Marketing Director",
      company: "BusinessCorp",
      image: "/images/client4.jpg",
      video: "#",
      rating: 5,
      text: "The corporate website Webenox created for us is modern, professional, and perfectly represents our brand. The SEO optimization has significantly improved our online visibility.",
      project: "Corporate Website",
      duration: "5 weeks"
    }
  ]

  const stats = [
    { number: "100%", label: "Client Satisfaction" },
    { number: "25+", label: "Projects Completed" },
    { number: "20+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Animated Star Rating Component
  const AnimatedStarRating = ({ rating, size = "w-5 h-5" }) => {
    return (
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.1,
              type: "spring",
              stiffness: 200
            }}
            className={`${size} ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </motion.svg>
        ))}
      </div>
    )
  }

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple/6 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title luxury-heading">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-description">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                className="glass-card p-6 relative overflow-hidden group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-accent mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-secondary text-sm font-medium">
                  {stat.label}
                </div>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Video Testimonial Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-accent/20 to-purple/20 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-accent/30"
                  >
                    <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm text-accent px-3 py-1 rounded-full text-xs font-bold">
                  Video Testimonial
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <AnimatedStarRating rating={testimonials[activeTestimonial].rating} />
                
                <motion.blockquote
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl text-secondary mb-6 italic"
                >
                  "{testimonials[activeTestimonial].text}"
                </motion.blockquote>

                <motion.div
                  key={`client-${activeTestimonial}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-purple/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-text">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-sm text-secondary">
                      {testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </motion.div>

                <div className="mt-4 text-xs text-secondary">
                  Project: {testimonials[activeTestimonial].project} • Duration: {testimonials[activeTestimonial].duration}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Testimonial Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ duration: 0.2 }}
                className={`glass-card p-4 cursor-pointer transition-all duration-200 ${
                  activeTestimonial === index 
                    ? 'border border-accent/30 bg-accent/5' 
                    : 'hover:bg-white/5'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-text text-sm truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-secondary truncate">
                      {testimonial.position}, {testimonial.company}
                    </div>
                    <div className="flex items-center mt-1">
                      <AnimatedStarRating rating={testimonial.rating} size="w-3 h-3" />
                    </div>
                  </div>
                  {activeTestimonial === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-accent rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 201, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-r from-accent to-purple text-background font-bold px-8 py-4 rounded-xl hover:from-accent/90 hover:to-purple/90 transition-all duration-200 shadow-lg hover:shadow-glow-lg"
          >
            Join Our Happy Clients
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials 