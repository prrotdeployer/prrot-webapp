import { gql } from "@apollo/client";

// Get all posts
export const GET_MAINNET_POSTS = gql`
  query prrotMainnetPosts @api(contextKey: "apiName") {
    prrotPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none"}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

export const GET_OPTIMISM_POSTS = gql`
  query prrotOptimismPosts @api(contextKey: "apiName") {
    prrotOptimismPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none"}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

export const GET_ARBITRUM_POSTS = gql`
  query prrotArbitrumPosts @api(contextKey: "apiName") {
    prrotArbitrumPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none"}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

export const GET_POLYGON_POSTS = gql`
  query prrotPolygonPosts @api(contextKey: "apiName") {
    prrotPolygonPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none"}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

// Get a given post's reply posts
export const GET_MAINNET_POST_REPLIES = gql`
  query prrotMainnetPosts($originalPostId: String) @api(contextKey: "apiName") {
    prrotPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: $originalPostId}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

export const GET_OPTIMISM_POST_REPLIES = gql`
  query prrotOptimismPosts($originalPostId: String) @api(contextKey: "apiName") {
    prrotOptimismPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: $originalPostId}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

export const GET_ARBITRUM_POST_REPLIES = gql`
  query prrotArbitrumPosts($originalPostId: String) @api(contextKey: "apiName") {
    prrotArbitrumPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: $originalPostId}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

export const GET_POLYGON_POST_REPLIES = gql`
  query prrotPolygonPosts($originalPostId: String) @api(contextKey: "apiName") {
    prrotPolygonPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: $originalPostId}) {
      id
      senderAddress
      blockNumber
      content
      originalPost
      tx
      timestamp
    }
  }
`;

// Get a given post's info with id
export const GET_POST_INFO_FROM_ID = {

  "1": gql`
    query prrotMainnetPosts($postId: ID) @api(contextKey: "apiName") {
      prrotPosts(orderBy:blockNumber, orderDirection:desc, where: {id: $postId}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,
  "10": gql`
    query prrotOptimismPosts($postId: ID) @api(contextKey: "apiName") {
      prrotOptimismPosts(orderBy:blockNumber, orderDirection:desc, where: {id: $postId}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,
  "42161": gql`
    query prrotArbitrumPosts($postId: ID) @api(contextKey: "apiName") {
      prrotArbitrumPosts(orderBy:blockNumber, orderDirection:desc, where: {id: $postId}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,
  "137": gql`
    query prrotPolygonPosts($postId: ID) @api(contextKey: "apiName") {
      prrotPolygonPosts(orderBy:blockNumber, orderDirection:desc, where: {id: $postId}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,

}

// Get a given post's info with tx
export const GET_POST_INFO_FROM_TX = {

  "1": gql`
    query prrotMainnetPosts($tx: String) @api(contextKey: "apiName") {
      prrotPosts(orderBy:blockNumber, orderDirection:desc, where: {tx: $tx}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,
  "10": gql`
    query prrotOptimismPosts($tx: String) @api(contextKey: "apiName") {
      prrotOptimismPosts(orderBy:blockNumber, orderDirection:desc, where: {tx: $tx}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,
  "42161": gql`
    query prrotArbitrumPosts($tx: String) @api(contextKey: "apiName") {
      prrotArbitrumPosts(orderBy:blockNumber, orderDirection:desc, where: {tx: $tx}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,
  "137": gql`
    query prrotPolygonPosts($tx: String) @api(contextKey: "apiName") {
      prrotPolygonPosts(orderBy:blockNumber, orderDirection:desc, where: {tx: $tx}) {
        id
        senderAddress
        blockNumber
        content
        originalPost
        tx
        timestamp
      }
    }
  `,

}
