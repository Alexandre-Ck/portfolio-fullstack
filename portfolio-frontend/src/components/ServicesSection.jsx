
export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Applications Web Sur-Mesure",
      description: "Développement d'applications web robustes et évolutives avec React, Node.js et MySQL. Du cahier des charges à la mise en production.",
      price: "À partir de 1 500€",
      features: ["Architecture en couches propre", "Interface d'administration sécurisée", "Code optimisé pour le référencement (SEO)"]
    },
    {
      id: 2,
      title: "Automatisation & Agents IA",
      description: "Conception et intégration d'agents autonomes IA pour automatiser vos tâches commerciales, la prospection B2B ou la gestion interne.",
      price: "Sur devis",
      features: ["Analyse de vos processus internes", "Connexion aux API d'IA (OpenAI/Anthropic)", "Gain de productivité massif"]
    },
    {
      id: 3,
      title: "Maintenance & Optimisation",
      description: "Audit de performances, correction de bugs, migration de technologies et optimisation de bases de données existantes.",
      price: "400€ / jour",
      features: ["Refactoring de code legacy", "Optimisation des requêtes SQL", "Sécurisation des endpoints API"]
    }
  ];

  return (
    <section id="services" className="space-y-10 py-8">
      {/* En-tête de la section */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Prestations & <span className="text-emerald-400">Services</span>
        </h2>
        <p className="text-slate-400 mt-3 text-sm md:text-base">
          Des solutions techniques haut de gamme conçues pour maximiser l'efficacité de votre business et accélérer votre croissance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between shadow-lg transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-3">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 pt-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 uppercase font-mono tracking-wider">Tarif indicatif</span>
                <span className="text-emerald-400 font-bold text-lg">{service.price}</span>
              </div>
              <a 
                href="#contact" 
                className="block text-center bg-slate-900 hover:bg-slate-950 text-white border border-slate-700 hover:border-emerald-500 text-xs font-semibold py-2.5 rounded-lg transition-all"
              >
                Demander un devis
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}