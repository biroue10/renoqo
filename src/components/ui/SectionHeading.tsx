type Props = { eyebrow?: string; title: string; description?: string; align?: "left" | "center" };

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  return (
    <div className={`section-heading ${align === "left" ? "align-left" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
