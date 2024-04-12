export default function getBlockOfPageNumbers(
  pagesArr,
  setPagesArrBlock,
  totalPages
) {
  const arrayParts = totalPages / (totalPages / 6);
  const newArr = [];
  for (let i = 0; i < pagesArr.length; i += arrayParts) {
    newArr.push(pagesArr.slice(i, i + arrayParts));
  }

  setPagesArrBlock(newArr);
  return newArr;
}
