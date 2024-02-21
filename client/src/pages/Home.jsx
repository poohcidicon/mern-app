import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([])

  const getMe = async () => {
    const res = await axios.get(`http://localhost:8080/api/users/me`)
  }

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/videos`)
      setVideos(res.data || [])
    }
    fetchVideo()
    // getMe()
  }, [])

  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} video={video}/>
      })}
    </Container>
  );
};

export default Home;
