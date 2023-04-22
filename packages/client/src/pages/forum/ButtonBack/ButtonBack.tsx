import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { IconBack } from '../../../components/Icons/IconBack';

export function ButtonBack() {
  const navigate = useNavigate();
  const handleClickBack = (): void => {
    navigate(-1);
  };

  return (
    <Button onClick={handleClickBack} shape="icon" mode="secondary">
      <IconBack />
    </Button>
  );
}
