import styled from 'styled-components';
import { AiFillFileExcel } from 'react-icons/ai';

export const Container = styled.div`
  width: 740px;
  height: 500px;
  background: #ffffff;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  font-display: swap;
`;

export const Title = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #2a2a2c;
  margin-bottom: 20px;
`;

export const UploadBox = styled.label`
  box-sizing: border-box;
  width: 738px;
  height: 383px;
  border: 3px dashed #b4b5b9;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  padding-bottom: 30px;
  background: #ffffff;
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
`;

export const Instruction = styled.p`
  margin-top: 1.7rem;
  font-size: 19px;
  color: #6b7280;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  color: #3c4550;

  span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: justify;
    color: #77808c;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const BrowseButton = styled.div`
  margin-top: 1rem;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.9rem;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
`;

export const FileIcon = styled(AiFillFileExcel)`
  color: #2f9e44;
  font-size: 1.5rem;
`;

export const FileName = styled.span`
  font-size: 0.95rem;
  color: #111827;
`;

export const FileStatus = styled.span`
  margin-left: auto;
  font-size: 0.85rem;
  color: #22c55e;
`;

export const LoadButton = styled.button`
  align-self: flex-end;
  background: #f3f4f6;
  color: #111827;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 35px;

  &:hover {
    background: #e5e7eb;
  }
`;
export const ErrorBox = styled.div`
  padding: 16px;
  box-sizing: border-box;
  background: #ffeff2;
  border: 1.5px solid #f6556c;
  border-radius: 20px;
  color: #f6556c;
  font-family: 'Pretendard';

  h4 {
    color: #f6556c;
    padding-left: 25px;
    padding-bottom: 0;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Pretendard';
  }
`;
