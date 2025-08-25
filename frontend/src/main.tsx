// main entry
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { createContext, useState, type ReactNode } from 'react';

const queryClient = new QueryClient();


type ThemeContextType = {
  theme: string;
  changeTheme: (theme: string) => void;
};

const ThemeConext = createContext<ThemeContextType>({
  theme: 'light',
  changeTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');
  const changeTheme = (t: string) => setTheme(t);
  return (
    <ThemeConext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeConext.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default ThemeConext;