import { useEnsName, useEnsAvatar } from 'wagmi';
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MAINNET_POST_REPLIES, GET_OPTIMISM_POST_REPLIES, GET_ARBITRUM_POST_REPLIES, GET_POLYGON_POST_REPLIES } from "../graphql/subgraph";
import { CCard, CCardBody, CTooltip, CLink, CCardTitle, CCardText, CAvatar, CContainer, CRow, CCol, CImage } from '@coreui/react';
import ReactTimeAgo from 'react-time-ago'

export function PostCard(data) {
  const post = data.post
  const post_id = post.id

  const chainExplorerBaseUrl = {
    "1": "https://etherscan.io/tx/",
    "10": "https://optimistic.etherscan.io/tx/",
    "42161": "https://arbiscan.io/tx/",
    "137": "https://polygonscan.com/tx/"
  }

  const chainLogo = {
    "1": "/ethereum-logo.png",
    "10": "/optimism-logo.png",
    "42161": "/arbitrum-logo.svg",
    "137": "/polygon-logo.png"
  }

  const [mainnetReplyPosts, setMainnetReplyPosts] = useState([]);
  const [optimismReplyPosts, setOptimismReplyPosts] = useState([]);
  const [arbitrumReplyPosts, setArbitrumReplyPosts] = useState([]);
  const [polygonReplyPosts, setPolygonReplyPosts] = useState([]);

  const useQueryMultiple = () => {
    const mainnetRes = useQuery(GET_MAINNET_POST_REPLIES, { context: { apiName: "mainnet" }, variables: { originalPostId: post_id }, pollInterval: 1000 });
    const optimismRes = useQuery(GET_OPTIMISM_POST_REPLIES, { context: { apiName: "optimism" }, variables: { originalPostId: post_id }, pollInterval: 1000 });
    const arbitrumRes = useQuery(GET_ARBITRUM_POST_REPLIES, { context: { apiName: "arbitrum" }, variables: { originalPostId: post_id }, pollInterval: 1000 });
    const polygonRes = useQuery(GET_POLYGON_POST_REPLIES, { context: { apiName: "polygon" }, variables: { originalPostId: post_id }, pollInterval: 1000 });
    return [mainnetRes, optimismRes, arbitrumRes, polygonRes];
  }

  const [
    { loading: mainnetLoading, error: subgraphQueryMainnetError, data: mainnetData },
    { loading: optimismLoading, error: subgraphQueryOptimismError, data: optimismData },
    { loading: arbitrumLoading, error: subgraphQueryArbitrumError, data: arbitrumData },
    { loading: polygonLoading, error: subgraphQueryPolygonError, data: polygonData }
  ] = useQueryMultiple()

  useEffect(() => {
    if (subgraphQueryMainnetError) {
      console.error("Error while querying mainnet subgraph:", subgraphQueryMainnetError.message);
      return;
    }
    if (subgraphQueryOptimismError) {
      console.error("Error while querying optimism subgraph:", subgraphQueryOptimismError.message);
      return;
    }
    if (subgraphQueryArbitrumError) {
      console.error("Error while querying arbitrum subgraph:", subgraphQueryArbitrumError.message);
      return;
    }
    if (subgraphQueryPolygonError) {
      console.error("Error while querying arbitrum subgraph:", subgraphQueryPolygonError.message);
      return;
    }
    if (!mainnetLoading && mainnetData && mainnetData.prrotPosts) {
      setMainnetReplyPosts(mainnetData.prrotPosts)
    }
    if (!optimismLoading && optimismData && optimismData.prrotOptimismPosts) {
      setOptimismReplyPosts(optimismData.prrotOptimismPosts)
    }
    if (!arbitrumLoading && arbitrumData && arbitrumData.prrotArbitrumPosts) {
      setArbitrumReplyPosts(arbitrumData.prrotArbitrumPosts)
    }
    if (!polygonLoading && polygonData && polygonData.prrotPolygonPosts) {
      setPolygonReplyPosts(polygonData.prrotPolygonPosts)
    }
  }, [
    subgraphQueryMainnetError,
    subgraphQueryOptimismError,
    subgraphQueryArbitrumError,
    subgraphQueryPolygonError,
    mainnetLoading,
    mainnetData,
    optimismLoading,
    optimismData,
    arbitrumLoading,
    polygonLoading,
    arbitrumData,
    polygonData,
    optimismReplyPosts,
    mainnetReplyPosts,
    arbitrumReplyPosts,
    polygonReplyPosts
  ]);

  const replyPosts = [...mainnetReplyPosts, ...optimismReplyPosts, ...arbitrumReplyPosts, ...polygonReplyPosts]

  replyPosts.sort(function(first, second) {
    return second.timestamp - first.timestamp;
  })

  const { data: ensData, isError, isLoading } = useEnsName({
    address: post.senderAddress,
    chainId: 1,
  })

  const { data: avatarData} = useEnsAvatar({
    addressOrName: ensData,
    chainId: 1,
  })

  if (post.length === 0) {
    return (<div></div>)
  }

  const chainId = post.id.split("_")[0]

  var date = new Date(post.timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  const postDate = date.toDateString() + " - " + formattedTime
  const postTxLink = chainExplorerBaseUrl[chainId] + post.tx

  var title = post.senderAddress
  if (isLoading) {
    title = "Fetching name…"
  }
  if (!isError && !isLoading) {
    if (ensData == null) {
      title = post.senderAddress.slice(0,8);
    } else {
      title = ensData
    }
  }

  return (
    <div key={post.id}>
      <CCard className="p-3 postcard border border-0" style={{ width: '40rem' }}>
        <CLink className="text-black" href={"/#/id/" + post.id}>
          <CCardBody>
            <CCardTitle>
              <CLink className="profile text-black" href={"/#/address/" + post.senderAddress}>
                <CAvatar size="lg" src={avatarData} />  {title}
              </CLink>
            </CCardTitle>
            <CCardText>
              {post.content}
            </CCardText>
          </CCardBody>
        </CLink>
        <CContainer>
          <CRow className="align-items-end">
            <CCol md={{ offset: 9 }}>
              <CTooltip content={postDate}>
                <CLink className="text-black px-2" href={postTxLink} rel="noopener noreferrer" target="_blank"> <ReactTimeAgo date={date} timeStyle="round-minute"/> </CLink>
              </CTooltip>
              <CImage src={chainLogo[chainId]} width={25} height={25} />
            </CCol>
          </CRow>
        </CContainer>
      </CCard>

      {replyPosts.map((post) => 
        <div className="m-0" key={post.id}>
          <CCard className="p-3 postcard border border-0" style={{ width: '40rem' }}>
            <CLink className="text-black" href={"/#/id/" + post.id}>
              <CCardBody>
                <CCardTitle>
                  <CLink className="profile text-black" href={"/#/address/" + post.senderAddress}>
                    <CAvatar size="lg" src={avatarData} />  {title}
                  </CLink>
                </CCardTitle>
                <CCardText>
                  {post.content}
                </CCardText>
              </CCardBody>
            </CLink>
            <CContainer>
              <CRow className="align-items-end">
                <CCol md={{ offset: 9 }}>
                  <CTooltip content={postDate}>
                    <CLink className="text-black px-2" href={chainExplorerBaseUrl[post.id.split("_")[0]] + post.tx} rel="noopener noreferrer" target="_blank"> <ReactTimeAgo date={new Date(post.timestamp * 1000)} timeStyle="round-minute"/> </CLink>
                  </CTooltip>
                  <CImage src={chainLogo[post.id.split("_")[0]]} width={25} height={25} />
                </CCol>
              </CRow>
            </CContainer>
          </CCard>
        </div>
      )}

      <hr className="m-0"/>
    </div>
  )
}
