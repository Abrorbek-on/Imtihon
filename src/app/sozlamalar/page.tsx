'use client'
import Image from 'next/image'
import React from 'react'
import { Maximize2, HelpCircle, Clock, Bell, PlusCircle, UmbrellaIcon, Plus, Users2, Filter, Calendar, Tag, User, Users, User2, ClipboardList, BookOpen, Wallet, BarChart, Settings, LogOut, FileText, Archive, Bed, Building2, Map, CreditCard, Headphones, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
function Page() {
    const navigate = useRouter()

    return (
        <div>
            <header>
                <nav className='flex items-center p-5 px-10 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] justify-between'>
                    <div className='flex gap-10 items-center'>
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
            <main className='flex'>
                <section>
                    <div className='flex flex-col min-h-screen  shadow-[7px_5px_6px_0px_rgba(0,_0,_0,_0.1)] items-center'>
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
                <section className="w-full   p-10 overflow-y-auto">
                    <div className="max-w-5xl  bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-800 mb-10 flex items-center gap-3"><Settings className="text-yellow-500" /> Sozlamalar bo‘limi</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                            <div onClick={() => navigate.push('/course')} className="p-5 rounded-xl border border-gray-500 hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center text-center">
                                <BookOpen className="w-8 h-8 text-yellow-500 mb-3" />
                                <h2 className="text-lg font-semibold">Kurslar</h2>
                            </div>
                            <div onClick={() => navigate.push('/xona')} className="p-5 rounded-xl border border-gray-500 hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center text-center">
                                <Building2 className="w-8 h-8 text-yellow-500 mb-3" />
                                <h2 className="text-lg font-semibold">Xonalar</h2>
                            </div>
                            <div onClick={() => navigate.push('/login')} className="p-5 rounded-xl border border-gray-500 hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center text-center">
                                <Building2 className="w-8 h-8 text-yellow-500 mb-3" />
                                <h2 className="text-lg font-semibold">Chiqish</h2>
                            </div>

                        </div>  
                    </div>
                </section>
            </main>
        </div>
    )
}


export default Page


