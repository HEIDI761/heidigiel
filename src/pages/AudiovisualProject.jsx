// import { useAudiovisualProject } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import VimeoPlayer from "../components/VimeoPlayer";
import Tag from "../components/Tag";
import ImageContainer from "../components/ImageContainer";
import TextContainer from "../components/TextContainer";
import BackButton from "../components/BackButton";
import { useAudiovisualContent } from "../sanity/hooks/getData";

export default function AudiovisualProject() {
  const { slug } = useParams();
  const { data, isLoading, error } = useAudiovisualContent();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;

  const project = data.content.find(
    (p) => p.project?.slug?.current === slug,
  ).project;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-background/90 fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 px-4 py-24 backdrop-grayscale-100">
      <div className="w-full max-w-7xl">
        <BackButton />
      </div>

      <div className="bg-background border-background-dim flex max-w-7xl flex-col gap-4 overflow-y-auto border p-4 shadow-md">
        <h1 className="flex flex-wrap items-center gap-1 uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-text)"
          >
            <path d="M104-466v-28h188v28H104Zm232-138-68-68 20-20 68 68-20 20Zm130-64v-188h28v188h-28Zm158 64-20-20 68-68 20 20-68 68Zm44 138v-28h188v28H668Zm-188 54q-29 0-48.5-19.5T412-480q0-29 19.5-48.5T480-548q29 0 48.5 19.5T548-480q0 29-19.5 48.5T480-412Zm192 144-68-68 20-20 68 68-20 20Zm-384 0-20-20 68-68 20 20-68 68Zm178 164v-188h28v188h-28Z" />
          </svg>
          {project.title[language] || project.title.es}
          {project.client && <span className="italic">- {project.client}</span>}
        </h1>

        <div className="flex flex-wrap items-center gap-1 font-mono text-xs lowercase">
          {project.audiovisualProjectType &&
            project.audiovisualProjectType.map((type) => (
              <Tag
                key={type._id}
                tag={type.type}
                clickabe={false}
                roundness="none"
              />
            ))}
          {project.roles &&
            project.roles.map((role) => (
              <Tag key={role._id} tag={role.role} clickabe={false} />
            ))}
          <span>{project.date.slice(0, 4)}</span>
        </div>

        <hr className="border-background-dim my-4" />

        {project.video ? (
          <div className="w-full">
            <VimeoPlayer url={project.video} />
          </div>
        ) : (
          <div className="border-background h-auto cursor-zoom-in rounded-sm border">
            <ImageContainer image={project.coverImage} item={project} />
          </div>
        )}

        {project.description && (
          <div className="col-span-3 mx-auto flex max-w-prose flex-col gap-4 py-8">
            <PortableText
              value={project.description[language] || project.description.es}
            />
          </div>
        )}

        {project.images && (
          <div className="columns-3 gap-2">
            {project.images.map((image) => (
              <div
                key={image._key}
                className="border-background h-auto w-full cursor-zoom-in rounded-sm border pb-2"
              >
                <ImageContainer image={image} item={project} />
              </div>
            ))}
          </div>
        )}

        <hr className="border-background-dim my-4" />

        {project.links && (
          <ul className="bg-background col-span-2 col-start-5 w-full rounded-sm p-4">
            <p className="text-muted-text text-xs">LINKS EXTERNOS</p>
            {project.links.map((link) => (
              <li key={link._key} className="hover:underline">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title[language] || link.title.es}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  // if (isLoading) return <Loading />;
  // if (error) return <div>Error: {error.message}</div>;

  //   return (
  //     <div className="bg-background/80 fixed inset-0 flex h-screen w-full flex-col items-center z-50 justify-center">
  //       <BackButton />
  //       <div>
  //         {/* <h1 className="mx-auto max-w-5xl text-center font-serif text-6xl">
  //             {project.title[language] || project.title.es} -{" "}
  //             <span className="italic">{project.client}</span>
  //           </h1> */}
  //         {/* {project.roles && (
  //           <ul className="flex flex-wrap text-xs">
  //             {project.roles.map((role) => (
  //               <Tag key={role._id} tag={role.role} clickabe={false} />
  //             ))}
  //           </ul>
  //         )} */}
  //         {/* {project.audiovisualProjectType && (
  //             <ul className="flex flex-wrap justify-center pt-4 text-xs lowercase">
  //               {project.audiovisualProjectType.map((type) => (
  //                 <Tag
  //                   key={type._id}
  //                   tag={type.type}
  //                   clickabe={false}
  //                   roundness="sm"
  //                 />
  //               ))}
  //             </ul>
  //           )}
  //         </div>

  //         <div className="grid grid-cols-6 place-items-center gap-8 pt-16">
  //           {project.video ? (
  //             <div className="col-span-6 mx-auto w-full max-w-7xl pb-16">
  //               <VimeoPlayer url={project.video} />
  //             </div>
  //           ) : (
  //             <div className="border-background col-span-3 h-auto cursor-zoom-in rounded-sm border">
  //               <ImageContainer image={project.coverImage} item={project} />
  //             </div>
  //           )}

  //           {project.description && (
  //             <TextContainer className="col-span-3 max-w-prose">
  //               <PortableText
  //                 value={project.description[language] || project.description.es}
  //               />
  //             </TextContainer>
  //           )}

  //           {
  //             project.images &&
  //               // (<div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
  //               project.images.map((image) => (
  //                 <div
  //                   key={image._key}
  //                   className="border-background h-auto w-full cursor-zoom-in rounded-sm border"
  //                 >
  //                   <ImageContainer image={image} item={project} />
  //                 </div>
  //               ))
  //             // </div>)
  //           }
  //           {project.links && (
  //             <ul className="bg-background col-span-2 col-start-5 w-full rounded-sm p-4">
  //               <p className="text-muted-text text-xs">LINKS EXTERNOS</p>
  //               {project.links.map((link) => (
  //                 <li key={link._key} className="hover:underline">
  //                   <a href={link.url} target="_blank" rel="noopener noreferrer">
  //                     {link.title[language] || link.title.es}
  //                   </a>
  //                 </li>
  //               ))}
  //             </ul>
  //           )} */}
  //       </div>
  //     </div>
  //   );
}
