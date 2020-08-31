import React, {useState} from 'react';
import { NavigationBarContainer } from './NavigationBarStyle';

export const Menu = ({ menu, submenu, options, onMenuClicked }) => {
    const [haveChosen, setHaveChosen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
            onClick={() => setIsOpen( isOpen ? false : true )}>
                <div style={{cursor: 'pointer'}} className="menu-option">{ menu }</div>
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

const NavigationBar = ({ name, role, menu, submenu, isOpen, onMenuClicked }) => {

    return (
      <NavigationBarContainer>
        <div className="navigation-bar">
                <div className="profile-picture"></div>
                <h1 className="user-name">{ name }</h1>
                <p className="user-role">{ role }</p>
                <h1 className="menu-title">DATA</h1>
                <Menu menu={ menu } options = { submenu } onMenuClicked={onMenuClicked} isOpen={isOpen} />
            </div>
      </NavigationBarContainer>
    )
  }

  export default NavigationBar;
  
