import parse from "html-react-parser";
import DOMPurify from "dompurify";
import useIsMobile from "../hooks/useIsMobile";

export default function EmbedRenderer({ value }) {
  const isMobile = useIsMobile();

  const config = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  };

  const modifiedValue = isMobile ? replaceIframeDimensions(value) : value;

  let result;

  if (value.includes('src="https://bandcamp.com/EmbeddedPlayer')) {
    result = parse(modifiedValue);
  } else {
    const cleanValue = DOMPurify.sanitize(modifiedValue, config);
    result = parse(cleanValue);
  }

  return <>{result}</>;
}

function replaceIframeDimensions(input) {
  const widthAttrRegex = /width="[^"]*"/;
  // const heightAttrRegex = /height="[^"]*"/;
  const styleWidthRegex = /width:\s*[^;]+/;
  // const styleHeightRegex = /height:\s*[^;]+/;

  let output = input.replace(widthAttrRegex, 'width="100%"');
  // output = output.replace(heightAttrRegex, 'height="100%"');

  output = output.replace(styleWidthRegex, "width: 100%");
  // output = output.replace(styleHeightRegex, "height: 100%");

  return output;
}
