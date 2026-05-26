import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import ServicesSection from '../components/ServicesSection'; // Importation de ton composant de services
import ProcessSection from '../components/ProcessSection';   // Importation de ton nouveau composant de méthodologie

export default function HomePage() {
  return (
    // Conteneur racine unique et propre pour toute la page
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      
      {/* 1. Section Hero - Présentation et proposition de valeur immédiate */}
      <section className="text-center max-w-3xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Développeur Full-Stack & Solutions Web <span className="text-emerald-400">Sur-Mesure</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 leading-relaxed">
          Conception d'applications web modernes, robustes et performantes. Besoin d'un site web vitrine, e-commerce ou d'un espace d'administration sécurisé ? Donnons vie à vos projets.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link 
            to="/projects" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
          >
            Découvrir mes projets
          </Link>
          <a 
            href="#services" 
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Voir mes services
          </a>
        </div>
      </section>

      <hr className="border-slate-800" />

      {/* 2. Section Services - Présentation de tes offres commerciales */}
      <ServicesSection />

      <hr className="border-slate-800" />

      {/* 3. Section Méthodologie - L'AFFICHAGE DU COMPOSANT EST ICI MAINTENANT */}
      <ProcessSection />

      <hr className="border-slate-800" />

      {/* 4. Section Contact & Formulaire - Capture de leads et conversion des clients */}
      <section id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Discutons de votre business</h2>
          <p className="text-slate-300 leading-relaxed">
            Vous cherchez un développeur rigoureux pour piloter la création de votre produit, optimiser un site existant ou automatiser vos processus d'entreprise ? 
          </p>
          <div className="space-y-4 font-mono text-sm text-slate-400">
            <p> Secteur d'activité : Lyon / Auvergne-Rhône-Alpes & Full Remote</p>
            <p>⏱️ Temps de réponse moyen : Moins de 24 heures</p>
          </div>
        </div>
        
        {/* Ton composant de formulaire autonome géré avec React Hook Form */}
        <ContactForm />
      </section>

    </div> 
  );
}