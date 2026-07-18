"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "./Header";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } }; document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [open]);
  return <div className="mobile-navigation"><button ref={button} className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span><span aria-hidden="true">{open ? "×" : "☰"}</span></button>{open && <nav id="mobile-menu" aria-label="Navigation mobile"><div className="mobile-selects"><span>🇲🇦 Maroc</span><span>Français</span></div>{navigation.map(([label, href]) => <Link href={href} onClick={() => setOpen(false)} key={label}>{label}</Link>)}<Link href="/connexion" onClick={() => setOpen(false)}>Connexion</Link><Link className="button button-primary" href="/devis" onClick={() => setOpen(false)}>Demander des devis</Link></nav>}</div>;
}
