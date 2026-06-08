import {
  QueryClient,
  type DefaultOptions,
  type UseMutationOptions,
  isServer,
} from "@tanstack/react-query";

/**
 * Default query options. `staleTime > 0` is important for SSR: it prevents the
 * client from immediately refetching data that was prefetched and dehydrated on
 * the server.
 */
export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60, // 1 minute
  },
} satisfies DefaultOptions;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * SSR-safe QueryClient accessor.
 *
 * - On the server: always create a fresh client so requests never share cache
 *   between users.
 * - In the browser: reuse a singleton so React state (suspense, etc.) isn't
 *   thrown away on re-render.
 *
 * Use this in Server Components to prefetch + dehydrate, and inside the client
 * provider to hydrate. See TanStack Query's Advanced SSR guide.
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();

  return browserQueryClient;
}

// Helper types for building typed query/mutation options factories in features.
export type QueryConfig<T extends (...args: never[]) => unknown> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type ApiFnReturnType<
  FnType extends (...args: never[]) => Promise<unknown>,
> = Awaited<ReturnType<FnType>>;

export type MutationConfig<
  MutationFnType extends (...args: never[]) => Promise<unknown>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
