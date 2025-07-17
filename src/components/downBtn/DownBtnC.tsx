import React, { useState } from 'react';
import * as S from './style';
import { API_BASE_URL } from '@/config';

const DownBtnC = () => {
  const [loading, setLoading] = useState(false);

  const handleTemplateDownload = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/teacher/item/template`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = '템플릿.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('파일 다운로드 중 오류 발생');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportDownload = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/teacher/item/export`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = '현재_테이블.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('파일 다운로드 중 오류 발생');
      console.error(error);
    }
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
