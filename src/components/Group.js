import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {FaCaretRight, FaCaretDown} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  cursor: pointer;
  :hover {
    opacity: .8;
  }
`

const Expand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({theme: {colors: {brightGray}}}) => brightGray};
  svg {
    fill: ${({theme: {colors: {deepFuchsia}}}) => deepFuchsia};
  }
`

const Title = styled.div`
  margin-left: 12px;
  font-size: 18px;
  font-weight: bold;
`

const Group = ({title, children}) => {
  const [visible, setVisible] = useState(false);

  const onExpand = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
      <Container>
        <Row onClick={onExpand}>
          <Expand>
            {visible ? <FaCaretDown /> : <FaCaretRight />}
          </Expand>
          <Title>{title}</Title>
        </Row>
        {visible && children}
      </Container>
  )
};

export default Group;
