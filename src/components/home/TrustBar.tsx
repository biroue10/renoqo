import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
const items = [["Estimations gratuites", "Préparez votre budget sans frais"], ["Professionnels locaux", "Trouvez des acteurs dans votre région"], ["Prix transparents", "Comprenez les fourchettes annoncées"], ["Sans engagement", "Vous restez libre de votre choix"]];
export function TrustBar() { return <section className="trust-bar" aria-label="Les avantages Renoqo"><Container><div className="trust-grid">{items.map(([title, text]) => <div key={title}><span className="trust-icon"><Icon name="check" size={19} /></span><p><strong>{title}</strong><small>{text}</small></p></div>)}</div></Container></section>; }
