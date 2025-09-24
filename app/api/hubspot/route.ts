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
      console.error('HUBSPOT_ACCESS_TOKEN no está configurado')
      return NextResponse.json(
        { error: 'HubSpot API key not configured' },
        { status: 500 }
      )
    }
    
    // URL de la API de HubSpot para obtener un deal por ID
    const url = `https://api.hubapi.com/crm/v3/objects/deals/${nid}?properties=bnpl3,bnpl6,bnpl9,precio_comite_final_final_final__el_unico__,whatsapp_asesor`
    
    console.log('Llamando a HubSpot API desde servidor con URL:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('Response status desde servidor:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response desde servidor:', errorText)
      
      // En caso de error, devolver valores por defecto (valores reales del script)
      return NextResponse.json({
        bnpl3: "110000000",
        bnpl6: "112000000", 
        bnpl9: "123000000",
        precio_comite_final_final_final__el_unico__: "100000000",
        whatsapp_asesor: ""
      })
    }

    const data = await response.json()
    console.log('Datos recibidos de HubSpot desde servidor:', data)
    
    // Extraer las propiedades del response
    const properties = data.properties || {}
    console.log('Propiedades extraídas desde servidor:', properties)
    
    const result = {
      bnpl3: properties.bnpl3 || "110000000",
      bnpl6: properties.bnpl6 || "112000000", 
      bnpl9: properties.bnpl9 || "123000000",
      precio_comite_final_final_final__el_unico__: properties.precio_comite_final_final_final__el_unico__ || "100000000",
      whatsapp_asesor: properties.whatsapp_asesor || ""
    }
    
    console.log('Resultado final desde servidor:', result)
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error en endpoint de HubSpot:', error)
    
    // En caso de error, devolver valores por defecto (valores reales del script)
    return NextResponse.json({
      bnpl3: "110000000",
      bnpl6: "112000000", 
      bnpl9: "123000000",
      precio_comite_final_final_final__el_unico__: "100000000",
      whatsapp_asesor: ""
    })
  }
}
