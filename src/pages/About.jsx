import { useAbout } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import { motion } from "motion/react";

export default function About() {
  const { data } = useAbout();
  const { language } = useLanguage();

  return (
    <div className="pb-24">
      <div className="from-background via-secondary/70 fixed inset-0 -z-10 h-screen w-full bg-radial to-transparent bg-fixed mix-blend-overlay" />

      {data?.bio && (
        <motion.div
          className="mx-auto max-w-prose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <PortableText value={data.bio[language] || data.bio.es} />
        </motion.div>
      )}
    </div>
  );
}
