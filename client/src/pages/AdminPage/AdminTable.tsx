import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DoubleRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, InputRef, TableColumnsType, TableColumnType } from 'antd';
import { ITour } from '../../redux/ToursPage/toursTypes';
import { IUser } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import AdminInnerTable from './AdminInnerTable';
import Highlighter from 'react-highlight-words';
import type { FilterDropdownProps } from 'antd/es/table/interface';

interface DataType extends ITour {
  key?: React.Key;
  User: IUser;
  owner: string, 
  email: string, 
  phone: string,
  rout: string 
 }

const AdminTable: React.FC = () => {
    const [extendedTours, setExtendedTours] = useState([]);

const expandedRowRender = (record: DataType) => {
  return <AdminInnerTable tourId={ record.id }/>
}

    useEffect(() => {
        axios
      .get<DataType[]>(`http://localhost:3009/api/tours/extended`)
      .then((response) => setExtendedTours(response.data))
      .catch((error) => console.log(error));
    }, [])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: FilterDropdownProps['confirm'],
      dataIndex: string,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex: string): TableColumnType<DataType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

  const columns: TableColumnsType<DataType> = [
    { title: 'Название тура', dataIndex: 'title', key: 'title', ...getColumnSearchProps('title') },
    { title: 'Регион', dataIndex: 'region', key: 'region' },
    { title: 'Организатор', dataIndex: 'owner', key: 'owner' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Тел.', dataIndex: 'phone', key: 'phone' },
    { title: 'Статус', dataIndex: 'status', key: 'status', 
    filters: [
      { text: 'New', value: 'new' },
      { text: 'Allowed', value: 'allowed' },
      { text: 'Canceled', value: 'canceled' },
    ], 
    onFilter: (value, record) => record.status === value},
    { title: 'Подробнее', dataIndex: 'rout', key: 'rout', render: (rout) => <Link to={rout}>Подробнее <DoubleRightOutlined /></Link> },
    { title: 'Редактировать', dataIndex: 'id', key: 'id', render: (id) => <Link to={`http://localhost:5173/tour_edit/${id}`}> Редактировать <DoubleRightOutlined /></Link> },
  ];


const data: DataType[] = extendedTours.sort((a,b) => (a.id - b.id)).map((tour: DataType) => {
    return { ...tour, key: tour.id, rout: `/tour/${tour.id}`, owner: tour.User.full_name, email: tour.User.email, phone: tour.User.telephone };
  });

  
  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />      
    </>
  );
};

export default AdminTable;