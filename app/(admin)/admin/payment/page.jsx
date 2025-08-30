"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  MoreVertical,
  DollarSign,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getPaymentStats, getAllPayments } from "@/services/admin";
import { showErrorToast } from "@/helpers/toastUtil";

const PaymentPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    stats: [],
    transactions: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setIsLoading(true);

        // Fetch payment stats and transactions in parallel
        const [stats] = await Promise.all([
          getPaymentStats(),
          // getAllPayments(),
        ]);

        // Transform payment stats
        const statsData = [
          {
            title: "Total Revenue",
            value: `₦${stats?.total_revenue?.toLocaleString() || "0"}`,
            icon: DollarSign,
            color: "bg-green-100",
          },
          {
            title: "This Month",
            value: `₦${stats?.monthly_revenue?.toLocaleString() || "0"}`,
            icon: DollarSign,
            color: "bg-blue-100",
          },
          {
            title: "Total Transactions",
            value: stats?.total_transactions?.toString() || "0",
            icon: FileText,
            color: "bg-purple-100",
          },
          {
            title: "Success Rate",
            value: `${stats?.success_rate?.toFixed(1) || "0"}%`,
            icon: DollarSign,
            color: "bg-yellow-100",
          },
        ];

        // Transform transactions
        const transactionsList =
          stats?.payments?.map((payment) => ({
            id: payment.id || payment.transaction_id,
            name:
              `${payment.user?.first_name || ""} ${
                payment.user?.last_name || ""
              }`.trim() || "Unknown User",
            course: payment.course?.title || "Unknown Course",
            amount: `₦${payment.amount?.toLocaleString() || "0"}`,
            paymentMethod: payment.payment_method || "Unknown",
            status: payment.status || "Pending",
            date: payment.created_at
              ? new Date(payment.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Unknown",
          })) || [];

        setPaymentData({
          stats: statsData,
          transactions: transactionsList,
        });
      } catch (error) {
        console.error("Error fetching payment data:", error);
        showErrorToast("Failed to load payment data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  // Filter transactions based on search term
  const filteredTransactions = paymentData.transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13485B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentData.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-[#13485B]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Transactions
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id || index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() =>
                          router.push(`/admin/payment/${transaction.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No transactions found matching your search"
                      : "No transactions available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <span className="text-sm text-gray-700">Page 1 of 10</span>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
