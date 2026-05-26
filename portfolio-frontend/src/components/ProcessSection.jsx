export default function ProcessSection() {
  const steps = [
    {
      id: "01",
      title: "Stratégie & Audit",
      description: "Analyse de vos besoins business et de vos processus actuels pour définir l'architecture technique idéale et le cahier des charges."
    },
    {
      id: "02",
      title: "Développement Agile",
      description: "Codage de votre application (Front + Back) avec une architecture propre, sécurisée et optimisée. Vous suivez l'avancée en temps réel."
    },
    {
      id: "03",
      title: "Tests & Sécurisation",
      description: "Validation stricte de chaque endpoint de l'API, tests de charge et vérification de la sécurité de la base de données avant le lancement."
    },
    {
      id: "04",
      title: "Déploiement & Suivi",
      description: "Mise en ligne de votre plateforme sur des serveurs haute performance et accompagnement pour la prise en main de votre espace admin."
    }
  ];

  return (
    <section id="process" className="space-y-12 py-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Ma Méthodologie de <span className="text-emerald-400">Travail</span>
        </h2>
        <p className="text-slate-400 mt-3 text-sm md:text-base">
          Un processus transparent, rigoureux et orienté résultats pour garantir le succès de votre projet de bout en bout.
        </p>
      </div>

      {/* Grille des étapes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className="bg-slate-800/50 border border-slate-800 hover:border-slate-700 rounded-xl p-6 relative overflow-hidden transition-all duration-300"
          >
            {/* Grand numéro en arrière-plan pour le style */}
            <span className="absolute right-4 top-2 text-6xl font-black text-slate-700/20 font-mono select-none">
              {step.id}
            </span>
            
            <div className="space-y-3 relative z-10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {step.title}
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}