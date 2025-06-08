
    import React, { createContext, useState, useContext, useEffect } from 'react';
    
    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const storedUser = localStorage.getItem('educycle-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }, []);

      const login = async (email, password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('educycle-users')) || [];
            const foundUser = users.find(u => u.email === email && u.password === password); // In real app, password check is on backend
            
            if (foundUser) {
              const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone, createdAt: foundUser.createdAt };
              setUser(userData);
              localStorage.setItem('educycle-user', JSON.stringify(userData));
              resolve(userData);
            } else {
              reject(new Error('Invalid credentials'));
            }
          }, 1000);
        });
      };

      const signup = async (name, email, phone, password) => {
         return new Promise((resolve, reject) => {
          setTimeout(() => {
            let users = JSON.parse(localStorage.getItem('educycle-users')) || [];
            if (users.find(u => u.email === email)) {
              reject(new Error('User with this email already exists.'));
              return;
            }
            
            const newUser = { 
              id: Date.now().toString(), 
              name, 
              email, 
              phone, 
              password, // In a real app, hash password before storing
              createdAt: new Date().toISOString() 
            };
            users.push(newUser);
            localStorage.setItem('educycle-users', JSON.stringify(users));
            
            const userData = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, createdAt: newUser.createdAt };
            setUser(userData); // Optionally auto-login after signup
            localStorage.setItem('educycle-user', JSON.stringify(userData)); // Optionally auto-login
            resolve(userData);
          }, 1000);
        });
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('educycle-user');
      };

      const value = {
        user,
        loading,
        login,
        signup,
        logout,
      };

      return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
      return useContext(AuthContext);
    };
  