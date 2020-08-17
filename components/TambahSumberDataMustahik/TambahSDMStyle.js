import React from 'react';

export const TambahSDMStyle = () =>(
    <style jsx>{`
        .navigation-bar {
            background: #FFFFFF;
            border: 1px solid #DEDEDE;
            box-sizing: border-box;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }

        #profile-picture {
            width: 100px;
            height: 100px;
            background-color: #00239D;
            border-radius: 50%;

            margin: 50px auto;
        }

        #user-name {
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 25px;
            text-align: center;

            color: #393F50;
        }

        #user-role {
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            text-align: center;

            color: #898686;
        }

        #navbar-title {
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 10px;

            letter-spacing: 0.1em;

            color: #898686;

            margin-left: 5%;
        }

        #navbar-option {
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 23px;

            color: #393F50;

            margin: 2.5% 0 2.5% 15%;
            padding: 20px;
        }

        .navbar-clicked {
            background: #F5F6F8;
        }

        .form-section {
            background: #FFFFFF;
            border: 2px solid #DEDEDE;
            box-sizing: border-box;

            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
            border-radius: 8px;

            margin: 30px;
        }

        #page-title {
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 35px;

            color: #393F50;
        }

        #breadcrumb {
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 15px;

            color: #C2C2C2;
        }

        #form-title {
            font-size: 20px;
            font-weight: bold;
            font-style: normal;
            line-height: 25px;

            color: #00239D;

            margin: 1% 0 0 1.5%;
        }

        .form {
            margin: 3% 10% 3% 10%;
        }

        .button-lanjutkan {
            display: flex;
            justify-content: flex-end;
        }

        #logout {
            float: right;

            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 25px;

            margin: 3% 2% 2% 0;

            color: #EB4E2C;
        }

        html,
        body {
            padding: 0;
            margin: 0;
            overflow-x: hidden;

            font-family: Muli;
        }
    `}</style>
);
