import { useState } from 'react';
import { createStudent } from '../services/api';

interface StudentFormProps {
  onStudentCreated: () => void;
}

export default function StudentForm({ onStudentCreated }: StudentFormProps) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createStudent({
        first_name,
        last_name,
        email,
        age: age ? Number(age) : undefined,
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setAge('');
      onStudentCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Ajouter un étudiant</h2>
      <div className="form-row">
        <input type="text" placeholder="Prénom" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Nom" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} min="0" />
        <button type="submit" disabled={loading}>{loading ? '...' : 'Ajouter'}</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
