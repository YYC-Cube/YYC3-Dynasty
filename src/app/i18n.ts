/**
 * file: i18n.ts
 * description: 国际化模块 · 基于 i18n-core 引擎的 Dynasty 适配层
 * author: YanYuCloudCube Team
 * version: v2.1.0
 * created: 2026-03-21
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[engine]
 *
 * brief: 使用 @/lib/i18n-core I18nEngine，注册 Dynasty 专属翻译
 *
 * details:
 * - 创建 I18nEngine 实例（含 LRU 缓存、locale 自动检测、localStorage 持久化）
 * - 注册 Dynasty 业务翻译键（dynasty.* / tab.* / edict.* / action.* / msg.* / time.* / sync.*）
 * - 引擎自动检测系统语言（localStorage → navigator → 默认 zh-CN）
 * - 与 @/lib/i18n-react 的 I18nProvider / useTranslation 配合使用
 * - 支持 RTL（阿拉伯语），引擎内置 isRTL / getDirection
 *
 * dependencies: @/lib/i18n-core
 * exports: engine, t, getLocale, setLocale, onLocaleChange, getAvailableLocales, LANG_META, SUPPORTED_LOCALES
 */

import { I18nEngine, type Locale, type TranslationMap } from '@/lib/i18n-core';

// ── 语言元信息（用于语言切换器展示）──

interface LangInfo {
  label: string;
  native: string;
  flag: string;
}

const LANG_META: Record<Locale, LangInfo> = {
  'zh-CN': { label: '中文', native: '简体中文', flag: '🇨🇳' },
  'zh-TW': { label: '繁體中文', native: '繁體中文', flag: '🇹🇼' },
  en: { label: 'English', native: 'English', flag: '🇺🇸' },
  ja: { label: '日本語', native: '日本語', flag: '🇯🇵' },
  ko: { label: '한국어', native: '한국어', flag: '🇰🇷' },
  fr: { label: 'Français', native: 'Français', flag: '🇫🇷' },
  de: { label: 'Deutsch', native: 'Deutsch', flag: '🇩🇪' },
  es: { label: 'Español', native: 'Español', flag: '🇪🇸' },
  'pt-BR': { label: 'Português', native: 'Português (BR)', flag: '🇧🇷' },
  ar: { label: 'العربية', native: 'العربية', flag: '🇸🇦' },
};

// ── Dynasty 业务翻译表 ──
// 引擎使用嵌套对象遍历 dot-path，需将 flat key 转为嵌套结构。

