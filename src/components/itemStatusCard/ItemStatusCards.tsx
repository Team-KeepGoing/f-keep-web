import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';
import { API_BASE_URL } from '@/config';

interface ItemCountData {
  totalItems: number;
  availableItems: number;
  inUseItems: number;
  unavailableItems: number;
}

const statusList = [
  {
    label: '보유 중인 기자재 총 갯수',
    key: 'totalItems',
    textColor: '#5372F1',
    bgColor: '#F1F3FF',
  },
  {
    label: '사용 가능한 기자재 총 갯수',
    key: 'availableItems',
    textColor: '#E98862',
    bgColor: '#FFF6EA',
  },
  {
    label: '사용 중인 기자재 총 갯수',
    key: 'inUseItems',
    textColor: '#F6556C',
    bgColor: '#FFEFF2',
  },
  {
    label: '사용 불가한 기자재 총 갯수',
    key: 'unavailableItems',
    textColor: '#5F5F5F',
    bgColor: '#E9E9E9',
  },
];

const ItemStatusCards = () => {
  const [data, setData] = useState<ItemCountData>({
    totalItems: 0,
    availableItems: 0,
    inUseItems: 0,
    unavailableItems: 0,
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/teacher/item/count`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error('카운트 데이터 불러오기 실패:', err);
      });
  }, []);

  return (
    <S.CardContainer>
      {statusList.map((status) => {
        const words = status.label.split(' ');
        const firstLine = words.slice(0, 2).join(' ');
        const secondLine = words.slice(2).join(' ');

        return (
          <S.Card key={status.key}>
            <S.Badge textColor={status.textColor} bgColor={status.bgColor}>
              {data[status.key as keyof ItemCountData]}
            </S.Badge>
            <S.Label>
              <S.NoWrap style={{ color: status.textColor }}>
                {firstLine}
              </S.NoWrap>
              <S.NoWrap>{secondLine}</S.NoWrap>
            </S.Label>
          </S.Card>
        );
      })}
    </S.CardContainer>
  );
};

export default ItemStatusCards;
