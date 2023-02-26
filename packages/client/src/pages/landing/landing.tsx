import styles from './Landing.module.css';
import image1 from '../../assets/img/game.png';
import image2 from '../../assets/img/listScreen.png';
import { LandingHeader } from '../../components/LandingHeader';

export function Landing() {
  return (
    <div className={styles.container}>
      <LandingHeader />

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
  );
}
