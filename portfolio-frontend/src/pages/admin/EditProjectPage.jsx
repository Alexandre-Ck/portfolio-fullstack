import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../../hooks/useFetch';

export default function EditProjectPage() {
  const { id } = useParams(); // Récupération de l'ID du projet ciblé
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionError, setSubmissionError] = useState('');

  // On va chercher les donnes existantes du projet pour la preremplir
  useEffect(() => {
    const fetchExistingProject = async () => {
      try {
        const projectData = await apiFetch(`/projects/${id}`);
        // Remplissage automatique des champs via reset() de RHF
        reset(projectData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingProject();
  }, [id, reset]);

  const onSubmit = async (data) => {  
    try {
      setSubmissionError('');
      // Requête SQL UPDATE via la méthode HTTP PUT sécurisée
      await apiFetch(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      navigate('/admin');
    } catch (error) {
      setSubmissionError(error.message || 'Échec de la mise à jour.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-emerald-400 font-mono tracking-widest animate-pulse">RÉCUPÉRATION DES DONNÉES DU PROJET...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-6 rounded-xl inline-block mb-4">
          <p className="font-bold">Erreur de chargement du projet</p>
          <p className="text-sm font-mono mt-1">{error}</p> //{error} va afficher le message d'erreur retourner par le backend 
        </div>
        <br />
        <Link to="/admin" className="text-emerald-400 hover:underline">Retourner au dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/admin" className="text-slate-400 hover:text-white text-sm">← Annuler les modifications</Link>
        <h1 className="text-3xl font-extrabold text-white mt-3">Modifier le Projet</h1>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        {submissionError && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-lg text-sm mb-6">
            {submissionError}
          </div>

        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Titre du Projet *</label>
            <input 
              type="text"
              className={`w-full bg-slate-900 border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 ${errors.title ? 'border-red-500' : 'border-slate-700'}`}
              {...register('title', { 
                required: 'Le titre est obligatoire',
                minLength: { value: 2, message: 'Le titre doit faire au moins 2 caractères' },
                maxLength: { value: 150, message: 'Le titre ne peut pas dépasser 150 caractères' }
              })}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea 
              rows="4"
              className={`w-full bg-slate-900 border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 ${errors.description ? 'border-red-500' : 'border-slate-700'}`}
              {...register('description', { 
                maxLength: { value: 2000, message: 'La description ne doit pas dépasser 2000 caractères' }
              })}
            ></textarea>
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* Stack Technique */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Technologies</label>
            <input 
              type="text"
              className={`w-full bg-slate-900 border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 ${errors.tech_stack ? 'border-red-500' : 'border-slate-700'}`}
              {...register('tech_stack', { 
                maxLength: { value: 255, message: 'Le champ tech stack ne doit pas dépasser 255 caractères' }
              })}
            />
            {errors.tech_stack && <p className="text-red-400 text-xs mt-1">{errors.tech_stack.message}</p>}
          </div>

          {/* URLs Optionnelles */}
          {['github_url', 'demo_url', 'image_url'].map((urlField) => {
            const labels = { github_url: 'Lien GitHub', demo_url: 'Lien Démo Live / Vidéo', image_url: 'URL de l\'Image de Couverture' };
            return (
              <div key={urlField}>
                <label className="block text-sm font-medium text-slate-300 mb-1">{labels[urlField]}</label>
                <input 
                  type="text"
                  className={`w-full bg-slate-900 border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 ${errors[urlField] ? 'border-red-500' : 'border-slate-700'}`}
                  {...register(urlField, {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: 'L\'URL doit obligatoirement commencer par http:// ou https://'
                    }
                  })}
                />
                {errors[urlField] && <p className="text-red-400 text-xs mt-1">{errors[urlField].message}</p>}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors cursor-pointer disabled:opacity-50 mt-4"
          >
            {isSubmitting ? 'Mise à jour en base de données...' : 'Sauvegarder les modifications'}
          </button>
        </form>
      </div>
    </div>
  );
}