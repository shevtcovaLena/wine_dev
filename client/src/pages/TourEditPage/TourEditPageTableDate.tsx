import React, { useContext, useEffect, useRef, useState } from 'react';
import type { DatePickerProps, GetRef, InputRef } from 'antd';
import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  dateStart: string;
  dateEnd: string;
  quantity_seats: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function TourEditPageTableDate({tbDate,tbDateTemp, setTbDate, valueNumberDay, setNumberDay}) {
  const [currDate, setCurrDate] = useState();
  const [currDateStr, setCurrDateStr] = useState();

  function addDaysToDate(dateStr: string, daysToAdd: number): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd); // Добавляем дни
  
    // Форматируем дату обратно в строку
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    // console.log(date, dateString);
    setCurrDate(() => date)
    setCurrDateStr(() => dateString)
  };

  // const [valueNumberDay, setNumberDay] = useState();
  const onNumberChange = (value) => {
    // console.log('changed', value);
    setNumberDay(() => value);
  };

  const [quantitySeats, setQuantitySeats] = useState();
  const onNumberQuantitySeats = (value) => {
    setQuantitySeats(() => value);
  }

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Дата начала',
      dataIndex: 'dateStart',
      width: '35%',
      // editable: true,
    },
    {
      title: 'Дата конец',
      width: '35%',
      dataIndex: 'dateEnd',
    },
    {
      title: 'Мест',
      width: '20%',
      dataIndex: 'quantity_seats',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) =>{
        // Проверяем, можно ли удалять эту конкретную строку
        if (record.isDeletable) {
          return (
            <Popconfirm title="Удалить?" onConfirm={() => handleDelete(record.key)}>
              <DeleteOutlined />
            </Popconfirm>
          );
        }
        return null; // Или вернуть пустой элемент, если удаление не разрешено
      }
    },
  ];

  const handleAdd = () => {

    if (currDateStr === "") return

    const endDate = addDaysToDate(currDateStr,valueNumberDay)
    
    const newData: DataType = {
      key: count,
      dateStart: currDateStr,
      dateEnd: endDate,
      quantity_seats: quantitySeats,
      date_id: -1,
      isDeletable: true
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setCurrDate(null);
    setCurrDateStr("");
  };

  useEffect(() => {
    setTbDate(tbDate => ({ ...tbDate, arrDate: dataSource }));
  }, [dataSource]);

  useEffect(() => {
    console.log(tbDateTemp.arrDate)
    setDataSource(() => tbDateTemp.arrDate);
    
  },[tbDateTemp])

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <DatePicker onChange={onDateChange} value={currDate} placeholder="Дата начало" />
      <InputNumber min={1} max={15} placeholder="Дней" value={valueNumberDay} onChange={onNumberChange}/>
      <InputNumber min={1} max={30} placeholder="Мест" onChange={onNumberQuantitySeats}/>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Добавить дату
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

// export default TourEditPageTableDate;