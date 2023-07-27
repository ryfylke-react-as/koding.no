import { useAuth } from "../auth/useAuth";
import { toast } from "../lib/toast";

// Creates a fetch function that
// uses auth to add the access token,
// parses the response as json and
// throws an error if the response is not ok
export const createAppFetch =
  (auth: ReturnType<typeof useAuth>) =>
  async <T>(url: string, init: RequestInit = {}): Promise<T> => {
    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${auth.currentUser().token.access_token}`
    );
    return await fetch(url, { headers, ...init }).then((res) => {
      if (res.status === 401 && auth.isLoggedIn) {
        toast({
          title: "Sessjon utløpt",
          kind: "warning",
        });
        auth.logout();
      }
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
  };

export const useFetch = (): ReturnType<
  typeof createAppFetch
> => {
  const auth = useAuth();
  return createAppFetch(auth);
};
