import React, { useState } from "react";
import glass from "../assets/search.svg";
import { Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import Button from "./Button";
import Chart from "./Chart";

const TTable = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  let filterTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  const sortedTransactions = filterTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const sortTransactions = transactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    }
  });
  return (
    <div>
      <Chart sortTransactions={sortTransactions} />
      <div className="flex justify-between px-4 mb-8">
        <div className=" w-[80%] py-1 px-2 gap-2 flex items-center justify-start shadow-custom">
          <img src={glass} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-0 p-3 focus:outline-none"
          />
        </div>

        <Select
          value={typeFilter}
          onChange={(value) => setTypeFilter(value)}
          placeholder="Filter"
          allowClear
          className="w-[15%] h-16 shadow-custom"
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="flex justify-between items-center px-5 my-6">
        <h2 className="text-4xl font-bold">My Transactions</h2>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>

        <div className=" w-[40%] flex justify-between gap-5">
          <Button text="Export to CSV" className="w-full" />
          <Button text="Import to CSV" className="w-full" blue={true} />
        </div>
      </div>
      <Table dataSource={sortedTransactions} columns={columns} />;
    </div>
  );
};

export default TTable;
