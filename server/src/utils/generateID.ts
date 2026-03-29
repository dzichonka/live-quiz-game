export function generateID(size: number = 6): number {
  return Math.floor(Math.random() * 10 ** size);
}
