export function getVimeoId(url) {
  const regex =
    /(?:vimeo\.com\/|vimeo\.com\/video\/|player\.vimeo\.com\/video\/)([0-9]+)(?:\/([a-zA-Z0-9]+))?/;
  const match = url.match(regex);

  if (!match) return { id: null, hash: null };

  return {
    id: match[1] || null,
    hash: match[2] || null,
  };
}
