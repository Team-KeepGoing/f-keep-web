import * as S from './style';
import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import DownBtnC from '@/components/downBtn/DownBtnC';
import DirectUploadForm from '@/components/uploadForm/DirectUploadForm';
import ExcelUploadForm from '@/components/excelUpload/ExcelUpload';

const Uproad = () => {
  const [mode, setMode] = useState<'excel' | 'direct'>('excel');

  return (
    <S.page_container>
      <Navbar />
      <S.title>관리 물품 추가</S.title>
      <S.SelectorWrapper>
        <S.SelectorTitle>업로드</S.SelectorTitle>
        <S.SelectorBox>
          <S.CheckboxLabel onClick={() => setMode('excel')}>
            <S.CheckboxSquare selected={mode === 'excel'} />
            엑셀 파일 업로드
          </S.CheckboxLabel>
          <S.CheckboxLabel onClick={() => setMode('direct')}>
            <S.CheckboxSquare selected={mode === 'direct'} />
            직접 업로드
          </S.CheckboxLabel>
        </S.SelectorBox>
      </S.SelectorWrapper>
      <DownBtnC />
      <S.Div>
        {mode === 'excel' ? <ExcelUploadForm /> : <DirectUploadForm />}
      </S.Div>
    </S.page_container>
  );
};

export default Uproad;
