'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (form.email === 'admin@gmail.com' && form.password === '123456') {
                localStorage.setItem('token', 'fake_admin_token')
                router.push('/')
            } else {
                setError('Email yoki parol noto‘g‘ri!')
            }
        } catch (err) {
            setError('Kirishda xatolik yuz berdi!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-[380px] flex flex-col gap-6 animate-fadeIn">
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-gray-500 text-sm mt-1">Tizimga kirish</p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Parol"
                            required
                            className="w-full border rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg py-3 rounded-2xl shadow-md transition active:scale-95"
                    >
                        {loading ? 'Kirilmoqda...' : <>
                            <LogIn size={20} /> Kirish
                        </>}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-3">
                    ⛔ Faqat administrator uchun
                </p>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
        </div>
    )
}
