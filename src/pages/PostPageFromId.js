import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { PostCard } from "../components/PostCard";
import { GET_POST_INFO_FROM_ID } from "../graphql/subgraph";
import { useParams } from "react-router-dom";
import { NewPost } from "../components/NewPost";
import { useNetwork } from 'wagmi'

function PostPageFromTx() {
  const params = useParams();
  const { chain } = useNetwork()
  var postId = params.postId
  const chainId = postId.split("_")[0]

  const [postInfo, setPostInfo] = useState([]);

  const chainName = {
    "1": "mainnet",
    "10": "optimism",
    "42161": "arbitrum",
    "137": "polygon"
  }

  const useQueryMultiple = () => {
    const results = useQuery(GET_POST_INFO_FROM_ID[chainId], { context: { apiName: chainName[chainId] }, variables: { postId: postId } });
    return results;
  }

  const { loading, error, data } = useQueryMultiple()

  useEffect(() => {
    if (error) {
      console.error("Error while querying mainnet subgraph:", error.message);
      return;
    }
    if (!loading && data) {
      if (chainId === "1" && data.prrotPosts) {
        setPostInfo(data.prrotPosts[0])
      }
      if (chainId === "10" && data.prrotOptimismPosts) {
        setPostInfo(data.prrotOptimismPosts[0])
      }
      if (chainId === "42161" && data.prrotArbitrumPosts) {
        setPostInfo(data.prrotArbitrumPosts[0])
      }
      if (chainId === "137" && data.prrotPolygonPosts) {
        setPostInfo(data.prrotPolygonPosts[0])
      }
    }
  }, [
    error,
    loading,
    data,
    postInfo,
    chainId
  ]);

  var newPostBlock = ""
  if (chain && chain.id) {
    newPostBlock = <div><NewPost originalPost={postInfo.id}/></div>
  }

  return (
    <div>
      <PostCard post={postInfo} key={postInfo.id}/>
      {newPostBlock}
    </div>
  );
}

export default PostPageFromTx;
