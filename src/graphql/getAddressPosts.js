import { gql } from "@apollo/client";

// Get a given address's posts
export const GET_ADDRESS_POSTS = {

  "1": gql`
    query prrotMainnetPosts($address: String) @api(contextKey: "apiName") {
      prrotPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none", senderAddress: $address}) {
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
    query prrotOptimismPosts($address: String) @api(contextKey: "apiName") {
      prrotOptimismPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none", senderAddress: $address}) {
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
    query prrotArbitrumPosts($address: String) @api(contextKey: "apiName") {
      prrotArbitrumPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none", senderAddress: $address}) {
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
    query prrotPolygonPosts($address: String) @api(contextKey: "apiName") {
      prrotPolygonPosts(orderBy:blockNumber, orderDirection:desc, where: {originalPost: "none", senderAddress: $address}) {
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
