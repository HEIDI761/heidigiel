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

  const project = data.content.find((p) => p.project?.slug?.current === slug);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center">
      <BackButton />
      <h1>{project.project.title[language]}</h1>
    </div>
  );
  // if (isLoading) return <Loading />;
  // if (error) return <div>Error: {error.message}</div>;

  //   return (
  //     <div className="bg-background/80 fixed inset-0 flex h-screen w-full flex-col items-center z-50 justify-center">
  //       <BackButton />
  //       <div>
  //         {/* <h1 className="mx-auto max-w-5xl text-center font-serif text-6xl">
  //             {data.title[language] || data.title.es} -{" "}
  //             <span className="italic">{data.client}</span>
  //           </h1> */}
  //         {/* {data.roles && (
  //           <ul className="flex flex-wrap text-xs">
  //             {data.roles.map((role) => (
  //               <Tag key={role._id} tag={role.role} clickabe={false} />
  //             ))}
  //           </ul>
  //         )} */}
  //         {/* {data.audiovisualProjectType && (
  //             <ul className="flex flex-wrap justify-center pt-4 text-xs lowercase">
  //               {data.audiovisualProjectType.map((type) => (
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
  //           {data.video ? (
  //             <div className="col-span-6 mx-auto w-full max-w-7xl pb-16">
  //               <VimeoPlayer url={data.video} />
  //             </div>
  //           ) : (
  //             <div className="border-background col-span-3 h-auto cursor-zoom-in rounded-sm border">
  //               <ImageContainer image={data.coverImage} item={data} />
  //             </div>
  //           )}

  //           {data.description && (
  //             <TextContainer className="col-span-3 max-w-prose">
  //               <PortableText
  //                 value={data.description[language] || data.description.es}
  //               />
  //             </TextContainer>
  //           )}

  //           {
  //             data.images &&
  //               // (<div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
  //               data.images.map((image) => (
  //                 <div
  //                   key={image._key}
  //                   className="border-background h-auto w-full cursor-zoom-in rounded-sm border"
  //                 >
  //                   <ImageContainer image={image} item={data} />
  //                 </div>
  //               ))
  //             // </div>)
  //           }
  //           {data.links && (
  //             <ul className="bg-background col-span-2 col-start-5 w-full rounded-sm p-4">
  //               <p className="text-muted-text text-xs">LINKS EXTERNOS</p>
  //               {data.links.map((link) => (
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
