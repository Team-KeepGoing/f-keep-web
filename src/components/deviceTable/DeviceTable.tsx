import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';
import { API_BASE_URL } from '@/config';
import Reset from '@/assets/image/repeate-music.svg';

type Device = {
  id: number;
  name: string;
  serial: string;
  registerDate: string;
  status: '사용 중' | '사용 가능' | '사용 불가';
  days: string;
};

type DeviceApiResponse = {
  id: number;
  item: string;
  serialNumber: string;
  acquisitionDate: string;
  price: string;
  rentedBy: string | null;
  place: string;
  returnDate: string | null;
  rentalDate: string | null;
  usageDate: string | null;
  status: 'AVAILABLE' | 'UNAVAILABLE' | string;
};

const DeviceTable: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filter, setFilter] = useState<
    '전체' | '사용 중' | '사용 가능' | '사용 불가'
  >('전체');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    axios
      .get(`${API_BASE_URL}/teacher/item/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const items = res.data?.data ?? [];

        const sorted = items
          .sort(
            (a: DeviceApiResponse, b: DeviceApiResponse) =>
              new Date(b.acquisitionDate).getTime() -
              new Date(a.acquisitionDate).getTime(),
          )
          .slice(0, 7);

        const fetched = sorted.map(
          (item: DeviceApiResponse): Device => ({
            id: item.id,
            name: item.item,
            serial: item.serialNumber,
            registerDate: new Date(item.acquisitionDate).toLocaleDateString(
              'ko-KR',
            ),
            status: convertStatus(item.status),
            days: calculateDays(item.rentalDate),
          }),
        );

        setDevices(fetched);
      })
      .catch((err) => {
        console.error('서버 요청 실패:', err);
      });
  }, []);

  const convertStatus = (status: string): Device['status'] => {
    switch (status) {
      case 'AVAILABLE':
        return '사용 가능';
      case 'UNAVAILABLE':
        return '사용 불가';
      default:
        return '사용 중';
    }
  };
  const handleReset = () => {
    setFilter('전체');
  };

  const calculateDays = (rentalDate: string | null): string => {
    if (!rentalDate) return '- 일';

    const start = new Date(rentalDate);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} 일`;
  };

  const filteredData =
    filter === '전체'
      ? devices
      : devices.filter((device) => device.status === filter);

  return (
    <S.Container>
      <S.Title>관리 물품 현황</S.Title>
      <S.ButtonGroup>
        <S.ResetBtn src={Reset} alt="리셋버튼이미지" onClick={handleReset} />
        {['사용 중', '사용 가능', '사용 불가'].map((status) => (
          <S.Button
            key={status}
            active={filter === status}
            onClick={() => setFilter(status as Device['status'])}
          >
            {status}
          </S.Button>
        ))}
      </S.ButtonGroup>

      <S.Table>
        <thead>
          <tr>
            <S.Th>no.</S.Th>
            <S.Th>품명</S.Th>
            <S.Th>분류 번호</S.Th>
            <S.Th>취득 일자</S.Th>
            <S.Th>상태</S.Th>
            <S.Th>사용 기간</S.Th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((device, index) => (
            <S.Tr key={device.id}>
              <S.Td>{index + 1}</S.Td>
              <S.Td>{device.name}</S.Td>
              <S.Td>{device.serial}</S.Td>
              <S.Td>{device.registerDate}</S.Td>
              <S.Td>{device.status}</S.Td>
              <S.Td>{device.days}</S.Td>
            </S.Tr>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default DeviceTable;
