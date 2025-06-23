import styled from 'styled-components';

export const Card = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-display: swap;
  height: 550px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h4`
  font-family: 'Pretendard';
  display: flex;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #2a2a2c;
  margin-top: 10px;
  cursor: default;
`;

export const EditButton = styled.button`
  padding: 6px 20px;
  font-size: 14px;
  margin-bottom: 26px;
  color: #5372f1;
  border: 1px solid #5372f1;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
`;

export const ItemNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px;
  cursor: default;
`;

export const ItemName = styled.h3`
  font-size: 22px;
  font-weight: 500;
`;

export const StatusRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0px;
  margin-top: -23px;
  cursor: default;
`;

export const StatusButton = styled.button<{ active?: boolean }>`
  padding: 7px 20px;
  font-size: 14px;
  border-radius: 999px;
  background: ${({ active }) => (active ? '#5372F1' : '#F1F3FF')};
  color: ${({ active }) => (active ? 'white' : '#5372F1')};
  border: none;
  align-items: center;
  cursor: pointer;
  font-weight: 350;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  align-items: center;
  text-align: right;
  color: #242424;
  cursor: default;
`;
export const InfoItem2 = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  align-items: center;
  text-align: right;
  color: #242424;
  cursor: default;
`;

export const Highlight = styled.span`
  color: #5372f1;
  font-weight: 500;
  margin-left: 200px;
`;

export const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BlockButton = styled.button`
  background: #5372f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 21px;
  font-weight: 500;
  cursor: pointer;
`;

export const Caution = styled.p`
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-left: 155px;
  margin-top: -0.1px;
  cursor: default;
`;
export const ConfirmButton = styled.button`
  background: #5372f1;
  border-radius: 20px;
  font-family: 'Pretendard';
  color: #ffffff;
  padding: 7px 14px;
  font-size: 14px;
  border: none;
  align-items: center;
  cursor: pointer;
  font-weight: 350;
  width: 75px;
  height: 33px;
  margin-left: 230px;
  margin-top: 10px;
`;

export const Input = styled.input`
  border: none;
  font-size: 18px;
  color: #242424;
  padding: 4px 0;
  outline: none;
  text-align: right;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  &:focus {
    color: #4d5967;
  }
`;
export const IInput = styled.input`
  border: none;
  font-size: 16px;
  color: #2a2a2c;
  padding: 21px 0;
  width: 50%;
  margin-right: 20px;
  outline: none;
  &:focus {
    color: #4d5967;
  }
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 27px;
  color: #2a2a2c;
`;
