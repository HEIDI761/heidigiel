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

export function useAudiovisualProjectsList() {
  return useQuery({
    queryKey: ["audiovisualProjectsList"],
    queryFn: () => sanityUtils.getAudiovisualProjectsList(),
  });
}

export function useAudiovisualProject(slug) {
  return useQuery({
    queryKey: ["audiovisualProject", slug],
    queryFn: () => sanityUtils.getAudiovisualProject(slug),
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
    queryFn: () => sanityUtils.getMusicalItems(slug),
  });
}

export function useHighlightedMusicalItem(slug) {
  return useQuery({
    queryKey: ["highlightedMusicalItem", slug],
    queryFn: () => sanityUtils.getHighlightedMusicalItem(slug),
  });
}
