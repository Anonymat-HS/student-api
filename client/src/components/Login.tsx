import { useState } from 'react';

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isRegister ? '/auth/register' : '/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur serveur');
      }

      if (isRegister) {
        setIsRegister(false);
        setError(null);
        return;
      }

      localStorage.setItem('token', data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>{isRegister ? 'Inscription' : 'Connexion'}</h1>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : isRegister ? "S'inscrire" : 'Se connecter'}
        </button>

        <p className="toggle">
          {isRegister ? 'Déjà un compte ?' : "Pas encore de compte ?"}{' '}
          <button type="button" className="link-btn" onClick={() => { setIsRegister(!isRegister); setError(null); }}>
            {isRegister ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>
      </form>
    </div>
  );
}
