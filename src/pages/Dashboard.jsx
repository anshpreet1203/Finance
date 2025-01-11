import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import moment from "moment";
import AddExpense from "../components/AddExpense";
import AddIncome from "../components/AddIncome";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

import TTable from "../components/TTable";
import Chart from "../components/Chart";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);

      toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const unsubscribe = fetchTransactions(); // Set up listener
    return () => unsubscribe && unsubscribe(); // Clean up listener on unmount
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function fetchTransactions() {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let transactionsArray = [];
        snapshot.forEach((doc) => {
          transactionsArray.push({ id: doc.id, ...doc.data() }); // Include document ID
        });
        setTransactions(transactionsArray); // Update state in real-time
        toast.success("Transactions Updated!");
      });

      // Return unsubscribe function to clean up listener on unmount
      return unsubscribe;
    }
  }

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type == "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        Income={income}
        Expense={expense}
        TotalBalance={totalBalance}
      />
      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />

      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />

      <TTable transactions={transactions} />
    </div>
  );
};

export default Dashboard;
