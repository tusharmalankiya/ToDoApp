// AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps around the entire app
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state

  // Simulate login (replace with actual login logic)
  const login = async (userData) => {
    setUser(userData); // Store user data after successful login
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(userData)); // Save user in local storage
  };

  // Simulate logout (replace with actual logout logic)
  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY); // Remove user from local storage
  };

  // Check if user is already logged in (when the app loads)
  useEffect(() => {
    const fetch = async () =>{
        const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (storedUser) {
            setUser(await JSON.parse(storedUser));
        }
    }
    
    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
