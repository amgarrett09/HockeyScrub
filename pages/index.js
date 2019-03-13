import React from 'react';
import Head from 'next/head';

import PlayerList from '../components/PlayerList';
import DivisionStandings from '../components/DivisionStandings';
import '../css/materialize-custom-min.css';

const Index = () => (
  <React.Fragment>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>NHL Player Info</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </Head>
    <main>
      <PlayerList />
      <DivisionStandings />
    </main>

  </React.Fragment>
);

export default Index;