function nest(flat: Record<string, string>): TranslationMap {
  const result: TranslationMap = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as TranslationMap;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

const zhCNFlat: Record<string, string> = {
  'dynasty.title': '三省六部 · 总控台',
  'dynasty.subtitle': 'OpenClaw Sansheng-Liubu Dashboard',
  'sync.ok': '同步正常',
  'sync.error': '服务器未启动',
  'sync.connecting': '连接中…',
  'sync.polling': '轮询',
  'sync.realtime': '实时',
  'edict.count': '{count} 道旨意',
  'edict.active': '活跃',
  'edict.archived': '归档',
  'edict.all': '全部',
  'edict.none': '暂无旨意',
  'edict.hint': '通过飞书向太子发送任务',
  'tab.edicts': '旨意看板',
  'tab.court': '朝堂议政',
  'tab.monitor': '省部调度',
  'tab.officials': '官员总览',
  'tab.models': '模型配置',
  'tab.skills': '技能配置',
  'tab.sessions': '小任务',
  'tab.memorials': '奏折阁',
  'tab.templates': '旨库',
  'tab.morning': '天下要闻',
  'action.stop': '叫停',
  'action.cancel': '取消',
  'action.resume': '恢复',
  'action.approve': '准奏',
  'action.reject': '封驳',
  'action.advance': '推进',
  'action.refresh': '刷新',
  'action.search': '搜索',
  'msg.serverError': '服务器连接失败',
  'msg.opSuccess': '操作成功',
  'msg.loading': '加载中…',
  'msg.noData': '暂无数据',
  'time.justNow': '刚刚',
  'time.minutesAgo': '{n}分钟前',
  'time.hoursAgo': '{n}小时前',
  'time.daysAgo': '{n}天前',
};

const enFlat: Record<string, string> = {
  'dynasty.title': 'Sansheng-Liubu · Dashboard',
  'dynasty.subtitle': 'OpenClaw Control Center',
  'sync.ok': 'Sync OK',
  'sync.error': 'Server Offline',
  'sync.connecting': 'Connecting…',
  'sync.polling': 'Polling',
  'sync.realtime': 'Realtime',
  'edict.count': '{count} edicts',
  'edict.active': 'Active',
  'edict.archived': 'Archived',
  'edict.all': 'All',
  'edict.none': 'No edicts yet',
  'edict.hint': 'Send tasks via Feishu',
  'tab.edicts': 'Edict Board',
  'tab.court': 'Court',
  'tab.monitor': 'Monitor',
  'tab.officials': 'Officials',
  'tab.models': 'Models',
  'tab.skills': 'Skills',
  'tab.sessions': 'Sessions',
  'tab.memorials': 'Memorials',
  'tab.templates': 'Templates',
  'tab.morning': 'Morning Brief',
  'action.stop': 'Stop',
  'action.cancel': 'Cancel',
  'action.resume': 'Resume',
  'action.approve': 'Approve',
  'action.reject': 'Reject',
  'action.advance': 'Advance',
  'action.refresh': 'Refresh',
  'action.search': 'Search',
  'msg.serverError': 'Server connection failed',
  'msg.opSuccess': 'Success',
  'msg.loading': 'Loading…',
  'msg.noData': 'No data',
  'time.justNow': 'just now',
  'time.minutesAgo': '{n} min ago',
  'time.hoursAgo': '{n}h ago',
  'time.daysAgo': '{n}d ago',
};

// ── 繁體中文 (zh-TW) ──
const zhTWFlat: Record<string, string> = {
  'dynasty.title': '三省六部 · 總控台',
  'dynasty.subtitle': 'OpenClaw Sansheng-Liubu Dashboard',
  'sync.ok': '同步正常',
  'sync.error': '伺服器未啟動',
  'sync.connecting': '連線中…',
  'sync.polling': '輪詢',
  'sync.realtime': '即時',
  'edict.count': '{count} 道旨意',
  'edict.active': '活躍',
  'edict.archived': '歸檔',
  'edict.all': '全部',
  'edict.none': '暫無旨意',
  'edict.hint': '透過飛書向太子傳達任務',
  'tab.edicts': '旨意看板',
  'tab.court': '朝堂議政',
  'tab.monitor': '省部調度',
  'tab.officials': '官員總覽',
  'tab.models': '模型配置',
  'tab.skills': '技能配置',
  'tab.sessions': '小任務',
  'tab.memorials': '奏摺閣',
  'tab.templates': '旨庫',
  'tab.morning': '天下要聞',
  'action.stop': '叫停',
  'action.cancel': '取消',
  'action.resume': '恢復',
  'action.approve': '准奏',
  'action.reject': '封駁',
  'action.advance': '推進',
  'action.refresh': '重新整理',
  'action.search': '搜尋',
  'msg.serverError': '伺服器連線失敗',
  'msg.opSuccess': '操作成功',
  'msg.loading': '載入中…',
  'msg.noData': '暫無資料',
  'time.justNow': '剛剛',
  'time.minutesAgo': '{n}分鐘前',
  'time.hoursAgo': '{n}小時前',
  'time.daysAgo': '{n}天前',
};

// ── 日本語 (ja) ──
const jaFlat: Record<string, string> = {
  'dynasty.title': '三省六部 · ダッシュボード',
  'dynasty.subtitle': 'OpenClaw コントロールセンター',
  'sync.ok': '同期OK',
  'sync.error': 'サーバーオフライン',
  'sync.connecting': '接続中…',
  'sync.polling': 'ポーリング',
  'sync.realtime': 'リアルタイム',
  'edict.count': '{count}件の旨意',
  'edict.active': '実行中',
  'edict.archived': 'アーカイブ',
  'edict.all': 'すべて',
  'edict.none': '旨意なし',
  'edict.hint': 'Feishuで太子にタスクを送信',
  'tab.edicts': '旨意ボード',
  'tab.court': '朝堂議政',
  'tab.monitor': 'モニター',
  'tab.officials': '官員一覧',
  'tab.models': 'モデル設定',
  'tab.skills': 'スキル設定',
  'tab.sessions': 'セッション',
  'tab.memorials': '奏報',
  'tab.templates': 'テンプレート',
  'tab.morning': '朝の便り',
  'action.stop': '停止',
  'action.cancel': 'キャンセル',
  'action.resume': '再開',
  'action.approve': '承認',
  'action.reject': '却下',
  'action.advance': '進行',
  'action.refresh': '更新',
  'action.search': '検索',
  'msg.serverError': 'サーバー接続失敗',
  'msg.opSuccess': '成功',
  'msg.loading': '読み込み中…',
  'msg.noData': 'データなし',
  'time.justNow': 'たった今',
  'time.minutesAgo': '{n}分前',
  'time.hoursAgo': '{n}時間前',
  'time.daysAgo': '{n}日前',
};

// ── 한국어 (ko) ──
const koFlat: Record<string, string> = {
  'dynasty.title': '삼성육부 · 대시보드',
  'dynasty.subtitle': 'OpenClaw 컨트롤 센터',
  'sync.ok': '동기화 정상',
  'sync.error': '서버 오프라인',
  'sync.connecting': '연결 중…',
  'sync.polling': '폴링',
  'sync.realtime': '실시간',
  'edict.count': '旨意 {count}개',
  'edict.active': '활성',
  'edict.archived': '보관됨',
  'edict.all': '전체',
  'edict.none': '旨意 없음',
  'edict.hint': 'Feishu로 태자에게 작업 전송',
  'tab.edicts': '旨意 보드',
  'tab.court': '조당의정',
  'tab.monitor': '모니터',
  'tab.officials': '관원 총람',
  'tab.models': '모델 설정',
  'tab.skills': '스킬 설정',
  'tab.sessions': '세션',
  'tab.memorials': '주첩',
  'tab.templates': '템플릿',
  'tab.morning': '아침 브리핑',
  'action.stop': '중지',
  'action.cancel': '취소',
  'action.resume': '재개',
  'action.approve': '승인',
  'action.reject': '기각',
  'action.advance': '진행',
  'action.refresh': '새로고침',
  'action.search': '검색',
  'msg.serverError': '서버 연결 실패',
  'msg.opSuccess': '성공',
  'msg.loading': '로딩 중…',
  'msg.noData': '데이터 없음',
  'time.justNow': '방금',
  'time.minutesAgo': '{n}분 전',
  'time.hoursAgo': '{n}시간 전',
  'time.daysAgo': '{n}일 전',
};

// ── Français (fr) ──
const frFlat: Record<string, string> = {
  'dynasty.title': 'Sansheng-Liubu · Tableau de bord',
  'dynasty.subtitle': 'Centre de contrôle OpenClaw',
  'sync.ok': 'Synchro OK',
  'sync.error': 'Serveur hors ligne',
  'sync.connecting': 'Connexion…',
  'sync.polling': 'Sondage',
  'sync.realtime': 'Temps réel',
  'edict.count': '{count} édits',
  'edict.active': 'Actifs',
  'edict.archived': 'Archivés',
  'edict.all': 'Tous',
  'edict.none': 'Aucun édit',
  'edict.hint': 'Envoyer des tâches via Feishu',
  'tab.edicts': 'Édits',
  'tab.court': 'Cour',
  'tab.monitor': 'Surveillance',
  'tab.officials': 'Officiels',
  'tab.models': 'Modèles',
  'tab.skills': 'Compétences',
  'tab.sessions': 'Sessions',
  'tab.memorials': 'Mémoires',
  'tab.templates': 'Modèles',
  'tab.morning': 'Brief du matin',
  'action.stop': 'Arrêter',
  'action.cancel': 'Annuler',
  'action.resume': 'Reprendre',
  'action.approve': 'Approuver',
  'action.reject': 'Rejeter',
  'action.advance': 'Avancer',
  'action.refresh': 'Rafraîchir',
  'action.search': 'Rechercher',
  'msg.serverError': 'Échec de connexion au serveur',
  'msg.opSuccess': 'Succès',
  'msg.loading': 'Chargement…',
  'msg.noData': 'Aucune donnée',
  'time.justNow': "à l'instant",
  'time.minutesAgo': 'il y a {n} min',
  'time.hoursAgo': 'il y a {n} h',
  'time.daysAgo': 'il y a {n} j',
};

// ── Deutsch (de) ──
const deFlat: Record<string, string> = {
  'dynasty.title': 'Sansheng-Liubu · Dashboard',
  'dynasty.subtitle': 'OpenClaw Kontrollzentrum',
  'sync.ok': 'Sync OK',
  'sync.error': 'Server offline',
  'sync.connecting': 'Verbinde…',
  'sync.polling': 'Polling',
  'sync.realtime': 'Echtzeit',
  'edict.count': '{count} Erlasse',
  'edict.active': 'Aktiv',
  'edict.archived': 'Archiviert',
  'edict.all': 'Alle',
  'edict.none': 'Keine Erlasse',
  'edict.hint': 'Aufgaben über Feishu senden',
  'tab.edicts': 'Erlass-Board',
  'tab.court': 'Hof',
  'tab.monitor': 'Überwachung',
  'tab.officials': 'Beamte',
  'tab.models': 'Modelle',
  'tab.skills': 'Fähigkeiten',
  'tab.sessions': 'Sitzungen',
  'tab.memorials': 'Denkschriften',
  'tab.templates': 'Vorlagen',
  'tab.morning': 'Morgenbriefing',
  'action.stop': 'Stopp',
  'action.cancel': 'Abbrechen',
  'action.resume': 'Fortsetzen',
  'action.approve': 'Genehmigen',
  'action.reject': 'Ablehnen',
  'action.advance': 'Vorschieben',
  'action.refresh': 'Aktualisieren',
  'action.search': 'Suchen',
  'msg.serverError': 'Serververbindung fehlgeschlagen',
  'msg.opSuccess': 'Erfolg',
  'msg.loading': 'Laden…',
  'msg.noData': 'Keine Daten',
  'time.justNow': 'gerade eben',
  'time.minutesAgo': 'vor {n} Min.',
  'time.hoursAgo': 'vor {n} Std.',
  'time.daysAgo': 'vor {n} T',
};

// ── Español (es) ──
const esFlat: Record<string, string> = {
  'dynasty.title': 'Sansheng-Liubu · Panel',
  'dynasty.subtitle': 'Centro de control OpenClaw',
  'sync.ok': 'Sincronización OK',
  'sync.error': 'Servidor fuera de línea',
  'sync.connecting': 'Conectando…',
  'sync.polling': 'Sondeo',
  'sync.realtime': 'Tiempo real',
  'edict.count': '{count} edictos',
  'edict.active': 'Activos',
  'edict.archived': 'Archivados',
  'edict.all': 'Todos',
  'edict.none': 'Sin edictos',
  'edict.hint': 'Enviar tareas vía Feishu',
  'tab.edicts': 'Edictos',
  'tab.court': 'Corte',
  'tab.monitor': 'Monitoreo',
  'tab.officials': 'Oficiales',
  'tab.models': 'Modelos',
  'tab.skills': 'Habilidades',
  'tab.sessions': 'Sesiones',
  'tab.memorials': 'Memoriales',
  'tab.templates': 'Plantillas',
  'tab.morning': 'Resumen matutino',
  'action.stop': 'Detener',
  'action.cancel': 'Cancelar',
  'action.resume': 'Reanudar',
  'action.approve': 'Aprobar',
  'action.reject': 'Rechazar',
  'action.advance': 'Avanzar',
  'action.refresh': 'Actualizar',
  'action.search': 'Buscar',
  'msg.serverError': 'Error de conexión al servidor',
  'msg.opSuccess': 'Éxito',
  'msg.loading': 'Cargando…',
  'msg.noData': 'Sin datos',
  'time.justNow': 'ahora mismo',
  'time.minutesAgo': 'hace {n} min',
  'time.hoursAgo': 'hace {n} h',
  'time.daysAgo': 'hace {n} d',
};

// ── Português (pt-BR) ──
const ptBRFlat: Record<string, string> = {
  'dynasty.title': 'Sansheng-Liubu · Painel',
  'dynasty.subtitle': 'Centro de controle OpenClaw',
  'sync.ok': 'Sincronização OK',
  'sync.error': 'Servidor offline',
  'sync.connecting': 'Conectando…',
  'sync.polling': 'Sondagem',
  'sync.realtime': 'Tempo real',
  'edict.count': '{count} editos',
  'edict.active': 'Ativos',
  'edict.archived': 'Arquivados',
  'edict.all': 'Todos',
  'edict.none': 'Sem editos',
  'edict.hint': 'Enviar tarefas via Feishu',
  'tab.edicts': 'Editos',
  'tab.court': 'Corte',
  'tab.monitor': 'Monitoramento',
  'tab.officials': 'Oficiais',
  'tab.models': 'Modelos',
  'tab.skills': 'Habilidades',
  'tab.sessions': 'Sessões',
  'tab.memorials': 'Memoriais',
  'tab.templates': 'Modelos',
  'tab.morning': 'Resumo matinal',
  'action.stop': 'Parar',
  'action.cancel': 'Cancelar',
  'action.resume': 'Retomar',
  'action.approve': 'Aprovar',
  'action.reject': 'Rejeitar',
  'action.advance': 'Avançar',
  'action.refresh': 'Atualizar',
  'action.search': 'Buscar',
  'msg.serverError': 'Falha na conexão com o servidor',
  'msg.opSuccess': 'Sucesso',
  'msg.loading': 'Carregando…',
  'msg.noData': 'Sem dados',
  'time.justNow': 'agora mesmo',
  'time.minutesAgo': 'há {n} min',
  'time.hoursAgo': 'há {n} h',
  'time.daysAgo': 'há {n} d',
};

// ── العربية (ar, RTL) ──
const arFlat: Record<string, string> = {
  'dynasty.title': 'سانشينغ ليوبو · لوحة التحكم',
  'dynasty.subtitle': 'مركز تحكم OpenClaw',
  'sync.ok': 'المزامنة جيدة',
  'sync.error': 'الخادم غير متصل',
  'sync.connecting': 'جارٍ الاتصال…',
  'sync.polling': 'استطلاع',
  'sync.realtime': 'مباشر',
  'edict.count': '{count} مرسوم',
  'edict.active': 'نشط',
  'edict.archived': 'مؤرشف',
  'edict.all': 'الكل',
  'edict.none': 'لا مراسيم',
  'edict.hint': 'إرسال المهام عبر Feishu',
  'tab.edicts': 'لوحة المراسيم',
  'tab.court': 'البلاط',
  'tab.monitor': 'المراقبة',
  'tab.officials': 'المسؤولون',
  'tab.models': 'النماذج',
  'tab.skills': 'المهارات',
  'tab.sessions': 'الجلسات',
  'tab.memorials': 'العرائض',
  'tab.templates': 'القوالب',
  'tab.morning': 'نشرة الصباح',
  'action.stop': 'إيقاف',
  'action.cancel': 'إلغاء',
  'action.resume': 'استئناف',
  'action.approve': 'موافقة',
  'action.reject': 'رفض',
  'action.advance': 'تقديم',
  'action.refresh': 'تحديث',
  'action.search': 'بحث',
  'msg.serverError': 'فشل الاتصال بالخادم',
  'msg.opSuccess': 'نجاح',
  'msg.loading': 'جارٍ التحميل…',
  'msg.noData': 'لا توجد بيانات',
  'time.justNow': 'الآن',
  'time.minutesAgo': 'منذ {n} دقيقة',
  'time.hoursAgo': 'منذ {n} ساعة',
  'time.daysAgo': 'منذ {n} يوم',
};

// ── 创建 I18nEngine 实例 ──

export const engine = new I18nEngine({
  locale: 'zh-CN',
  fallbackLocale: 'en',
  cache: { enabled: true, maxSize: 500, ttl: 600000 },
  debug: false,
  missingKeyHandler: (key) => key,
});

// 注册 Dynasty 翻译（flat → nested 转换）
engine.registerTranslation('zh-CN', nest(zhCNFlat));
engine.registerTranslation('en', nest(enFlat));
engine.registerTranslation('zh-TW', nest(zhTWFlat));
engine.registerTranslation('ja', nest(jaFlat));
engine.registerTranslation('ko', nest(koFlat));
engine.registerTranslation('fr', nest(frFlat));
engine.registerTranslation('de', nest(deFlat));
engine.registerTranslation('es', nest(esFlat));
engine.registerTranslation('pt-BR', nest(ptBRFlat));
engine.registerTranslation('ar', nest(arFlat));

// ── 公共 API（向后兼容旧 i18n.ts 调用方）──

export const SUPPORTED_LOCALES = [
  'zh-CN',
  'zh-TW',
  'en',
  'ja',
  'ko',
  'fr',
  'de',
  'es',
  'pt-BR',
  'ar',
] as const;

export { LANG_META };

/** 获取可用语言列表（含元信息），供语言切换器使用 */
export function getAvailableLocales() {
  return SUPPORTED_LOCALES.map((id) => ({ id, ...LANG_META[id as Locale] }));
}

/** 获取当前语言 */
export function getLocale(): Locale {
  return engine.getLocale();
}

/** 切换语言 */
export async function setLocale(locale: Locale): Promise<void> {
  await engine.setLocale(locale);
}

/** 翻译函数（向后兼容，等价于 engine.t） */
export function t(key: string, params?: Record<string, string | number>): string {
  const strParams: Record<string, string> | undefined = params
    ? Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    : undefined;
  return engine.t(key, strParams);
}

/** 订阅语言变化 */
export function onLocaleChange(fn: (locale: Locale) => void): () => void {
  return engine.subscribe(fn);
}

/** 检测是否为 RTL 语言 */
export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}
