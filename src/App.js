import React from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Body, Container, Header } from "./components";
import PostPageFromId from "./pages/PostPageFromId";
import PostPageFromTx from "./pages/PostPageFromTx";
import Home from "./pages/HomePage";

function App() {
  return (
    <Container>
      <Header>
        <ConnectButton showBalance={false}/>
      </Header>
      <Body>
        <div className="mx-auto d-grid" style={{width: "600px"}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}/>
            </Routes>
            <Routes>
              <Route path="/id/:postId" element={<PostPageFromId />}/>
            </Routes>
            <Routes>
              <Route path="/tx/:tx" element={<PostPageFromTx />}/>
            </Routes>
          </BrowserRouter>
        </div>
      </Body>
    </Container>
  );
}

export default App;
