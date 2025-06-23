import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  gap: 35px;
  margin: 20px 0;
  font-display: swap;
`;

export const Card = styled.div`
  width: 235px;
  height: 77px;
  flex-shrink: 0;
  background-color: #fff;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-display: swap;
`;

export const Badge = styled.div<{ textColor: string; bgColor: string }>`
  width: 67px;
  height: 77px;
  left: 174px;
  flex-shrink: 0;
  top: 156px;
  background: ${(props) => props.bgColor};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  cursor: default;
  color: ${(props) => props.textColor};
`;

export const Label = styled.div`
  width: 95px;
  height: 33px;
  font-family: 'Pretendard';
  display: block;
  font-style: normal;
  font-weight: 450;
  margin-left: 95px;
  margin-top: -63px;
  font-size: 19px;
  line-height: 24px;
  color: #3c4550;
  cursor: default;
`;

export const NoWrap = styled.div`
  white-space: nowrap;
`;
