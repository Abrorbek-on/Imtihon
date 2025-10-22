'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
    Maximize2, HelpCircle, Clock, Bell, PlusCircle, UmbrellaIcon, Plus,
    Users, User2, ClipboardList, BookOpen, Wallet, BarChart, Settings
} from 'lucide-react'
import { useRouter } from 'next/navigation'

function Page() {
    const navigate = useRouter();
    const [teachers, setTeachers] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [form, setForm] = useState({
        fullname: "",
        gender: "",
        email: "",
        phone: "",
        photo: "",
        birthday: "",
        password: "",
        branch_id: 1,
        status: "active",
    });

    useEffect(() => { fetchTeachers(); }, []);

    const fetchTeachers = async () => {
        try {
            const res = await fetch("http://localhost:5000/students");
            if (!res.ok) throw new Error('Server xatoligi');
            const data = await res.json();
            setTeachers(data);
        } catch (err) {
            console.error('O‘qituvchilarni olishda xatolik:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.gender) {
            alert("Iltimos, jinsni tanlang");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Qo‘shishda xatolik");
            const newTeacher = await res.json();
            setTeachers([...teachers, newTeacher]);
            setIsAddOpen(false);
            setForm({
                fullname: "", gender: "", email: "", phone: "", photo: "",
                birthday: "", password: "", branch_id: 1,
                status: "active", description: ""
            });
        } catch (err) {
            console.error("handleAdd xatolik:", err);
        }
    };

    const handleEdit = (teacher) => {
        console.log("Tanlangan student:", teacher);
        setSelectedTeacher(teacher);
        setForm({ ...teacher });
        setIsAddOpen(true);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            if (!form.id && form._id) form.id = form._id;

            console.log("Yangilanish ID:", form.id);

            const response = await fetch(`http://localhost:5000/students/${form.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error("Yangilashda xatolik");
            const data = await response.json();
            console.log("Yangilandi:", data);
            alert("Talaba yangilandi!");
            setIsAddOpen(false);
            fetchTeachers();
        } catch (error) {
            console.error("handleUpdate xatolik:", error);
        }
    };


    const handleDelete = async (id) => {
        if (!confirm("O‘chirishni tasdiqlaysizmi?")) return;
        try {
            const res = await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error('O‘chirishda xatolik');
            setTeachers(teachers.filter(t => t.id !== id));
        } catch (err) {
            console.error("handleDelete xatolik:", err);
        }
    };

    return (
        <div>
            <header>
                <nav className='flex items-center p-5 px-10 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] justify-between'>
                    <div className='flex gap-10 items-center'>
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

            <main className="flex">
                <section>
                    <div className='flex flex-col min-h-screen shadow-[7px_5px_6px_0px_rgba(0,_0,_0,_0.1)] items-center'>
                        <div onClick={() => navigate.push('/leads')} className='flex border-l-4 cursor-pointer border-white hover:border-yellow-600 w-35 h-25 flex-col justify-center items-center transition'>
                            <Users size={32} />
                            <h1 className='text-[20px]'>Lidlar</h1>
                        </div>
                        <div onClick={() => navigate.push('/teacher')} className='flex flex-col border-l-4 cursor-pointer border-white hover:border-yellow-600 w-35 h-25 justify-center items-center transition'>
                            <User2 size={32} />
                            <h1 className='text-[20px]'>O‘qituvchilar</h1>
                        </div>
                        <div onClick={() => navigate.push('/group')} className='flex cursor-pointer flex-col border-l-4 border-white hover:border-yellow-600 w-35 h-25 justify-center items-center transition'>
                            <ClipboardList size={32} />
                            <h1 className='text-[20px]'>Guruhlar</h1>
                        </div>
                        <div onClick={() => navigate.push("/talabalar")} className='flex flex-col border-l-4 border-white cursor-pointer hover:border-yellow-600 w-35 h-25 justify-center items-center transition'>
                            <BookOpen size={32} />
                            <h1 className='text-[20px]'>Talabalar</h1>
                        </div>
                        <div className='flex flex-col border-l-4 border-white cursor-pointer hover:border-yellow-600 w-35 h-25 justify-center items-center transition'>
                            <Wallet size={32} />
                            <h1 className='text-[20px]'>Moliya</h1>
                        </div>
                        <div className='flex flex-col w-35 h-25 border-l-4 cursor-pointer hover:border-yellow-600 border-white justify-center items-center transition'>
                            <BarChart size={32} />
                            <h1 className='text-[20px]'>Hisobotlar</h1>
                        </div>
                        <div onClick={() => navigate.push('/sozlamalar')} className='flex flex-col cursor-pointer w-35 h-25 border-l-4 hover:border-yellow-600 border-white justify-center items-center transition'>
                            <Settings size={32} />
                            <h1 className='text-[20px]'>Sozlamalar</h1>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-8 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                                <Users className="text-orange-500 w-8 h-8" /> O‘qituvchilar
                            </h1>
                            <span className="bg-gray-100 text-gray-700 text-base font-semibold px-4 py-1.5 rounded-full shadow-inner">
                                Jami — {teachers.length}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                setIsAddOpen(true);
                                setSelectedTeacher(null);
                                setForm({
                                    fullname: "", gender: "", email: "", phone: "",
                                    photo: "", birthday: "", password: "", branch_id: 1,
                                    status: "active", description: ""
                                });
                            }}
                            className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-md transition active:scale-95">
                            <Plus className="w-5 h-5" /> Yangi o‘qituvchi
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-base font-semibold">
                                <tr>
                                    <th className="px-8 py-4 border-b border-gray-300">Ism</th>
                                    <th className="px-8 py-4 border-b border-gray-300">Email</th>
                                    <th className="px-8 py-4 border-b border-gray-300">Telefon</th>
                                    <th className="px-8 py-4 border-b border-gray-300">Status</th>
                                    <th className="px-8 py-4 border-b border-gray-300">Amallar</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-base">
                                {teachers.map((t, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => navigate.push(`/talabalar/${t.id}`)}
                                        className={`cursor-pointer border-b border-gray-200 hover:bg-orange-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                            }`}
                                    >
                                        <td className="px-8 py-5 font-semibold">{t.fullname}</td>
                                        <td className="px-8 py-5">{t.email}</td>
                                        <td className="px-8 py-5">{t.phone}</td>
                                        <td className="px-8 py-5">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${t.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-200 text-gray-700'
                                                    }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 flex gap-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(t);
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Tahrirlash
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(t.id);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                O‘chirish
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {isAddOpen && (
                        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
                            <div className="bg-white w-[420px] h-full p-8 flex flex-col gap-6 shadow-2xl animate-slideLeft">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold">{selectedTeacher ? 'O‘qituvchini tahrirlash' : 'Yangi o‘qituvchi qo‘shish'}</h1>
                                    <button onClick={() => setIsAddOpen(false)} className="text-gray-500 text-xl hover:text-black">✕</button>
                                </div>

                                <form className="flex flex-col gap-4" onSubmit={selectedTeacher ? handleUpdate : handleAdd}>
                                    <input type="text" name="fullname" value={form.fullname} onChange={handleChange} placeholder="Ism" className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
                                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
                                    <select name="gender" value={form.gender} onChange={handleChange} className="border rounded-xl px-4 py-3 w-full">
                                        <option value="">Tanlang</option>
                                        <option value="MALE">Erkak</option>
                                        <option value="FEMALE">Ayol</option>
                                    </select>
                                    <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon" className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
                                    <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Status" className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
                                    <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-md transition active:scale-95 mt-auto">Saqlash</button>
                                </form>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            <style jsx>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideLeft {
          animation: slideLeft 0.3s ease-out;
        }
      `}</style>
        </div>
    )
}

export default Page
