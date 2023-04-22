// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAudioContext = (path: string) => {
  const audioContext = new AudioContext();
  const audio = new Audio(path);
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);

  return { audio, audioContext };
};
