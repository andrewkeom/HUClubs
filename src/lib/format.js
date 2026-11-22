export function formatEventDate(text) {
  const date = new Date(text);

  const datePart = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const fullPart = datePart + " at " + timePart;
  return fullPart;
}

export function pastDate(text) {
  const date = new Date(text);
  const dateNow = Date.now();

  if (date.getTime() < dateNow) {
    return true;
  }
  return false;
}
