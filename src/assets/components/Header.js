import React from "react";
import styled from "styled-components";

import logo from "../images/logo.png";

function Header() {
  return (
    <Container>
      <Wrap>
        <img src={logo} />
        <span>Weather App</span>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  min-height: 10vh;
`;

const Wrap = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px calc(0.5vw + 5px) 20px;
  img {
    padding: 0 6px;
    align-self: center;
    width: 48px;
    object-fit: cover;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Header;
