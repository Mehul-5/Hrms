// @ts-nocheck
'use client';

import { useQuery } from '@apollo/client/react'; // <-- Turbopack needs this
import { GET_LEAVE_BALANCES } from '../../../graphql/query/getLeaveBalances';
import Link from 'next/link';

export default function LeaveBalancesPage() {
  const { data, loading, error } = useQuery(GET_LEAVE_BALANCES, {
    fetchPolicy: 'network-only', // Always fetches the freshest data
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Leave Balances</h1>
          <Link 
            href="/leave" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            + Request Leave
          </Link>
        </div>

        {loading && <div className="text-gray-500">Loading balances...</div>}
        {error && <div className="text-red-500">Error fetching balances: {error.message}</div>}

        {!loading && !error && data && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Allowed</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.leaveBalances.nodes.map((balance: any) => {
                  const remaining = balance.totalAllowed - balance.used - balance.pending;
                  
                  return (
                    <tr key={balance.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {balance.leaveType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {balance.totalAllowed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {balance.used}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium text-right">
                        {balance.pending}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                        {remaining}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}