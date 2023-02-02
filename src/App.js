import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Dashboard from "./assets/pages/Dashboard";
import ViewWeather from "./assets/pages/ViewWeather";
import PageNotFound from "./assets/pages/PageNotFound";
import Footer from "./assets/components/Footer";

import background from "./assets/images/background.png";
import Header from "./assets/components/Header";

function App() {
  return (
    <Router>
      <Container bgImage={background}>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/weather-info" element={<ViewWeather />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  min-width: 400px;
  &:after {
    background: ${(props) =>
      `url(${props.bgImage}) center center / cover no-repeat fixed`};
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -2;
  }
`;

export default App;
