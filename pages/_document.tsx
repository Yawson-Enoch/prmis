import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="author" content="Yawson Enoch" />
          <meta
            name="keywords"
            content="patient, record management, patient record management information system"
          />
          <meta
            name="description"
            content="Welcome to Obeyeyie Medical Center. We have assembled some of the finest Doctors, Nurses, Dentists, etc who take care of all your medical and mental health needs."
          />
          <link rel="icon" href="/favicon.png" />
          <title>Obeyeyie Medical Center</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}