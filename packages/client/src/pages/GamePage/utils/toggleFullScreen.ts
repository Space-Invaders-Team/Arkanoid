// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toggleFullScreen = (fullscreenchanged: any) => {
  const btn = document.getElementById('fullscreenBtn');
  const game = document.getElementById('gameWrap');

  if (btn && game) {
    btn.blur();

    if (!document.fullscreenElement) {
      game.requestFullscreen();
      document.addEventListener('fullscreenchange', fullscreenchanged);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
