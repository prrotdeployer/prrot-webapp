import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MAINNET_POSTS, GET_OPTIMISM_POSTS, GET_ARBITRUM_POSTS, GET_POLYGON_POSTS } from "../graphql/subgraph";
import { PostCard } from "./PostCard";
import { CRow } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'

export function PostList() {
  const [mainnetPosts, setMainnetPosts] = useState([]);
  const [optimismPosts, setOptimismPosts] = useState([]);
  const [arbitrumPosts, setArbitrumPosts] = useState([]);
  const [polygonPosts, setPolygonPosts] = useState([]);

  const useQueryMultiple = () => {
    const mainnetRes = useQuery(GET_MAINNET_POSTS, { context: { apiName: "mainnet" }, pollInterval: 1000 });
    const optimismRes = useQuery(GET_OPTIMISM_POSTS, { context: { apiName: "optimism" }, pollInterval: 1000 });
    const arbitrumRes = useQuery(GET_ARBITRUM_POSTS, { context: { apiName: "arbitrum" }, pollInterval: 1000 });
    const polygonRes = useQuery(GET_POLYGON_POSTS, { context: { apiName: "polygon" }, pollInterval: 1000 });
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

  return (
    <div className="d-grid gap-3">
      {posts.map((post) => <CRow key={post.id} xs={{ gutterX: 5 }}><PostCard post={post} key={post.id}/></CRow> )}
    </div>
  );
}
