import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  // Découpage de la chaîne de caractères (ex: "React, Node, MySQL") en tableau pour manipulation UI
  const tags = project.tech_stack ? project.tech_stack.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col h-full transition-transform hover:-translate-y-1 duration-300">
      
      {/* Image de couverture ou placeholder neutre si absente */}
      <div className="h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {project.image_url ?  ( // 
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-500 font-mono text-sm">[Pas d'image disponible]</span>
        )}
      </div>

      {/* Contenu textuel de la carte */}
      <div className="p-5 grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        
        {/* line-clamp-3 limite l'affichage à 3 lignes maximum pour garder l'harmonie de la grille */}
        <p className="text-slate-300 text-sm line-clamp-3 grow mb-4">
          {project.description || "Aucune description fournie pour ce projet."}
        </p>

        {/* Badges des technologies utilisées */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Liens et boutons d'action */}
        <div className="pt-4 border-t border-slate-700 flex flex-wrap justify-between items-center gap-2">
          <Link 
            to={`/projects/${project.id}`} 
            className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
          >
            Voir les détails →
          </Link>
          
          <div className="flex space-x-3 text-xs text-slate-400">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline">
                GitHub
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline">
                Démo Live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}