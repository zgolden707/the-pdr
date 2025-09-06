/*
 * The PDR homepage
 *
 * This page implements a simple parallax scrolling experience using Framer Motion.  The
 * landing section displays the logo and a tagline.  Subsequent sections describe
 * the service, provide details about the company and offer a form for prospective
 * members to request an invitation.  We avoid heavy JavaScript frameworks on the
 * front end and rely on modern CSS and motion values to achieve the visual
 * effects.  All colours and fonts are drawn from the Tailwind configuration
 * defined in `tailwind.config.js`.
 */
'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';

const HERO_IMAGES = ['/licensed/hero1.jpg', '/licensed/hero2.jpg'];

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Move and scale the home section background slightly as the user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const [status, setStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get('name'),
      city: data.get('city'),
      occupation: data.get('occupation'),
      social: data.get('social'),
      notes: data.get('notes'),
    };
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
      });
      if (res.ok) {
        setStatus('Thank you for joining the waitlist, we will get back to you shortly with a response.');
        event.target.reset();
      } else {
        setStatus('There was a problem submitting your request. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setStatus('There was a problem submitting your request. Please try again later.');
    }
  }

  return (
    <main ref={ref} className="relative overflow-x-hidden">
      {/* Landing section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-beige text-center p-8">
        <BrandLogo size={160} />
        <h1 className="mt-8 text-4xl md:text-5xl font-serif">New York City dining, in the palm of your hand</h1>
      </section>
      {/* Home section with parallax background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          aria-hidden="true"
          style={{ y, scale, filter }}
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <img
            src={HERO_IMAGES[0]}
            alt="Elegant dining room"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="bg-beige/80 backdrop-blur-md p-8 rounded-xl max-w-2xl text-left shadow-lg">
          <h2 className="text-3xl font-serif mb-4">Exclusive Benefits</h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>Access to the top and hardest reservations</li>
            <li>Round the clock service from real concierges</li>
            <li>No apps or hard to use websites — just one number to call or text</li>
            <li>Up-to-date info on all the new hotspots and in-the-know locations across the city</li>
          </ul>
        </div>
      </section>
      {/* About section */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center bg-beige px-4 py-16">
        <div className="max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-serif">About Us</h2>
          <p className="text-lg">
            The PDR is a private, invitation-only concierge service for discerning diners who desire
            uncompromised access to New York’s most coveted tables.  Our experienced team of
            concierges maintains relationships with the city’s top restaurants to secure
            reservations that are otherwise impossible to obtain.  We operate discreetly and
            professionally so your dining experiences are effortless and memorable.
          </p>
          <p className="text-lg">
            Membership is deliberately limited to ensure every client receives personal attention and
            round-the-clock service.  We do not have an app or complicated website — simply text
            or call your concierge and let us handle the rest.
          </p>
        </div>
      </section>
      {/* Join section */}
      <section id="join" className="min-h-screen flex flex-col items-center justify-center bg-beige px-4 py-16">
        <div className="max-w-lg w-full space-y-6">
          <h2 className="text-3xl font-serif text-center">Request Invitation</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full p-3 border border-brand rounded"
            />
            <input
              name="city"
              type="text"
              required
              placeholder="City where you live"
              className="w-full p-3 border border-brand rounded"
            />
            <input
              name="occupation"
              type="text"
              required
              placeholder="What you do for work"
              className="w-full p-3 border border-brand rounded"
            />
            <input
              name="social"
              type="text"
              required
              placeholder="Social media handle"
              className="w-full p-3 border border-brand rounded"
            />
            <textarea
              name="notes"
              placeholder="Tell us about your dining preferences (optional)"
              className="w-full p-3 border border-brand rounded"
              rows={3}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-brand text-beige py-3 rounded font-semibold hover:bg-brand/90 transition-colors"
            >
              Join the Waitlist
            </button>
          </form>
          {status && <p className="mt-4 text-center text-green-700">{status}</p>}
        </div>
      </section>
    </main>
  );
}
