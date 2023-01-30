export function getToday() {
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  let mm = currentDate.getMonth() + 1;
  let dd = currentDate.getDate();
  mm = mm.toString().padStart(2, "0");
  dd = dd.toString().padStart(2, "0");
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}
