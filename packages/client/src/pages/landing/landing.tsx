import styles from './landing.module.css';
import image1 from '../../assets/img/spaceMM.png';
import { Header } from '../../components/Header/header';

export function Landing() {
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.section}>
        <h2 className={styles.title}>Очень интересный заголовок</h2>
        <div className={styles.cardWrap}>
          <div className={styles.card}>
            <img src={image1} alt="image1" />
          </div>

          <div className={styles.card}>
            <img src={image1} alt="image2" />
          </div>

          <div className={styles.card}>
            <img src={image1} alt="image3" />
          </div>
        </div>
      </section>
    </div>
  );
}
