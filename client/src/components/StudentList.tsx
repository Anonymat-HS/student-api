import { useEffect, useState, useCallback } from 'react';
import { getStudents, type Student } from '../services/api';
import StudentForm from './StudentForm';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    getStudents()
      .then((data) => { if (!cancelled) setStudents(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="student-list">
      <h1>Liste des étudiants</h1>
      <StudentForm onStudentCreated={fetchStudents} />
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Âge</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.last_name}</td>
                  <td>{s.first_name}</td>
                  <td>{s.email}</td>
                  <td>{s.age ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && <p>Aucun étudiant trouvé.</p>}
        </>
      )}
    </div>
  );
}
