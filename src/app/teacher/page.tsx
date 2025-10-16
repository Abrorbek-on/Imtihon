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
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Teacher() {
    const navigate = useRouter();

    const [teachers, setTeachers] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
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
        try {
            const res = await fetch("http://localhost:5000/teachers");
            const data = await res.json();
            setTeachers(data);
        } catch (error) {
            console.error("O'qituvchilarni olishda xatolik:", error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, birthday: form.birthday || undefined }),
            });

            if (!res.ok) {
                let errorMsg = "Xatolik yuz berdi!";
                try {
                    const errorData = await res.json();
                    errorMsg = errorData?.message || errorMsg;
                } catch { }
                throw new Error(errorMsg);
            }

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

        } catch (error) {
            console.error("O'qituvchi qo'shishda xatolik:", error);
            alert(error.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-[100px] bg-white shadow-md flex flex-col items-center py-8 gap-5">
                <UmbrellaIcon className="w-10 h-10 text-gray-600 hover:text-yellow-500 cursor-pointer" />
                <div className="flex flex-col items-center gap-6 mt-5">
                    <div onClick={() => navigate.push('/leads')} className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer">
                        <Users size={28} />
                        <p className="text-[14px]">Lidlar</p>
                    </div>
                    <div
                        onClick={() => navigate.push("/teacher")}
                        className="flex flex-col items-center text-yellow-600 border-l-4 border-yellow-600 pl-2 cursor-pointer"
                    >
                        <User2 size={28} />
                        <p className="text-[14px] font-medium">O‘qituvchilar</p>
                    </div>
                    <div
                        onClick={() => navigate.push("/group")}
                        className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer"
                    >
                        <ClipboardList size={28} />
                        <p className="text-[14px]">Guruhlar</p>
                    </div>
                    <div onClick={() => navigate.push("/talabalar")} className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer">
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
                        className="flex flex-col items-center text-gray-700 hover:text-yellow-600 cursor-pointer"
                    >
                        <Settings size={28} />
                        <p className="text-[14px]">Sozlamalar</p>
                    </div>
                </div>
            </aside>

            <div className="flex-1">
                <header className="shadow-sm bg-white px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <PlusCircle
                            className="w-8 h-8 text-gray-600 cursor-pointer hover:text-black"
                            onClick={() => setIsAddOpen(true)}
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
                                src="/assets/books.png"
                                alt="profile"
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold mb-6">
                            O‘qituvchilar <span className="text-gray-500">({teachers.length} ta)</span>
                        </h2>

                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg"
                        >
                            O‘qituvchi qo‘shish
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {teachers.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition flex justify-between"
                            >
                                <h3 className="font-semibold text-lg">{t.fullname}</h3>
                                <p className="text-gray-500">{t.phone}</p>
                                {t.description && <p className="text-sm text-gray-400">{t.description}</p>}
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {isAddOpen && (
                <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-semibold">Yangi o‘qituvchi qo‘shish</h2>
                        <button
                            onClick={() => setIsAddOpen(false)}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input type="text" name="fullname" placeholder="Ism" value={form.fullname} onChange={handleChange} className="w-full border rounded-lg p-2" />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded-lg p-2" />
                        <input type="tel" name="phone" placeholder="+998" value={form.phone} onChange={handleChange} className="w-full border rounded-lg p-2" />
                        <input type="date" name="birthday" value={form.birthday} onChange={handleChange} className="w-full border rounded-lg p-2" />

                        <div className="flex items-center gap-4">
                            <label>
                                <input type="radio" name="gender" value="MALE" checked={form.gender === "MALE"} onChange={handleChange} /> Erkak
                            </label>
                            <label>
                                <input type="radio" name="gender" value="FEMALE" checked={form.gender === "FEMALE"} onChange={handleChange} /> Ayol
                            </label>
                        </div>

                        <input type="text" name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} className="w-full border rounded-lg p-2" />
                        <input type="text" name="description" placeholder="Tavsif" value={form.description} onChange={handleChange} className="w-full border rounded-lg p-2" />
                        <input type="password" name="password" placeholder="Parol" value={form.password} onChange={handleChange} className="w-full border rounded-lg p-2" />

                        <button type="submit" className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
                            Saqlash
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Teacher;
