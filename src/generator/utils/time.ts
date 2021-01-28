export function minToMs(mins: number) {
  return mins * 60 * 1000;
}

export function msToMin(ms: number) {
  return ms / 1000 / 60;
}

export const roundDate = (date: Date) => {
  const mins = date.getTime() / 1000 / 60;
  const roundedMins = Math.round(mins / 15) * 15;

  return new Date(roundedMins * 60 * 1000);
}