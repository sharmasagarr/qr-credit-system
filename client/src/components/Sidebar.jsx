import { NavLink } from 'react-router-dom';
import {
  FiMenu,
  FiList,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoQrCodeSharp } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#f2f2f2] text-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-4 px-4 sm:px-6 flex items-center gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 text-2xl focus:outline-none cursor-pointer"
          >
            <FiMenu />
          </button>
          <h1 className="text-xl font-bold text-gray-700">User Panel</h1>
        </div>

        <div className="h-[calc(100%-4rem)] flex flex-col justify-between px-4 pb-4 pt-2">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? 'bg-gray-300' : 'hover:bg-gray-200'
                }`
              }
            >
              <MdDashboard />
              Dashboard
            </NavLink>

            <NavLink
              to="/managecredits"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? 'bg-gray-300' : 'hover:bg-gray-200'
                }`
              }
            >
              <FaRegMoneyBillAlt />
              Manage Credits
            </NavLink>

            {/* Manage QRs with Dropdown */}
            <button
              onClick={() => setQrOpen(!qrOpen)}
              className="cursor-pointer flex items-center justify-between gap-3 px-4 py-2 rounded-md text-sm font-medium transition hover:bg-gray-200 w-full"
            >
              <span className="flex items-center gap-3">
                <IoQrCodeSharp />
                Manage QRs
              </span>
              {qrOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {qrOpen && Array.isArray(user?.services) && user.services.length > 0 && (
              <div className="pl-10 flex flex-col space-y-1">
                {user.services.map((service) => (
                  <NavLink
                    key={service}
                    to={`/manageQRs/${service}`}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-sm py-1 rounded transition ${
                        isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-500'
                      }`
                    }
                  >
                    {service
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                    }
                  </NavLink>
                ))}
              </div>
            )}

            {/* Other navigation items */}
            <NavLink
              to="/transactions"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? 'bg-gray-300' : 'hover:bg-gray-200'
                }`
              }
            >
              <FiList />
              Transactions
            </NavLink>

            <NavLink
              to="/report"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? 'bg-gray-300' : 'hover:bg-gray-200'
                }`
              }
            >
              <TbReportSearch />
              Reports
            </NavLink>
          </nav>

          <NavLink
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition hover:bg-red-200 text-red-600"
          >
            <FiLogOut />
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}