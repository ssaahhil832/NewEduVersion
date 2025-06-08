
    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/AuthContext';
    import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
    import { motion } from 'framer-motion';

    const SignUpPage = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const { toast } = useToast();
      const navigate = useNavigate();
      const { signup } = useAuth();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!name || !email || !phone || !password || !confirmPassword) {
          toast({
            title: "Missing Fields",
            description: "Please fill in all fields.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        try {
          await signup(name, email, phone, password);
          toast({
            title: "Account Created",
            description: "Your account has been successfully created. Please login.",
          });
          navigate('/login');
        } catch (error) {
           toast({
            title: "Sign Up Failed",
            description: error.message || "Could not create account. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      };

      const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } })
      };

      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-2xl border border-border/50"
          >
            <div className="text-center">
              <motion.h1 
                initial={{ opacity:0, y: -20}} 
                animate={{ opacity:1, y:0}}
                transition={{duration: 0.4}}
                className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
              >
                Create your EduCycle Account
              </motion.h1>
              <p className="mt-2 text-muted-foreground">Join our community of learners and educators.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={inputVariants} initial="hidden" animate="visible" custom={0} className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="pl-10" disabled={isLoading}/>
                </div>
              </motion.div>
              <motion.div variants={inputVariants} initial="hidden" animate="visible" custom={1} className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10" disabled={isLoading}/>
                </div>
              </motion.div>
               <motion.div variants={inputVariants} initial="hidden" animate="visible" custom={2} className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required className="pl-10" disabled={isLoading}/>
                </div>
              </motion.div>
              <motion.div variants={inputVariants} initial="hidden" animate="visible" custom={3} className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10" disabled={isLoading}/>
                </div>
              </motion.div>
              <motion.div variants={inputVariants} initial="hidden" animate="visible" custom={4} className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="confirm-password" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-10" disabled={isLoading}/>
                </div>
              </motion.div>
              <motion.div variants={inputVariants} initial="hidden" animate="visible" custom={5}>
                <Button type="submit" className="w-full group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : <><UserPlus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" /> Create Account</>}
                </Button>
              </motion.div>
            </form>
             <motion.p 
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:0.8, duration:0.5}}
              className="text-center text-sm text-muted-foreground"
            >
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </motion.p>
          </motion.div>
        </div>
      );
    };

    export default SignUpPage;
  