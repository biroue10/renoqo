type Props = { name: string; size?: number };

const paths: Record<string, React.ReactNode> = {
  renovation: <><path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-7h6v7" /></>,
  construction: <><path d="M4 21h16M6 21V7h12v14M9 7V3h6v4M9 11h2m2 0h2m-6 4h2m2 0h2" /></>,
  peinture: <><path d="M5 3h11v6H5zM16 6h3v5l-7 3v7M8 17h8" /></>,
  plomberie: <><path d="M12 2s5 6 5 11a5 5 0 0 1-10 0c0-5 5-11 5-11Z" /></>,
  electricite: <><path d="m13 2-7 12h6l-1 8 7-12h-6z" /></>,
  carrelage: <><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" /></>,
  cuisine: <><path d="M4 3v18M20 3v18M4 7h16M4 15h16M10 7v8" /></>,
  bain: <><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM7 12V6a3 3 0 0 1 6 0" /></>,
  climatisation: <><path d="M4 5h16v8H4zM8 17c1.5-2 2.5-2 4 0s2.5 2 4 0" /></>,
  solaire: <><circle cx="17" cy="6" r="3" /><path d="m3 13 13-2 2 9H5zM9 12l1 8M4 17h13" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
};

export function Icon({ name, size = 24 }: Props) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] ?? paths.check}</svg>;
}
