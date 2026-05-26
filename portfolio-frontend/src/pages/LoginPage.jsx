import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiFetch } from '../hooks/useFetch';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoginError('') ;
      const response = await apiFetch('/auth/login', { 
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (response && response.token) {
        login(response.token); // Enregistrement dans le state et localStorage
        navigate('/admin'); // Routage immédiat vers l'espace sécurisé
      }
    } catch (error) {
      // Interception des erreurs d'authentification (ex: 401 Unauthorized)
      setLoginError(error.message || 'Identifiants invalides.');
    }

  };

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Espace Admin</h2>
          <p className="text-slate-400 text-sm mt-2">Connectez-vous pour manager vos projets.</p>
        </div>

        {loginError && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-3.5 rounded-lg text-sm font-medium mb-6">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Adresse Email</label>
            <input 
              type="email"
              autoComplete="email"
              className={`w-full bg-slate-900 border text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
              placeholder="admin@portfolio.fr"
              {...register('email', { 
                required: 'L\'adresse email est requise',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Format d\'adresse email invalide'
                }
              })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Mot de passe</label>
            <input 
              type="password"
              autoComplete="current-password"
              className={`w-full bg-slate-900 border text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${errors.password ? 'border-red-500' : 'border-slate-700'}`}
              placeholder="••••••••"
              {...register('password', { required: 'Le mot de passe est requis' })}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting} 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors cursor-pointer disabled:opacity-50 pt-3"
          >
            {isSubmitting ? 'Connexion sécurisée en cours...' : 'Se connecter'} 
          </button>
        </form>
      </div>
    </div>
  );
}