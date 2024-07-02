import Icon from '@mdi/react';
import { mdiFireplace } from '@mdi/js';
import '../styles/logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <Icon className="icon" path={mdiFireplace} size={'4rem'} />
      <h1 className="logo-line-1">Legends</h1>
      <h1 className="logo-line-2">
        <span className="minor-words">of the</span> Hearth
      </h1>
    </div>
  );
};

export default Logo;
