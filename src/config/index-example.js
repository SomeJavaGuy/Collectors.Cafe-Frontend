// const backendURL = 'http://localhost:5037'
const backendURL = '<BACK UP URL>'

export const config = {
  supportedNetworks: {
    1: 'Main Ethereum Network',
    // 3: 'Ropsten Testnet',
    // 42: 'Kovan Testnet',
    4: 'Rinkeby Test Network',
  },
  backendURL: backendURL,
  backendLogInURL: `${backendURL}/metamask-signin`,
  backendAPIURL: `${backendURL}/api`,
  // backendSRAHttpURLRoot: `${backendURL}/sra/`,
  backendLogInExtendURL: `${backendURL}/api/metamask-refresh`,
  backendLogInMessage: 'I agree with the terms and conditions. Please sign me in.',
  localStorageKey: {
    login: 'userJWT',
  },
  cacheTime: {
    network: 1 * 60 * 1000, // miliseconds
    account: 1 * 60 * 1000,
  },
  covalentAPI: {
    APIKey: '<Replace With Real Key>',
    URLRoot: 'https://api.covalenthq.com',
  },
  raribleAPI: {
    1: {
      URLRoot: 'https://api.rarible.com'
    },
    4: {
      URLRoot: 'https://api-staging.rarible.com'
    }
  },
  openSeaRinkebyAPI: {
    URLRoot: 'https://rinkeby-api.opensea.io/api/v1/',
  },
  defaultRedirect: {
    logout: 'logout',
    publicHome: 'public-home',
    appHome: 'app-home',
    WalletNotConnected: 'logout',
    chainChange: 'logout',
    accountChange: 'logout',
  },
  cacheTime: {
    network: 1 * 60 * 1000, // miliseconds
  },
  network: {
    1: {
      id: 1,
      name: 'Main Ethereum Network',
      rpc: 'https://mainnet.infura.io/v3/<Replace With Real Key>',
      // rpc: 'https://cloudflare-eth.com',
      txURL: 'https://etherscan.io/tx/',
      accountURL: 'https://etherscan.io/address/',
      tokenURL: 'https://etherscan.io/token/',
      etherscanApiURL: 'https://api.etherscan.io/',
    },
    3: {
      id: 3,
      name: 'Ropsten Testnet',
      rpc: 'https://ropsten.infura.io/v3/<Replace With Real Key>',
      txURL: 'https://ropsten.etherscan.io/tx/',
      accountURL: 'https://ropsten.etherscan.io/address/',
      tokenURL: 'https://ropsten.etherscan.io/token/',
      etherscanApiURL: 'https://api-ropsten.etherscan.io/',
    },
    4: {
      id: 4,
      name: 'Rinkeby Test Network',
      rpc: 'https://rinkeby.infura.io/v3/6f80e472f1764a03ba71ed250ebec918',
      txURL: 'https://rinkeby.etherscan.io/tx/',
      accountURL: 'https://rinkeby.etherscan.io/address/',
      tokenURL: 'https://rinkeby.etherscan.io/token/',
      etherscanApiURL: 'https://api-rinkeby.etherscan.io/',
    },
    42: {
      id: 42,
      name: 'Kovan Testnet',
      rpc: 'https://kovan.infura.io/v3/<Replace With Real Key>',
      txURL: 'https://kovan.etherscan.io/tx/',
      accountURL: 'https://kovan.etherscan.io/address/',
      tokenURL: 'https://kovan.etherscan.io/token/',
      etherscanApiURL: 'https://api-kovan.etherscan.io/',
    },
  },
}
