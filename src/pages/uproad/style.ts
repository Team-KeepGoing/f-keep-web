import styled from 'styled-components';

export const page_container = styled.div`
  width: 100%;
  height: 1000px;
  max-width: 1400px;
  margin-left: 80px;
  padding: 30px 80px;
  box-sizing: border-box;
  background-color: #f9fafc;
  font-display: swap;
`;
export const title = styled.h3`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  color: #2a2a2c;
`;

export const Div = styled.div`
  margin-left: 370px;
  margin-top: -230px;
`;
export const SelectorWrapper = styled.div`
  margin-top: 2rem;
`;

export const SelectorTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #2a2a2c;
  margin-bottom: 20px;
`;

export const SelectorBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 400;
  font-size: 19px;
  color: #4e5a69;
`;

export const CheckboxSquare = styled.div<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.selected ? '#333' : 'transparent')};
`;