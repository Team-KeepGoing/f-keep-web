import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import { API_BASE_URL } from '@/config';

const DirectUploadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    item: '',
    serialNumber: '',
    acquisitionDate: '',
    price: '',
    details: '',
    place: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      const payload = {
        item,
        serialNumber,
        acquisitionDate: new Date(acquisitionDate).toISOString(),
        price: parsedPrice,
        details,
        place,
      };

      await axios.post(`${API_BASE_URL}/teather/item`, payload);
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
            placeholder="43211503-21191751"
            onChange={handleChange}
          />
          <Field
            label="취득 일자"
            name="acquisitionDate"
            value={formData.acquisitionDate}
            placeholder="2025-04-02"
            onChange={handleChange}
          />
          <Field
            label="취득 단가"
            name="price"
            value={formData.price}
            placeholder="2221608"
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
}) => (
  <S.FieldWrapper>
    <S.FieldLabel>{label}</S.FieldLabel>
    <S.FieldInput
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </S.FieldWrapper>
);

export default DirectUploadForm;
