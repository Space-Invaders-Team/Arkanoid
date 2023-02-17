import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.css';
import { IconBack } from './IconBack';

export function ButtonBack() {
  const navigate = useNavigate();
  const handleClickBack = ():void => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleClickBack} className={styles.backBtn}>
      <IconBack />
    </button>
  );
}
