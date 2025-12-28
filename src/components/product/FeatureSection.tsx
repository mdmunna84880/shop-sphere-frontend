import { motion } from 'framer-motion';
import Container from '../ui/Container'; 
import { FEATURES } from '../../constants/featuresData';
import FeatureCard from './FeaturedCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

function FeaturesSection(){
  return (
    <section className="w-full bg-bg-surface border-t border-border-base">
      <Container className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-xs sm:text-sm font-font-body font-bold text-brand-accent tracking-widest uppercase">
            What We Believe
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 xl:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturesSection;