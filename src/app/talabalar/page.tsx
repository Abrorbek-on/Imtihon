"use client";
import React, { useState } from "react";
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
    ChevronDown,
    ChevronUp,
    Edit,
    Trash2,
    User,
    Play,
    Pause,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Talabalar() {
    const navigate = useRouter();
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

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
                    <div onClick={() => navigate.push("/talabalar")}  className="flex flex-col items-center text-yellow-600 border-l-4 border-yellow-600 pl-2 cursor-pointer">
                        <BookOpen size={28} />
                        <p className="text-[14px] font-medium">Talabalar</p>
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
                        <PlusCircle className="w-8 h-8 text-gray-600 cursor-pointer hover:text-black" />
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
                            <p className="font-semibold">Rixsiboyev Abdullox</p>
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

                <main className="p-10 flex flex-col gap-6">
                    <div className="flex gap-6">
                        <div className="bg-white shadow-sm rounded-xl p-6 w-[400px] border">
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-12 h-12 text-gray-500" />
                                </div>
                                <h2 className="text-xl font-semibold">Islam Xusnulin</h2>
                                <p className="text-sm text-gray-500">(id: 1201010)</p>
                            </div>

                            <div className="mt-5 space-y-3 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>Balans:</span>
                                    <span className="text-green-600 font-semibold">0 UZS</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Telefon:</span>
                                    <span>99 473 23 50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Talaba qo‘shilgan sana:</span>
                                    <span>5 октябр 2024</span>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col gap-3">
                                <button className="border rounded-full px-4 py-2 hover:bg-gray-50">
                                    Guruhga qo‘shish
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                                        className="flex items-center justify-between w-full bg-green-500 text-white rounded-full px-4 py-2"
                                    >
                                        <span>To‘lov</span>
                                        {showPaymentOptions ? <ChevronUp /> : <ChevronDown />}
                                    </button>

                                    {showPaymentOptions && (
                                        <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg w-full">
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                                                To‘lovni qaytarish
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-pink-600">
                                                Hisobdan o‘chirish
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium text-gray-800 mb-2">Eslatma</h3>
                                <div className="border-l-4 border-blue-500 pl-3 text-gray-500">
                                    <p>—</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-6">
                            <div className="flex gap-6 text-gray-600 border-b pb-2 text-sm">
                                <button className="text-orange-600 font-semibold border-b-2 border-orange-600">
                                    Guruhlar
                                </button>
                                <button>Izohlar</button>
                                <button>Qo‘ng‘iroq tarixi</button>
                                <button>SMS</button>
                                <button>Tarix</button>
                                <button>Lid tarixi</button>
                            </div>

                            <div className="bg-white shadow-sm rounded-xl p-5 border">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            KE-26 (WH1) <span className="text-sm text-gray-500">Kids English</span>
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Nazarova Maftuna</p>
                                        <p className="text-xs text-gray-500">
                                            14.09.2024 — 14.09.2026 | Juft kunlar 10:30
                                        </p>
                                        <p className="text-sm mt-2">
                                            <span className="text-gray-600">Holat:</span>{" "}
                                            <span className="text-orange-600 font-medium">
                                                Harakatsiz (Sinov darsi)
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Talaba qo‘shilgan sana:{" "}
                                            <span className="font-medium">05.10.2024</span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Bu talaba uchun narx:{" "}
                                            <span className="font-medium">490 000 UZS</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 items-end">
                                        <button className="p-2 bg-green-100 rounded-full hover:bg-green-200">
                                            <Play className="w-5 h-5 text-green-600" />
                                        </button>
                                        <button className="p-2 bg-red-100 rounded-full hover:bg-red-200">
                                            <Pause className="w-5 h-5 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white shadow-sm rounded-xl p-5 border">
                                <h3 className="font-semibold mb-2">Oylik balans xolati</h3>
                                <p className="text-gray-500 text-sm">
                                    Ko‘rsatiladigan ma‘lumotlar yo‘q
                                </p>
                            </div>

                            <div className="bg-white shadow-sm rounded-xl p-5 border">
                                <h3 className="font-semibold mb-2">To‘lovlar</h3>
                                <table className="w-full text-sm">
                                    <thead className="text-gray-600">
                                        <tr>
                                            <th className="text-left py-2">Sana</th>
                                            <th className="text-left py-2">Turi</th>
                                            <th className="text-left py-2">Miqdor</th>
                                            <th className="text-left py-2">Izoh</th>
                                            <th className="text-left py-2">Xodim</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} className="text-center py-3 text-gray-500">
                                                Ma‘lumotlar yo‘q
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Talabalar;
