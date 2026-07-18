import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "light"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return <Link className={`button button-${variant} ${className}`} href={href}>{children}</Link>;
}
