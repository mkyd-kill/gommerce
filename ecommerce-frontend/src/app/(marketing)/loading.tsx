import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#66004b] w-10 h-10 mb-4" />
    </div>
  );
}