export type SubmissionKind = 'membership' | 'accompaniment' | 'contact';

export type SubmissionStatus = 'new' | 'in_review' | 'done';

export interface Submission<TPayload = Record<string, unknown>> {
  id: string;
  kind: SubmissionKind;
  createdAt: number;
  status: SubmissionStatus;
  payload: TPayload;
}

const STORAGE_KEY = 'fpba_submissions_v1';

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readAll = (): Submission[] => {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // Seed default submissions for demonstration
      const initial: Submission[] = [
        {
          id: 'membership_seed_1',
          kind: 'membership',
          createdAt: Date.now() - 24 * 3600 * 1000 * 2, // 2 days ago
          status: 'new',
          payload: {
            company: 'SIBM (Société Ivoirienne de Béton Manufacturé)',
            rccm: 'CI-ABJ-1994-B-172940',
            manager: 'Goué Noel',
            role: 'Directeur Général',
            email: 'n.goue@sibmci.com',
            phone: '+2250504019299',
            address: 'Cocody Angré, Abidjan',
            products: 'Poteaux électriques, Poteaux d\'éclairage public',
            staff: '200 salariés et +',
            motivation: 'En tant qu\'acteur majeur de la production de poteaux en Côte d\'Ivoire, nous souhaitons activement contribuer à la normalisation de la filière et collaborer avec l\'ensemble des producteurs pour assainir le marché.',
            consent: 'true'
          }
        },
        {
          id: 'accompaniment_seed_1',
          kind: 'accompaniment',
          createdAt: Date.now() - 3600 * 1000 * 5, // 5 hours ago
          status: 'in_review',
          payload: {
            type: 'Mise en conformité normative',
            company: 'Béton Force Côte d\'Ivoire',
            contact: 'Koffi Kouamé Jean',
            email: 'jk.kouame@betonforce.ci',
            phone: '+2250708091011',
            need: 'Nous avons besoin d\'un accompagnement pour préparer l\'audit de conformité technique de notre nouvelle ligne de production de poteaux électriques 12m selon le cahier des charges de la CIE.',
            deadline: 'Sous 2 mois'
          }
        },
        {
          id: 'contact_seed_1',
          kind: 'contact',
          createdAt: Date.now() - 3600 * 1000 * 1, // 1 hour ago
          status: 'new',
          payload: {
            name: 'Kassoum Traoré',
            company: 'CODINORM',
            email: 'k.traore@codinorm.ci',
            phone: '+2250102030405',
            subject: 'Partenariat',
            message: 'Bonjour, nous souhaiterions organiser une séance de travail conjointe avec la FPBA-CI concernant la révision de la norme NI-CIE relative aux supports de réseaux aériens. Merci de nous proposer des dates de réunion.'
          }
        }
      ];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
};

const writeAll = (rows: Submission[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    // ignore quota issues in demo
  }
};

export const listSubmissions = (kind?: SubmissionKind): Submission[] => {
  const rows = readAll();
  const filtered = kind ? rows.filter((r) => r.kind === kind) : rows;
  return filtered.sort((a, b) => b.createdAt - a.createdAt);
};

export const addSubmission = <T extends Record<string, unknown>>(
  kind: SubmissionKind,
  payload: T,
): Submission<T> => {
  const submission: Submission<T> = {
    id: `${kind}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    kind,
    createdAt: Date.now(),
    status: 'new',
    payload,
  };
  const rows = readAll();
  rows.push(submission as Submission);
  writeAll(rows);
  return submission;
};

export const updateStatus = (id: string, status: SubmissionStatus): void => {
  const rows = readAll();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  rows[idx] = { ...rows[idx], status };
  writeAll(rows);
};

export const removeSubmission = (id: string): void => {
  const rows = readAll().filter((r) => r.id !== id);
  writeAll(rows);
};

export const countByKind = (kind: SubmissionKind): number =>
  readAll().filter((r) => r.kind === kind).length;
