import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import DropOption from 'client/components/drop-option';
import styles from './index.module.less';

const { confirm } = Modal;

const List = ({
  onDeleteItem,
  onEditItem,
  location,
  ...tableProps
}) => {
  location.query = queryString.parse(location.search);

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record);
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk() {
          onDeleteItem(record);
        },
      });
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 64,
      className: styles.avatar,
      render: text => <img alt={'image_url'} width={24} src={text} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Birthday',
      dataIndex: 'birth',
      key: 'birth',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Introduce',
      dataIndex: 'introduce',
      key: 'introduce',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <DropOption
          onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[
            { key: '1', name: 'Update' },
            { key: '2', name: 'Delete' },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({
          [styles.table]: true,
        })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  );
};

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
};

export default List;
