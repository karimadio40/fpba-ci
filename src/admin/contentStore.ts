import i18n from '../i18n';

const STORAGE_KEY = 'fpbaci:content-overrides';

export type Overrides = Record<string, Record<string, string>>;
// Shape: { fr: { 'hero.title': '...' }, en: { 'hero.title': '...' } }

export function loadOverrides(): Overrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOverrides(o: Overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
}

/** Read a value either from override (if set) or from i18n resources. */
export function getValue(lang: string, key: string): string {
  const o = loadOverrides();
  if (o[lang] && o[lang][key] !== undefined) return o[lang][key];
  return i18n.getResource(lang, 'translation', key) ?? '';
}

export function setValue(lang: string, key: string, value: string) {
  const o = loadOverrides();
  if (!o[lang]) o[lang] = {};
  o[lang][key] = value;
  saveOverrides(o);
  i18n.addResource(lang, 'translation', key, value);
}

export function resetAll() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

/** Apply persisted overrides into i18n at app boot. */
export function applyOverridesToI18n() {
  const o = loadOverrides();
  for (const lang of Object.keys(o)) {
    for (const key of Object.keys(o[lang])) {
      i18n.addResource(lang, 'translation', key, o[lang][key]);
    }
  }
}

/** Schema of editable fields, grouped by section. */
export type FieldDef = {
  key: string;          // dot path in i18n
  label: string;
  type?: 'text' | 'textarea';
};

export type SectionDef = {
  id: string;
  title: string;
  icon: string; // emoji/short svg key
  fields: FieldDef[];
};

export const ADMIN_SCHEMA: SectionDef[] = [
  {
    id: 'hero',
    title: 'Section Héros (Accueil)',
    icon: '🏠',
    fields: [
      { key: 'hero.badge', label: 'Badge' },
      { key: 'hero.title', label: 'Titre — début' },
      { key: 'hero.titleHighlight', label: 'Titre — mot mis en valeur' },
      { key: 'hero.titleEnd', label: 'Titre — fin' },
      { key: 'hero.subtitle', label: 'Sous-titre', type: 'textarea' },
      { key: 'hero.cta_primary', label: 'Bouton principal' },
      { key: 'hero.cta_secondary', label: 'Bouton secondaire' },
    ],
  },
  {
    id: 'about',
    title: 'À propos',
    icon: '👥',
    fields: [
      { key: 'about.label', label: 'Étiquette' },
      { key: 'about.title', label: 'Titre' },
      { key: 'about.titleHighlight', label: 'Mot mis en valeur' },
      { key: 'about.p1', label: 'Paragraphe 1', type: 'textarea' },
      { key: 'about.p2', label: 'Paragraphe 2', type: 'textarea' },
      { key: 'about.vision_title', label: 'Titre — Vision' },
      { key: 'about.vision_text', label: 'Texte — Vision', type: 'textarea' },
      { key: 'about.mission_title', label: 'Titre — Mission' },
      { key: 'about.mission_text', label: 'Texte — Mission', type: 'textarea' },
      { key: 'about.contact_name', label: 'Nom contact' },
      { key: 'about.contact_role', label: 'Rôle contact' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    icon: '🛠️',
    fields: [
      { key: 'services.label', label: 'Étiquette' },
      { key: 'services.title', label: 'Titre' },
      { key: 'services.titleHighlight', label: 'Mot mis en valeur' },
      { key: 'services.subtitle', label: 'Sous-titre', type: 'textarea' },
      { key: 'services.items.representation.title', label: 'Service 1 — Titre' },
      { key: 'services.items.representation.desc', label: 'Service 1 — Description', type: 'textarea' },
      { key: 'services.items.accompaniment.title', label: 'Service 2 — Titre' },
      { key: 'services.items.accompaniment.desc', label: 'Service 2 — Description', type: 'textarea' },
      { key: 'services.items.training.title', label: 'Service 3 — Titre' },
      { key: 'services.items.training.desc', label: 'Service 3 — Description', type: 'textarea' },
      { key: 'services.items.standardization.title', label: 'Service 4 — Titre' },
      { key: 'services.items.standardization.desc', label: 'Service 4 — Description', type: 'textarea' },
      { key: 'services.items.information.title', label: 'Service 5 — Titre' },
      { key: 'services.items.information.desc', label: 'Service 5 — Description', type: 'textarea' },
      { key: 'services.items.networking.title', label: 'Service 6 — Titre' },
      { key: 'services.items.networking.desc', label: 'Service 6 — Description', type: 'textarea' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '✉️',
    fields: [
      { key: 'contact.label', label: 'Étiquette' },
      { key: 'contact.title', label: 'Titre' },
      { key: 'contact.titleHighlight', label: 'Mot mis en valeur' },
      { key: 'contact.subtitle', label: 'Sous-titre', type: 'textarea' },
      { key: 'contact.info.address', label: 'Adresse', type: 'textarea' },
      { key: 'contact.info.hours', label: 'Horaires' },
    ],
  },
  {
    id: 'footer',
    title: 'Pied de page',
    icon: '⚓',
    fields: [
      { key: 'footer.tagline', label: 'Tagline' },
      { key: 'footer.description', label: 'Description', type: 'textarea' },
      { key: 'footer.copyright', label: 'Copyright' },
      { key: 'footer.made_with', label: 'Mention « fait avec »' },
    ],
  },
];

export const ADMIN_PIN = '2024';
export const ADMIN_SESSION_KEY = 'fpbaci:admin-session';
