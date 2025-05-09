export function getEmailAleatorio() {
  /*basicamente essa função retrona um email diferente sempre*/
  const parteAleatoria = Math.random().toString(36).substring(2, 10);
  const dominioAleatorio = Math.random().toString(36).substring(2, 8);
  return `${parteAleatoria}@${dominioAleatorio}.com`;
}
