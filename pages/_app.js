import App from 'next/app';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Component {...pageProps} />
        <style jsx global>{`
          @font-face {
            font-family: 'Muli';
            font-style: normal;
            font-weight: 400;
            src: url('/fonts/muli/Muli.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Muli';
            font-style: normal;
            font-weight: 600;
            src: url('/fonts/muli/Muli-SemiBold.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Muli';
            font-style: normal;
            font-weight: 800;
            src: url('/fonts/muli/Muli-Bold.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Muli';
            font-style: normal;
            font-weight: 200;
            src: url('/fonts/muli/Muli-Light.ttf') format('truetype');
          }
          body {
           margin: 0px;
          }
          h1 {
            margin: 0px;
          }
        `}</style>
      </div>
    )
  }
}

export default MyApp;
