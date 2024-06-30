import { Button, Checkbox, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import classes from "./UserList.module.scss"
import { deleteManyUser, getUserAll, getUsersList } from "../../redux/userSlice";

const { Search } = Input;

const UserList = () => {
  const navigate = useNavigate();
  const userList = useSelector((store) => store.userList.userList);
  const total = useSelector((store) => store.userList.total);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    fixed: "left",
    onChange: onSelectChange,
  };

  const onSearch = (value) => {
    dispatch(getUsersList({ page: 1, limit, nameSearch: value }));
  };

  const handleConfirmDeleteUser = async (idList) => {
    const list = await deleteManyUser(idList);
    
    Promise.all(list).then(() => {
      dispatch(getUsersList({ page: 1, limit }));
      dispatch(getUserAll());
      toast.success("Xóa thành công!");
      setSelectedRowKeys([]);
    });
  };

  const renderAction = (_, record) => {
    return (
      <div className="d-flex gap-1">
        <Button className={`${classes.btn} ${classes.btn__edit}`}
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/user/${record.id}`)}
        >
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => handleConfirmDeleteUser([record.id])}
          okText="Yes"
          cancelText="No"
        >
          <Button className={`${classes.btn} ${classes.btn__delete}`} icon={<DeleteOutlined />} >
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "First Name",
      sortDirections: ["ascend", "descend"],
      fixed: "left",
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sortDirections: ["descend", "ascend"],
      fixed: "left",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Address",
      dataIndex: "address",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      sorter: (a, b) => new Date(a.birthday) - new Date(b.birthday),
    },
    {
      title: "Department",
      dataIndex: "department",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      fixed: "right",
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const [userFilter, setUserFilter] = useState()
  const [checkedValuesUserFilter, setCheckedValuesUserFilter] = useState()
  const onPaginationChange = (page) => {
    setUserFilter(null)
    // setLimit(pageSize);
    dispatch(getUsersList({ page, limit }));
    onChange(checkedValuesUserFilter)
    // setCheckedValuesUserFilter()
    // setPage(page);
    // // setLimit(pageSize);
    // dispatch(getUsersList({ page, limit }));
  };
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Google',
      value: 'google',
    },
    {
      label: 'Oracle',
      value: 'oracle',
    },
    {
      label: 'Microsoft',
      value: 'microsoft',
    },
  ]
  const onChange = (checkedValues) => {
    setCheckedValuesUserFilter(checkedValues)
    const filter = userList.filter(user => checkedValues.includes(user.department))
    setUserFilter(filter)
  };
  useEffect(() => {
    dispatch(getUsersList({ page, limit: limit }));
    dispatch(getUserAll());
    // handleFilter('Brown')
  }, []);

  return (
    <div className="container">

      <Space className="my-4">
        <Button className={`${classes.btn} ${classes.btn__create__new}`}
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/user/create")}
        >
          Create new User
        </Button>
        <Search
          placeholder="input last name user"
          onSearch={onSearch}
          allowClear
          size='large'
        />
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => handleConfirmDeleteUser(selectedRowKeys)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className={selectedRowKeys.length !== 0 && `${classes.btn} ${classes.btn__delete__many}`}
            // type="primary"
            icon={<DeleteOutlined />}
            disabled={selectedRowKeys.length === 0}
          >
            Delete Many
          </Button>
        </Popconfirm>
        <Checkbox.Group
          options={options}
          onChange={onChange}
        />
      </Space>
      <Table
        // rowClassName={getRowClassName}
        columns={columns}
        dataSource={userFilter?.length ? userFilter : userList}
        rowKey="id"
        rowSelection={rowSelection}
        scroll={{
          x: 900,
          y: 400,
        }}
        pagination={{
          total,
          // showSizeChanger: true,
          current: page,
          pageSize: limit,
          onChange: onPaginationChange,
          // pageSizeOptions: [5, 10, 15],
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
};

export default UserList;
