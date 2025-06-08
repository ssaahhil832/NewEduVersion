
    import React from 'react';
    import { useAuth } from '@/contexts/AuthContext';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { BookOpen, ShoppingCart, PlusCircle, List, Search, Settings } from 'lucide-react';
    import { motion } from 'framer-motion';

    const DashboardPage = () => {
      const { user } = useAuth();

      const StatCard = ({ icon, title, value, color }) => (
        <motion.div 
          className={`bg-card p-6 rounded-xl shadow-lg border-l-4 ${color} flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ y: -5 }}
        >
          <div>{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </motion.div>
      );
      
      const ActionButton = ({ icon, label, to, className }) => (
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild variant="outline" size="lg" className={`w-full justify-start text-left h-auto py-4 ${className}`}>
            <Link to={to}>
              <div className="flex items-center">
                {icon}
                <span className="ml-3 text-base">{label}</span>
              </div>
            </Link>
          </Button>
        </motion.div>
      );

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      };

      return (
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{user?.name?.split(' ')[0] || 'User'}!</span>
            </h1>
            <p className="text-lg text-muted-foreground">Manage your academic resources and connections.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={itemVariants}>
              <StatCard icon={<BookOpen className="h-10 w-10 text-blue-500" />} title="Active Listings" value="12" color="border-blue-500" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={<ShoppingCart className="h-10 w-10 text-green-500" />} title="Items Sold" value="5" color="border-green-500" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={<List className="h-10 w-10 text-yellow-500" />} title="Items Purchased" value="3" color="border-yellow-500" />
            </motion.div>
             <motion.div variants={itemVariants}>
              <StatCard icon={<Search className="h-10 w-10 text-purple-500" />} title="Saved Searches" value="2" color="border-purple-500" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-lg space-y-4 border border-border/50"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <ActionButton icon={<PlusCircle className="h-6 w-6 text-primary"/>} label="List a New Item" to="/add-product" className="hover:border-primary hover:bg-primary/10" />
              <ActionButton icon={<BookOpen className="h-6 w-6 text-green-600"/>} label="Browse All Products" to="/products" className="hover:border-green-600 hover:bg-green-600/10" />
              <ActionButton icon={<List className="h-6 w-6 text-blue-600"/>} label="Manage Your Listings" to="/seller-dashboard" className="hover:border-blue-600 hover:bg-blue-600/10" />
              <ActionButton icon={<Search className="h-6 w-6 text-purple-600"/>} label="Search for Items" to="/search" className="hover:border-purple-600 hover:bg-purple-600/10" />
            </motion.div>

            <motion.div 
              className="bg-card p-6 rounded-xl shadow-lg space-y-4 border border-border/50"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Account</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-md">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-md">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{user?.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-md">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span className="font-medium text-foreground">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              <ActionButton icon={<Settings className="h-6 w-6 text-gray-600"/>} label="Account Settings" to="/account-settings" className="hover:border-gray-600 hover:bg-gray-600/10 mt-4" />
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <img  
              alt="Illustration of various academic items like books, calculators, and lab coats" 
              className="rounded-lg shadow-xl mx-auto max-w-4xl w-full h-64 object-cover"
             src="https://images.unsplash.com/photo-1590431533633-9a64bed60fe9" />
          </motion.div>
        </div>
      );
    };

    export default DashboardPage;
  