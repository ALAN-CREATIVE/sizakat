import styled from 'styled-components';

export const NavigationBarContainer = styled.div`
    .navigation-bar {
        display: block;
        position: absolute;
        top: 30px;
        left: 20px;
        z-index: 1;
        -webkit-user-select: none;
        user-select: none;
        width: 300px;
        height: 150vh;

    }

    .profile-picture {
        width: 100px;
        height: 100px;
        background-color: #00239D;
        border-radius: 50%;

        margin: 50px auto;
    }

    .user-name {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        font-family: Muli;
        line-height: 25px;
        text-align: center;
        margin-top : 5%;

        color: #393F50;
    }

    .user-role {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        font-family: Muli;

        color: #898686;

        text-transform: uppercase;
    }

    div.menu-option {
        font-family: Muli;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 20px;

        /* Black */

        color: #454545;

        margin: 0 0 10% 20%;
    }

    .submenu-option {
        font-family: Muli;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 10px;

        /* Black */

        color: #454545;

        margin: 0 0 2.5% 15%;
        padding: 20px;
    }

    .menu:hover {
        background: linear-gradient(to right, #00239D 0%, #00239D 5%, #F5F6F8 5%, #F5F6F8 100%);
    }

    .triangle-menu {
        float : right;
        margin-top : 4%;
        margin-right : 0%;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-left: 12px solid #00239D;
        border-bottom: 6px solid transparent;
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    }

    .triangle-open {
        transform: rotate(90deg);
    }

    .navigation-bar input {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        left: 20px;
        
        cursor: pointer;
        
        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger */
        
        -webkit-touch-callout: none;
    }

    .hamburger {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        left: 20px;

        background: #454545;
        border-radius: 3px;
        
        z-index: 1;
        
        transform-origin: 4px 0px;
        
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;
    }

    #hamburger-1 {
        transform-origin: 0% 0%;
    }

    #hamburger-2 {
        transform-origin: 0% 100%;
    }

    .navigation-bar input:checked ~ .hamburger {
        opacity: 1;
        transform: rotate(40deg) translate(-2px, -5px);
        background: #454545;
    }

    .navigation-bar input:checked ~ #hamburger-2 {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
        background: #454545;
    }

    .navigation-bar input:checked ~ #hamburger-3 {
        opacity: 1;
        transform: rotate(-40deg) translate(2px, -5px);
        background: #454545;
    }

    .navigation-bar input:checked ~ #container {
        transform: none;
        
    }

   #container {
        position: absolute;
        margin: -120px 0 0 -30px;
        padding: 50px;
        
        background: #FFFFFF;
        border: 1px solid #DEDEDE;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
        width: 330px;
        height: 150vh;
        list-style-type: none;
        -webkit-font-smoothing: antialiased;
        /* to stop flickering of text in safari */
         
        transform-origin: 0% 0%;
        transform: translate(-100%, 0);
        
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        }
    
    
  `
