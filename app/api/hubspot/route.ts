import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const nid = searchParams.get('nid')
    
    if (!nid) {
      return NextResponse.json(
        { error: 'NID is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.HUBSPOT_ACCESS_TOKEN
    
    if (!apiKey) {
      // En lugar de devolver error, devolver valores por defecto
      const fallbackValues = {
        bnpl3: "115000000",
        bnpl6: "117000000", 
        bnpl9: "120000000",
        precio_comite_final_final_final__el_unico__: "110000000",
        whatsapp_asesor: "https://api.whatsapp.com/send?phone=3009128399"
      }
      
      return NextResponse.json(fallbackValues)
    }
    
    // URL de la API de HubSpot para obtener un deal por ID
    const url = `https://api.hubapi.com/crm/v3/objects/deals/${nid}?properties=bnpl3,bnpl6,bnpl9,precio_comite_final_final_final__el_unico__,whatsapp_asesor`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      // En caso de error, devolver valores por defecto
      const fallbackValues = {
        bnpl3: "115000000",
        bnpl6: "117000000", 
        bnpl9: "120000000",
        precio_comite_final_final_final__el_unico__: "110000000",
        whatsapp_asesor: "https://api.whatsapp.com/send?phone=3009128399"
      }
      
      return NextResponse.json(fallbackValues)
    }

    const data = await response.json()
    
    // Extraer las propiedades del response
    const properties = data.properties || {}
    
    const result = {
      bnpl3: properties.bnpl3 || "110000000",
      bnpl6: properties.bnpl6 || "112000000", 
      bnpl9: properties.bnpl9 || "123000000",
      precio_comite_final_final_final__el_unico__: properties.precio_comite_final_final_final__el_unico__ || "100000000",
      whatsapp_asesor: properties.whatsapp_asesor || ""
    }
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error en endpoint de HubSpot:', error)
    
    // En caso de error, devolver valores por defecto
    const fallbackValues = {
      bnpl3: "115000000",
      bnpl6: "117000000", 
      bnpl9: "120000000",
      precio_comite_final_final_final__el_unico__: "110000000",
      whatsapp_asesor: "https://api.whatsapp.com/send?phone=3009128399"
    }
    
    return NextResponse.json(fallbackValues)
  }
}
