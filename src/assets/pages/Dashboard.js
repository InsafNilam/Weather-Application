import { useMemo } from "react";
import { useQueries } from "react-query";
import { RingLoader } from "react-spinners";
import styled from "styled-components";
import axios from "axios";

import Card from "../components/Card";
import cityData from "../data/cities.json";
import loadError from "../images/load_error.png";

function Dashboard() {
  const weatherAPI = "1610a7710663db69454a488a00ec5047";

  const getWeatherDetailsById = async (id) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=${weatherAPI}`
    );
    const data = response.data.list;
    return data;
  };

  const queryResults = useQueries(
    cityData["List"].map((weather, i) => {
      return {
        queryKey: ["weather-data", i],
        queryFn: () => getWeatherDetailsById(weather["CityCode"]),
        cacheTime: weather["cacheTime"],
      };
    })
  );

  return (
    <Container>
      <InputGroup>
        <input type="search" placeholder="Enter a City" />
        <ButtonGroup>
          <button>Add City</button>
        </ButtonGroup>
      </InputGroup>
      <Wrap>
        {useMemo(() => {
          const color = ["#388ee7", "#6249cc", "#40b681", "#de944e", "#9c3a3a"];
          return !queryResults.length
            ? null
            : queryResults.map((result, i) => {
                if (result.isLoading) {
                  return (
                    <Loader>
                      <RingLoader color="#36d7b7" loading={result.isLoading} />
                      <p>Please wait while we fetch the Weather Data</p>
                    </Loader>
                  );
                }

                if (result.isError) {
                  return (
                    <Loader>
                      <img
                        alt="error-icon"
                        src={loadError}
                        style={{
                          width: "40%",
                          height: "fit-content",
                          filter: "drop-shadow(0 0 0.75rem crimson)",
                          objectFit: "cover",
                        }}
                      />
                      <p>{result.error.message}</p>
                    </Loader>
                  );
                }

                return (
                  <>
                    {result.data.map((value) => (
                      <Card
                        key={i}
                        bgColor={color[i % color.length]}
                        data={value}
                      />
                    ))}
                  </>
                );
              });
        }, [queryResults])}
      </Wrap>
    </Container>
  );
}

const Container = styled.main`
  max-height: calc(80vh);
  overflow-y: scroll;
  margin: 0 auto;
  padding: 0px calc(3.5vw + 5px) 0px;
  align-items: center;
  justify-content: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Loader = styled.div`
  max-width: 450px;
  min-width: 400px;
  min-height: 250px;
  margin: 0 auto;
  background-color: #070814;
  border-radius: 12px;
  outline: 3px solid #0b1c24;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #a2a208;
  p {
    margin: 30px 0;
  }
`;

const Wrap = styled.div`
  margin: 40px auto 10px;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 12px;
  grid-row-gap: 20px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const InputGroup = styled.div`
  display: block;
  position: relative;
  border-radius: 15px;
  border-style: none;
  overflow: hidden;
  width: 420px;
  margin: 0 auto;

  input {
    outline: none;
    border: none;
    width: 100%;
    height: 40px;
    padding: 18px;
    background: #000;
    color: #fff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  margin-right: -5px;
  top: 0;
  bottom: 0;
  right: 0;

  button {
    align-items: center;
    background-color: #6c5dd3;
    border-radius: 15px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    color: #e3e0f6;
    cursor: pointer;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    justify-content: center;
    letter-spacing: 0.25px;
    max-width: 100%;
    padding: 2px 24px;
    position: relative;
    text-align: center;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: auto;

    &:hover {
      background: #f6f9fe;
      color: #174ea6;
    }
  }
`;
export default Dashboard;
