import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities } from "@/data/cities";
export function CitiesSection() { return <section className="section section-tint"><Container><SectionHeading eyebrow="Au plus près de votre chantier" title="Trouvez des services dans votre ville" description="Le déploiement commence dans six grandes villes. De nouvelles zones seront ajoutées progressivement." /><div className="city-grid">{cities.map((city, i) => <Link href={`/villes/${city.slug}`} className={`city-card city-${i + 1}`} key={city.slug}><span className="city-art" aria-hidden="true"><i /><i /><i /></span><span><strong>{city.name}</strong><small>{city.note}</small></span><b aria-hidden="true">→</b></Link>)}</div></Container></section>; }
