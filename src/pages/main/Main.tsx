import * as S from './style';
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import DeviceTable from '@/components/deviceTable/DeviceTable';
import ItemStatusCards from '@/components/itemStatusCard/ItemStatusCards';
import danger from '@/assets/image/danger.svg';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/uproad');
  };

  return (
    <S.page_container>
      <Helmet>
        <link rel="preload" as="image" href="/assets/image/danger.svg" />
      </Helmet>
      <Navbar />
      <S.title>내 활동</S.title>
      <ItemStatusCards />
      <S.Area>
        <S.Danger src={danger} alt="엑셀 업로드 이동 아이콘" />
        <S.Text1>엑셀 파일 </S.Text1>
        <S.Text2>로 기자재 업로드 하러 가기</S.Text2>
        <S.Spantag onClick={handleClick}>바로가기</S.Spantag>
      </S.Area>
      <DeviceTable />
      <S.endText>
        v 1.0.0 Copyright By Keep-Going team. All rights reserved. Since 2025
      </S.endText>
    </S.page_container>
  );
};

export default Main;
