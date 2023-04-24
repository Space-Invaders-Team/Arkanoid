import { useEffect, useState } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import styles from './Landing.module.css';
import image1 from '../../assets/img/game.png';
import image2 from '../../assets/img/listScreen.png';
import { LandingHeader } from '../../components/LandingHeader';
import { Loader } from '../../components/Loader';

export function Landing() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsImageLoaded(true);
    };
    image.src = '/src/assets/img/pattern.jpg'; // замените на путь к вашему фоновому изображению
  }, []);

  return (

    <div>

      {!isImageLoaded
        ? <Loader />
        : (
          <div className={styles.container}>
            <LandingHeader />

            <ParallaxBanner
              layers={[
                {
                  image: '/src/assets/img/pattern.jpg',
                  speed: -20,
                },
              ]}
              style={{
                aspectRatio: '10 / 1',
                top: '0',
                height: '100vh',
                position: 'fixed',
                filter: 'var(--filter-bg)',
                backgroundSize: '400px',
              }}
            />
            <section className={styles.section}>
              <article className={styles.article}>
                <h2 className={styles.title}>Описание игры:</h2>
                <p className={styles.descrText}>
                  Игра арканоид являет собой классику жанра среди игровой серии аркады. В вашем
                  распоряжении шарик и платформа, которая запускает или отбивает шарик. Цель игры
                  уничтожить все блоки и сохранить все доступные жизни. За прохождение уровней игрок
                  будет получать очки награды, которые фиксируются в таблице рекордов.
                </p>
              </article>

              <div className={styles.cardWrap}>
                <div className={styles.card}>
                  <img src={image1} alt="image1" />
                </div>

                <div className={styles.card}>
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </section>
          </div>
        )}

    </div>

  );
}
