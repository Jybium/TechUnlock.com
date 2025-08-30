"use client";
import axios from "axios";
import { fetchToken } from "@/helpers/getToken";
import { removeToken } from "@/helpers/removeToken";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const fetchAccountDetails = useCallback(async () => {
    try {
      setLoading(true);
      const token = await fetchToken();
      if (!token) return;
      const response = await axios.get(
        "https://test.techunlock.org/test/api/account/account-details/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuth(response.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        handleInvalidToken();
      } else {
        console.error("Failed to fetch account details:", error);
        // Optionally handle other errors
      }
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  const handleInvalidToken = useCallback(() => {
    // Remove token and redirect to login if pathname matches
    if (
      pathname.includes("pay") ||
      pathname.includes("register") ||
      pathname.includes("verify")
    ) {
      removeToken().then(() => {
        router.push("/login");
      });
    } else {
      // Optionally, handle other cases if needed
      removeToken();
    }
  }, [pathname, router]);

  useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
      loading,
      setLoading,
    }),
    [auth, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
