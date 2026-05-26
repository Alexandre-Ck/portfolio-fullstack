import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../hooks/useFetch';

export default function AdminPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAdminProjects = async () => {
        try {
            setLoading(true);
            const data = await apiFetch('/projects');
            setProjects(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            await loadAdminProjects();
        };

        fetchProjects();
    }, []);

    
    const handleDelete = async (id, title) => {
        if (window.confirm(`Action irréversible. Voulez-vous vraiment supprimer le projet "${title}" ?`)) {
            try {
                // Envoi de la requête DELETE sécurisée par token
                await apiFetch(`/projects/${id}`, { method: 'DELETE' });

                // Optimisation de l'UI : Filtrage du state local pour éviter une requête réseau superflue
                setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
            } catch (err) {
                alert(`Échec de la suppression : ${err.message}`);
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <p className="text-emerald-400 font-mono tracking-widest animate-pulse">CHARGEMENT DU DASHBOARD...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Dashboard Administration</h1>
                    <p className="text-slate-400 text-sm mt-1">Gestion opérationnelle du catalogue de projets.</p>
                </div>
                <Link
                    to="/admin/projects/new"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-lg shadow text-sm transition-colors"
                >
                    + Nouveau Projet
                </Link>
            </div>

            {error && (
                <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-lg text-sm mb-6">
                    {error}
                </div>
            )}

            {/* Table de données brute des projets en BDD */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700 text-slate-300 text-xs uppercase tracking-wider font-mono">
                                <th className="py-4 px-6">ID</th>
                                <th className="py-4 px-6">Titre du Projet</th>
                                <th className="py-4 px-6">Technologies</th>
                                <th className="py-4 px-6 text-right">Actions Opérationnelles</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-slate-500">Aucun projet enregistré en base de données.</td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="py-4 px-6 font-mono text-xs text-slate-500">{project.id}</td>
                                        <td className="py-4 px-6 font-bold text-white">{project.title}</td>
                                        <td className="py-4 px-6">
                                            <span className="text-slate-400 text-xs truncate max-w-xs block">{project.tech_stack || '—'}</span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                                            <Link
                                                to={`/admin/projects/${project.id}/edit`}
                                                className="text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id, project.title)}
                                                className="text-red-400 hover:text-red-500 font-medium text-sm transition-colors cursor-pointer"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}