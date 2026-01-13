"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Users, Github, Linkedin, Twitter, Mail } from "lucide-react";

/**
 * BiographyTeamShowcase Component
 * Displays the founder section with image and core team member cards
 * Features interactive hover effects and social links
 */

// Team data with founder and team members
const teamMembers = [
  {
    name: "Ajulu Dennis (Legend)",
    role: "Community Lead",
    bio: "Full-stack developer | BlockChain developer | Top OpenSource passionate about building scalable solutions.",
    image: "/legend.jpg",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Chukwudi Nnamdi",
    role: "Creative Director",
    bio: "UI/UX designer crafting beautiful and intuitive experiences.",
    image: "/team2Image",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Ngozi Eze",
    role: "Data Lead",
    bio: "Data scientist turning complex data into actionable insights.",
    image: "/team2Image",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Emeka Obi",
    role: "Security Lead",
    bio: "Cybersecurity expert protecting digital assets and infrastructure.",
    image: "/team2Image",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/**
 * FounderSection - Displays founder information with image and social links
 */
function FounderSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
          >
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Founder</span>
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-display font-bold"
          >
            <span className="text-gradient">Meet The Visionary</span>
          </motion.h2>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-3xl overflow-hidden border-glow">
            <div className="grid md:grid-cols-2">
              {/* Founder Image */}
              <div className="relative h-80 md:h-auto min-h-100">
                <Image
                  src="/founder.jpg"
                  alt="Paul Alfred - Founder"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent md:bg-linear-to-r" />

                {/* Decorative circles */}
                <motion.div
                  className="absolute top-6 left-6 w-20 h-20 border-2 border-primary/40 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute bottom-6 right-6 w-16 h-16 border-2 border-secondary/40 rounded-full"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                />
              </div>

              {/* Founder Info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary font-medium text-sm mb-2 tracking-wide uppercase">
                  Founder & Alumni
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Paul Alfred
                </h3>
                <p className="text-muted-foreground mb-6">
                  Engineering Graduate | Motion Designer
                </p>

                <div className="space-y-4 text-muted-foreground mb-8 leading-relaxed">
                  <p>
                    Paul Alfred founded COOU Techies with a vision to bridge the
                    gap between classroom learning and real-world tech skills.
                    His passion for technology and community building has
                    inspired hundreds of students.
                  </p>
                  <p>
                    Under his leadership, the community has organized over 30
                    events, mentored countless students, and produced graduates
                    passionate about tech.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Mail, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-xl border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * CoreTeamCards - Displays individual team member cards with images and social links
 */
function CoreTeamCards() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Core Team</span>
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            <span className="text-gradient">The Dream</span>{" "}
            <span className="text-foreground">Makers</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Meet the dedicated individuals who work tirelessly to make COOU
            Techies the incredible community it is today.
          </motion.p>
        </motion.div>

        {/* Team Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/30">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

                  {/* Social Links Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/40 backdrop-blur-sm">
                    {Object.entries(member.socials).map(([platform, href]) => {
                      const Icon =
                        platform === "github"
                          ? Github
                          : platform === "linkedin"
                          ? Linkedin
                          : Twitter;
                      return (
                        <motion.a
                          key={platform}
                          href={href}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors border border-border/50"
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <span className="text-primary text-sm font-medium">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-display font-bold mt-1 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * BiographyTeamShowcase - Combines founder section and core team cards
 */
export const BiographyTeamShowcase = () => {
  return (
    <>
      <FounderSection />
      <CoreTeamCards />
    </>
  );
};
