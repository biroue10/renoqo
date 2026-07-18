import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
export function PopularServices() { return <section className="section section-tint"><Container><SectionHeading eyebrow="Tous vos projets" title="Les travaux les plus recherchés" description="Explorez les catégories, comparez les besoins et préparez une estimation adaptée." /><div className="service-grid">{services.map(service => <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}><span className="service-icon"><Icon name={service.icon} /></span><h3>{service.title}</h3><p>{service.description}</p><span className="card-link">Explorer <Icon name="arrow" size={17} /></span></Link>)}</div></Container></section>; }
