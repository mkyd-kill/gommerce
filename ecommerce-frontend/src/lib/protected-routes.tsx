import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { toast } from "react-toastify";

export default function ProtectedRoute ({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState(false);
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push("/login");
            toast.warning("Authentication required to access page");
        } else {
            setChecked(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return checked ? <>{children}</> : null;
};