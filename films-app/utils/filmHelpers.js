export function applySearchSortFilter(data, { search, sortKey, filter }) {
  let list = Array.isArray(data) ? [...data] : [];
  const q = (search || '').trim().toLowerCase();
  if (q) {
    list = list.filter(x => `${x.title}`.toLowerCase().includes(q));
  }
  if (filter) {
    if (filter.minScore) list = list.filter(x => Number(x.rt_score) >= Number(filter.minScore));
    if (filter.director && filter.director !== 'ALL') list = list.filter(x => x.director === filter.director);
  }
  switch (sortKey) {
    case 'year':
      list.sort((a, b) => Number(a.release_date) - Number(b.release_date));
      break;
    case 'rating':
      list.sort((a, b) => Number(b.rt_score) - Number(a.rt_score));
      break;
    default:
      list.sort((a, b) => a.title.localeCompare(b.title));
  }
  return list;
}