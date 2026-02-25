import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Carrega a autenticação ao iniciar a aplicação
    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    function login(email: string, password: string) {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (email === storedEmail && password === storedPassword) {
            setIsAuthenticated(true);
            localStorage.setItem("auth", "true");
            return true;
        }

        return false;
    }

    function logout() {
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
