import React, { useEffect, useState, useMemo } from 'react';
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
  place: string;
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

interface DeviceTable2Props {
  onSelectItem: (id: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 30, 50];

const DeviceTable2: React.FC<DeviceTable2Props> = ({ onSelectItem }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filter, setFilter] = useState<
    '전체' | '사용 중' | '사용 가능' | '사용 불가'
  >('전체');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    axios
      .get(`${API_BASE_URL}/teacher/item/list`)
      .then((res) => {
        const sorted = res.data.data.sort(
          (a: DeviceApiResponse, b: DeviceApiResponse) =>
            new Date(b.acquisitionDate).getTime() -
            new Date(a.acquisitionDate).getTime(),
        );

        const fetched = sorted.map(
          (item: DeviceApiResponse): Device => ({
            id: item.id,
            name: item.item,
            serial: item.serialNumber,
            registerDate: new Date(item.acquisitionDate).toLocaleDateString(
              'ko-KR',
            ),
            status: convertStatus(item.status),
            place: item.place,
          }),
        );

        setDevices(fetched);

        if (fetched.length > 0) {
          const latestId = fetched[0].id;
          setSelectedId(latestId);
          onSelectItem(latestId);
        }
      })
      .catch((err) => {
        console.error('서버 요청 실패:', err);
      });
  };

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleReset = () => {
    setFilter('전체');
  };
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = devices.filter((device) => {
    const matchesFilter = filter === '전체' || device.status === filter;
    const matchesSearch =
      device.name.includes(searchQuery) ||
      device.serial.includes(searchQuery) ||
      device.registerDate.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Device | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    const sorted = [...paginatedData];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key!] || '';
        const bValue = b[sortConfig.key!] || '';
        const compare = aValue
          .toString()
          .localeCompare(bValue.toString(), 'ko');
        return sortConfig.direction === 'asc' ? compare : -compare;
      });
    }
    return sorted;
  }, [paginatedData, sortConfig]);

  const handleSort = (key: keyof Device) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          key,
          direction: 'asc',
        };
      }
    });
  };

  return (
    <S.Container>
      <S.Title>물품 리스트</S.Title>
      <S.FilterButtons>
        <S.ResetBtn src={Reset} alt="리셋버튼이미지" onClick={handleReset} />
        <S.StyledFilterButton
          $bgColor="#FFEFF2"
          $textColor="#F6556C"
          $active={filter === '사용 중'}
          onClick={() => {
            setFilter('사용 중');
            setCurrentPage(1);
          }}
        >
          사용 중
        </S.StyledFilterButton>
        <S.StyledFilterButton
          $bgColor="#FFF6EA"
          $textColor="#E98862"
          $active={filter === '사용 가능'}
          onClick={() => {
            setFilter('사용 가능');
            setCurrentPage(1);
          }}
        >
          사용 가능
        </S.StyledFilterButton>
        <S.StyledFilterButton
          $bgColor="#E9E9E9"
          $textColor="#4D5969"
          $active={filter === '사용 불가'}
          onClick={() => {
            setFilter('사용 불가');
            setCurrentPage(1);
          }}
        >
          사용 불가
        </S.StyledFilterButton>
      </S.FilterButtons>

      <S.SearchSortRow>
        <input
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={pageSize} onChange={handlePageSizeChange}>
          {' '}
          <option value={10}>10개씩 보기</option>
          <option value={30}>30개씩 보기</option>
          <option value={50}>50개씩 보기</option>
        </select>
      </S.SearchSortRow>

      <S.Table>
        <thead>
          <tr>
            <S.Th>no.</S.Th>
            <S.Th onClick={() => handleSort('name')}>
              품명
              <span className="sort-icon">
                {sortConfig.key === 'name'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▼'}
              </span>
            </S.Th>
            <S.Th onClick={() => handleSort('serial')}>
              분류 번호
              <span className="sort-icon">
                {sortConfig.key === 'serial'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▼'}
              </span>
            </S.Th>
            <S.Th onClick={() => handleSort('registerDate')}>
              취득 일자
              <span className="sort-icon">
                {sortConfig.key === 'registerDate'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▼'}
              </span>
            </S.Th>
            <S.Th onClick={() => handleSort('status')}>
              상태
              <span className="sort-icon">
                {sortConfig.key === 'status'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▼'}
              </span>
            </S.Th>
            <S.Th onClick={() => handleSort('place')}>
              위치
              <span className="sort-icon">
                {sortConfig.key === 'place'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▼'}
              </span>
            </S.Th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((device, index) => (
            <S.Tr
              key={device.id}
              onClick={() => {
                onSelectItem(device.id);
                setSelectedId(device.id);
              }}
              $selected={selectedId === device.id}
            >
              <S.Td>{(currentPage - 1) * pageSize + index + 1}</S.Td>
              <S.Td>{device.name}</S.Td>
              <S.Td>{device.serial}</S.Td>
              <S.Td>{device.registerDate}</S.Td>
              <S.Td>{device.status}</S.Td>
              <S.Td>{device.place ? device.place : '-'}</S.Td>
            </S.Tr>
          ))}
        </tbody>
      </S.Table>

      <S.Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <S.PageButton
            key={i}
            onClick={() => handlePageChange(i + 1)}
            $active={currentPage === i + 1}
          >
            {i + 1}
          </S.PageButton>
        ))}
      </S.Pagination>
    </S.Container>
  );
};

export default DeviceTable2;
