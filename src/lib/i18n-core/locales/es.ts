/**
 * file: es.ts
 * description: es 语言包 — Español（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.4.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: Español 语言包（本地化内嵌）
 *
 * license: MIT
 */
export const es = {
  common: {
    health: 'Salud',
    online: 'En línea',
    offline: 'Fuera de línea',
    welcome: 'Bienvenido',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    version: 'v2.0.0',
  },
  nav: {
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
  },
  overview: {
    stats: {
      cronNext: 'Próxima activación {time}',
    },
  },
  welcome: {
    message: 'Hola {name}',
    title: 'Bienvenido a YYC³ i18n Core',
  },
} as const;
