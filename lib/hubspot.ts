// Tipos para las propiedades de HubSpot
export interface HubSpotProperties {
  bnpl3: string
  bnpl6: string
  bnpl9: string
  precio_comite_final_final_final__el_unico__: string
  whatsapp_asesor: string
}

// Función para obtener las propiedades de HubSpot por NID
export async function getHubSpotProperties(nid: string): Promise<HubSpotProperties> {
  try {
    // Llamar a nuestro endpoint local que maneja CORS
    const url = `/api/hubspot?nid=${nid}`
    
    console.log('Llamando a endpoint local:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Response status desde frontend:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response desde frontend:', errorText)
      throw new Error(`Error en endpoint local: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Datos recibidos desde endpoint local:', data)
    
    return data as HubSpotProperties
    
  } catch (error) {
    console.error('Error al obtener propiedades desde endpoint local:', error)
    
    // Usar los valores reales del script Python como fallback
    return {
      bnpl3: "100000000",
      bnpl6: "100000000", 
      bnpl9: "100000000",
      precio_comite_final_final_final__el_unico__: "100000000",
      whatsapp_asesor: ""
    }
  }
}

// Función para formatear números como precio colombiano
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^\d]/g, '')) : price
  
  if (isNaN(numPrice)) return '$0'
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice)
}

// Función para manejar la redirección a WhatsApp
export function handleWhatsAppRedirect(whatsappUrl: string, action: 'oferta' | 'visita') {
  if (!whatsappUrl) {
    console.warn('URL de WhatsApp no disponible')
    return
  }
  
  // Verificar si la URL ya es una URL de WhatsApp válida
  let finalUrl = whatsappUrl
  
  // Si no es una URL completa, asumimos que es solo el número y construimos la URL
  if (!whatsappUrl.startsWith('http')) {
    // Remover caracteres no numéricos excepto el +
    const cleanNumber = whatsappUrl.replace(/[^\d+]/g, '')
    finalUrl = `https://wa.me/${cleanNumber.replace('+', '')}`
  }
  
  // Agregar mensaje predefinido según la acción
  const messages = {
    oferta: '¡Hola! Me interesa solicitar una oferta para mi propiedad.',
    visita: '¡Hola! Me gustaría agendar una visita a sus oficinas.'
  }
  
  const message = encodeURIComponent(messages[action])
  const separator = finalUrl.includes('?') ? '&' : '?'
  const urlWithMessage = `${finalUrl}${separator}text=${message}`
  
  // Abrir en nueva ventana
  window.open(urlWithMessage, '_blank')
}
