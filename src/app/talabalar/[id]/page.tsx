'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function StudentProfilePro() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await fetch(`http://localhost:5000/students/${params.id}`);
                if (!res.ok) throw new Error("Ma’lumotni olishda xatolik");
                const data = await res.json();
                setStudent(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [params.id]);

    if (loading) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-white">Yuklanmoqda...</div>;
    if (!student) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-500">Talaba topilmadi</div>;

    return (
        <div className="min-h-screen bg-black flex justify-center items-center p-8">
            <div className="bg-gray-900 shadow-2xl rounded-3xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

                <div className="bg-gray-800 md:w-1/3 flex flex-col items-center justify-center p-8 relative">
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 flex items-center gap-2 text-orange-400 hover:text-orange-500 font-semibold"
                    >
                        <ArrowLeft size={20} /> Ortga
                    </button>
                    <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
                        <Image
                            src={'/assets/books.png'}
                            alt="student avatar"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-white">{student.fullname}</h2>
                    <span className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold 
                        ${student.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}>
                        {student.status}
                    </span>
                </div>

                <div className="md:w-2/3 p-8 flex flex-col gap-6">
                    <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Shaxsiy Ma’lumotlar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-400 font-medium">Email</p>
                            <p className="text-white font-semibold">{student.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Telefon</p>
                            <p className="text-white font-semibold">{student.phone}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Jins</p>
                            <p className="text-white font-semibold">{student.gender === 'MALE' ? 'Erkak' : 'Ayol'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Tug‘ilgan sana</p>
                            <p className="text-white font-semibold">{student.birthday}</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mt-6">Qo‘shimcha Ma’lumotlar</h3>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-400 font-medium">Shu yerga boshqa ma’lumotlar kiritishingiz mumkin, masalan: filial, guruh, status tarixi va h.k.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
