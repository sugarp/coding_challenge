export function minToMs(mins: number) {
  return mins * 60 * 1000;
}

export function msToMin(ms: number) {
  return ms / 1000 / 60;
}

export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const guid = (): string => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;

		return v.toString(16);
	});
};

export const roundDate = (date: Date) => {
  const mins = date.getTime() / 1000 / 60;
  const roundedMins = Math.round(mins / 15) * 15;

  return new Date(roundedMins * 60 * 1000);
}