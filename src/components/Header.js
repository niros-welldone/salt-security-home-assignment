import React, {useMemo} from 'react';
import styled from 'styled-components';
import {FaAngleRight} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Chain = styled(Row)`
  margin-top: 12px;
  svg {
    fill: ${({theme: {colors: {metallicViolet}}}) => metallicViolet};
    margin: 0 5px;
  }
`

const Method = styled.div`
  font-size: 16px;
  color: ${({theme: {colors: {deepFuchsia}}}) => deepFuchsia};
  text-transform: uppercase;
`

const Path = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme: {colors: {metallicViolet}}}) => metallicViolet};
  margin-left: 15px;
`

const Link = styled.div`
  font-size: 13px;
  color: ${({theme: {colors: {metallicViolet}}}) => metallicViolet};
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`

const Header = ({api, method, path}) => {
  const chain = useMemo(() => ['All APIs', api, path], [api, path]);
  return (
      <Container>
        <Row>
          <Method>{method}</Method>
          <Path>{path}</Path>
        </Row>
        <Chain>
          {chain.map((link, index) => {
            const isLast = (index >= (chain.length - 1));
            return (
                <Row key={index}>
                  <Link bold={!isLast}>{link}</Link>
                  {!isLast && <FaAngleRight />}
                </Row>
            )
          })}
        </Chain>
      </Container>
  );
}

export default Header;
