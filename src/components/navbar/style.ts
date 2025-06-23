import styled from 'styled-components';

export const page_container = styled.div`
  font-display: swap;
`;

export const logo = styled.img`
  margin-left: 30%;
  margin-top: 61px;
`;
export const logout = styled.img`
  margin-left: 39%;
  margin-top: 580px;
`;
export const home_icon = styled.img``;
export const inven = styled.img``;
export const excel_uproad = styled.img``;
export const nav_container = styled.div`
  position: absolute;
  width: 100px;
  height: 980px;
  max-height: 3000px;
  left: 0px;
  top: 0px;
  background: #ffffff;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
`;
export const IconWrapper = styled.div<{
  $bgColor: string;
  $position: { left: string; top: string };
}>`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${(props) => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: ${(props) => props.$position.left};
  top: ${(props) => props.$position.top};
`;
