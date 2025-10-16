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
      <aside className="w-[100px] bg-white shadow-md flex flex-col items-center py-8 gap-5">
        <UmbrellaIcon className="w-10 h-10 text-gray-600 hover:text-yellow-500 cursor-pointer" />
        <div className="flex flex-col items-center gap-6 mt-5">
          <div
            onClick={() => navigate.push("/leads")}
            className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer"
          >
            <Users size={28} />
            <p className="text-[14px]">Lidlar</p>
          </div>
          <div
            onClick={() => navigate.push("/teacher")}
            className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer"
          >
            <User2 size={28} />
            <p className="text-[14px]">O‘qituvchilar</p>
          </div>
          <div
            onClick={() => navigate.push("/group")}
            className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer"
          >
            <ClipboardList size={28} />
            <p className="text-[14px]">Guruhlar</p>
          </div>
          <div
            onClick={() => navigate.push("/talabalar")}
            className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer"
          >
            <BookOpen size={28} />
            <p className="text-[14px]">Talabalar</p>
          </div>
          <div className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer">
            <Wallet size={28} />
            <p className="text-[14px]">Moliya</p>
          </div>
          <div className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer">
            <BarChart size={28} />
            <p className="text-[14px]">Hisobotlar</p>
          </div>
          <div
            onClick={() => navigate.push("/sozlamalar")}
            className="flex flex-col items-center text-yellow-600 border-l-4 border-yellow-600 pl-2 cursor-pointer"
          >
            <Settings size={28} />
            <p className="text-[14px] font-medium">Sozlamalar</p>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="shadow-sm bg-white px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <PlusCircle
              className="w-8 h-8 text-gray-600 cursor-pointer hover:text-black"
              onClick={() => {
                setIsAddOpen(true);
                setIsEditing(false);
                setFormData({ branch_id: 1, name: "", capacity: "" });
              }}
            />
            <input
              type="text"
              placeholder="Qidiruv"
              className="rounded-full px-5 py-2 bg-gray-100 w-[400px] focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <h1 className="font-semibold text-gray-800">Yangi dizayn</h1>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg">
              uz
            </button>
            <Maximize2 className="text-gray-600 w-6 h-6 cursor-pointer" />
            <HelpCircle className="text-gray-600 w-6 h-6 cursor-pointer" />
            <Clock className="text-gray-600 w-6 h-6 cursor-pointer" />
            <Bell className="text-gray-600 w-6 h-6 cursor-pointer" />
            <div className="flex items-center gap-2">
              <p className="font-semibold">Rixiboyev Abdullox</p>
              <Image
                src="/profile.jpg"
                alt="profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>
          </div>
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
