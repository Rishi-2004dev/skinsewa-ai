
// Demo credentials for the application
interface User {
  username: string;
  password: string;
  role: "admin" | "clinic" | "patient";
  name: string;
}

// Demo users
const demoUsers: User[] = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Admin User"
  },
  {
    username: "clinic",
    password: "clinic123",
    role: "clinic",
    name: "Demo Clinic"
  },
  {
    username: "patient",
    password: "patient123",
    role: "patient",
    name: "Demo Patient"
  }
];

// Login function
export const login = (username: string, password: string): { success: boolean; user?: User; error?: string } => {
  const user = demoUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Store user in localStorage for session persistence
    localStorage.setItem("currentUser", JSON.stringify({
      username: user.username,
      role: user.role,
      name: user.name
    }));
    
    return { success: true, user };
  }
  
  return { success: false, error: "Invalid username or password" };
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("currentUser");
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem("currentUser") !== null;
};

// Get current user
export const getCurrentUser = (): { username: string; role: string; name: string } | null => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

// Get user role
export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};
