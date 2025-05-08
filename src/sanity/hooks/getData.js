import { useQuery } from "@tanstack/react-query";
import * as sanityUtils from "../sanity-utils";

export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => sanityUtils.getAbout(),
  });
}
