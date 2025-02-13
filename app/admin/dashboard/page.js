'use client'

import { ArrowUp, BookCheck, NewspaperIcon, Users } from "lucide-react";

const AdminRootPage = () => {

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="flex gap-4 flex-wrap items-center" >
        <div className="flex flex-1 gap-4 flex-col w-48 h-40 bg-white rounded-lg shadow-md py-4">
          <div className="flex gap-4 pr-3">
            <div className="flex gap-6 flex-1">
              <div className="w-1 h-10 bg-blue-700 rounded-full"/>
              <Users className="p-2 rounded-full size-10 text-white bg-blue-700 shadow-lg shadow-blue-700"/>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-100 px-[7px] self-start">
              <ArrowUp className="size-3 text-blue-700"/>
              <p className="text-blue-700 text-[14px]">4.5%</p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-gray-400">Total users</p>
            <p className="font-bold text-[1.15rem]">137</p>
          </div>
        </div>
        <div className="flex flex-1 gap-4 flex-col w-48 h-40 bg-white rounded-lg shadow-md py-4">
          <div className="flex gap-4 pr-3">
            <div className="flex gap-6 flex-1">
              <div className="w-1 h-10 bg-orange-700 rounded-full"/>
              <BookCheck className="p-3 rounded-full size-10 text-white bg-orange-700 shadow-lg shadow-orange-700"/>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-orange-100 px-[7px] self-start">
              <ArrowUp className="size-3 text-orange-700"/>
              <p className="text-orange-700 text-[14px]">0.5%</p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-gray-400">All blogs</p>
            <p className="font-bold text-[1.15rem]">76</p>
          </div>
        </div>
        <div className="flex flex-1 gap-4 flex-col w-48 h-40 bg-white rounded-lg shadow-md py-4">
          <div className="flex gap-4 pr-3">
            <div className="flex gap-6 flex-1">
              <div className="w-1 h-10 bg-green-700 rounded-full"/>
              <NewspaperIcon className="p-2 rounded-full size-10 text-white bg-green-700 shadow-lg shadow-green-700"/>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-[7px] self-start">
              <ArrowUp className="size-3 text-green-700"/>
              <p className="text-green-700 text-[14px]">4.5%</p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-gray-400">My Blogs</p>
            <p className="font-bold text-[1.15rem]">21</p>
          </div>
        </div>
        <div className="flex flex-1 gap-4 flex-col w-48 h-40 bg-white rounded-lg shadow-md py-4">
          <div className="flex gap-4 pr-3">
            <div className="flex gap-6 flex-1">
              <div className="w-1 h-10 bg-purple-700 rounded-full"/>
              <Users className="p-2 rounded-full size-10 text-white bg-purple-700 shadow-lg shadow-purple-700"/>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-purple-100 px-[7px] self-start">
              <ArrowUp className="size-3 text-purple-700"/>
              <p className="text-purple-700 text-[14px]">4.5%</p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-gray-400">Total users</p>
            <p className="font-bold text-[1.15rem]">137</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-[1000px] rounded-lg p-4">
        <p className="font-bold text-2xl">Graph</p>
      </div>
    </div>
  )
}

export default AdminRootPage