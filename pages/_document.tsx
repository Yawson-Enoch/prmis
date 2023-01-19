import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <meta name='author' content='Yawson Enoch' />
          <meta
            name='description'
            content='Welcome to PRMIS. The top Patient Record Management Information System.'
          />
          <link rel='icon' href='/favicon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='notification'></div>
          <div id='backdrop'></div>
          <div id='confirm-dialog'></div>
          <div id='edit-patient-form'></div>
        </body>
      </Html>
    );
  }
}
