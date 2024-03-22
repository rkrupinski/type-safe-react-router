import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  type NavigateOptions,
  type LinkProps as OrigLinkProps,
  type IndexRouteObject as OrigIndexRouteObject,
  type NonIndexRouteObject as OrigNonIndexRouteObject,
  Link as OrigLink,
  useNavigate as origUseNavigate,
} from 'react-router-dom';

import type { Brand, IsNever, PathJoin, Split, TypedOmit } from './utils';

export type AppPath = Brand<string, 'AppPath'>;

export type Path = {
  pathname: AppPath;
  search: string;
  hash: string;
};

export type To = AppPath | Partial<Path>;

export type LinkProps = TypedOmit<OrigLinkProps, 'to'> & {
  to: To;
};

export const Link: ForwardRefExoticComponent<
  LinkProps & RefAttributes<HTMLAnchorElement>
> = OrigLink as any;

export interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}

export const useNavigate: () => NavigateFunction = origUseNavigate as any;

export type IndexRouteObject = OrigIndexRouteObject & {
  slug: string;
};

export type NonIndexRouteObject = TypedOmit<
  OrigNonIndexRouteObject,
  'children'
> & {
  slug: string;
  children?: RouteObject[];
};

export type RouteObject = IndexRouteObject | NonIndexRouteObject;

export interface Meta {
  routes: RouteObject[];
}

type ParamFromChunk<T extends string> = T extends `:${infer P}` ? P : never;

type ParamsFromChunks<T extends string[], P = never> = T extends [
  infer THead extends string,
  ...infer TTail extends string[],
]
  ? ParamsFromChunks<TTail, P | ParamFromChunk<THead>>
  : P;

type ParamsFromPath<T extends string> = ParamsFromChunks<Split<T, '/'>>;

type PathFn<TPath extends string> =
  ParamsFromPath<TPath> extends infer P extends string | never
    ? IsNever<P> extends false
      ? (params: Record<P, string>) => AppPath
      : () => AppPath
    : never;

type PathFnFor<S extends string, P extends string> = {
  [slug in S]: PathFn<P>;
};

type PathFns<TRoute, TPath extends string = ''> = TRoute extends [
  infer THead,
  ...rest: infer TTail,
]
  ? PathFns<THead, TPath> & PathFns<TTail, TPath>
  : TRoute extends NonIndexRouteObject
  ? PathJoin<
      TPath,
      TRoute['path'] extends string ? TRoute['path'] : ''
    > extends infer P extends string
    ? PathFns<TRoute['children'], P> & PathFnFor<TRoute['slug'], P>
    : never
  : TRoute extends IndexRouteObject
  ? PathFnFor<TRoute['slug'], TPath>
  : unknown;

export const makePaths = <T extends RouteObject[]>(routes: T): PathFns<T> => {
  // This part is left for the reader to implement on their own.

  return new Proxy(
    {},
    {
      get() {
        return () => '';
      },
    },
  ) as any;
};
