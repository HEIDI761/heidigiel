import { useQuery } from "@tanstack/react-query";
import * as sanityUtils from "../sanity-utils";

export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => sanityUtils.getAbout(),
  });
}

export function useAudiovisualFilters() {
  return useQuery({
    queryKey: ["audiovisualFilters"],
    queryFn: () => sanityUtils.getAudiovisualFilters(),
  });
}

export function useAudiovisualProjects() {
  return useQuery({
    queryKey: ["audiovisualProjects"],
    queryFn: () => sanityUtils.getAudiovisualProjects(),
  });
}

export function useMusicalProjects() {
  return useQuery({
    queryKey: ["musicalProjects"],
    queryFn: () => sanityUtils.getMusicalProjects(),
  });
}

export function useMainMusicalItems() {
  return useQuery({
    queryKey: ["mainMusicalItems"],
    queryFn: () => sanityUtils.getMainMusicalItems(),
  });
}
