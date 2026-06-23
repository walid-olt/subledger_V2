import { NotFoundError } from "../utils/errors.js";
import Transaction from "../models/Transaction.model.js";

const createTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

const updateTransaction = async (transactionId, transactionData) => {
  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    transactionData,
    { new: true },
  );

  if (!transaction) {
    throw new NotFoundError("Transaction not found");
  }

  return transaction;
};

const getTransactionsByUser = async (userId) => {
  return await Transaction.find({ user: userId });
};
// admin/users/:userId/subscriptions/:subscriptionId/transactions
const getTransactionsBySubscription = async (subscriptionId) => {
  return await Transaction.find({ subscription: subscriptionId });
};

export default {
  createTransaction,
  updateTransaction,
  getTransactionsByUser,
  getTransactionsBySubscription,
};
