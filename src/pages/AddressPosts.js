import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { PostCard } from "../components/PostCard";
import { GET_ADDRESS_POSTS } from "../graphql/getAddressPosts";
import { useParams } from "react-router-dom";
import { CRow } from '@coreui/react';

function AddressPosts() {
  const params = useParams();
  var address = params.address

  const [mainnetPosts, setMainnetPosts] = useState([]);
  const [optimismPosts, setOptimismPosts] = useState([]);
  const [arbitrumPosts, setArbitrumPosts] = useState([]);
  const [polygonPosts, setPolygonPosts] = useState([]);

  const useQueryMultiple = () => {
    const mainnetRes = useQuery(GET_ADDRESS_POSTS["1"], { context: { apiName: "mainnet" }, variables: { address: address } });
    const optimismRes = useQuery(GET_ADDRESS_POSTS["10"], { context: { apiName: "optimism" }, variables: { address: address } });
    const arbitrumRes = useQuery(GET_ADDRESS_POSTS["42161"], { context: { apiName: "arbitrum" }, variables: { address: address } });
    const polygonRes = useQuery(GET_ADDRESS_POSTS["137"], { context: { apiName: "polygon" }, variables: { address: address } });
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

  return (
    <div className="d-grid gap-3">
      {posts.map((post) => <CRow key={post.id} xs={{ gutterX: 5 }}><PostCard post={post} key={post.id}/></CRow> )}
    </div>
  );
}

export default AddressPosts;
