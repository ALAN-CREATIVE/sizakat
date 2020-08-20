import css from 'styled-jsx/css';

export const NavigationBarStyle = css`
    .navigation-bar {
        background: #FFFFFF;
        border: 1px solid #DEDEDE;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        width: 250px;
        height: 100vh;

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

    .menu-title {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 10px;

        letter-spacing: 0.1em;

        color: #898686;

        margin: 15% 7.5%;

        font-family: Muli;
    }

    div.menu-option {
        font-family: Muli;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 23px;

        /* Black */

        color: #454545;

        margin: 0 0 10% 20%;
    }

    .submenu-option {
        font-family: Muli;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;

        /* Black */

        color: #454545;

        margin: 2.5% 0 2.5% 15%;
        padding: 20px;
    }

    .menu:hover {
        background: linear-gradient(to right, #00239D 0%, #00239D 5%, #F5F6F8 5%, #F5F6F8 100%);
    }

  `
