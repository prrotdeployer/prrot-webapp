import * as React from 'react'
import { useState, useRef } from "react";
import { CFormTextarea, CForm, CButton, CAlert, CRow, CCol, CToast, CToastHeader, CToastBody, CToaster } from '@coreui/react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import addresses from "../contracts/addresses";
import abis from "../contracts/abis";
import { useNetwork } from 'wagmi'

export function NewPost(data) {
  const [newPostContent, setNewPostContent] = useState();
  const { chain, chains } = useNetwork()

  var originalPost = ""
  if (data && data.originalPost) {
    originalPost = data.originalPost
  } else {
    originalPost = "none"
  }

  var chainId = ""

  if (chain && chain.id) {
    chainId = chain.id
  }

  const { config: postConfig } = usePrepareContractWrite({
    addressOrName: addresses.prrot[chainId.toString()],
    contractInterface: abis.prrot,
    functionName: 'newPost',
    args: [originalPost, 1, newPostContent],
  })
  const { config: postEventConfig } = usePrepareContractWrite({
    addressOrName: addresses.prrot[chainId.toString()],
    contractInterface: abis.prrot,
    functionName: 'newPostEvent',
    args: [originalPost, 1, newPostContent],
  })

  const { data: postData, error: postError, isError: postIsError, write: postWrite } = useContractWrite(postConfig)
  const { data: postEventData, error: postEventError, isError: postEventIsError, write: postEventWrite } = useContractWrite(postEventConfig)

  const { postIsLoading, postIsSuccess } = useWaitForTransaction({
    hash: postData?.hash,
  })
  const { postEventIsLoading, postEventIsSuccess } = useWaitForTransaction({
    hash: postEventData?.hash,
  })

  const handleChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">CoreUI for React.js</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>Hello, world! This is a toast message.</CToastBody>
    </CToast>
  )

  return (
    <div>
      <CForm>
        <CFormTextarea
          id="newPostContent"
          label=" "
          rows="3"
          value={newPostContent}
          onChange={handleChange}
          text="Must be 1-280 words long."
        ></CFormTextarea>
        <CRow>
          <CCol md={{ offset: 7 }}>
            <CButton className="mx-1" onClick={() => postWrite?.()} color="dark" shape="rounded-0" size="sm" variant="outline">{postIsLoading ? 'Posting...' : 'Post Prrot'}</CButton>
            <CButton className="mx-1" onClick={() => postEventWrite?.()} color="dark" shape="rounded-0" size="sm" variant="outline">{postEventIsLoading ? 'Posting...' : 'Post Event Only Prrot'}</CButton>
          </CCol>
        </CRow>
        <CToaster ref={toaster} push={toast} placement="top-end" />

        {postIsSuccess && (
          <div>
            Successfully posted your Prrot post!
            <div>
              <a href={`https://etherscan.io/tx/${postData?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}

        {postEventIsSuccess && (
          <div>
            Successfully posted your Prrot event-only post!
            <div>
              <a href={`https://etherscan.io/tx/${postEventData?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </CForm>
    </div>
  )
}
