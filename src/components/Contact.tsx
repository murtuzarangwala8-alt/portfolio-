import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Link as LinkedinIcon, Globe, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Replace with actual form submission logic (e.g., EmailJS, Formspree, or your backend)
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);

    /*
    TODO: Implement actual form submission like this:
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
    */
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "murtuzarangwala8@gmail.com",
      href: "mailto:murtuzarangwala8@gmail.com"
    },
    {
      icon: <LinkedinIcon className="w-6 h-6" />,
      label: "LinkedIn",
      value: "linkedin.com/in/murtaza-rangwala-856456102",
      href: "https://linkedin.com/in/murtaza-rangwala-856456102"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Website",
      value: "murtuazarangwala.online",
      href: "https://murtuazarangwala.online"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Verona, Italy",
      href: null
    }
  ];

  return (
    <section id="contact" className="section-container">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Let's discuss how data and AI can drive your business forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg text-white flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 dark:text-white hover:text-primary-500 transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 dark:text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-card p-8 h-64 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-accent-500/10"
            >
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-primary-500" />
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Based in Verona, Italy
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Open to remote opportunities worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg 
                             text-gray-900 dark:text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg 
                             text-gray-900 dark:text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg 
                             text-gray-900 dark:text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 dark:text-green-400 text-center"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}

                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-center"
                  >
                    ✗ Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
