import React from 'react';
import { NewPost } from "../components/NewPost";
import { PostList } from "../components/PostList";
import { useNetwork } from 'wagmi'

function Home() {
  const { chain } = useNetwork()
  var newPostBlock = ""
  if (chain && chain.id) {
    newPostBlock = <div><NewPost /></div>
  }
  return (
    <div>
      {newPostBlock}
      <div className="mt-5"><PostList /></div>
    </div>
  );
}

export default Home;
