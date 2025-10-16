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
    Edit,
    Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function CourseDetailPage() {
    const navigate = useRouter();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Guruhlar");
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/courses/${id}`)
                .then((res) => res.json())
                .then((data) => setCourse(data))
                .catch((err) => console.error("Xatolik:", err));
        }
    }, [id]);

    const tabs = ["Guruhlar", "Darajalar", "Onlayn Darslar va materiallar", "Materiallar"];

    if (!course) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-500">
                Yuklanmoqda...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header>
                <nav className="flex items-center p-5 px-10 shadow-md justify-between bg-white">
                    <div className="flex gap-10 items-center">
                        <UmbrellaIcon
                            className="w-12 h-12 text-gray-600 cursor-pointer hover:text-yellow-500"
                            onClick={() => navigate.push("/course")}
                        />
                        <PlusCircle className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
                    </div>

                    <input
                        type="text"
                        className="rounded-4xl px-5 w-[550px] py-2 bg-gray-100 outline-none"
                        placeholder="Qidiruv"
                    />

                    <div className="flex items-center gap-5">
                        <h1 className="text-lg font-semibold">Yangi Dizayn</h1>
                        <Maximize2 className="w-6 h-6 text-gray-600" />
                        <HelpCircle className="w-6 h-6 text-gray-600" />
                        <Clock className="w-6 h-6 text-gray-600" />
                        <Bell className="w-6 h-6 text-gray-600" />
                        <div className="flex items-center gap-2">
                            <h1 className="font-semibold">Rixsiboyev Abdullox</h1>
                            <Image
                                src="/profile.jpg"
                                alt="profile"
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex">
                <aside className="flex flex-col min-h-screen w-[100px] shadow-md items-center bg-white">
                    {[
                        { icon: <Users size={28} />, title: "Lidlar", path: "/leads" },
                        { icon: <User2 size={28} />, title: "O‘qituvchilar", path: "/teacher" },
                        { icon: <ClipboardList size={28} />, title: "Guruhlar", path: "/group" },
                        { icon: <BookOpen size={28} />, title: "Talabalar", path: "/talabalar" },
                        { icon: <Wallet size={28} />, title: "Moliya" },
                        { icon: <BarChart size={28} />, title: "Hisobotlar" },
                        { icon: <Settings size={28} />, title: "Sozlamalar", path: "/sozlamalar" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            onClick={() => item.path && navigate.push(item.path)}
                            className="flex flex-col border-l-4 border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 cursor-pointer w-full justify-center items-center py-5"
                        >
                            {item.icon}
                            <h1 className="text-[14px] text-center">{item.title}</h1>
                        </div>
                    ))}
                </aside>

                <section className="flex-1 p-8">
                    <h1 className="text-2xl font-semibold mb-6">{course.name}</h1>

                    <div className="flex gap-10">
                        <div className="bg-white shadow-md rounded-xl w-[400px] overflow-hidden">
                            <div className="relative">
                                <div className="bg-orange-300 h-[300px] flex items-center justify-center">
                                    <h1 className="text-2xl font-semibold text-white">{course.name}</h1>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                                        <Edit size={18} />
                                    </button>
                                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-5 space-y-3 text-gray-700">
                                <p><strong>Tavsif:</strong> {course.description || "Tavsif mavjud emas"}</p>
                                <p><strong>Narx:</strong> {course.price} UZS</p>
                                <p><strong>Soatlar:</strong> {course.duration_hours}</p>
                                <p><strong>Davomiyligi (oy):</strong> {course.duration_months}</p>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex border-b border-gray-300 mb-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 pb-2 font-medium ${activeTab === tab
                                            ? "text-yellow-600 border-b-2 border-yellow-600"
                                            : "text-gray-600 hover:text-yellow-600"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {activeTab === "Guruhlar" && (
                                <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center w-[450px]">
                                    <div>
                                        <span className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium mr-3">P-1</span>
                                        <span className="font-medium">Achilova Nigina</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <p>05.07.2024 – 01.01.2026</p>
                                        <p>Toq kunlar | 12:00</p>
                                    </div>
                                </div>
                            )}

                            {activeTab !== "Guruhlar" && (
                                <div className="bg-white shadow rounded-lg p-10 text-center text-gray-400">
                                    <p>{activeTab} bo‘yicha ma’lumot yo‘q</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
