export type Brand<T, B extends string> = T & { __brand: B };

export type TypedOmit<T, K extends keyof T> = Omit<T, K>;

export type IsNever<T> = [T] extends [never] ? true : false;

export type Split<
  T extends string,
  S extends string,
> = T extends `${infer Head}${S}${infer Tail}`
  ? [Head, ...Split<Tail, S>]
  : [T];

type TrimL<L extends string> = L extends `${infer T}/` ? T : L;
type TrimR<R extends string> = R extends `/${infer T}` ? T : R;

export type PathJoin<L extends string, R extends string> = L extends ''
  ? R
  : R extends ''
  ? L
  : `${TrimL<L>}/${TrimR<R>}`;
