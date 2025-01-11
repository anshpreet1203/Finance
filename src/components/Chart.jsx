import React from "react";
import { Line, Pie } from "@ant-design/charts";

const Chart = ({ sortTransactions }) => {
  const data = sortTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const pieData = sortTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
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
    data: pieData,
    width: 800,
    height: 400,
    angleField: "amount",
    colorField: "tag",
  };
  return (
    <>
      <div className="flex justify-center gap-16 my-8">
        <div className="shadow-custom">
          <h2 className="p-4 text-2xl">Financial Statistics</h2>
          <Line {...config} />;
        </div>

        <div className="shadow-custom">
          <h2 className="p-4 text-2xl">Spending Data</h2>
          <Pie {...pieConfig} />
        </div>
      </div>
    </>
  );
};

export default Chart;
