export default function getPaginationRange(
  current: number,
  total: number,
  delta = 1
) {
  const range: (number | "...")[] = [];
  const left = current - delta;
  const right = current + delta + 1;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i < right)) {
      range.push(i);
    } 
    else if (i === left - 1 || i === right) {
      range.push("...");
    }
  }

  return range;
}