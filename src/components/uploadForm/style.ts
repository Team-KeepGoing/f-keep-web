import styled from 'styled-components';
export const FormWrapper = styled.div`
  width: 740px;
  height: 500px;
  background: #ffffff;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  padding: 40px;
  display: flex;
  font-display: swap;
  flex-direction: column;
`;

export const FormTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #2a2a2c;
  margin-bottom: 20px;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FirstFieldLabel = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #2a2a2c;
  width: 30%;
`;

export const FirstFieldInput = styled.input`
  all: unset;
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  color: #2b2a2c;
  border: none;
  width: 40%;
  padding: 5px 0;
`;

export const FieldLabel = styled.label`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 540;
  font-size: 21px;
  line-height: 27px;
  color: #242424;
  width: 30%;
  display: flex;
  align-items: center;
`;

export const FieldInput = styled.input`
  all: unset;
  text-align: right;
  font-family: 'Pretendard', sans-serif;
  font-weight: 540;
  font-size: 21px;
  line-height: 27px;
  color: #242424;
  width: 65%;
  padding: 5px 0;
`;

export const SubmitButton = styled.button`
  width: 160px;
  height: 50px;
  background: #f2f3f7;
  border-radius: 10px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #535353;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 30px;

  &:hover {
    background: #e2e3e7;
  }
`;
