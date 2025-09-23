"use client"

import { Button } from "@/components/ui/button"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import { useState, useEffect } from "react"
import NidInput from "@/components/NidInput"
import { getHubSpotProperties, formatPrice, HubSpotProperties } from "@/lib/hubspot"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function HomePage() {
  const [nid, setNid] = useState<string | null>(null)
  const [properties, setProperties] = useState<HubSpotProperties | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)

  const handleNidSubmit = async (submittedNid: string) => {
    setIsLoading(true)
    setNid(submittedNid)
    
    try {
      const hubspotProperties = await getHubSpotProperties(submittedNid)
      setProperties(hubspotProperties)
      setForceUpdate(prev => prev + 1)
    } catch (error) {
      console.error('Error al cargar propiedades:', error)
    } finally {
      setIsLoading(false)
    }
  }


  // Si no hay NID, mostrar el componente de entrada
  if (!nid) {
    return <NidInput onNidSubmit={handleNidSubmit} />
  }


  // Mostrar loading mientras se cargan los datos
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium text-purple-600">Cargando tu propuesta personalizada...</p>
          <p className="text-gray-600 mt-2">NID: {nid}</p>
        </div>
      </div>
    )
  }

  return (
    <div key={`${nid}-${forceUpdate}`} className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative">
        <div
          className="rounded-[3rem] mx-auto mt-8 overflow-hidden max-w-6xl"
          style={{ background: "linear-gradient(90deg, #7400C2 0%, #430070 100%)" }}
        >
          <div className="relative flex items-start justify-between px-8 py-16 min-h-[400px]">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl z-10 pt--2">
              <h1 className={`${montserrat.className} text-5xl mb-6 leading-tight`}>
                <span className="text-white font-bold whitespace-nowrap">Compramos tu vivienda</span>
                <span className="block font-black text-6xl" style={{ color: "#EACDFE" }}>
                  a tu medida
                </span>
              </h1>
              <div className="text-white text-base space-y-2">
                <p>Elige entre liquidez inmediata o el mejor precio en cuotas.</p>
                <p>Tú decides qué producto se adapta mejor a tus necesidades.</p>
              </div>
            </div>

            {/* Right Image */}
            <div className="absolute right-0 bottom-0 top-10 flex justify-end items-end">
              <Image 
                src="/logo/imagen.svg" 
                alt="Habi - Compramos tu vivienda a tu medida" 
                width={570} 
                height={400} 
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Selection Section */}
      <div className="max-w-xl mx-auto px-6 -mt-8 relative z-20">
        <div className="rounded-2xl shadow-lg overflow-hidden">
          {/* Top section with purple background */}
          <div className="text-center p-8" style={{ backgroundColor: "#F9F0FF" }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: "#8A00E6" }}>
              Elige tu producto financiero
            </h2>

            <div className="mb-4">
              <p className="text-base mb-3" style={{ color: "#8A00E6" }}>
                Precio de compra
              </p>
              <div className="text-5xl font-bold" style={{ color: "#8A00E6" }}>
                {properties ? formatPrice(properties.bnpl9) : "$153.226.755"}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Gap space after hero section */}
      <div className="py-12"></div>

      {/* Product Details Section - Always Visible */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Card - Vertical */}
            <div 
              className="w-full lg:w-96 rounded-[2.5rem] text-white flex flex-col relative overflow-hidden h-[617px]"
              style={{ backgroundColor: "#7400C2" }}
            >
              {/* Text Content */}
              <div className="flex justify-center">
                <div className="w-80 p-6 pb-0">
                <h2 className={`${montserrat.className} text-4xl mb-6 leading-tight`}>
                  <span className="block font-bold">Elige un</span>
                  <span className="block font-bold">producto</span>
                  <span className="block font-black text-5xl" style={{ color: "#EACDFE" }}>
                    a tu medida
                  </span>
                </h2>
                <p className="text-white text-base mb-6">
                  La flexibilidad de nuestros productos te permite tomar la decisión ideal para ti.
                </p>
                </div>
              </div>
              
              {/* Bottom Image */}
              <div className="mt-auto">
                <Image 
                  src="/logo/imagen2.svg" 
                  alt="Productos financieros" 
                  width={320} 
                  height={180} 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Cards - 4 Horizontal Cards */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Card 1 - BNPL9 */}
              <div className="rounded-2xl shadow-md border border-purple-100 flex items-stretch overflow-hidden hover:border-2 transition-all duration-200 hover:border-[#8A00E6]">
                <div className="flex-1 p-6 text-center text-white" style={{ backgroundColor: "#8A00E6" }}>
                  <p className="text-base mb-3">
                    Precio de compra
                  </p>
                  <p className="text-4xl font-bold">
                    {properties ? formatPrice(properties.bnpl9) : "$153.226.755"}
                  </p>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-center">
                  <p className="text-gray-600 text-base">
                    Te pagamos en <strong className="text-gray-800">9 cuotas</strong>
                  </p>
                  <p className="text-gray-600 text-base">
                    de <strong className="text-gray-800">{properties ? formatPrice(Number(properties.bnpl9.replace(/[^\d]/g, '')) / 9) : "$17.025.195"}</strong>
                  </p>
                </div>
              </div>

              {/* Separator Line */}
              <div className="my-3">
                <div className="w-full h-px bg-gray-200"></div>
              </div>

              {/* Card 2 - BNPL6 */}
              <div className="rounded-2xl shadow-md border border-purple-100 flex items-stretch overflow-hidden hover:border-2 transition-all duration-200 hover:border-[#8A00E6]">
                <div className="flex-1 p-6 text-center" style={{ backgroundColor: "#F9F0FF", color: "#8A00E6" }}>
                  <p className="text-base mb-3">
                    Precio de compra
                  </p>
                  <p className="text-3xl font-bold">
                    {properties ? formatPrice(properties.bnpl6) : "$151.464.588"}
                  </p>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-center">
                  <p className="text-gray-600 text-base">
                    Te pagamos en <strong className="text-gray-800">6 cuotas</strong>
                  </p>
                  <p className="text-gray-600 text-base">
                    de <strong className="text-gray-800">{properties ? formatPrice(Number(properties.bnpl6.replace(/[^\d]/g, '')) / 6) : "$25.244.098"}</strong>
                  </p>
                </div>
              </div>

              {/* Card 3 - BNPL3 */}
              <div className="rounded-2xl shadow-md border border-purple-100 flex items-stretch overflow-hidden hover:border-2 transition-all duration-200 hover:border-[#8A00E6]">
                <div className="flex-1 p-6 text-center" style={{ backgroundColor: "#F9F0FF", color: "#8A00E6" }}>
                  <p className="text-base mb-3">
                    Precio de compra
                  </p>
                  <p className="text-3xl font-bold">
                    {properties ? formatPrice(properties.bnpl3) : "$149.572.520"}
                  </p>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-center">
                  <p className="text-gray-600 text-base">
                    Te pagamos en <strong className="text-gray-800">3 cuotas</strong>
                  </p>
                  <p className="text-gray-600 text-base">
                    de <strong className="text-gray-800">{properties ? formatPrice(Number(properties.bnpl3.replace(/[^\d]/g, '')) / 3) : "$49.857.506"}</strong>
                  </p>
                </div>
              </div>

              {/* Card 4 - Precio Comité Final */}
              <div className="rounded-2xl shadow-md border border-purple-100 flex items-stretch overflow-hidden hover:border-2 transition-all duration-200 hover:border-[#8A00E6]">
                <div className="flex-1 p-6 text-center" style={{ backgroundColor: "#F9F0FF", color: "#8A00E6" }}>
                  <p className="text-base mb-3">
                    Precio de compra
                  </p>
                  <p className="text-3xl font-bold">
                    {properties ? formatPrice(properties.precio_comite_final_final_final__el_unico__) : "$148.566.058"}
                  </p>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-center">
                  <p className="text-gray-600 text-base">
                    <strong className="text-gray-800">Te pagamos de inmediato</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Partners Section - Always visible */}
      <div className="relative min-h-screen flex items-center justify-center py-16 px-6 overflow-hidden"
           style={{
             background: "linear-gradient(135deg, #7B24FF 0%, #6B1FE0 50%, #581C87 100%)"
           }}>
        

        {/* Background Orbs - Outside the card */}
        <div className="absolute top-4 -right-20 w-96 h-96 rounded-full pointer-events-none"
             style={{
               background: "radial-gradient(circle, rgba(0, 217, 200, 0.6) 0%, transparent 70%)",
               filter: "blur(80px)"
             }}>
        </div>
        
        <div className="absolute bottom-4 left-4 w-80 h-80 rounded-full pointer-events-none"
             style={{
               background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
               filter: "blur(60px)"
             }}>
        </div>

        {/* Translucent Card */}
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-[4rem] py-24 px-20 relative overflow-hidden min-h-[700px]">
            
            {/* Title */}
            <div className="text-center mb-20">
              <h1 className={`${montserrat.className} text-4xl lg:text-5xl leading-tight mb-12`}>
                <span className="block text-white font-medium whitespace-nowrap">
                  Trabajando para ti, con el respaldo de
                </span>
                <span className="block font-black text-6xl" style={{ color: "#EACDFE" }}>
                  los líderes de Colombia
                </span>
              </h1>
            </div>

            {/* Logos */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-20">
              <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-[3rem] p-6 border border-white/30 w-80 h-20 flex items-center justify-center">
                <Image 
                  src="/logo/bancolombia.png" 
                  alt="Bancolombia" 
                  width={288} 
                  height={57} 
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-[3rem] p-6 border border-white/30 w-80 h-20 flex items-center justify-center">
                <Image 
                  src="/logo/BBVA.png" 
                  alt="BBVA" 
                  width={288} 
                  height={57} 
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-[3rem] p-6 border border-white/30 w-80 h-20 flex items-center justify-center">
                <Image 
                  src="/logo/bancobogota.png" 
                  alt="Banco de Bogotá" 
                  width={288} 
                  height={57} 
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <div className="text-center">
              <p className="text-white/90 text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-16">
                Siéntete seguro de trabajar con nosotros ya que contamos<br />
                con el respaldo de las instituciones financieras más importantes del país.
              </p>
              
              {/* CTA Button */}
              <button className="bg-white hover:bg-gray-100 text-purple-700 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Solicitar oferta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className={`${montserrat.className} text-5xl lg:text-6xl font-black mb-6`}
                style={{ color: "#7400C2" }}>
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              En 3 simples pasos, la decisión es tuya:
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Connecting line - only visible on large screens */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2 pointer-events-none -translate-y-1/2 z-0"
                 style={{ backgroundColor: "#DAA7FB" }}>
            </div>
            {/* Step 1 */}
            <div className="rounded-3xl overflow-hidden shadow-lg relative z-10">
              {/* Number section */}
              <div className="bg-purple-50 p-6 text-center">
                <span className={`${montserrat.className} text-3xl font-bold block`}
                      style={{ color: "#7400C2" }}>
                  1. Solicita tu oferta
                </span>
              </div>
              {/* Description section */}
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  Completa nuestro formulario con los datos de tu propiedad. Te daremos una oferta en menos de 24 horas.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl overflow-hidden shadow-lg relative z-10">
              {/* Number section */}
              <div className="bg-purple-50 p-6 text-center">
                <span className={`${montserrat.className} text-3xl font-bold block`}
                      style={{ color: "#7400C2" }}>
                  2. Elige tu producto
                </span>
              </div>
              {/* Description section */}
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  Selecciona el mejor producto para ti: desde liquidez inmediata hasta el mejor precio en cuotas.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl overflow-hidden shadow-lg relative z-10">
              {/* Number section */}
              <div className="bg-purple-50 p-6 text-center">
                <span className={`${montserrat.className} text-3xl font-bold block`}
                      style={{ color: "#7400C2" }}>
                  3. Cierra y Recibe
                </span>
              </div>
              {/* Description section */}
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  Firmamos el contrato y recibes tu dinero según el producto elegido. Nosotros nos encargamos de todo el proceso.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-center mb-16">
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Nuestros resultados nos respaldan, por eso estamos seguros de que te podemos ayudar:
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stat 1 */}
            <div className="text-center">
              <div className={`${montserrat.className} text-4xl font-bold mb-3`}
                   style={{ color: "#7400C2" }}>
                +5,000
              </div>
              <p className="text-gray-600 text-base font-medium">
                Propiedades compradas
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className={`${montserrat.className} text-4xl font-bold mb-3`}
                   style={{ color: "#7400C2" }}>
                10 días
              </div>
              <p className="text-gray-600 text-base font-medium">
                Promedio de cierre
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className={`${montserrat.className} text-4xl font-bold mb-3`}
                   style={{ color: "#7400C2" }}>
                98%
              </div>
              <p className="text-gray-600 text-base font-medium">
                Satisfacción del cliente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[4rem] overflow-hidden"
               style={{
                 background: "linear-gradient(135deg, #7400C2 0%, #430070 100%)"
               }}>
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Left Content */}
              <div className="flex-1 p-12 lg:p-16 text-white">
                <h2 className={`${montserrat.className} mb-8`}>
                  <span className="block text-5xl lg:text-6xl font-black mb-4" style={{ color: "#EACDFE" }}>
                    Síentete como en casa,
                  </span>
                  <span className="block text-4xl lg:text-5xl font-bold">
                    agenda una visita a
                  </span>
                  <span className="block text-4xl lg:text-5xl font-bold">
                    nuestras oficinas
                  </span>
                </h2>
                
                <p className="text-white text-base mb-8 leading-relaxed max-w-lg">
                  Recuerda que puedes buscarnos y agendar una visita en persona a nuestras oficinas, sabemos que es muy importante poder arreglar detalles frente a frente.
                </p>
                
                <button className="bg-white hover:bg-gray-100 text-purple-700 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Agendar visita
                </button>
              </div>
              
              {/* Right Image */}
              <div className="flex-1 relative">
                <Image 
                  src="/logo/imagen3.svg" 
                  alt="Visita nuestras oficinas" 
                  width={500} 
                  height={400} 
                  className="absolute top-0 right-0 bottom-0 w-auto h-full object-cover object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className={`${montserrat.className} text-5xl lg:text-6xl font-black mb-6`}
                style={{ color: "#7400C2" }}>
              <span className="font-medium">Procesos efectivos,</span> pagos seguros
            </h2>
            <p className="text-gray-600 text-xl max-w-5xl mx-auto whitespace-nowrap">
              En Habi, preferimos que nuestros clientes hablen por nosotros. ¡Gracias por su confianza!
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Connecting line - only visible on large screens */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2 pointer-events-none -translate-y-1/2 z-0"
                 style={{ backgroundColor: "#DAA7FB" }}>
            </div>
            {/* Testimonial 1 - Felipe y Natalia */}
            <div className="rounded-3xl overflow-hidden shadow-lg relative z-10">
              {/* Image and name section */}
              <div className="bg-purple-50 p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src="/logo/cliente1.png" 
                    alt="Felipe y Natalia" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`${montserrat.className} text-2xl font-bold mb-2`}
                    style={{ color: "#7400C2" }}>
                  Felipe y Natalia
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Invirtieron en la vivienda de sus sueños
                </p>
              </div>
              {/* Testimonial section */}
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  "Calificamos a Habi con 10/10 por la tranquilidad, y eficiencia del proceso, nos hicieron sentir como parte de una familia al acompañarnos en cada paso"
                </p>
              </div>
            </div>

            {/* Testimonial 2 - Carlos Rincón */}
            <div className="rounded-3xl overflow-hidden shadow-lg relative z-10">
              {/* Image and name section */}
              <div className="bg-purple-50 p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src="/logo/cliente2.png" 
                    alt="Carlos Rincón" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`${montserrat.className} text-2xl font-bold mb-2`}
                    style={{ color: "#7400C2" }}>
                  Carlos Rincón
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Vendió su apartamento en Suba
                </p>
              </div>
              {/* Testimonial section */}
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  "Mi experiencia con Habi fue un 9/10, estuvieron de mi lado siempre"
                </p>
              </div>
            </div>

            {/* Testimonial 3 - Martha Lucía Roa */}
            <div className="rounded-3xl overflow-hidden shadow-lg relative z-10">
              {/* Image and name section */}
              <div className="bg-purple-50 p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src="/logo/cliente3.png" 
                    alt="Martha Lucía Roa" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`${montserrat.className} text-2xl font-bold mb-2`}
                    style={{ color: "#7400C2" }}>
                  Martha Lucía Roa
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Encontró su hogar ideal
                </p>
              </div>
              {/* Testimonial section */}
              <div className="bg-white p-6 text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  "Los califico con 9/10 por su disposición, fue un hermoso proceso y respondieron a todas nuestras preguntas"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
