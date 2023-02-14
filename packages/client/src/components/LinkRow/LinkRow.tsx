import { useNavigate } from 'react-router-dom';
import { TLinkRowProps } from './typings';

export function LinkRow({ rowData, id, path }: TLinkRowProps) {
  const navigate = useNavigate();
  const handleRowClick = ():void => {
    navigate(`./${path}`);
  };

  return (
    <tr key={id} onClick={() => handleRowClick()}>
      <td>{rowData.cell1}</td>
      <td>{rowData.cell2}</td>
      <td>{rowData.cell3}</td>
    </tr>
  );
}
