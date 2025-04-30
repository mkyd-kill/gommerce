"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";

export default function ProtectedRoute ({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        router.push("/login")
    );
};