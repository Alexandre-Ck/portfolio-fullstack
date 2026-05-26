import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiFetch } from '../hooks/useFetch';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [apiFeedback, setApiFeedback] = useState({ success: null, message: '' });

  const onSubmit = async (data) => {
    try {
      setApiFeedback({ success: null, message: '' });
      // Envoi sécurisé des données au backend
      const result = await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      setApiFeedback({ success: true, message: result.message || 'Votre message a été envoyé avec succès !' });
      reset(); // Remise à zéro complète des champs du formulaire
    } catch (error) {
      setApiFeedback({ success: false, message: error.message || "Impossible d'envoyer le message." });
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
      <h3 className="text-2xl font-bold text-white mb-6">M'envoyer un message</h3>

      {apiFeedback.message && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${apiFeedback.success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {apiFeedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-x-0 space-y-4">
        {/* Champ Nom */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Votre Nom</label>
          <input 
            type="text"
            className={`w-full bg-slate-900 border text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${errors.name ? 'border-red-500' : 'border-slate-700'}`}
            placeholder="votre nom complet"
            {...register('name', { 
              required: 'Le nom est obligatoire',
              minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
            })}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Votre Email</label>
          <input 
            type="email"
            className={`w-full bg-slate-900 border text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
            placeholder="votre.email@exemple.com"
            {...register('email', { 
              required: 'L\'email est obligatoire',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Format d\'adresse email invalide'
              }
            })}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Votre Message</label>
          <textarea 
            rows="5"
            className={`w-full bg-slate-900 border text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-slate-700'}`}
            placeholder="Détaillez votre projet ou votre demande de site web..."
            {...register('message', { 
              required: 'Le contenu du message est obligatoire',
              minLength: { value: 10, message: 'Votre message doit contenir au moins 10 caractères' }
            })}
          ></textarea>
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-500-500 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
      </form>
    </div>
  );
}