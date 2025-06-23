import React, { useState } from 'react';
import * as S from './style';
import { FiUploadCloud } from 'react-icons/fi';
import { API_BASE_URL } from '@/config';

type ValidationError = {
  rowNum: number;
  errors: string[];
};
const ExcelUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [validated, setValidated] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.xlsx'))
    ) {
      setFile(droppedFile);
      setValidated(false);
      validateExcel(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.name.endsWith('.xls') ||
        selectedFile.name.endsWith('.xlsx'))
    ) {
      setFile(selectedFile);
      setValidated(false);
      validateExcel(selectedFile);
    }
  };

  const validateExcel = async (file: File) => {
    const formData = new FormData();
    formData.append('excel', file);

    try {
      const res = await fetch(`${API_BASE_URL}/teacher/item/validate`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (result.data.length === 0) {
        setValidationErrors([]);
        setValidated(true);
      } else {
        setValidationErrors(result.data);
        setValidated(false);

        const errorMessages = result.data
          .map(
            (item: ValidationError) =>
              `${item.rowNum}행:\n- ${item.errors.join('\n- ')}`,
          )
          .join('\n\n');

        alert(
          `유효성 검사 실패! 다음 항목을 확인해주세요:\n\n${errorMessages}`,
        );
      }
    } catch (error) {
      console.error('Validation Error:', error);
      alert('유효성 검사 중 오류가 발생했어요.');
    }
  };

  const importExcel = async () => {
    if (!file || !validated) return;

    const formData = new FormData();
    formData.append('excel', file);

    try {
      setUploading(true);
      const res = await fetch(`{API_BASE_URL}/teacher/item/import`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log('등록 결과:', result);
      alert('등록 완료!');
      setFile(null);
      setValidated(false);
    } catch (error) {
      console.error('Import Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <S.Title>엑셀 파일 업로드</S.Title>
      <S.Container>
        <S.UploadBox
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          htmlFor="fileUpload"
        >
          <FiUploadCloud size={36} />
          <S.Instruction>
            Choose a file or drag & drop it here
            <br />
            <span>only available .xlsx , up to 50 MB</span>
          </S.Instruction>
          <S.HiddenInput
            id="fileUpload"
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
          />
          <S.BrowseButton>Browse file</S.BrowseButton>
        </S.UploadBox>

        {file && validated && (
          <S.FileInfo>
            <S.FileIcon />
            <S.FileName>{file.name}</S.FileName>
            <S.FileStatus>검증 완료</S.FileStatus>
          </S.FileInfo>
        )}

        {file && !validated && validationErrors.length > 0 && (
          <S.ErrorBox>
            <h4>유효성 검사 실패 항목</h4>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>
                  {error.rowNum}행 :{' '}
                  {error.errors
                    .join('\n')
                    .split('\n')
                    .map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </li>
              ))}
            </ul>
          </S.ErrorBox>
        )}

        {file && validated && (
          <S.LoadButton onClick={importExcel} disabled={uploading}>
            {uploading ? '등록 중...' : '불러오기'}
          </S.LoadButton>
        )}
      </S.Container>
    </div>
  );
};

export default ExcelUpload;
