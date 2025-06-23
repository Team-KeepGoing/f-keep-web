import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as S from './style';

import logo from '@/assets/image/keep-logo.svg';
import logout from '@/assets/image/logout-icon.svg';
import inven from '@/assets/image/inventory_icon.svg';
import invenSelected from '@/assets/image/inventory_icon_white.svg';
import excel from '@/assets/image/excel-uproad-icon.svg';
import excelSelected from '@/assets/image/excel-uproad-icon_white.svg';
import home from '@/assets/image/home-icon.svg';
import homeSelected from '@/assets/image/home-icon_white.svg';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getIcon = (path: string, defaultIcon: string, selectedIcon: string) => {
    return location.pathname === path ? selectedIcon : defaultIcon;
  };

  const getBoxColor = (path: string) => {
    return location.pathname === path ? '#5372F1' : '#FAFBFD';
  };

  const getBoxPosition = (path: string) => {
    if (path === '/main') return { left: '25px', top: '149px' };
    if (path === '/tools_list') return { left: '25px', top: '217px' };
    if (path === '/uproad') return { left: '25px', top: '285px' };
    return { left: '0px', top: '0px' };
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    navigate('/');
  };

  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href="/assets/image/keep-logo.svg" />
        <link rel="preload" as="image" href="/assets/image/logout-icon.svg" />
        <link
          rel="preload"
          as="image"
          href="/assets/image/inventory_icon.svg"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/image/inventory_icon_white.svg"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/image/excel-uproad-icon.svg"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/image/excel-uproad-icon_white.svg"
        />
        <link rel="preload" as="image" href="/assets/image/home-icon.svg" />
        <link
          rel="preload"
          as="image"
          href="/assets/image/home-icon_white.svg"
        />
      </Helmet>
      <S.page_container>
        <S.nav_container>
          <div>
            <S.logo src={logo} alt="KEEP 로고" />
            <S.IconWrapper
              $bgColor={getBoxColor('/main')}
              $position={getBoxPosition('/main')}
              onClick={() => handleNavigation('/main')}
            >
              <S.home_icon
                src={getIcon('/main', home, homeSelected)}
                alt="메인 화면"
              />
            </S.IconWrapper>
            <S.IconWrapper
              $bgColor={getBoxColor('/tools_list')}
              $position={getBoxPosition('/tools_list')}
              onClick={() => handleNavigation('/tools_list')}
            >
              <S.inven
                src={getIcon('/tools_list', inven, invenSelected)}
                alt="물품 리스트"
              />
            </S.IconWrapper>
            <S.IconWrapper
              $bgColor={getBoxColor('/uproad')}
              $position={getBoxPosition('/uproad')}
              onClick={() => handleNavigation('/uproad')}
            >
              <S.excel_uproad
                src={getIcon('/uproad', excel, excelSelected)}
                alt="물품 등록"
              />
            </S.IconWrapper>
            <S.logout
              src={logout}
              alt="로그아웃 아이콘"
              onClick={handleLogout}
            />
          </div>
        </S.nav_container>
      </S.page_container>
    </>
  );
};

export default Navbar;
