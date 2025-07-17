import React, { useEffect, useState } from 'react';
import * as S from './style';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

type ItemDetailProps = {
  id: number;
};

type ItemDetail = {
  id: number;
  item: string;
  details?: string;
  serialNumber: string;
  acquisitionDate: string;
  price: number;
  rentedBy: string | null;
  place: string;
  returnDate: string | null;
  rentalDate: string | null;
  usageDate: string | null;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'IN_USE';
};

const formatSerialNumberInput = (input: string) => {
  const raw = input.replace(/[^\d]/g, '').slice(0, 16);
  if (raw.length <= 8) return raw;
  return `${raw.slice(0, 8)}-${raw.slice(8)}`;
};

const formatDateInput = (input: string) => {
  const raw = input.replace(/[^\d]/g, '').slice(0, 8);
  if (raw.length < 5) return raw;
  if (raw.length < 7) return `${raw.slice(0, 4)}-${raw.slice(4)}`;
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
};

const ItemDetailCard: React.FC<ItemDetailProps> = ({ id }) => {
  const [detail, setDetail] = useState<ItemDetail | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDetail, setEditedDetail] = useState<ItemDetail | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios
      .get(`${API_BASE_URL}/teacher/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetail(res.data.data);
        setEditedDetail(res.data.data);
      })
      .catch((err) => {
        console.error('물품 상세 조회 실패:', err);
      });
  }, [id]);

  const handleEditClick = () => {
    if (detail?.status === 'UNAVAILABLE') {
      alert('사용 불가인 제품은 수정이 불가능합니다.');
      return;
    }
    setEditMode(true);
  };

  const handleFieldChange = (
    field: keyof ItemDetail,
    value: ItemDetail[keyof ItemDetail],
  ) => {
    if (editedDetail) {
      setEditedDetail({ ...editedDetail, [field]: value });
    }
  };

  const handleStatusChange = (
    newStatus: 'AVAILABLE' | 'IN_USE' | 'UNAVAILABLE',
  ) => {
    if (!editedDetail) return;

    if (editedDetail.status === newStatus) {
      alert(
        newStatus === 'AVAILABLE'
          ? '이미 사용 가능 상태입니다.'
          : newStatus === 'IN_USE'
            ? '이미 사용 중입니다.'
            : '이미 사용 불가 상태입니다.',
      );
      return;
    }

    setEditMode(true);
    setEditedDetail({ ...editedDetail, status: newStatus });
  };

  const handleDateInput =
    (field: keyof ItemDetail) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDateInput(e.target.value);
      handleFieldChange(field, formatted);
    };

  const handleConfirmClick = async () => {
    if (!detail || !editedDetail) return;
    if (Number(editedDetail.price) === 0) {
      alert('취득 단가는 0원이 될 수 없습니다.');
      return;
    }

    const isSame = JSON.stringify(detail) === JSON.stringify(editedDetail);
    if (isSame) {
      alert('아무것도 수정되지 않았습니다.');
      setEditedDetail(detail);
      setEditMode(false);
      return;
    }

    const formattedDetail: Partial<ItemDetail> = {
      ...editedDetail,
      acquisitionDate: editedDetail.acquisitionDate
        ? new Date(editedDetail.acquisitionDate).toISOString()
        : undefined,
      rentalDate: editedDetail.rentalDate
        ? new Date(editedDetail.rentalDate).toISOString()
        : undefined,
      returnDate: editedDetail.returnDate
        ? new Date(editedDetail.returnDate).toISOString()
        : undefined,
      usageDate:
        editedDetail.usageDate && editedDetail.usageDate.trim() !== ''
          ? new Date(editedDetail.usageDate).toISOString()
          : undefined,
      price: Number(editedDetail.price) || 0,
      rentedBy: editedDetail.rentedBy || undefined,
    };

    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`${API_BASE_URL}/teacher/item/${id}`, formattedDetail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('수정되었습니다.');
      setDetail(editedDetail);
      setEditMode(false);
    } catch (err) {
      console.error('❌ 수정 실패:', err);
      alert('수정에 실패했습니다.');
    }
  };

  if (!editedDetail) return <div>불러오는 중...</div>;

  return (
    <S.Card>
      <S.Header>
        <S.Title>물품 정보</S.Title>
        <S.EditButton onClick={handleEditClick}>수정</S.EditButton>
      </S.Header>
      <S.ItemNameRow>
        {editMode ? (
          <S.IInput
            value={editedDetail.item}
            onChange={(e) => handleFieldChange('item', e.target.value)}
          />
        ) : (
          <S.ItemName>{detail?.item}</S.ItemName>
        )}
      </S.ItemNameRow>

      <S.StatusRow>
        <S.StatusButton
          active={editedDetail.status === 'IN_USE'}
          onClick={() => handleStatusChange('IN_USE')}
        >
          사용 중
        </S.StatusButton>
        <S.StatusButton
          active={editedDetail.status === 'AVAILABLE'}
          onClick={() => handleStatusChange('AVAILABLE')}
        >
          사용 가능
        </S.StatusButton>
      </S.StatusRow>

      <S.InfoList>
        <S.InfoItem>
          <S.InfoItem2>분류 번호</S.InfoItem2>
          {editMode ? (
            <S.Input
              value={editedDetail.serialNumber}
              onChange={(e) => {
                const formatted = formatSerialNumberInput(e.target.value);
                handleFieldChange('serialNumber', formatted);
              }}
            />
          ) : (
            <span>{detail?.serialNumber}</span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>취득 일자</S.InfoItem2>
          {editMode ? (
            <S.Input
              type="text"
              value={editedDetail.acquisitionDate || ''}
              onChange={handleDateInput('acquisitionDate')}
            />
          ) : (
            <span>
              {new Date(editedDetail.acquisitionDate).toLocaleDateString(
                'ko-KR',
              )}
            </span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>취득 단가</S.InfoItem2>
          {editMode ? (
            <S.Input
              type="text"
              value={Number(editedDetail.price).toLocaleString()}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, '');
                handleFieldChange('price', Number(raw));
              }}
            />
          ) : (
            <span>{Number(editedDetail.price).toLocaleString()} 원</span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>세부 제품명</S.InfoItem2>
          {editMode ? (
            <S.Input
              value={editedDetail.details || ''}
              onChange={(e) => handleFieldChange('details', e.target.value)}
            />
          ) : (
            <span>{detail?.details || '-'}</span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>위치</S.InfoItem2>
          {editMode ? (
            <S.Input
              value={editedDetail.place}
              onChange={(e) => handleFieldChange('place', e.target.value)}
            />
          ) : (
            <span>{detail?.place}</span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>사용자</S.InfoItem2>
          {editMode ? (
            <S.Input
              value={editedDetail.rentedBy || ''}
              onChange={(e) => handleFieldChange('rentedBy', e.target.value)}
            />
          ) : (
            <span>{detail?.rentedBy || '-'}</span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>대여일</S.InfoItem2>
          {editMode ? (
            <S.Input
              type="text"
              value={editedDetail.rentalDate || ''}
              onChange={handleDateInput('rentalDate')}
            />
          ) : (
            <span>
              {detail?.rentalDate
                ? new Date(detail.rentalDate).toLocaleDateString('ko-KR')
                : '-'}
            </span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>최근 반납일</S.InfoItem2>
          {editMode ? (
            <S.Input
              type="text"
              value={editedDetail.returnDate || ''}
              onChange={handleDateInput('returnDate')}
            />
          ) : (
            <span>
              {detail?.returnDate
                ? new Date(detail.returnDate).toLocaleDateString('ko-KR')
                : '-'}
            </span>
          )}
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItem2>사용 기간</S.InfoItem2>
          <S.Highlight>-</S.Highlight>
          <span>일</span>
        </S.InfoItem>
      </S.InfoList>

      <S.Block>
        <S.BlockButton onClick={() => handleStatusChange('UNAVAILABLE')}>
          사용 불가 처리하기
        </S.BlockButton>
      </S.Block>

      <S.Caution>* 되돌릴 수 없는 이벤트입니다.</S.Caution>

      {editMode && (
        <S.ConfirmButton onClick={handleConfirmClick}>확인</S.ConfirmButton>
      )}
    </S.Card>
  );
};

export default ItemDetailCard;
