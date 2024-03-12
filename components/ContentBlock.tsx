import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "h-full w-full overflow-hidden rounded-md bg-[#f7f8fe] shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
