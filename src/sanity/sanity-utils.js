import { client } from "./sanity-client";

export async function getAbout() {
  return client.fetch(
    `*[_type == 'about'][0]{
        homeImage{'url': asset->url},
        highlight->{title, _type, 'slug': slug.current},
        bio, 
        contact, 
    }`,
  );
}

export async function getAudiovisualFilters() {
  return client.fetch(
    `{
    'roles': *[_type == 'audiovisualProjectRole']{
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

export async function getAudiovisualProjectsList() {
  return client.fetch(
    `*[_type == 'audiovisualProject'] | order(date desc){
        _id,
        title,
        slug,
        date,
        client,
        isFavorite,
        audiovisualProjectType[]->{_id, type},
        roles[]->{_id, role},
        coverImage{'url': asset->url, 
            "dimensions": asset->metadata.dimensions,
        },
        previewUrl,
        isSingleImage,
        "images": select(
          isSingleImage => images[]{
            _key,
            "url": asset->url,
            "dimensions": asset->metadata.dimensions
          },
          true => null
        )
    }`,
  );
}

export async function getAudiovisualProject(slug) {
  return client.fetch(
    `*[_type == 'audiovisualProject' && slug.current == $slug][0]{
        _id,
        title,
        date,
        client,
        coverImage{'url': asset->url, 
            "dimensions": asset->metadata.dimensions,
        },
        audiovisualProjectType[]->{_id, type},
        roles[]->{_id, role},
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

export async function getMainMusicalProject() {
  return client.fetch(
    `*[_type == 'musicalProject' && _id=='1f3fb03a-2431-4977-9753-c80314f61e07'][0]{
        _id,
        title,
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

export async function getMusicalProjectsList() {
  return client.fetch(
    `*[_type == 'musicalProject' && _id!='1f3fb03a-2431-4977-9753-c80314f61e07'] | order(date desc){
        _id,
        title,
        slug,
    }`,
  );
}

export async function getMusicalProject(slug) {
  return client.fetch(
    `*[_type == 'musicalProject' && slug.current == $slug][0]{
        _id,
        title,
        slug,
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
    { slug },
  );
}

export async function getMainMusicalItems() {
  return client.fetch(
    `*[_type=='musicalItem' && musicalProject._ref=='1f3fb03a-2431-4977-9753-c80314f61e07'] | order(date desc){
        _id,
        title,
        date,
        slug,
        coverImage{
          'url': asset->url,
          "dimensions": asset->metadata.dimensions,
        },
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
        isSingleImage,
    }`,
  );
}

export async function getMusicalItems(slug) {
  return client.fetch(
    `*[_type=='musicalItem' && musicalProject->slug.current==$slug] | order(date desc){
        _id,
        title,
        date,
        slug,
        coverImage{
          'url': asset->url,
          "dimensions": asset->metadata.dimensions,
        },
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
    { slug },
  );
}

export async function getHighlightedMusicalItem(slug) {
  return client.fetch(
    `*[_type=='musicalItem' && slug.current == $slug][0]{
        _id,
        title,
        date,
        slug,
        coverImage{
          'url': asset->url,
          "dimensions": asset->metadata.dimensions,
        },
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
    { slug },
  );
}
