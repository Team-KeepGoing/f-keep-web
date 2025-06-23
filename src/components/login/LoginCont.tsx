import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginImage from '@/assets/image/loginpage_image.svg';
import { API_BASE_URL } from '@/config';
import * as S from './style';

const LoginCont = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        navigate('/main');
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.error(error);
      alert('아이디나 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <S.page_container>
      <S.left_container>
        <S.title>
          <span>KEEP T</span> 로그인
        </S.title>
        <S.description>
          교사용 KEEP을 사용하기 위해 별도의 인증이 필요합니다
        </S.description>
        <form onSubmit={handleLogin}>
          <S.input_label>이메일</S.input_label>
          <S.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <S.input_label>비밀번호</S.input_label>
          <S.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <S.button type="submit">확인</S.button>
        </form>
      </S.left_container>
      <S.right_image src={LoginImage} alt="keep2 image" />
    </S.page_container>
  );
};
export default LoginCont;
