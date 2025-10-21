"use client";
import React, { useEffect, useState } from "react";
import {
  Maximize2,
  HelpCircle,
  Clock,
  Bell,
  PlusCircle,
  UmbrellaIcon,
  Users,
  User2,
  ClipboardList,
  BookOpen,
  Wallet,
  BarChart,
  Settings,
  Trash2,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

function Xona() {
  const navigate = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    branch_id: 1,
    name: "",
    capacity: "",
  });

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Xonalarni olishda xatolik:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:5000/rooms/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/rooms", formData);
      }

      setIsAddOpen(false);
      setFormData({ branch_id: 1, name: "", capacity: "" });
      setIsEditing(false);
      setEditId(null);
      fetchRooms();
    } catch (err) {
      console.error("Xona saqlashda xatolik:", err);
    }
  };

  const deleteRoom = async (id) => {
    if (confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      try {
        await axios.delete(`http://localhost:5000/rooms/${id}`);
        fetchRooms();
      } catch (err) {
        console.error("Xona o‘chirishda xatolik:", err);
      }
    }
  };

  const editRoom = (room) => {
    setFormData({
      branch_id: room.branch_id || 1,
      name: room.name,
      capacity: room.capacity,
    });
    setEditId(room.id);
    setIsEditing(true);
    setIsAddOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className='flex'>
        <section>
          <div className='flex flex-col min-h-screen items-center'>
            <div onClick={() => navigate.push('/leads')} className='mt-[85px] flex border-l-4 cursor-pointer border-white  hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 flex-col justify-center items-center '>
              <Users size={32} />
              <h1 className='text-[20px]'>Lidlar</h1>
            </div>
            <div onClick={() => navigate.push('/teacher')} className='flex flex-col border-l-4 cursor-pointer border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600  w-35 h-25 justify-center items-center '>
              <User2 size={32} />
              <h1 className='text-[20px]'>O‘qituvchilar</h1>
            </div>
            <div onClick={() => navigate.push('/group')} className='flex cursor-pointer flex-col border-l-4 border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25  justify-center items-center '>
              <ClipboardList size={32} />
              <h1 className='text-[20px]'>Guruhlar</h1>
            </div>

            <div onClick={() => navigate.push("/talabalar")} className='flex flex-col border-l-4 border-white cursor-pointer hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center '>
              <BookOpen size={32} />
              <h1 className='text-[20px]'>Talabalar</h1>
            </div>
            <div className='flex flex-col border-l-4 border-white cursor-pointer hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center '>
              <Wallet size={32} />
              <h1 className='text-[20px]'>Moliya</h1>
            </div>
            <div className='flex flex-col w-35 h-25 border-l-4 cursor-pointer hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 border-white justify-center items-center '>
              <BarChart size={32} />
              <h1
                className='text-[20px]'>Hisobotlar</h1>
            </div>
            <div onClick={() => navigate.push('/sozlamalar')} className='flex flex-col cursor-pointer w-35 h-25 border-l-4 hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 border-white justify-center items-center '>
              <Settings size={32} />
              <h1
                className='text-[20px]'>Sozlamalar</h1>
            </div>
          </div>
        </section>
      </main>

      <div className="flex-1">
        <header>
          <nav className='flex items-center p-5 px-10 justify-between'>
            <div className='flex gap-10 items-center left-0 absolute ml-[35px]'>
              <UmbrellaIcon className='w-12 h-12 text-gray-600 cursor-pointer hover:text-yellow-500' />
              <PlusCircle className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
            </div>
            <div>
              <input
                type="text"
                className='rounded-4xl px-5 w-[550px] py-2 bg-gray-100'
                placeholder='Qidiruv'
              />
            </div>
            <div className='flex items-center gap-5'>
              <div className="flex items-center gap-4">
                <div className='flex justify-center gap-5'>
                  <h1 className="text-lg font-semibold">Yangi Dizayn</h1>
                  <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-3 py-1 rounded-lg transition">uz</button>
                </div>
                <Maximize2 className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
                <HelpCircle className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
                <Clock className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
                <Bell className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold">Rixiboyev Abdullox</h1>
                  <Image src="/profile.jpg" alt="profile" width={32} height={32} className="rounded-full object-cover" />
                </div>
              </div>
            </div>
          </nav>
        </header>


        <main className="p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-semibold">Xonalar</h2>
            <button
              onClick={() => {
                setIsAddOpen(true);
                setIsEditing(false);
                setFormData({ branch_id: 1, name: "", capacity: "" });
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg"
            >
              Yangi xona qo‘shish
            </button>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-100">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Ism</th>
                  <th className="py-3 px-4">Sig‘imi</th>
                  <th className="py-3 px-4">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{room.id}</td>
                    <td className="py-3 px-4">{room.name}</td>
                    <td className="py-3 px-4">{room.capacity}</td>
                    <td className="py-3 px-4 flex gap-3">
                      <Pencil
                        className="w-4 h-4 text-gray-600 hover:text-blue-500 cursor-pointer"
                        onClick={() => editRoom(room)}
                      />
                      <Trash2
                        className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer"
                        onClick={() => deleteRoom(room.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isAddOpen && (
        <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">
              {isEditing ? "Xonani tahrirlash" : "Yangi xona qo‘shish"}
            </h2>
            <button
              onClick={() => setIsAddOpen(false)}
              className="text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-600">Ism</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Masalan: Orange"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Xona sig‘imi</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: Number(e.target.value) })
                }
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Masalan: 12"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
            >
              {isEditing ? "Yangilash" : "Saqlash"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Xona;
