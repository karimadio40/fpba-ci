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
    if (!raw) return [];
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
