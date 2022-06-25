export const removeDuplicates = (array) => {
  const ids = array.map((o) => o.id);
  return array.filter(({ id }, index) => !ids.includes(id, index + 1));
};
