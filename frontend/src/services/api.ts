const API_URL = '';

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number | null;
  created_at: string;
}

function getToken(): string | null {
  return localStorage.getItem('token');
}

export async function getStudents(): Promise<Student[]> {
  const token = getToken();
  const res = await fetch(`${API_URL}/students`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des étudiants');
  }

  return res.json();
}

export async function createStudent(data: { first_name: string; last_name: string; email: string; age?: number }): Promise<Student> {
  const token = getToken();
  const res = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erreur lors de la création de l'étudiant");
  }

  return res.json();
}
