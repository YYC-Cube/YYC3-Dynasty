/**
 * file: types.ts
 * description: ICU MessageFormat 类型定义（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[icu],[vendor]
 *
 * brief: ICU MessageFormat 类型定义（本地化内嵌）
 *
 * license: MIT
 */
export type ICUNodeType =
  'literal' | 'argument' | 'plural' | 'select' | 'selectOrdinal' | 'number' | 'date' | 'time';

export interface ICULiteral {
  type: 'literal';
  value: string;
}

export interface ICUArgument {
  type: 'argument';
  name: string;
}

export interface ICUPluralClause {
  selector: string;
  content: ICUNode[];
}

export interface ICUPlural {
  type: 'plural';
  name: string;
  offset: number;
  clauses: ICUPluralClause[];
}

export interface ICUSelectClause {
  selector: string;
  content: ICUNode[];
}

export interface ICUSelect {
  type: 'select';
  name: string;
  clauses: ICUSelectClause[];
}

export interface ICUSelectOrdinal {
  type: 'selectOrdinal';
  name: string;
  clauses: ICUSelectClause[];
}

export interface ICUNumber {
  type: 'number';
  name: string;
  format?: string;
}

export interface ICUDate {
  type: 'date';
  name: string;
  format?: 'short' | 'medium' | 'long' | 'full';
}

export interface ICUTime {
  type: 'time';
  name: string;
  format?: 'short' | 'medium' | 'long' | 'full';
}

export type ICUNode =
  | ICULiteral
  | ICUArgument
  | ICUPlural
  | ICUSelect
  | ICUSelectOrdinal
  | ICUNumber
  | ICUDate
  | ICUTime;

export interface ICUParseError {
  message: string;
  position: number;
}

export interface ICUParseResult {
  nodes: ICUNode[];
  errors: ICUParseError[];
}
