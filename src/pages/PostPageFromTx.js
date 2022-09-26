import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { PostCard } from "../components/PostCard";
import { GET_POST_INFO_FROM_TX } from "../graphql/subgraph";
import { NewPost } from "../components/NewPost";
import { useParams } from "react-router-dom";
import { useNetwork } from 'wagmi'

function PostPageFromId() {
  const params = useParams();
  const { chain } = useNetwork()
  var postTx = params.tx

  const [mainnetPosts, setMainnetPosts] = useState([]);
  const [optimismPosts, setOptimismPosts] = useState([]);
  const [arbitrumPosts, setArbitrumPosts] = useState([]);
  const [polygonPosts, setPolygonPosts] = useState([]);

  const useQueryMultiple = () => {
    const mainnetRes = useQuery(GET_POST_INFO_FROM_TX["1"], { context: { apiName: "mainnet" }, variables: { tx: postTx } });
    const optimismRes = useQuery(GET_POST_INFO_FROM_TX["10"], { context: { apiName: "optimism" }, variables: { tx: postTx } });
    const arbitrumRes = useQuery(GET_POST_INFO_FROM_TX["42161"], { context: { apiName: "arbitrum" }, variables: { tx: postTx } });
    const polygonRes = useQuery(GET_POST_INFO_FROM_TX["137"], { context: { apiName: "polygon" }, variables: { tx: postTx } });
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
      setMainnetPosts(mainnetData.prrotPosts)
    }
    if (!optimismLoading && optimismData && optimismData.prrotOptimismPosts) {
      setOptimismPosts(optimismData.prrotOptimismPosts)
    }
    if (!arbitrumLoading && arbitrumData && arbitrumData.prrotArbitrumPosts) {
      setArbitrumPosts(arbitrumData.prrotArbitrumPosts)
    }
    if (!polygonLoading && polygonData && polygonData.prrotPolygonPosts) {
      setPolygonPosts(polygonData.prrotPolygonPosts)
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
    optimismPosts,
    mainnetPosts,
    arbitrumPosts,
    polygonPosts
  ]);

  const posts = [...mainnetPosts, ...optimismPosts, ...arbitrumPosts, ...polygonPosts]

  posts.sort(function(first, second) {
    return second.timestamp - first.timestamp;
  })

  if (posts.length === 0 ) {
    return (<div></div>)
  }

  var newPostBlock = ""
  if (chain && chain.id) {
    newPostBlock = <div><NewPost originalPost={posts[0].id}/></div>
  }

  return (
    <div>
      <PostCard post={posts[0]} key={posts[0].id}/>
      {newPostBlock}
    </div>
  );
}

export default PostPageFromId;
