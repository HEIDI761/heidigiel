import { client } from "./sanity-client";

export async function getAbout() {
  return client.fetch(
    `*[_type == 'about'][0]{
        homeImage{'url': asset->url},
        highlight{
          text,
          highlightRef->{
            title, 
            _type, 
            'slug': slug.current
          }
        },
        bio,
        contact,
    }`,
  );
}

export async function getAudiovisualContent() {
  return client.fetch(
    `*[_type == 'audiovisual'][0] {
      content[]{
        _key,
        _type,

        _type == "audiovisualProject" => {
          "project": @->{
            _id,
            title,
            description,
            slug,
            isImageGallery,
            date,
            isFavorite,
            client,
            coverImage{
              'url': asset->url,
              "dimensions": asset->metadata.dimensions,
            },
            audiovisualProjectType[]->{_id, type}, 
            roles[]->{_id, role},
            images[]{
              _key, 
              'url': asset->url,
              "dimensions": asset->metadata.dimensions,
            },
            previewUrl,
            video,
            description,
            links,
          }
        },

        _type == "image" => {
          asset->{
            _id,
            url,
            metadata { dimensions, lqip },
          }
        },
      }
    }`,
  );
}

export async function getAudiovisualProjectTypes() {
  return client.fetch(
    `*[_type == 'audiovisualProjectType']{
        _id,
        type,
      }`,
  );
}

export async function getMusicContent() {
  return client.fetch(
    `*[_type == 'music'][0] {
      content[]{
        _key,
        _type,

        _type == "item" => {
          "item": @->{
            _id,
            isImageGallery,
            title,
            slug,
            date,
            musicalProject->{_id, title},
            isFavorite,
            type->{_id, type}, 
            coverImage{
              'url': asset->url,
              "dimensions": asset->metadata.dimensions,
            },
            images[]{
              _key, 
              'url': asset->url,
              "dimensions": asset->metadata.dimensions,
            },
            vimeoVideos,
            description,
            links,
            customFields
          }
        },

        _type == "image" => {
          asset->{
            _id,
            url,
            metadata { dimensions, lqip },
          }
        },
      }
    }`,
  );
}

export async function getMusicalProjectsList() {
  return client.fetch(
    `*[_type == 'musicalProject'] | order(date desc){
        _id,
        title,
        slug,
        date,
        endDate,
        description,
        links
    }`,
  );
}

export async function getMusicalItemTypes() {
  return client.fetch(
    `*[_type == 'musicalItemType']{
        _id 
        type,
     }`,
  );
}
