import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme: {colors: {white}}}) => white};
  height: 100%;
`

const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
   border-bottom: .5px solid ${({theme: {colors: {graniteGrey}}}) => graniteGrey};
`

const TabContent = styled.div`
  height: 100%;
  background-color: ${({theme: {colors: {brightGray}}}) => brightGray};
  padding: 24px;
`

const Tab = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 24px;
  margin: 0 12px;
  border-bottom: 4px solid ${({isSelected, theme: {colors: {metallicViolet}}}) => (isSelected ? metallicViolet : 'transparent')};
  color: ${({isSelected, theme: {colors: {metallicViolet, black}}}) => (isSelected ? metallicViolet : black)};
  font-weight: bold;
  cursor: pointer;
  :hover {
    opacity: .8;
  }
  transition: border-bottom-color .5s;
`

const Tabs = ({tabs}) => {
  const [tab, setTab] = useState(0);
  return (
      <Container>
        <TabsWrapper>
          {tabs.map(({title}, index) => (
              <Tab key={index} isSelected={tab === index} onClick={() => setTab(index)}>{title}</Tab>
          ))}
        </TabsWrapper>
        <TabContent>
          {tabs[tab].content}
        </TabContent>
      </Container>
  );
}

export default Tabs;
