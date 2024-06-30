import Icon from '@mdi/react';
import { mdiFireplace } from '@mdi/js';
import '../styles/logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <Icon className="icon" path={mdiFireplace} size={'4rem'} />
      <h1 className="logo-line-1">Hearthside</h1>
      <h1 className="logo-line-2">Legends</h1>
    </div>
  );
};

export default Logo;
