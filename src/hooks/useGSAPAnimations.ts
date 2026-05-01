import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGSAPAnimations = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section fade-in from bottom ──────────────────────────
      gsap.utils.toArray<HTMLElement>('.section-container').forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      // ── Glass cards stagger ──────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.glass-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

      // ── Section titles slide in ──────────────────────────────
      gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
        gsap.fromTo(title,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

      // ── Skill bars animate on scroll ─────────────────────────
      gsap.utils.toArray<HTMLElement>('#skills .glass-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      // ── Experience timeline cards ────────────────────────────
      gsap.utils.toArray<HTMLElement>('#experience .glass-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      // ── Project flip cards pop in ────────────────────────────
      gsap.utils.toArray<HTMLElement>('#projects .cursor-pointer').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, rotateY: -15 },
          {
            opacity: 1, y: 0, rotateY: 0, duration: 0.7, ease: 'power2.out',
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);
};

export default useGSAPAnimations;
