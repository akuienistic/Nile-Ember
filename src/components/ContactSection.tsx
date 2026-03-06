import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare,
  Calendar,
  Users,
  Send,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.string().min(1, "Please select number of guests"),
  occasion: z.string().optional(),
  message: z.string().max(500).optional(),
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  subject: z.string().trim().min(2, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type ReservationData = z.infer<typeof reservationSchema>;
type ContactData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"reservation" | "contact">("reservation");

  const [resForm, setResForm] = useState<ReservationData>({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    message: "",
  });
  const [resErrors, setResErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});

  const [conForm, setConForm] = useState<ContactData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [conErrors, setConErrors] = useState<Partial<Record<keyof ContactData, string>>>({});

  const handleResChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResForm((prev) => ({ ...prev, [name]: value }));
    setResErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleConChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConForm((prev) => ({ ...prev, [name]: value }));
    setConErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleResSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reservationSchema.safeParse(resForm);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReservationData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ReservationData;
        fieldErrors[field] = err.message;
      });
      setResErrors(fieldErrors);
      toast({
        title: "Please check the form",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Reservation Submitted!",
      description: "We'll confirm your booking shortly. Thank you!",
    });
    setResForm({ name: "", email: "", date: "", time: "", guests: "", occasion: "", message: "" });
    setResErrors({});
  };

  const handleConSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(conForm);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactData;
        fieldErrors[field] = err.message;
      });
      setConErrors(fieldErrors);
      toast({
        title: "Please check the form",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setConForm({ name: "", email: "", subject: "", message: "" });
    setConErrors({});
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-card border ${hasError ? "border-destructive ring-1 ring-destructive/30" : "border-border"} rounded-lg px-2 py-2 pl-7 text-foreground text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ember/50 focus:border-ember transition-all box-border`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div ref={ref} className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-ember mb-2">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            We'd Love to <span className="text-gradient-gold">Hear From You</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're planning a special dinner, a private event, or simply want to say hello — we're here for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-64 md:h-80">
              <iframe
                title="Nile Ember Location - Juba International Airport"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d31.601!3d4.872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTInMjAuMCJOIDMxwrAzNicwNi4wIkU!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  text: "Aviation Plaza, opposite parking yard, Juba International Airport, South Sudan",
                },
                {
                  icon: MapPin,
                  label: "Access",
                  text: "Enter from inside airport or outside gate next to B One Supermarket",
                },
                { icon: Phone, label: "Phone", text: "+211 XX XXX XXXX" },
                { icon: Mail, label: "Email", text: "info@nileember.com" },
                { icon: Clock, label: "Hours", text: "Open Daily: 6:00 AM – 11:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ember/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={16} className="text-ember" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Forms */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl shadow-xl p-3 sm:p-4 md:p-8 border border-border/50 overflow-hidden">
              {/* Tab switcher */}
              <div className="flex gap-2 mb-8 bg-muted rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("reservation")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "reservation"
                      ? "bg-gradient-ember text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calendar size={14} />
                  Reservation
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "contact"
                      ? "bg-gradient-ember text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Mail size={14} />
                  Contact Us
                </button>
              </div>

              {activeTab === "reservation" ? (
                <form onSubmit={handleResSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-ember" />
                      <input
                        name="name"
                        value={resForm.name}
                        onChange={handleResChange}
                        placeholder="Your Name"
                        className={inputClass(!!resErrors.name)}
                      />
                      {resErrors.name && (
                        <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {resErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-ember" />
                      <input
                        name="email"
                        type="email"
                        value={resForm.email}
                        onChange={handleResChange}
                        placeholder="Email"
                        className={inputClass(!!resErrors.email)}
                      />
                      {resErrors.email && (
                        <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {resErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative w-full">
                      <Calendar size={14} className="absolute left-2 top-2 text-ember" />
                      <input
                        name="date"
                        type="date"
                        value={resForm.date}
                        onChange={handleResChange}
                        className={`${inputClass(!!resErrors.date)}`}
                      />
                      {resErrors.date && (
                        <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {resErrors.date}
                        </p>
                      )}
                    </div>
                    <div className="relative w-full">
                      <Clock size={14} className="absolute left-2 top-2 text-ember" />
                      <input
                        name="time"
                        type="time"
                        value={resForm.time}
                        onChange={handleResChange}
                        className={`${inputClass(!!resErrors.time)}`}
                      />
                      {resErrors.time && (
                        <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {resErrors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-3 text-ember" />
                      <select
                        name="guests"
                        value={resForm.guests}
                        onChange={handleResChange}
                        className={inputClass(!!resErrors.guests)}
                      >
                        <option value="">Guests</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={String(n)}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                        <option value="9+">9+ Guests</option>
                      </select>
                      {resErrors.guests && (
                        <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {resErrors.guests}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Briefcase size={16} className="absolute left-3 top-3 text-ember" />
                      <select
                        name="occasion"
                        value={resForm.occasion}
                        onChange={handleResChange}
                        className={inputClass(false)}
                      >
                        <option value="">Occasion (optional)</option>
                        <option value="casual">Casual Dining</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="business">Business Meeting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3 top-3 text-ember" />
                    <textarea
                      name="message"
                      value={resForm.message}
                      onChange={handleResChange}
                      placeholder="Special Requests (optional)"
                      rows={3}
                      className={`${inputClass(false)} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px hsla(51,100%,50%,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-ember text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 glow-amber transition-all text-sm"
                  >
                    <Send size={16} />
                    Reserve a Table
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={handleConSubmit} className="space-y-4">
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-ember" />
                    <input
                      name="name"
                      value={conForm.name}
                      onChange={handleConChange}
                      placeholder="Your Name"
                      className={inputClass(!!conErrors.name)}
                    />
                    {conErrors.name && (
                      <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {conErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-ember" />
                    <input
                      name="email"
                      type="email"
                      value={conForm.email}
                      onChange={handleConChange}
                      placeholder="Email Address"
                      className={inputClass(!!conErrors.email)}
                    />
                    {conErrors.email && (
                      <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {conErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3 top-3 text-ember" />
                    <input
                      name="subject"
                      value={conForm.subject}
                      onChange={handleConChange}
                      placeholder="Subject"
                      className={inputClass(!!conErrors.subject)}
                    />
                    {conErrors.subject && (
                      <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {conErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3 top-3 text-ember" />
                    <textarea
                      name="message"
                      value={conForm.message}
                      onChange={handleConChange}
                      placeholder="Your Message"
                      rows={5}
                      className={`${inputClass(!!conErrors.message)} resize-none`}
                    />
                    {conErrors.message && (
                      <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {conErrors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px hsla(51,100%,50%,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-ember text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 glow-amber transition-all text-sm"
                  >
                    <Send size={16} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
