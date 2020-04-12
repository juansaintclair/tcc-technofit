import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  width: 90%;
  margin: auto;
  padding: 30px 100px 30px 100px;
  
  &:nth-child(2) > :nth-child(2) {
    padding: 10px
  }
`;

export const LinkUnderscore = styled.hr`
  height: 1px;
  overflow: hidden;
  border: none;
  border-top: 1px solid #ccc;
`;

export const ContainerWrapper =  styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
`;
