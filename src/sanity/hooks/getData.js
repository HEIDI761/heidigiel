import { useQuery } from "@tanstack/react-query";
import * as sanityUtils from "../sanity-utils";

export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => sanityUtils.getAbout(),
  });
}

export function useAudiovisualContent() {
  return useQuery({
    queryKey: ["audiovisualContent"],
    queryFn: () => sanityUtils.getAudiovisualContent(),
  });
}

export function useAudiovisualProjectTypes() {
  return useQuery({
    queryKey: ["audiovisualProjectTypes"],
    queryFn: () => sanityUtils.getAudiovisualProjectTypes(),
  });
}

export function useMusicContent() {
  return useQuery({
    queryKey: ["musicContent"],
    queryFn: () => sanityUtils.getMusicContent(),
  });
}

export function useMusicalProjectsList() {
  return useQuery({
    queryKey: ["musicalProjectsList"],
    queryFn: () => sanityUtils.getMusicalProjectsList(),
  });
}

export function useMusicalItemTypes() {
  return useQuery({
    queryKey: ["musicalItemTypes"],
    queryFn: () => sanityUtils.getMusicalItemTypes(),
  });
}
