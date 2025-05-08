import { client } from "./sanity-client";

export async function getAbout() {
  return client.fetch(
    `*[_type == 'about'][0]{
        homeImage{'url': asset->url},
        highlight->{title},
        bio, 
        contact, 
    }`,
  );
}

export async function getRoles() {
  return client.fetch(
    `*[_type == 'role']{
        title,
        description,
    }`,
  );
}

export async function getAudiovisualProjectTypes() {
  return client.fetch(
    `*[_type == 'audiovisualProjectType']{
        title,
        description,
    }`,
  );
}

export async function getProjects() {
  return client.fetch(
    `*[_type == 'project']{
        title,
        date,
        client,
        isFavorite,
        audiovisualProjectType,
        roles,
        coverImage{'url': asset->url},
        previewUrl,
    }`,
  );
}

export async function getAudiovisualProject(slug) {
  return client.fetch(
    `*[_type == 'project' && slug.current == $slug][0]{
        images[]{
            _key, 
            'url': asset->url,
            "dimensions": asset->metadata.dimensions,
        },
        video,
        description,
        links,
      }`,
    { slug },
  );
}

export async function getMusicalItemTypes() {
  return client.fetch(
    `*[_type == 'musicalItemType']{
        title,
        description,
    }`,
  );
}

export async function getMusicalProjects() {
  return client.fetch(
    `*[_type == 'musicalProject']{
        title,
        date,
        endDate,
        description,
        images[]{
            _key, 
            'url': asset->url,
            "dimensions": asset->metadata.dimensions,
        },
        links,
    }`,
  );
}

export async function getMusicalItems() {
  return client.fetch(
    `*[_type == 'musicalItem']{
        title,
        date,
        musicalProject,
        type,
        description,
        coverImage{'url': asset->url},
        vimeoVideos,
        externalVideos,
        images[]{
            _key, 
            'url': asset->url,
            "dimensions": asset->metadata.dimensions,
        },
        links,
        customFields,
    }`,
  );
}
