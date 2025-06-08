
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react';
    import { motion } from 'framer-motion';

    const WelcomePage = () => {
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.2,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      };

      const features = [
        { icon: <BookOpen className="h-10 w-10 text-primary" />, title: "Buy & Sell Books", description: "Find textbooks, novels, and academic resources at great prices or sell your used books easily." },
        { icon: <Users className="h-10 w-10 text-primary" />, title: "Community Marketplace", description: "Connect with fellow students and educators to exchange academic materials and knowledge." },
        { icon: <Zap className="h-10 w-10 text-primary" />, title: "Quick & Easy", description: "Seamlessly list your items or find what you need with our user-friendly platform." },
      ];

      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">EduCycle</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your one-stop marketplace for academic resources. Buy, sell, and recycle educational materials with ease.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 ease-in-out transform hover:scale-105">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-primary">
              <Link to="/login">
                Already a Member? Login <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8">Why Choose EduCycle?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-primary/50"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <img  
              alt="A diverse group of students collaborating and studying together" 
              className="rounded-lg shadow-xl mx-auto max-w-3xl w-full"
             src="https://images.unsplash.com/photo-1575581535069-f9ef30a209b3" />
          </motion.div>
        </div>
      );
    };

    export default WelcomePage;
  