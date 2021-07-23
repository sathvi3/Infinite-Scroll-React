import React, { useState, useEffect } from "react";
import { Heading } from "./components/Heading";
import { UnsplashImage } from "./components/UnsplashImage";
import { ReactComponent as Loader } from "./assets/Infinity.svg";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

const Group = styled.div`
  max-width: 70rem;
  margin: 2rem auto;
  text-align: center;
`;

const Input = styled.input`
  height: 2.5rem;
  width: 20rem;
  margin-top: 1em;
  outline: none;
  text-indent: 1em;
  font-size: 1em;

  ::placeholder {
    font-size: 0.8em;
  }
`;

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [query]);

  const fetchImages = (count = 30) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "thSluK0-1Q2S21wQf2hy033z4LljBEubcoLUaE-_ThM";

    if (query === "") {
      axios
        .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
        .then((res) => {
          setImages([...new Set([...images, ...res.data])]);
        });
    } else {
      axios
        .get(
          `${apiRoot}/search/photos?client_id=${accessKey}&query=${query}&page=${page}`,
          {
            headers: {},
          }
        )
        .then((response) => {
          setImages([...images, ...response.data.results]);
        })
        .catch((error) => {
          console.log(error);
        });
      setPage(page + 1);
    }
  };

  return (
    <div>
      <Heading />
      <GlobalStyle />
      <Group>
        <Input
          type="text"
          onKeyDown={(e) => searchImages(e)}
          placeholder="Search Images"
        />
      </Group>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <WrapperImages>
          {images.map((image) => (
            <UnsplashImage
              url={image.urls.thumb}
              key={uuidv4()}
              alternate={image.description}
            />
          ))}
        </WrapperImages>
      </InfiniteScroll>
    </div>
  );
}

export default App;
