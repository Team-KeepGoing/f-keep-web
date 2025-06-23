import styled from 'styled-components';

export const page_container = styled.div`
  display: flex;
  height: 600px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 60px;
`;

export const left_container = styled.div`
  width: 480px;
  margin-right: 80px;
`;

export const title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: #5372f1;

  span {
    color: #5372f1;
    font-size: 55px;
    font-weight: 700;
  }
`;

export const description = styled.p`
  margin: 0 0 50px;
  font-size: 18px;
  color: #4d5967;
`;

export const input_label = styled.label`
  display: block;
  margin-bottom: 3px;
  font-size: 21px;
  color: #83a9fe;
`;

export const input = styled.input`
  padding: 12px;
  font-size: 26px;
  border: none;
  margin-bottom: 24px;
  background-color: #f1f3ff;
  width: 410px;
  height: 50px;
`;

export const button = styled.button`
  margin-top: 30px;
  width: 435px;
  height: 60px;
  font-size: 25px;
  background-color: #5372f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #5770d0;
  }
`;

export const right_image = styled.img`
  width: 600px;
  height: auto;
`;
