export const stripTags = (text) => {
  return text ? text.replace(/(<([^>]+)>)/gi, "") : text;
};
