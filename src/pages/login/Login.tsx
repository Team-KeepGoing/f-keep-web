import React from 'react';
import * as S from './style';
import LoginCont from '@/components/login/LoginCont';

const Login = () => {
  return (
    <S.page_container>
      <S.Cont>
        <LoginCont />
      </S.Cont>
    </S.page_container>
  );
};

export default Login;
