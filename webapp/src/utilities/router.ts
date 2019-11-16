import { match, matchPath, RouteProps } from 'react-router-dom';

export function getParams<T>(
  pathname: string,
  props: string | RouteProps,
  parent?: match<T> | null | undefined): Partial<T> {
  const matchProfile = matchPath<T>(pathname, props, parent);
  return (matchProfile && matchProfile.params) || {};
}