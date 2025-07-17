import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import { API_BASE_URL } from '@/config';

const DirectUploadForm: React.FC = () => {
  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    item: '',
    serialNumber: '',
    acquisitionDate: getToday(),
    price: '',
    details: '',
    place: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'serialNumber') {
      const raw = value.replace(/[^\d]/g, '');
      let formatted = raw;
      if (raw.length > 8) {
        formatted = `${raw.slice(0, 8)}-${raw.slice(8, 16)}`;
      }
      setFormData((prev) => ({ ...prev, serialNumber: formatted }));
      return;
    }

    if (name === 'acquisitionDate') {
      const raw = value.replace(/[^\d]/g, '').slice(0, 8);
      let formatted = raw;
      if (raw.length > 4 && raw.length <= 6) {
        formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
      } else if (raw.length > 6) {
        formatted = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6)}`;
      }
      setFormData((prev) => ({ ...prev, acquisitionDate: formatted }));
      return;
    }
    if (name === 'price') {
      const digits = value.replace(/[^\d]/g, '');
      setFormData((prev) => ({ ...prev, price: digits }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };

  const handleSubmit = async () => {
    const { item, serialNumber, acquisitionDate, price, details, place } =
      formData;

    if (
      !item ||
      !serialNumber ||
      !acquisitionDate ||
      !price ||
      !details ||
      !place
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (!isValidDate(acquisitionDate)) {
      alert('날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }

    const parsedPrice = Number(price.replace(/,/g, ''));
    if (isNaN(parsedPrice)) {
      alert('가격은 숫자만 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken'); // 🔒 토큰 가져오기
      const payload = {
        item,
        serialNumber,
        acquisitionDate: new Date(acquisitionDate).toISOString(),
        price: parsedPrice,
        details,
        place,
      };

      await axios.post(`${API_BASE_URL}/teacher/item`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('물품이 성공적으로 등록되었습니다.');
      navigate('/tools_list');
    } catch (error) {
      alert('등록에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <S.FormTitle>직접 업로드</S.FormTitle>
      <S.FormWrapper>
        <S.FieldsContainer>
          <S.FieldWrapper>
            <S.FirstFieldLabel>품명 (기기명)</S.FirstFieldLabel>
          </S.FieldWrapper>
          <S.FirstFieldInput
            name="item"
            value={formData.item}
            placeholder="아이패드 #1"
            onChange={handleChange}
          />
          <Field
            label="분류 번호"
            name="serialNumber"
            value={formData.serialNumber}
            placeholder="xxxxxxxx-xxxxxxxx"
            onChange={handleChange}
          />
          <Field
            label="취득 일자"
            name="acquisitionDate"
            value={formData.acquisitionDate}
            placeholder="yyyy-mm-dd"
            onChange={handleChange}
          />
          <Field
            label="취득 단가"
            name="price"
            value={formData.price}
            placeholder="xxx,xxx"
            onChange={handleChange}
          />
          <Field
            label="세부 제품명"
            name="details"
            value={formData.details}
            placeholder="iPad mini5"
            onChange={handleChange}
          />
          <Field
            label="위치"
            name="place"
            value={formData.place}
            placeholder="임베디드 로보틱스실"
            onChange={handleChange}
          />
        </S.FieldsContainer>
        <S.SubmitButton onClick={handleSubmit}>등록</S.SubmitButton>
      </S.FormWrapper>
    </div>
  );
};

type FieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Field: React.FC<FieldProps> = ({
  label,
  name,
  value,
  placeholder,
  onChange,
}) => {
  const displayValue =
    name === 'price' && value ? Number(value).toLocaleString() : value;

  return (
    <S.FieldWrapper>
      <S.FieldLabel>{label}</S.FieldLabel>
      <S.FieldInput
        name={name}
        value={displayValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    </S.FieldWrapper>
  );
};

export default DirectUploadForm;
