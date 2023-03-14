import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({title, onAddTask, showAdd}) => {

    const location = useLocation();

    const [btnText, setBtnText] = useState('Add Task');

    const onBtnClick = () => {
        if(btnText === 'Close')
            setBtnText('Add Task');
        else
            setBtnText('Close');
            
        onAddTask();
    }

  return (
    <header className='header'>
        <img className='logo' src="./calfus-logo-trans.png" alt='Calfus'/>
        <h1>{title}</h1>
        {location.pathname==='/' && <button style={{backgroundColor: showAdd ? 'red' : 'green'}} className="btn" 
        onClick={onBtnClick}>{showAdd ? 'Close' : 'Search'}</button>}
        
    </header>
  )
}

Header.defaultProps = {
    title: 'CSV Records'
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header 