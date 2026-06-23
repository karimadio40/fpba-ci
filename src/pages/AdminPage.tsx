import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo/Logo';
import {
  ADMIN_SCHEMA,
  ADMIN_PIN,
  ADMIN_SESSION_KEY,
  getValue,
  setValue,
  resetAll,
  loadOverrides,
} from '../admin/contentStore';
import {
  listSubmissions,
  updateStatus,
  removeSubmission,
  countByKind,
  type Submission,
  type SubmissionKind,
  type SubmissionStatus,
} from '../utils/submissions';
import './AdminPage.css';

type Lang = 'fr' | 'en';

const REQUEST_KINDS: { id: SubmissionKind; titleKey: string; icon: string }[] = [
  { id: 'membership', titleKey: 'admin.tabs.membership', icon: '👤' },
  { id: 'accompaniment', titleKey: 'admin.tabs.accompaniment', icon: '🤝' },
  { id: 'contact', titleKey: 'admin.tabs.contact', icon: '✉️' },
];

const formatDate = (ts: number) => {
  const d = new Date(ts);
  return d.toLocaleString();
};

const SubmissionsView: React.FC<{ kind: SubmissionKind; tick: number }> = ({ kind, tick }) => {
  const { t } = useTranslation();
  const [version, setVersion] = useState(0);
  const items = useMemo(() => listSubmissions(kind), [kind, version, tick]);
  const [openId, setOpenId] = useState<string | null>(null);

  const onStatusChange = (id: string, status: SubmissionStatus) => {
    updateStatus(id, status);
    setVersion((v) => v + 1);
  };

  const onDelete = (id: string) => {
    if (window.confirm('Supprimer cette demande ?')) {
      removeSubmission(id);
      setVersion((v) => v + 1);
    }
  };

  if (items.length === 0) {
    return <div className="admin-empty">{t('admin.empty')}</div>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Identité</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row: Submission) => {
          const p = row.payload as Record<string, string>;
          const identity =
            p.company || p.name || p.contact || p.manager || p.email || '—';
          const isOpen = openId === row.id;
          return (
            <React.Fragment key={row.id}>
              <tr className={isOpen ? 'active-row' : ''}>
                <td>{formatDate(row.createdAt)}</td>
                <td>
                  <strong className="admin-identity">{identity}</strong>
                  {p.email && (
                    <div style={{ fontSize: '0.78rem', marginTop: '2px' }}>
                      <a href={`mailto:${p.email}`} className="admin-email-link">
                        {p.email}
                      </a>
                    </div>
                  )}
                </td>
                <td>
                  <select
                    className={`admin-status-select status-${row.status}`}
                    value={row.status}
                    onChange={(e) => onStatusChange(row.id, e.target.value as SubmissionStatus)}
                  >
                    <option value="new">{t('admin.status.new')}</option>
                    <option value="in_review">{t('admin.status.in_review')}</option>
                    <option value="done">{t('admin.status.done')}</option>
                  </select>
                </td>
                <td>
                  <div className="admin-row__actions">
                    <button
                      className={`admin-row__btn-details ${isOpen ? 'active' : ''}`}
                      onClick={() => setOpenId(isOpen ? null : row.id)}
                    >
                      {isOpen ? 'Fermer' : 'Détails'}
                    </button>
                    <button className="admin-row__btn-delete" onClick={() => onDelete(row.id)}>
                      {t('admin.delete')}
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ border: 'none' }}>
                <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="admin-table__details">
                          {Object.entries(p).map(([k, v]) => (
                            <div key={k} className="admin-table__detail-row">
                              <span className="admin-table__detail-key">{k}</span>
                              <span className="admin-table__detail-val">{String(v) || '—'}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const [authed, setAuthed] = useState<boolean>(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1',
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  type View =
    | { type: 'content'; id: string }
    | { type: 'submissions'; kind: SubmissionKind };

  const [view, setView] = useState<View>({ type: 'submissions', kind: 'membership' });
  const [lang, setLang] = useState<Lang>('fr');
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [statsTick, setStatsTick] = useState(0);

  useEffect(() => {
    if (!authed) return;
    if (view.type !== 'content') return;
    const section = ADMIN_SCHEMA.find((s) => s.id === view.id)!;
    const next: Record<string, string> = {};
    for (const f of section.fields) next[f.key] = getValue(lang, f.key);
    setDraft(next);
  }, [view, lang, authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
    setPin('');
  };

  const handleSave = () => {
    for (const key of Object.keys(draft)) {
      setValue(lang, key, draft[key]);
    }
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Réinitialiser TOUTES les modifications ? Cette action est irréversible.')) {
      resetAll();
    }
  };

  useEffect(() => {
    const tick = setInterval(() => setStatsTick((v) => v + 1), 3000);
    return () => clearInterval(tick);
  }, []);

  const overrides = loadOverrides();
  const modifiedCount =
    (overrides.fr ? Object.keys(overrides.fr).length : 0) +
    (overrides.en ? Object.keys(overrides.en).length : 0);

  if (!authed) {
    return (
      <div className="admin-login">
        <motion.div
          className="admin-login__card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
          <h1>{t('admin.title')}</h1>
          <p>{t('admin.subtitle')}</p>

          <form onSubmit={handleLogin} className="admin-login__form">
            <label>Code d'accès</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinError(false);
              }}
              placeholder="••••"
              autoFocus
              className={pinError ? 'error' : ''}
            />
            {pinError && <span className="admin-login__err">Code incorrect</span>}
            <button type="submit" className="btn btn-primary">
              {t('admin.login.submit')}
            </button>
          </form>

          <Link to="/" className="admin-login__back">← Retour au site</Link>
          <p className="admin-login__hint">
            Démo : code <code>2024</code>
          </p>
        </motion.div>
      </div>
    );
  }

  const currentSection =
    view.type === 'content' ? ADMIN_SCHEMA.find((s) => s.id === view.id)! : null;

  const sectionTitle =
    view.type === 'content'
      ? currentSection!.title
      : t(REQUEST_KINDS.find((r) => r.id === view.kind)!.titleKey);

  return (
    <div className="admin">
      <header className="admin__topbar">
        <div className="admin__topbar-left">
          <Logo />
          <div className="admin__crumbs">
            <span>{t('admin.title')}</span>
            <span className="admin__crumb-sep">/</span>
            <strong>{sectionTitle}</strong>
          </div>
        </div>
        <div className="admin__topbar-right">
          {view.type === 'content' && modifiedCount > 0 && (
            <span className="admin__badge">
              {modifiedCount} modification{modifiedCount > 1 ? 's' : ''}
            </span>
          )}
          <Link to="/" className="admin__link-view">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Voir le site
          </Link>
          <button onClick={handleLogout} className="admin__logout">
            {t('admin.logout')}
          </button>
        </div>
      </header>

      <div className="admin__layout">
        <aside className="admin__sidebar">
          <div className="admin__sidebar-title">Demandes reçues</div>
          <nav>
            {REQUEST_KINDS.map((r) => {
              const count = countByKind(r.id);
              const active = view.type === 'submissions' && view.kind === r.id;
              return (
                <button
                  key={r.id}
                  className={`admin__nav-item ${active ? 'active' : ''}`}
                  onClick={() => setView({ type: 'submissions', kind: r.id })}
                >
                  <span className="admin__nav-icon">{r.icon}</span>
                  <span style={{ flex: 1 }}>{t(r.titleKey)}</span>
                  {count > 0 && <span className="admin-tab__badge">{count}</span>}
                </button>
              );
            })}
          </nav>

          <div className="admin__sidebar-title" style={{ marginTop: 20 }}>
            Contenu du site
          </div>
          <nav>
            {ADMIN_SCHEMA.map((s) => {
              const active = view.type === 'content' && view.id === s.id;
              return (
                <button
                  key={s.id}
                  className={`admin__nav-item ${active ? 'active' : ''}`}
                  onClick={() => setView({ type: 'content', id: s.id })}
                >
                  <span className="admin__nav-icon">{s.icon}</span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="admin__sidebar-footer">
            <button className="admin__reset" onClick={handleReset}>
              Réinitialiser le contenu
            </button>
            <p className="admin__sidebar-note">
              Les modifications de contenu et les demandes sont enregistrées localement (démo).
            </p>
          </div>
        </aside>

        <main className="admin__main">
          {view.type === 'submissions' ? (
            <>
              <div className="admin__panel-header">
                <div>
                  <h2>{sectionTitle}</h2>
                  <p>Consultez, traitez ou supprimez les demandes reçues via le site.</p>
                </div>
              </div>

              <div className="admin-stats" key={statsTick}>
                {REQUEST_KINDS.map((r) => (
                  <div className="admin-stat" key={r.id}>
                    <p className="admin-stat__label">{t(r.titleKey)}</p>
                    <p className="admin-stat__value">{countByKind(r.id)}</p>
                  </div>
                ))}
              </div>

              <SubmissionsView kind={view.kind} tick={statsTick} key={view.kind} />
            </>
          ) : (
            <>
              <div className="admin__panel-header">
                <div>
                  <h2>{currentSection!.title}</h2>
                  <p>Modifiez ci-dessous les textes qui apparaissent dans cette section du site.</p>
                </div>

                <div className="admin__lang-switch">
                  <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>
                    FR
                  </button>
                  <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
                    EN
                  </button>
                </div>
              </div>

              <div className="admin__form">
                {currentSection!.fields.map((f) => {
                  const isTextarea = f.type === 'textarea';
                  return (
                    <div
                      key={f.key}
                      className={`admin__field ${isTextarea ? 'admin__field--full' : 'admin__field--half'}`}
                    >
                      <label>
                        <span className="admin__field-label-text">{f.label}</span>
                        <span className="admin__field-key">{f.key}</span>
                      </label>
                      {isTextarea ? (
                        <textarea
                          value={draft[f.key] ?? ''}
                          onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                          rows={4}
                        />
                      ) : (
                        <input
                          type="text"
                          value={draft[f.key] ?? ''}
                          onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="admin__savebar">
                <AnimatePresence>
                  {savedAt && (
                    <motion.span
                      className="admin__saved"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      ✓ Modifications enregistrées
                    </motion.span>
                  )}
                </AnimatePresence>
                <button onClick={handleSave} className="btn btn-primary">
                  Enregistrer les modifications
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
