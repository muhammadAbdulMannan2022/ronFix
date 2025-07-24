


import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { useGetDashboardInfoQuery, useMonthlyRevenueQuery } from "../../redux/features/baseApi";
import { IoChevronDownOutline } from "react-icons/io5";

// Month names for X-axis
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Process backend data into chart format
const processChartData = (backendData, year) => {
  const yearData = backendData.find((item) => item.year === year);
  if (!yearData) return [];

  return yearData.data.map((value, index) => ({
    month: monthNames[index],
    value: value,
    formattedValue: value.toLocaleString(),
  }));
};

export default function Admin_home() {
  const [period, setPeriod] = useState("2025"); 
  const { data: dashboardData } = useGetDashboardInfoQuery();
  const { data: revenueInfo } = useMonthlyRevenueQuery();

  // Assuming revenueInfo contains the backend data you provided
  const revenueData = revenueInfo?.all_revenue_data
    ? processChartData(revenueInfo.all_revenue_data, parseInt(period))
    : [];
  const submissionsData = revenueInfo?.all_submission_data
    ? processChartData(revenueInfo.all_submission_data, parseInt(period))
    : [];

  
  const revenuePeak = revenueData.reduce((max, item) => (item.value > max.value ? item : max), revenueData[0] || {});
  const submissionPeak = submissionsData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    submissionsData[0] || {}
  );

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Users"
          value={dashboardData?.total_user}
          icon={<UsersIcon className="h-5 w-5 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
        <StatCard
          title="Total Revenue"
          value={dashboardData?.total_revenue}
          icon={<DollarIcon className="h-5 w-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Total Completion Rate"
          value={dashboardData?.complete_rate}
          icon={<CheckSquareIcon className="h-5 w-5 text-amber-600" />}
          change={4.3}
          trend="down"
          period="yesterday"
          bgColor="bg-amber-50"
        />
        <StatCard
          title="Active Submissions"
          value={dashboardData?.submission_count}
          icon={<ClockIcon className="h-5 w-5 text-green-600" />}
          bgColor="bg-green-50"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025">2025</option>
                {/* Add more years if backend supports multiple years */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <IoChevronDownOutline />

              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                {revenuePeak.month && (
                  <ReferenceDot x={revenuePeak.month} y={revenuePeak.value} r={4} fill="#3b82f6" stroke="none">
                    <label position="top" fill="#3b82f6" fontSize={12}>
                      {revenuePeak.formattedValue}
                    </label>
                  </ReferenceDot>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Submissions Chart */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Total Submissions</h2>
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025">2025</option>
                {/* Add more years if backend supports multiple years */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoChevronDownOutline />
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={submissionsData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#22c55e" fillOpacity={1} fill="url(#colorSubmissions)" />
                {submissionPeak.month && (
                  <ReferenceDot x={submissionPeak.month} y={submissionPeak.value} r={4} fill="#22c55e" stroke="none">
                    <label position="top" fill="#22c55e" fontSize={12}>
                      {submissionPeak.formattedValue}
                    </label>
                  </ReferenceDot>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modified CustomTooltip to show month
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{`Month: ${payload[0].payload.month}`}</p>
        <p className="text-gray-700">{`Value: ${payload[0].payload.formattedValue}`}</p>
      </div>
    );
  }
  return null;
}

// StatCard and Icons remain unchanged
function StatCard({ title, value, icon, change, trend, period, bgColor }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      </div>
    </div>
  );
}

function UsersIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

function DollarIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

function CheckSquareIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}