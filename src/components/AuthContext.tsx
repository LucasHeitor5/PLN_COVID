'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'VISITOR' | 'STUDENT' | 'PROFESSOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  completedLessons: number[];
  quizScores: Record<number, number>; // moduloId -> pontuação %
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  markLessonComplete: (lessonId: number) => void;
  saveQuizScore: (moduleId: number, score: number) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Carregar usuário e tema salvos
    const saved = localStorage.getItem('pln_covid_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Perfil padrão de demonstração para facilitar a navegação inicial
      const defaultUser: User = {
        id: 'usr-demo-01',
        name: 'Estudante Engenharia de Software',
        email: 'estudante@universidade.edu.br',
        role: 'STUDENT',
        completedLessons: [1],
        quizScores: { 1: 100 }
      };
      setUser(defaultUser);
      localStorage.setItem('pln_covid_user', JSON.stringify(defaultUser));
    }

    const savedTheme = localStorage.getItem('pln_covid_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('pln_covid_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('pln_covid_theme', 'light');
      }
      return next;
    });
  };

  const login = (email: string, role: UserRole = 'STUDENT') => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      completedLessons: [],
      quizScores: {}
    };
    setUser(newUser);
    localStorage.setItem('pln_covid_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pln_covid_user');
  };

  const markLessonComplete = (lessonId: number) => {
    if (!user) return;
    if (user.completedLessons.includes(lessonId)) return;
    const updated = {
      ...user,
      completedLessons: [...user.completedLessons, lessonId]
    };
    setUser(updated);
    localStorage.setItem('pln_covid_user', JSON.stringify(updated));
  };

  const saveQuizScore = (moduleId: number, score: number) => {
    if (!user) return;
    const updated = {
      ...user,
      quizScores: {
        ...user.quizScores,
        [moduleId]: score
      }
    };
    setUser(updated);
    localStorage.setItem('pln_covid_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, markLessonComplete, saveQuizScore, isDarkMode, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
