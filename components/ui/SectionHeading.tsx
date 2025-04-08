import { cn } from "../../lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
};

const SectionHeading = ({
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        className,
        "mb-8",
        align === "center" && "text-center",
        align === "right" && "text-right"
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
