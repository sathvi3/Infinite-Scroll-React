import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UnsplashImage = ({ url, description }) => {
  return (
    <>
      <Img key={uuidv4()} src={url} alt={description} />
    </>
  );
};
