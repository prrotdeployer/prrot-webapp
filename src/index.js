import "./index.css";
// import "./scss/custom.scss";
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { createHttpLink } from "apollo-link-http";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

import '@rainbow-me/rainbowkit/dist/index.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import App from "./App";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Prrot',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

TimeAgo.addDefaultLocale(en)

// const cache = new InMemoryCache({
//   typePolicies: {
//     prrotPosts: {
//       __ref: {
//         PrrotPost: { // Non-normalized Author object within Book
//           merge(existing, incoming, { mergeObjects }) {
//             return mergeObjects(existing, incoming);
//           },
//         },
//       },
//     },
//   },
// });

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        mainnet: 'https://api.studio.thegraph.com/query/33241/prrot/0.0.5',
        optimism: 'https://api.thegraph.com/subgraphs/name/prrotdeployer/optimistic-prrot',
        arbitrum: 'https://api.thegraph.com/subgraphs/name/prrotdeployer/arbitrum-one-prrot',
        polygon: 'https://api.thegraph.com/subgraphs/name/prrotdeployer/polygon-prrot'
      },
      httpSuffix: '',
      createHttpLink: () => createHttpLink(),
    }),
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={lightTheme({
          accentColor: '#34AC80',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })} 
        chains={chains}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
  document.getElementById("root"),
);
