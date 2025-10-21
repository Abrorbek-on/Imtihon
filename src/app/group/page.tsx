"use client"

import { useState, useEffect } from "react"
import {
    Maximize2,
    HelpCircle,
    Clock,
    Bell,
    PlusCircle,
    UmbrellaIcon,
    Plus,
    Filter,
    Calendar,
    Tag,
    User,
    Users,
    User2,
    ClipboardList,
    BookOpen,
    Wallet,
    BarChart,
    Settings,
    X,
    Edit,
    Trash2,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Group {
    id: number
    name: string
    branch_id: number
    course_id: number
    room_id: number
    teacher_id: number
    status: string
    days: string[]
    start_time: string
    start_date: string
    end_date: string
    branch?: { name: string }
    course?: { name: string }
    room?: { name: string }
    teacher?: { first_name: string; last_name: string }
}

const API_URL = "http://localhost:5000/groups"
const filterOptions = ["Faol guruhlar", "O'qituvchi", "Kurslar bo'yicha", "Teglar"]

export default function Group() {
    const router = useRouter()
    const [groupsData, setGroupsData] = useState<Group[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingGroup, setEditingGroup] = useState<Group | null>(null)
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        branch_id: "",
        course_id: "",
        room_id: "",
        teacher_id: "",
        status: "ACTIVE",
        days: [] as string[],
        start_time: "",
        start_date: "",
        end_date: "",
    })
    const daysOptions = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]

    const fetchGroups = async () => {
        try {
            setLoading(true)
            const response = await fetch(API_URL)
            if (!response.ok) throw new Error("Failed to fetch groups")
            const data = await response.json()
            setGroupsData(data)
        } catch (error) {
            console.error("Error fetching groups:", error)
            alert("Guruhlarni yuklashda xatolik yuz berdi")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    const handleCreate = async () => {
        if (!formData.name || formData.days.length === 0) {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring")
            return
        }
        try {
            const safeDate = (value: string) => {
                if (!value) return null
                const d = new Date(value)
                return isNaN(d.getTime()) ? null : d.toISOString()
            }
            const cleanedData = {
                ...formData,
                branch_id: Number(formData.branch_id),
                course_id: Number(formData.course_id),
                room_id: Number(formData.room_id),
                teacher_id: Number(formData.teacher_id),
                start_time: safeDate(formData.start_time),
                start_date: safeDate(formData.start_date),
                end_date: safeDate(formData.end_date),
            }
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedData),
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to create group")
            }
            await fetchGroups()
            setShowModal(false)
            resetForm()
            alert("Guruh muvaffaqiyatli yaratildi!")
        } catch (error) {
            console.error("Error creating group:", error)
            alert("Guruh yaratishda xatolik: " + (error as Error).message)
        }
    }

    const handleUpdate = async () => {
        if (!editingGroup || !formData.name) {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring")
            return
        }
        try {
            const cleanedData = {
                ...formData,
                branch_id: Number(formData.branch_id),
                course_id: Number(formData.course_id),
                room_id: Number(formData.room_id),
                teacher_id: Number(formData.teacher_id),
                start_time: new Date(formData.start_time).toISOString(),
                start_date: new Date(formData.start_date).toISOString(),
                end_date: new Date(formData.end_date).toISOString(),
            }
            const response = await fetch(`${API_URL}/${editingGroup.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedData),
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to update group")
            }
            await fetchGroups()
            setShowModal(false)
            setEditingGroup(null)
            resetForm()
            alert("Guruh muvaffaqiyatli yangilandi!")
        } catch (error) {
            console.error("Error updating group:", error)
            alert("Guruhni yangilashda xatolik: " + (error as Error).message)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Haqiqatan ham bu guruhni o'chirmoqchimisiz?")) return
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
            if (!response.ok) throw new Error("Failed to delete group")
            await fetchGroups()
            alert("Guruh muvaffaqiyatli o'chirildi!")
        } catch (error) {
            console.error("Error deleting group:", error)
            alert("Guruhni o'chirishda xatolik yuz berdi")
        }
    }

    const handleEdit = (group: Group) => {
        setEditingGroup(group)
        setFormData({
            name: group.name,
            branch_id: group.branch_id.toString(),
            course_id: group.course_id.toString(),
            room_id: group.room_id.toString(),
            teacher_id: group.teacher_id.toString(),
            status: group.status,
            days: group.days,
            start_time: group.start_time,
            start_date: group.start_date,
            end_date: group.end_date,
        })
        setShowModal(true)
        setOpenMenuId(null)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            branch_id: "",
            course_id: "",
            room_id: "",
            teacher_id: "",
            status: "ACTIVE",
            days: [],
            start_time: "",
            start_date: "",
            end_date: "",
        })
        setEditingGroup(null)
    }

    const toggleDay = (day: string) => {
        setFormData((prev) => ({
            ...prev,
            days: prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day],
        }))
    }

    const navigate = useRouter()

    return (
        <div>
            <header>
                <nav className="flex items-center p-5 px-10 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] justify-between">
                    <div className="flex gap-10 items-center">
                        <UmbrellaIcon className="w-12 h-12 text-gray-600 cursor-pointer hover:text-yellow-500" />
                        <PlusCircle className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black" />
                    </div>
                    <div>
                        <input type="text" className="rounded-4xl px-5 w-[550px] py-2 bg-gray-100" placeholder="Qidiruv" />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-4">
                            <div className="flex justify-center gap-5">
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
                                <Image src="/abstract-profile.png" alt="profile" width={32} height={32} className="rounded-full object-cover" />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex">
                <section>
                    <div className="flex flex-col min-h-screen shadow-[7px_5px_6px_0px_rgba(0,_0,_0,_0.1)] items-center">
                        <div onClick={() => navigate.push("/leads")} className="flex border-l-4 cursor-pointer border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 flex-col justify-center items-center">
                            <Users size={32} />
                            <h1 className="text-[20px]">Lidlar</h1>
                        </div>
                        <div onClick={() => navigate.push("/teacher")} className="flex flex-col border-l-4 cursor-pointer border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center">
                            <User2 size={32} />
                            <h1 className="text-[20px]">O'qituvchilar</h1>
                        </div>
                        <div onClick={() => navigate.push("/group")} className="flex cursor-pointer flex-col border-l-4 border-white hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center">
                            <ClipboardList size={32} />
                            <h1 className="text-[20px]">Guruhlar</h1>
                        </div>
                        <div onClick={() => navigate.push("/talabalar")} className="flex flex-col border-l-4 border-white cursor-pointer hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center">
                            <BookOpen size={32} />
                            <h1 className="text-[20px]">Talabalar</h1>
                        </div>
                        <div className="flex flex-col border-l-4 border-white cursor-pointer hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 w-35 h-25 justify-center items-center">
                            <Wallet size={32} />
                            <h1 className="text-[20px]">Moliya</h1>
                        </div>
                        <div className="flex flex-col w-35 h-25 border-l-4 cursor-pointer hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 border-white justify-center items-center">
                            <BarChart size={32} />
                            <h1 className="text-[20px]">Hisobotlar</h1>
                        </div>
                        <div onClick={() => navigate.push("/sozlamalar")} className="flex flex-col cursor-pointer w-35 h-25 border-l-4 hover:border-yellow-600 transition-all duration-200 hover:text-yellow-600 border-white justify-center items-center">
                            <Settings size={32} />
                            <h1 className="text-[20px]">Sozlamalar</h1>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-6 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                                <BookOpen className="text-orange-500" /> Guruhlar
                            </h1>
                            <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full shadow-inner">
                                Miqdor — {groupsData.length}
                            </span>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                            onClick={() => {
                                resetForm()
                                setShowModal(true)
                            }}
                        >
                            <Plus className="w-4 h-4" /> Yangisini qo'shish
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {filterOptions.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white/70 backdrop-blur shadow-sm hover:border-orange-300 transition-all">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <select className="bg-transparent outline-none text-gray-700">
                                    <option>{item}</option>
                                </select>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white/70 backdrop-blur shadow-sm hover:border-orange-300 transition-all">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <input type="date" className="bg-transparent outline-none text-gray-700" />
                        </div>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white/70 backdrop-blur shadow-sm hover:border-orange-300 transition-all">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <input type="date" className="bg-transparent outline-none text-gray-700" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Yuklanmoqda...</div>
                    ) : groupsData.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">Guruhlar topilmadi</div>
                    ) : (
                        <div className="space-y-4">
                            {groupsData.map((item) => (
                                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 bg-white shadow-md hover:shadow-xl transition-all border border-gray-100 rounded-xl px-5 py-4 hover:bg-orange-50/40">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                        <p className="text-sm text-gray-500">{item.course?.name || `Course ${item.course_id}`}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="w-4 h-4 text-orange-500" />
                                        {item.teacher ? `${item.teacher.fullname}` : `Teacher ${item.teacher_id}`}
                                    </div>
                                    <div className="text-sm text-gray-700">{item.days.join(", ")}</div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        {new Date(item.start_date).toLocaleDateString()}
                                    </div>
                                    <span className="text-sm text-gray-600">{item.status}</span>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                                        {item.room?.name || `Room ${item.room_id}`}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Tag className="w-4 h-4 text-orange-500" /> {item.branch?.name || item.branch_id}
                                    </div>
                                    <div className="relative">
                                        <button onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)} className="text-orange-500 hover:text-orange-700 font-bold text-lg transition-transform hover:scale-110">
                                            •••
                                        </button>
                                        {openMenuId === item.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                                                <button onClick={() => handleEdit(item)} className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 rounded-t-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-orange-500" />
                                                    Tahrirlash
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                    O'chirish
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
                        <X className="absolute top-4 right-4 cursor-pointer hover:text-red-500" onClick={() => { setShowModal(false); resetForm() }} />
                        <h2 className="text-xl font-bold mb-4">{editingGroup ? "Guruhni Tahrirlash" : "Yangi Guruh Qo'shish"}</h2>
                        <div className="flex flex-col gap-3">
                            <input type="text" placeholder="Guruh nomi *" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            <input type="number" placeholder="Filial ID *" min="1" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500" value={formData.branch_id} onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })} />
                            <input type="number" placeholder="Kurs ID *" min="1" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500" value={formData.course_id} onChange={(e) => setFormData({ ...formData, course_id: e.target.value })} />
                            <input type="number" placeholder="Xona ID *" min="1" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500" value={formData.room_id} onChange={(e) => setFormData({ ...formData, room_id: e.target.value })} />
                            <input type="number" placeholder="O'qituvchi ID *" min="1" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500" value={formData.teacher_id} onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })} />
                            <select className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                            <div className="border rounded-lg p-3">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Dars kunlari *</label>
                                <div className="flex flex-wrap gap-2">
                                    {daysOptions.map((day) => (
                                        <button key={day} type="button" onClick={() => toggleDay(day)} className={`px-3 py-1 rounded-lg text-sm transition-all ${formData.days.includes(day) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Dars vaqti *</label>
                                <input type="datetime-local" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500 w-full" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Boshlanish sanasi *</label>
                                <input type="date" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500 w-full" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Tugash sanasi *</label>
                                <input type="date" className="border px-3 py-2 rounded-lg outline-none focus:border-orange-500 w-full" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                            </div>
                            <button onClick={editingGroup ? handleUpdate : handleCreate} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 mt-2">
                                {editingGroup ? "Yangilash" : "Saqlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
