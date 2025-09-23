"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Montserrat } from "next/font/google"
import Image from "next/image"

const montserrat = Montserrat({ subsets: ["latin"] })

interface NidInputProps {
  onNidSubmit: (nid: string) => void
}

export default function NidInput({ onNidSubmit }: NidInputProps) {
  const [nid, setNid] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nid.trim()) return

    setIsLoading(true)
    
    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onNidSubmit(nid.trim())
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section con formulario */}
      <div className="relative">
        <div
          className="rounded-[3rem] mx-auto mt-8 overflow-hidden max-w-4xl"
          style={{ background: "linear-gradient(90deg, #7400C2 0%, #430070 100%)" }}
        >
          <div className="relative flex items-center justify-center px-8 py-16 min-h-[500px]">
            {/* Formulario centrado */}
            <div className="z-10 w-full max-w-lg">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6">
                  <Image 
                    src="/logo/habilogo.jpg" 
                    alt="Habi Logo" 
                    width={80} 
                    height={80} 
                    className="rounded-2xl object-cover"
                  />
                </div>
                <h1 className={`${montserrat.className} text-4xl mb-4 leading-tight`}>
                  <span className="text-white font-bold block">Accede a tu propuesta</span>
                  <span className="block font-black text-5xl mt-2" style={{ color: "#EACDFE" }}>
                    personalizada
                  </span>
                </h1>
                <p className="text-white text-lg opacity-90 mb-8">
                  Ingresa tu NID para ver los precios específicos de tu propiedad
                </p>
              </div>

              {/* Formulario con estilo de la página */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="nid" className="text-white text-lg font-medium">
                      NID (Número de Identificación)
                    </Label>
                    <Input
                      id="nid"
                      type="text"
                      placeholder="Ej: 39285529713"
                      value={nid}
                      onChange={(e) => setNid(e.target.value)}
                      className="text-center text-xl font-mono tracking-wider bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl py-4 focus:bg-white focus:text-gray-900 transition-all"
                      required
                    />
                    <p className="text-white/70 text-sm text-center">
                      Ingresa el código único de tu negocio
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ backgroundColor: "#EACDFE", color: "#7400C2" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Cargando tu propuesta...
                      </div>
                    ) : (
                      "Ver mi Propuesta Personalizada"
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Imagen de fondo decorativa */}
            <div className="absolute right-0 bottom-0 top-10 flex justify-end items-end opacity-20">
              <Image 
                src="/logo/imagen.svg" 
                alt="Habi Background" 
                width={400} 
                height={300} 
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección informativa */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className={`${montserrat.className} text-3xl font-bold mb-6`} style={{ color: "#7400C2" }}>
            ¿Qué encontrarás en tu propuesta?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F9F0FF" }}>
                <svg className="w-6 h-6" style={{ color: "#7400C2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#7400C2" }}>Precios Personalizados</h3>
              <p className="text-gray-600">Ofertas específicas calculadas para tu propiedad</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F9F0FF" }}>
                <svg className="w-6 h-6" style={{ color: "#7400C2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#7400C2" }}>Múltiples Opciones</h3>
              <p className="text-gray-600">Diferentes planes de pago adaptados a tus necesidades</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
