/**
 * file: fr.ts
 * description: fr 语言包 — Français（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.4.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: Français 语言包（本地化内嵌）
 *
 * license: MIT
 */
export const fr = {
  common: {
    health: 'Santé',
    online: 'En ligne',
    offline: 'Hors ligne',
    welcome: 'Bienvenue',
    save: 'Enregistrer',
    cancel: 'Annuler',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    version: 'v2.0.0',
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
  },
  overview: {
    stats: {
      cronNext: 'Prochain réveil {time}',
    },
  },
  welcome: {
    message: 'Bonjour {name}',
    title: 'Bienvenue sur YYC³ i18n Core',
  },
} as const;
