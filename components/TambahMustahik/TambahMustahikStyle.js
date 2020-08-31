import styled from 'styled-components';

export const TambahMustahikContainer = styled.div`
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
    `;
