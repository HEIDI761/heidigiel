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

export function useMainMusicalProject() {
  return useQuery({
    queryKey: ["mainMusicalProject"],
    queryFn: () => sanityUtils.getMainMusicalProject(),
  });
}

export function useMusicalProjectsList() {
  return useQuery({
    queryKey: ["musicalProjectsList"],
    queryFn: () => sanityUtils.getMusicalProjectsList(),
  });
}

export function useMusicalProject(slug) {
  return useQuery({
    queryKey: ["musicalProject", slug],
    queryFn: () => sanityUtils.getMusicalProject(slug),
  });
}

export function useMainMusicalItems() {
  return useQuery({
    queryKey: ["mainMusicalItems"],
    queryFn: () => sanityUtils.getMainMusicalItems(),
  });
}

export function useMusicalItems(slug) {
  return useQuery({
    queryKey: ["musicalItems", slug],
    queryFn: () => sanityUtils.getMusicalItem(slug),
  });
}
