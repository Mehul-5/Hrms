'use client';

import Link from "next/link";
import { useSession } from "../context/SessionContext";
import { useQuery } from '@apollo/client/react';
import { GET_ANNOUNCEMENTS } from "../graphql/query/getAnnouncements";
import { GET_LEAVE_BALANCES } from "../graphql/query/getLeaveBalances";

export default function Home() {
  const { user, logout } = useSession();

  // 1. Fetch data from the modules you built!
  const { data: announcementData, loading: annLoading } = useQuery(GET_ANNOUNCEMENTS, {
    fetchPolicy: 'network-only',
  });
  
  const { data: leaveData, loading: leaveLoading } = useQuery(GET_LEAVE_BALANCES, {
    fetchPolicy: 'network-only',
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- DASHBOARD HEADER --- */}
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user?.name || user?.email?.split('@')[0] || "Team Member"}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Here is what is happening across the company today.</p>
          </div>
          <button 
            onClick={() => logout()} 
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </header>

        {/* --- MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Wider) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* LATEST ANNOUNCEMENTS WIDGET */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Latest Announcements</h2>
                <Link href="/announcements" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View All &rarr;
                </Link>
              </div>

              {annLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-gray-100 rounded-lg"></div>
                  <div className="h-20 bg-gray-100 rounded-lg"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Show only the top 3 announcements on the dashboard */}
                  {announcementData?.announcements?.nodes?.slice(0, 3).map((ann: any) => (
                    <div key={ann.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800">{ann.title}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {new Date(ann.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{ann.content}</p>
                    </div>
                  ))}
                  {announcementData?.announcements?.nodes?.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No recent announcements.</p>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN (Narrower) */}
          <div className="space-y-8">
            
            {/* QUICK ACTIONS WIDGET */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/announcements" className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                  📢 Post Announcement
                </Link>
                <Link href="/leave" className="flex items-center justify-center p-3 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100 transition-colors">
                  ✈️ Request Leave
                </Link>
              </div>
            </section>

            {/* LEAVE BALANCES WIDGET */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Leave Balance</h2>
              </div>

              {leaveLoading ? (
                <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>
              ) : (
                <div className="space-y-4">
                  {leaveData?.leaveBalances?.nodes?.map((balance: any) => (
                    <div key={balance.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                      <span className="font-medium text-gray-700">{balance.leaveType || 'Annual Leave'}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{balance.pending}</span>
                        <span className="text-xs text-gray-500 ml-1">days left</span>
                      </div>
                    </div>
                  ))}
                  {(!leaveData?.leaveBalances?.nodes || leaveData?.leaveBalances?.nodes?.length === 0) && (
                    <div className="text-center p-4 border border-dashed border-gray-200 rounded-lg">
                      <p className="text-gray-500 text-sm">No leave balances found.</p>
                      <span className="text-xs text-gray-400">Your balances will appear here.</span>
                    </div>
                  )}
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}