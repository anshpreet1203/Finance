import { Card, Row } from "antd";
import React from "react";
import Button from "./Button";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  Income,
  Expense,
  TotalBalance,
}) => {
  return (
    <div>
      <Row className="flex justify-between gap-3 items-center w-[90%] my-8 mx-auto">
        <Card className="shadow-custom flex-1 " title="Current Balance ">
          <p className="m-0">{TotalBalance}</p>
          <Button text="Reset Balance" blue={true} />
        </Card>

        <Card
          className="shadow-custom min-w-[400px] flex-1 "
          title="Total Income"
        >
          <p className="m-0">{Income}</p>
          <Button text="Add Income" blue={true} OnClick={showIncomeModal} />
        </Card>

        <Card
          className="shadow-custom min-w-[400px] flex-1"
          title="Total Expense"
        >
          <p className="m-0">{Expense}</p>
          <Button text="Add Expense" blue={true} OnClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
