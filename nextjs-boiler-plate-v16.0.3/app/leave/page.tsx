'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react'; // <-- Explicitly pointing to the React package
import { SUBMIT_LEAVE_REQUEST } from '../../graphql/mutation/submitLeaveRequest';

export default function LeaveRequestPage() {
  // Using the dummy EmployeeId we seeded in the database
  const [employeeId] = useState('00000000-0000-0000-0000-000000000000');
  const [leaveType, setLeaveType] = useState('Annual');
  const [daysRequested, setDaysRequested] = useState<number>(1);
  const [message, setMessage] = useState('');

  // Added : any to data
  const [submitLeave, { loading }] = useMutation(SUBMIT_LEAVE_REQUEST, {
    onCompleted: (data: any) => {
      if (data.submitLeaveRequest) {
        setMessage(' Leave request approved and balance updated atomically!');
      }
    },
    // Added : any to error
    onError: (error: any) => {
      setMessage(` Error: ${error.message}`);
    }
  });

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    submitLeave({
      variables: {
        employeeId,
        leaveType,
        daysRequested: parseFloat(daysRequested.toString())
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Leave</h2>
        
        <form onSubmit={handleRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select 
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900 font-medium"
            >
              <option value="Annual">Annual Leave</option>
              <option value="Sick">Sick Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Days Requested</label>
            <input 
              type="number" 
              min="0.5" step="0.5"
              value={daysRequested}
              onChange={(e) => setDaysRequested(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900 font-medium"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Processing...' : 'Submit Request'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-md ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}