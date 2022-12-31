const formatDate = (count: number): string => {
  if (count === 1) return `${count} дзень`;
  if (count > 1 && count < 5) return `${count} дні`;
  return `${count} дзён`;
};

export default formatDate;
