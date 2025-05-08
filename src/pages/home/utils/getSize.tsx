export function getSize(container: HTMLDivElement | null): { width: number; height: number } {
  const width = container?.clientWidth ?? window.innerWidth;
  const height = container?.clientHeight ?? window.innerHeight;
  return { width, height };
}
