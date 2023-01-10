import React from 'react';
import styled from 'styled-components';
import {Header, Table, Tabs} from './components';
import data from './fe_data.json';

const {api, method, path, request, response} = data;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({theme: {colors: {white}}}) => white};
  color: ${({theme: {colors: {black}}}) => black};
`

const Divider = styled.hr`
  display: flex;
  margin: 24px 12px;
  border-width: .5px;
  border-color: ${({theme: {colors: {brightGray}}}) => brightGray};
`

const App = () => {
  return (
    <Container>
      <Header {...{api, method, path}} />
      <Divider />
      <Tabs tabs={[
        {title: 'Request', content: <Table data={request} context="request" />},
        {title: 'Response', content: <Table data={response} context="response" />},
      ]} />
    </Container>
  );
}

export default App;
