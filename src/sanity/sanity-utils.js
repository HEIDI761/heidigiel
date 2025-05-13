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

export async function getAudiovisualFilters() {
  return client.fetch(
    `{
    'roles': *[_type == 'role']{
        _id,
        role,
    },
    'audiovisualProjectTypes': *[_type == 'audiovisualProjectType']{
        _id,
        type,
    },
    }`,
  );
}

export async function getAudiovisualProjects() {
  return client.fetch(
    `*[_type == 'audiovisualProject']{
        _id,
        title,
        slug,
        date,
        client,
        isFavorite,
        audiovisualProjectType[]->{_id, type},
        roles[]->{_id, role},
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
        _id,
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

export async function getMainMusicalItems() {
  return client.fetch(
    `*[_type=='musicalItem' && musicalProject._ref=='1f3fb03a-2431-4977-9753-c80314f61e07']{
        _id,
        title,
        date,
        slug,
        coverImage{'url': asset->url},
        type->{type},
        description,
        images[]{
            _key, 
            'url': asset->url,
            "dimensions": asset->metadata.dimensions,
        },
        vimeoVideos,
        externalVideo,
        customFields[]{
            _key,
            name,
            value,
        },
        links,
    }`,
  );
}
