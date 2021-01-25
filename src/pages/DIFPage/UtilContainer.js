import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import colors from "../../constants/colors";
import CFAArtifacts from "../../utils/CFA";
import CircleDetection from "../../utils/CircleDetection";
import ErrorLevelAnalysis from "../../utils/ErrorLevelAnalysis";
import ExifHeader from "../../utils/ExifHeader";

const UtilityContainer = styled.div`
  background: ${colors.neutralblue};
  border-radius: 6px;

  width: 100%;
  // height: fit-content;
  overflow-y: scroll;
  margin-left: 20px;
  padding: 15px 25px;

  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const UtilCarousel = styled.div`
  position: relative;
`;

const CarouselNav = styled.div``;

const CarouselContent = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const CarouselItem = styled.button`
  color: ${colors.graypurple};
  font-size: 1rem;
  margin-right: 20px;
  & p {
    display: inline;
    white-space: nowrap;
    transition: all 0.4s;
    color: ${colors.graypurple};
  }
  &.active p,
  &:hover p {
    color: ${colors.orange};
  }
`;

const functionNames = [
  {
    name: "Demosaicing Artifacts",
    onClick: CFAArtifacts,
  },
  {
    name: "MetaData Extraction",
    onClick: ExifHeader,
  },
  {
    name: "Error Level Analysis",
    onClick: ErrorLevelAnalysis,
  },
  {
    name: "Error Level Analysis",
    onClick: CFAArtifacts,
  },
  {
    name: "Noise Inconsistencies",
    onClick: CFAArtifacts,
  },
  {
    name: "Noise residues",
    onClick: CFAArtifacts,
  },
  {
    name: "Lens Disortion",
    onClick: CFAArtifacts,
  },
];

export default function UtilContainer() {
  const [curBtn, setBtn] = useState(0);
  const [loader, setLoader] = useState(false);

  function setStateAsync(state) {
    return new Promise((resolve) => {
      setBtn(state, resolve);
    });
  }

  async function handleBtnClick(item, index) {
    // await setStateAsync(index);
    let result = await item.onClick();
  }

  return (
    <UtilityContainer>
      <UtilCarousel>
        <CarouselNav></CarouselNav>
        <CarouselContent>
          {functionNames.map((item, index) => (
            <CarouselItem
              key={`carousel-functionalities-${index}`}
              className={index === curBtn ? "active" : ""}
              onClick={() => handleBtnClick(item, index)}
            >
              <p>{item.name}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        {loader ? <Loader /> : <></>}
      </UtilCarousel>
    </UtilityContainer>
  );
}
