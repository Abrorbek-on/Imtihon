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
    X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Course() {
    const navigate = useRouter();
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration_hours: "",
        duration_months: "",
        description: "",
    });

    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Xatolik:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, duration_hours, duration_months, description } = formData;
        if (!name || !price) {
            alert("Kurs nomi va narxi kiritilishi shart!");
            return;
        }
        const newCourse = {
            name,
            price: Number(price),
            duration_hours: Number(duration_hours),
            duration_months: Number(duration_months),
            description,
            branch_id: 1,
            category_id: 1,
            status: "active",
        };
        try {
            const res = await fetch("http://localhost:5000/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCourse),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Xatolik yuz berdi!");
                return;
            }
            alert("Kurs muvaffaqiyatli qo‘shildi ✅");
            setCourses([...courses, data]);
            setOpen(false);
            setFormData({
                name: "",
                price: "",
                duration_hours: "",
                duration_months: "",
                description: "",
            });
        } catch (error) {
            console.error(error);
            alert("Server bilan bog‘lanishda xatolik!");
        }
    };

    return (
        <div className="relative">
            <header>
                <nav className="flex items-center p-5 px-10 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] justify-between">
                    <div className="flex gap-10 items-center">
                        <UmbrellaIcon className="w-12 h-12 text-gray-600 cursor-pointer hover:text-yellow-500" />
                        <PlusCircle className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="rounded-4xl px-5 w-[550px] py-2 bg-gray-100 outline-none"
                            placeholder="Qidiruv"
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-4">
                            <div className="flex justify-center gap-5">
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
                <section>
                    <div className="flex flex-col min-h-screen shadow-[7px_5px_6px_0px_rgba(0,_0,_0,_0.1)] items-center p-3">
                        {[
                            { icon: <Users size={32} />, title: "Lidlar", path: "/leads" },
                            { icon: <User2 size={32} />, title: "O‘qituvchilar", path: "/teacher" },
                            { icon: <ClipboardList size={32} />, title: "Guruhlar", path: "/group" },
                            { icon: <BookOpen size={32} />, title: "Talabalar" },
                            { icon: <Wallet size={32} />, title: "Moliya" },
                            { icon: <BarChart size={32} />, title: "Hisobotlar" },
                            { icon: <Settings size={32} />, title: "Sozlamalar", path: "/sozlamalar" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => item.path && navigate.push(item.path)}
                                className="flex flex-col cursor-pointer border-l-4 border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center py-5"
                            >
                                {item.icon}
                                <h1 className="text-[18px]">{item.title}</h1>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex-1 bg-gray-50 p-10 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Kurslar</h1>
                        <button
                            onClick={() => setOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-lg"
                        >
                            Yangisini qo‘shish
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => navigate.push(`/course/${course.id}`)}
                                className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                            >
                                <div className="bg-orange-200 h-60 flex items-center justify-center">
                                    <Image
                                        src="/assets/books.png"
                                        alt="books"
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="p-4 bg-white">
                                    <h2 className="font-semibold text-lg">{course.name}</h2>
                                    <p className="text-gray-600 text-sm mt-2">{course.price} UZS</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {open && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 bg-opacity-30 z-40"
                        onClick={() => setOpen(false)}
                    ></div>
                    <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold">Yangi kurs qo‘shish</h2>
                            <X
                                className="w-6 h-6 cursor-pointer text-gray-500 hover:text-black"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Kurs nomi</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full border rounded-md p-2 mt-1 bg-gray-50 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Narx</label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="number"
                                    className="w-full border rounded-md p-2 mt-1 bg-gray-50 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Dars davomiyligi (soat)</label>
                                <select
                                    name="duration_hours"
                                    value={formData.duration_hours}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2 mt-1 bg-gray-50 outline-none"
                                >
                                    <option value="">Tanlang</option>
                                    <option value="60">60 daqiqa</option>
                                    <option value="90">90 daqiqa</option>
                                    <option value="120">120 daqiqa</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Kurs davomiyligi (oylarda)</label>
                                <input
                                    name="duration_months"
                                    value={formData.duration_months}
                                    onChange={handleChange}
                                    type="number"
                                    className="w-full border rounded-md p-2 mt-1 bg-gray-50 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Izoh</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border rounded-md p-2 mt-1 bg-gray-50 outline-none resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg mt-3"
                            >
                                Saqlash
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default Course;
