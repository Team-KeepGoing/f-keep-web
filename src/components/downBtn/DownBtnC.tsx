import React, { useState } from 'react';
import * as S from './style';
import { API_BASE_URL } from '@/config';

const DownBtnC = () => {
  const [loading, setLoading] = useState(false);

  const handleTemplateDownload = async () => {
    setLoading(true);
    try {
      window.location.href = `${API_BASE_URL}/teacher/item/template`;
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleExportDownload = () => {
    window.location.href = `${API_BASE_URL}/teacher/item/export`;
  };

  return (
    <S.Wrapper>
      <S.DownloadButton onClick={handleTemplateDownload} disabled={loading}>
        {loading ? '다운로드 중...' : '양식 다운로드'}
      </S.DownloadButton>
      <S.DownloadButton onClick={handleExportDownload}>
        현재 테이블 다운로드
      </S.DownloadButton>
    </S.Wrapper>
  );
};

export default DownBtnC;
