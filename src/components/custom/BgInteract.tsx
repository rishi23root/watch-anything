import { cn } from "@/lib/utils";

export default function BgInteract({ className }: { className: string }) {
  return (
    <div
      className={cn(
        className,
        "w-full h-full fixed top-0 left-0 bg-grid-white/20"
      )}
    />
  );
}
