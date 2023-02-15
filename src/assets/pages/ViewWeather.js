import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import back from "../images/back.png";
import arrow from "../images/arrow.png";

function ViewWeather() {
  const location = useLocation();
  const props = location.state;

  const navigate = useNavigate();

  const getDate = () => {
    let monthDict = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date();
    let hour = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
    let mm =
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    let am_pm = date.getHours() >= 12 ? "pm" : "am";
    let day = date.getDate();
    let month = monthDict[date.getMonth()];

    return hour + "." + mm + am_pm + ", " + month + " " + day;
  };

  return (
    <Container>
      <Primary style={{ backgroundColor: props.bgColor }}>
        <BackIcon onClick={() => navigate("/")}>
          <img
            src={back}
            style={{ width: 12, cursor: "pointer" }}
            alt={"back-icon"}
          />
        </BackIcon>
        <div>
          <h2>
            {props.data.name}, {props.data.sys.country}
          </h2>
          <p>{getDate()}</p>
        </div>
        <Temperature>
          <LeftDesc>
            <div
              style={{
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`http://openweathermap.org/img/w/${props.data.weather[0].icon}.png`}
                style={{
                  margin: 8,
                }}
              />
              <p>{props.data.weather[0].description}</p>
            </div>
          </LeftDesc>
          <RightDesc>
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>{props.data.main.temp}°c</h1>
              <p>Temp Min: {props.data.main.temp_min}°c</p>
              <p>Temp Max: {props.data.main.temp_max}°c</p>
            </div>
          </RightDesc>
        </Temperature>
      </Primary>
      <Secondary>
        <div>
          <p>
            <b>Pressure:</b> {props.data.main.pressure}hPa
          </p>
          <p>
            <b>Humidity:</b> {props.data.main.humidity}%
          </p>
          <p>
            <b>Visibility:</b> {props.data.visibility / 1000}km
          </p>
        </div>
        <div>
          <img
            src={arrow}
            alt={"wind-dir-arrow"}
            style={{
              width: 24,
              transform: `rotate(${props.data.wind.deg}deg)`,
            }}
          />
          <h5>
            {props.data.wind.speed}m/s {props.data.wind.deg} Degree
          </h5>
        </div>
        <div>
          <p>
            <b>Sunrise:</b>{" "}
            {new Date(props.data.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            <b>Sunset:</b>{" "}
            {new Date(props.data.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      </Secondary>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 960px;
  min-width: 440px;
  min-height: calc(80vh);

  @media (max-width: 960px) {
    margin: 0 10px;
  }
`;

const Primary = styled.div`
  padding-bottom: 12px;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  text-align: center;

  div {
    p {
      font-size: 12px;
    }
    h2,
    p {
      margin: 8px 0;
    }
  }
`;

const BackIcon = styled.div`
  padding: 8px 12px 0;
  text-align: start;
`;

const Secondary = styled.div`
  padding: 40px 0px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 12px;
  background-color: #383b47;
  color: white;

  div {
    p {
      font-size: 14px;
      margin: 5px 0;
    }
  }
  div:nth-child(1) {
    padding: 0 0 0 calc(8vw);
    p {
      text-align: start;
    }
    @media (max-width: 550px) {
      padding: 0 0 0 10px;
    }
  }
  div:nth-child(2) {
    border-right: 1px solid white;
    border-left: 1px solid white;
  }
  div:nth-child(3) {
    padding: 0 calc(10vw) 0 0;
    p {
      text-align: end;
    }
    @media (max-width: 620px) {
      padding: 0 10px 0 0;
    }
  }
`;

const Temperature = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
`;

const LeftDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  border-right: 1px solid white;
  div {
    p {
      margin: 5px 0;
      font-size: 15px;
    }
  }
`;
const RightDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  div {
    h1 {
      font-size: 48px;
      margin: 0 0 10px;
    }
    p {
      font-size: 15px;
      margin: 0 0 5px;
    }
  }
`;
export default ViewWeather;
