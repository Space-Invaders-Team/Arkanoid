import classNames from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';
import { Button } from '../../Button';
import commonStyles from '../GameScreens.module.css';
import styles from './StartScreen.module.css';
import type { Props } from './typings';
import startAudio from '../../../assets/sounds/start.mp3';
import sound from '../../../assets/icons/sound.svg';
import mute from '../../../assets/icons/sound-mute.svg';
import { createAudioContext } from '../../../pages/GamePage/utils/audio';

let audioCtx: { audioContext: AudioContext; audio: HTMLAudioElement; };

export function StartScreen({ isRunStartAnimation, onClick }: Props) {
  const startScreenClassName = classNames(commonStyles.dummyScreen, styles.container);
  const descrWrapperClassName = classNames(
    styles.descrWrapper,
    { [styles.descrWrapperVisible]: isRunStartAnimation },
  );
  const startButtonClassName = classNames(
    commonStyles.button,
    styles.button,
    { [styles.buttonVisible]: isRunStartAnimation },
  );
  const [isMute, setIsMute] = useState(true);

  const toggleAudio = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    const btn = event.currentTarget as HTMLButtonElement;

    if (btn.getAttribute('aria-checked') === 'true') {
      btn.setAttribute('aria-checked', 'false');
      setIsMute(true);
      audioCtx.audioContext.close();
    } else {
      btn.setAttribute('aria-checked', 'true');
      setIsMute(false);
      audioCtx = createAudioContext(startAudio);
      audioCtx.audio.play();
    }
  };

  useEffect(() => {
    localStorage.setItem('isMute', JSON.stringify(isMute));
  }, [isMute]);

  useEffect(() => () => {
    audioCtx?.audioContext?.suspend();
  }, []);

  return (
    <div className={startScreenClassName}>
      <div className={styles.btnWrapAudio}>
        <button
          role="switch"
          onClick={(e) => { toggleAudio(e); }}
          data-playing="false"
          aria-checked="false"
          id="audioPower"
          className={styles.btnAudio}
        >
          <img src={mute} alt="Sound mute" className={styles.imgMute} />
          <img src={sound} alt="Sound" className={styles.imgSound} />
        </button>
      </div>

      <article className={descrWrapperClassName}>
        <h2 className={styles.descrTitle}>Как играть:</h2>
        <p className={styles.descrText}>
          Двигайте мышью вправо или влево либо нажимайте стрелки ⬅️ ➡️ на клавиатуре︎, чтобы
          управлять подвижной платформой и отбивать шарик. Для запуска шара нажмите левую
          клавишу
          мыши или пробел.
        </p>
      </article>
      <Button extraClassName={startButtonClassName} onClick={onClick}>
        Начать игру
      </Button>
    </div>
  );
}
