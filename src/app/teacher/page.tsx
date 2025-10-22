"use client";

import React, { useState, useEffect } from "react";
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
    Edit3,
    X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Teacher() {
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
        coin: 50,
        status: "active",
        description: "",
    });

    const fetchTeachers = async () => {
        const res = await fetch("http://localhost:5000/teachers");
        const data = await res.json();
        setTeachers(data);
    };

    useEffect(() => { fetchTeachers(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/teachers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const newTeacher = await res.json();
        setTeachers([...teachers, newTeacher]);
        setIsAddOpen(false);
        setForm({
            fullname: "",
            gender: "",
            email: "",
            phone: "",
            photo: "",
            birthday: "",
            password: "",
            branch_id: 1,
            coin: 50,
            status: "active",
            description: "",
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("O‘chirishni tasdiqlaysizmi?")) return;
        await fetch(`http://localhost:5000/teachers/${id}`, { method: "DELETE" });
        setTeachers(teachers.filter((t) => t.id !== id));
        setSelectedTeacher(null);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!selectedTeacher?.id) return alert("O‘qituvchi ID topilmadi!");

        const { id, branch, groups, ...payload } = selectedTeacher;

        const res = await fetch(`http://localhost:5000/teachers/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorText = await res.text();
            alert(`Xatolik: ${res.status} - ${errorText}`);
        }

        await fetchTeachers();
        setSelectedTeacher(null);
    };



    return (
        <div className="flex min-h-screen bg-gray-50">
            <main className='flex mt-[85px]'>
                <section>
                    <div className='flex flex-col min-h-screen items-center'>
                        <div onClick={() => navigate.push('/leads')} className='flex border-l-4 cursor-pointer border-white  hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 flex-col justify-center items-center '>
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
                <div>
                    <header>
                        <nav className='flex items-center p-5 px-10 justify-between'>
                            <div className='flex gap-10 items-center left-0 absolute ml-[50px]'>
                                <UmbrellaIcon className='w-12 h-12 text-gray-600 cursor-pointer hover:text-yellow-500'></UmbrellaIcon>
                                <PlusCircle className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black"></PlusCircle>
                            </div>
                            <div>
                                <input type="text" className=' rounded-4xl px-5 w-[550px] py-2 bg-gray-100' placeholder='Qidiruv' />
                            </div>
                            <div className='flex items-center gap-5'>

                                <div className="flex items-center gap-4">
                                    <div className='flex justify-center gap-5'>
                                        <h1 className="text-lg font-semibold">Yangi Dizayn</h1>
                                        <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-3 py-1 rounded-lg transition">
                                            uz
                                        </button>
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
                </div>
                <main className="p-8">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-2xl font-semibold">
                            O‘qituvchilar <span className="text-gray-500">({teachers.length} ta)</span>
                        </h2>
                        <button onClick={() => setIsAddOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg">
                            O‘qituvchi qo‘shish
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {teachers.map((t, i) => (
                            <div key={i} onClick={() => setSelectedTeacher(t)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <img src={t.photo || "/assets/books.png"} alt={t.fullname} className="w-16 h-16 rounded-full object-cover border" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{t.fullname}</h3>
                                        <p className="text-gray-500">{t.phone}</p>
                                        <p className="text-sm text-gray-400">{t.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {isAddOpen && (
                <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-semibold">Yangi o‘qituvchi qo‘shish</h2>
                        <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-black text-2xl">×</button>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input type="text" name="fullname" placeholder="Ism" value={form.fullname} onChange={handleChange} className="border rounded-lg p-2" />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded-lg p-2" />
                        <input type="tel" name="phone" placeholder="+998" value={form.phone} onChange={handleChange} className="border rounded-lg p-2" />
                        <input type="date" name="birthday" value={form.birthday} onChange={handleChange} className="border rounded-lg p-2" />
                        <div className="flex items-center gap-4">
                            <label><input type="radio" name="gender" value="MALE" checked={form.gender === "MALE"} onChange={handleChange} /> Erkak</label>
                            <label><input type="radio" name="gender" value="FEMALE" checked={form.gender === "FEMALE"} onChange={handleChange} /> Ayol</label>
                        </div>
                        <input type="text" name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} className="border rounded-lg p-2" />
                        <input type="text" name="description" placeholder="Tavsif" value={form.description} onChange={handleChange} className="border rounded-lg p-2" />
                        <input type="password" name="password" placeholder="Parol" value={form.password} onChange={handleChange} className="border rounded-lg p-2" />
                        <button type="submit" className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">Saqlash</button>
                    </form>
                </div>
            )}

            {selectedTeacher && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[450px] p-6 relative">
                        <button onClick={() => setSelectedTeacher(null)} className="absolute top-3 right-3 text-gray-400 hover:text-black">
                            <X size={22} />
                        </button>
                        <div className="text-center">
                            <img src={selectedTeacher.photo || "/assets/books.png"} alt={selectedTeacher.fullname} className="w-24 h-24 rounded-full object-cover mx-auto border mb-3" />
                            <h2 className="text-xl font-semibold">{selectedTeacher.fullname}</h2>
                            <p className="text-gray-500">{selectedTeacher.email}</p>
                            <p className="text-gray-500">{selectedTeacher.phone}</p>
                        </div>
                        <form onSubmit={handleEdit} className="mt-5 flex flex-col gap-3">
                            <input name="fullname" value={selectedTeacher.fullname} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, fullname: e.target.value })} className="border rounded-lg p-2" />
                            <input name="email" value={selectedTeacher.email} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })} className="border rounded-lg p-2" />
                            <input name="phone" value={selectedTeacher.phone} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, phone: e.target.value })} className="border rounded-lg p-2" />
                            <textarea name="description" value={selectedTeacher.description || ""} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, description: e.target.value })} className="border rounded-lg p-2" placeholder="Tavsif" />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Edit3 size={18} /> Yangilash
                                </button>
                                <button type="button" onClick={() => handleDelete(selectedTeacher.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Trash2 size={18} /> O‘chirish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Teacher;
