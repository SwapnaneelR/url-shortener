 import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.tsx';
import { useContext,createContext, useState } from 'react';

const queryClient = new QueryClient();


const ThemeConext = createContext()
createRoot(document.getElementById('root')!).render(

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
        <ThemeConext.Provider value={{theme,changeTheme}}>
          <App />
        </ThemeConext.Provider>
      </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
)
export default ThemeConext