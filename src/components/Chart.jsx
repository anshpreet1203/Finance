import React from "react";
import { Line, Pie } from "@ant-design/charts";

const Chart = ({ sortTransactions }) => {
  const data = sortTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const ExpData = sortTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  const IncData = sortTransactions.filter((transaction) => {
    if (transaction.type == "income") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  const config = {
    data,
    width: 800,
    height: 400,
    xField: "date",
    yField: "amount",
  };

  const pieConfig = {
    data: ExpData,
    width: 800,
    height: 400,
    angleField: "amount",
    colorField: "tag",
  };

  const incConfig = {
    data: IncData,
    width: 800,
    height: 400,
    angleField: "amount",
    colorField: "tag",
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 my-8">
        <div className="flex gap-16">
          <div className="shadow-custom">
            <h2 className="p-4 text-2xl">Spending Data</h2>
            <Pie {...pieConfig} />
          </div>

          <div className="shadow-custom w-[50%]">
            <h2 className="p-4 text-2xl">Income Data</h2>
            <Pie {...incConfig} className="w-[80%]" />
          </div>
        </div>

        <div className="shadow-custom">
          <h2 className="p-4 text-2xl">Financial Statistics</h2>
          <Line {...config} />;
        </div>
      </div>
    </>
  );
};

export default Chart;
