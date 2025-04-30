import ProtectedRoute from "@/lib/ProtectedRoute";

export default function CartPage() {
    return (
        <ProtectedRoute>
            <h1 className="text-xl font-bold mb-4">Your Cart</h1>
            <p>(Coming Soon: cart functionality)</p>
        </ProtectedRoute>
    );
}