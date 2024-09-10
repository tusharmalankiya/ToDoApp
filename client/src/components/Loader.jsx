import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import styled from 'styled-components'

const Loader = () => {
  return (
    <Container>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#98CCD3"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Container>
  )
}

export default Loader;

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;

`