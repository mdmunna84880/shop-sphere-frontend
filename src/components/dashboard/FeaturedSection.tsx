import { motion } from "framer-motion";

// Imports from aliases
import Container from "@/components/ui/Container";
import { features } from "@/constants/featuresData";

// Local Component
import FeatureCard from "./FeatureCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function FeaturesSection() {
  return (
    <section className="w-full border-t bg-bg-surface border-border-base">
      <Container className="py-10 sm:py-12 md:py-16 lg:py-20">
        
        {/* Section Header */}
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <h2 className="text-xl font-bold tracking-wider uppercase sm:text-3xl font-body text-brand-accent">
            What We Offer
          </h2>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 lg:gap-8 xl:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
        
      </Container>
    </section>
  );
}

export default FeaturesSection;