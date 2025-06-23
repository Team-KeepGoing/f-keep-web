import styled from 'styled-components';

interface TrProps {
  $selected?: boolean;
}

export const Container = styled.div`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  font-display: swap;
`;
export const SearchSortRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;textColor
  margin-bottom: 1rem;

  input {
    padding: 0.5rem;
    padding-left: 20px;
    border: 1px solid #d7e2eb;
    border-radius: 35px;
    font-size: 18px;
    font-weight: 400;

    &::placeholder {
      color: #d7e2eb;
      font-weight: 400;
    }

    &:focus {
      outline: none;
      border: 1px solid #d7e2eb;
    }
  }

  select {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #d7e2eb;
    background-color: white;
    color: #9aa4ab;
    font-size: 15px;

    &:focus {
      outline: none;
    }
  }
`;

export const Title = styled.h2`
  font-family: 'Pretendard';
  margin-left: 10px;
  margin-bottom: 15px;
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  color: #2a2a2c;
  cursor: default;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  margin-left: 1008px;
`;

export const Button = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  background: ${({ active }) => (active ? '#1F2937' : '#4B5563')};
  color: white;
  cursor: pointer;
  border: none;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 6px;
`;

export const Th = styled.th`
  background: #f2f3f7;
  padding: 8.5px;
  padding-left: 15px;
  text-align: left;
  border-radius: 4px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #4e5a69;
  cursor: default;

  span.sort-icon {
    margin-left: 10px;
    font-size: 12px;
  }
`;

export const StyledFilterButton = styled.button<{
  $bgColor: string;
  $textColor: string;
  $active: boolean;
}>`
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  border: none;
  padding: 8px 20px;
  margin-right: 8px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.2s;
  ${(props) =>
    props.$active &&
    `
    outline: 2px solid rgba(0,0,0,0.1);
  `}

  &:hover {
    opacity: 0.9;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? '#007bff' : '#eee')};
  color: ${(props) => (props.$active ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #d7e2eb;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #4d5967;
`;

export const Tr = styled.tr.withConfig({
  shouldForwardProp: (prop) => prop !== '$selected',
})<TrProps>`
  background: ${(props) =>
    props.$selected ? 'rgba(83, 114, 241, 0.05)' : 'transparent'};
  cursor: pointer;

  &:hover {
    background: rgba(83, 114, 241, 0.1);
  }

  &:last-of-type td {
    border-bottom: none;
  }

  td {
    border-top-left-radius: ${(props) => (props.$selected ? '5px' : '0')};
    border-bottom-left-radius: ${(props) => (props.$selected ? '5px' : '0')};
    border-top-right-radius: ${(props) => (props.$selected ? '5px' : '0')};
    border-bottom-right-radius: ${(props) => (props.$selected ? '5px' : '0')};
  }
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;
export const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const FilterButton = styled.button<{
  bgColor: string;
  textColor: string;
  active?: boolean;
}>`
  padding: 8px 20px;
  border: none;
  border-radius: 999px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  ${({ active }) =>
    active &&
    `
    outline: 2px solid rgba(0,0,0,0.1);
  `}
`;
