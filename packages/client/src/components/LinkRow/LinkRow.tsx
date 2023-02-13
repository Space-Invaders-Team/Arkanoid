import { useNavigate } from 'react-router-dom';
import { TLinkRowProps } from './typings';

export function LinkRow({ rowData, key, path }: TLinkRowProps) {
  const navigate = useNavigate();
  const handleRowClick = ():void => {
    navigate(`./${path}`);
  };

  return (
    <tr key={key} onClick={() => handleRowClick()}>
      <td>{rowData.cell1}</td>
      <td>{rowData.cell2}</td>
      <td>{rowData.cell3}</td>
    </tr>
  );
}
