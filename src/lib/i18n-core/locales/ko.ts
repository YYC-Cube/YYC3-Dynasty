/**
 * file: ko.ts
 * description: ko 语言包 — 한국어（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.4.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: 한국어 언어 패키지（本地化内嵌）
 *
 * license: MIT
 */
export const ko = {
  common: {
    health: '상태',
    online: '온라인',
    offline: '오프라인',
    welcome: '환영합니다',
    save: '저장',
    cancel: '취소',
    loading: '로딩 중...',
    error: '오류',
    success: '성공',
    version: 'v2.0.0',
  },
  nav: {
    home: '홈',
    about: '소개',
    contact: '문의하기',
  },
  overview: {
    stats: {
      cronNext: '다음 실행 {time}',
    },
  },
  welcome: {
    message: '안녕하세요 {name}',
    title: 'YYC³ i18n Core에 오신 것을 환영합니다',
  },
} as const;
