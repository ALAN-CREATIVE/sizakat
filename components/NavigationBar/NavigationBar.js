import React, {useState} from 'react';
import { NavigationBarContainer } from './NavigationBarStyle';

export const Menu = ({ menu, submenu, options, onMenuClicked }) => {
    const [haveChosen, setHaveChosen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
            onClick={() => setIsOpen( isOpen ? false : true )}>
                <div style={{cursor: 'pointer', marginTop: '30px' , marginLeft: '30px'}} className="menu-option">{ menu } <span className={`triangle-menu ${isOpen ? 'triangle-open' : ' '}`}></span></div>
            </div>
            {isOpen && <div>
                {options.map(submenu => (
                    <div key={submenu} className={"menu"}>
                        <div style={{cursor: 'pointer'}} className="submenu-option" key={submenu} onClick={() => {
                            setHaveChosen(true);
                            setIsOpen(true);
                            onMenuClicked(submenu);
                        }}>{ submenu }</div>
                    </div>
                ))}
            </div>}
        </div>
    );
}

const NavigationBar = ({ name, role, menuPenyaluranZakat, submenuPenyaluranZakat, menuTransaksiZakat, submenuTransaksiZakat, isOpen, onMenuClicked }) => {

    return (
      <NavigationBarContainer>
        <div className="navigation-bar">
        <input type="checkbox" />
            <span className="hamburger" id="hamburger-1"></span>
            <span className="hamburger" id="hamburger-2"></span>
            <span className="hamburger" id="hamburger-3"></span>
            <ul id="container">
                <div className="profile-picture"></div>
                <h1 className="user-name">{ name }</h1>
                <p className="user-role">{ role }</p>
                <Menu menu={ menuPenyaluranZakat } options = { submenuPenyaluranZakat } onMenuClicked={onMenuClicked} isOpen={isOpen} />
                <Menu menu={ menuTransaksiZakat } options = { submenuTransaksiZakat } onMenuClicked={onMenuClicked} isOpen={isOpen} />
            </ul>
        </div>
      </NavigationBarContainer>
    )
  }

  export default NavigationBar;
  
