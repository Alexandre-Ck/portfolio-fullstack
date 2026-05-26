import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../../hooks/useFetch';

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [submissionError, setSubmissionError] = useState('');

  const onSubmit = async (data) => {
    try {
      setSubmissionError('');
      // Payload envoyé en POST au backend
      await apiFetch('/projects', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      navigate('/admin'); // Redirection vers le tableau de bord principal après persistance
    } catch (error) {
      setSubmissionError(error.message || 'Impossible de créer le projet.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/admin" className="text-slate-400 hover:text-white text-sm">← Annuler et retourner au dashboard</Link>
        <h1 className="text-3xl font-extrabold text-white mt-3">Ajouter un Projet</h1>
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
              placeholder="Ex: E-Commerce API"
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
              placeholder="Détails, architecture technique, fonctionnalités clés..."
              {...register('description', { 
                maxLength: { value: 2000, message: 'La description ne doit pas dépasser 2000 caractères' }
              })}
            ></textarea>
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* Stack Technique */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Technologies (Séparées par des virgules)</label>
            <input 
              type="text"
              className={`w-full bg-slate-900 border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 ${errors.tech_stack ? 'border-red-500' : 'border-slate-700'}`}
              placeholder="React, Express, MySQL, Tailwind"
              {...register('tech_stack', { 
                maxLength: { value: 255, message: 'Le champ tech stack ne doit pas dépasser 255 caractères' }
              })}
            />
            {errors.tech_stack && <p className="text-red-400 text-xs mt-1">{errors.tech_stack.message}</p>}
          </div>

          {/* Configuration des formats d'URL Optionnels via pattern Regex */}
          {['github_url', 'demo_url', 'image_url'].map((urlField) => {
            const labels = { github_url: 'Lien GitHub', demo_url: 'Lien Démo Live / Vidéo', image_url: 'URL de l\'Image de Couverture' };
            const placeHolders = { github_url: 'https://github.com/...', demo_url: 'https://...', image_url: 'https://...' };
            
            return (
              <div key={urlField}>
                <label className="block text-sm font-medium text-slate-300 mb-1">{labels[urlField]}</label>
                <input 
                  type="text"
                  className={`w-full bg-slate-900 border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 ${errors[urlField] ? 'border-red-500' : 'border-slate-700'}`}
                  placeholder={placeHolders[urlField]}
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
            {isSubmitting ? 'Enregistrement en base de données...' : 'Publier le projet'}
          </button>
        </form>
      </div>
    </div>
  );
}