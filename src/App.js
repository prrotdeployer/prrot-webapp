import React from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import { Route, Routes, HashRouter } from 'react-router-dom';
import { CImage, CCol, CLink } from '@coreui/react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Body, Container, Header } from "./components";
import PostPageFromId from "./pages/PostPageFromId";
import PostPageFromTx from "./pages/PostPageFromTx";
import AddressPosts from "./pages/AddressPosts";
import Home from "./pages/HomePage";

function App() {
  return (
    <Container>
      <Header>
        <CCol>
          <CLink className="text-black px-2" href="/">
            <CImage src="prrot2.png" width={130} height={130} />
          </CLink>
        </CCol>
        <ConnectButton showBalance={false}/>
      </Header>
      <Body>
        <div className="mx-auto d-grid" style={{width: "600px"}}>
          <HashRouter basename="/">
            <Routes>
              <Route path="/" element={<Home />}/>
            </Routes>
            <Routes>
              <Route path="/id/:postId" element={<PostPageFromId />}/>
            </Routes>
            <Routes>
              <Route path="/tx/:tx" element={<PostPageFromTx />}/>
            </Routes>
            <Routes>
              <Route path="/address/:address" element={<AddressPosts />}/>
            </Routes>
          </HashRouter>
        </div>
      </Body>
    </Container>
  );
}

export default App;
