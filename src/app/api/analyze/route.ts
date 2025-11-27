import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route für Echtzeit-Analysen via n8n Webhook
 *
 * Empfängt Koordinaten vom Frontend, ruft n8n Workflow auf,
 * und leitet die Analyse-Ergebnisse zurück.
 */

export interface AnalysisRequest {
  lat: number;
  lon: number;
}

export interface FlurstueckData {
  fid: number;
  oid_: string;
  aktualit: string;
  idflurst: string;
  flaeche: number;
  flstkennz: string;
  land: string;
  landschl: string;
  gemarkung: string;
  gemaschl: string;
  flur: string;
  flurschl: string;
  flstnrzae: string;
  flstnrnen: string | null;
  regbezirk: string | null;
  regbezschl: string;
  kreis: string;
  kreisschl: string;
  gemeinde: string;
  gmdschl: string;
  abwrecht: string;
  lagebeztxt: string | null;
  tntext: string | null;
  flurstnr: string;
  geom: string;
}

export interface NaturschutzData {
  fid: string;
  schutzgebietstyp_kurz: string;
  gebietsnummer_intern: string;
  schutzgebietstyp: string;
  gebietsnummer: string;
  gebietsname: string;
  schutzstatus: string;
  schutzanordnung: string;
  inkrafttreten: string;
  flaeche_ha_gesamt: number;
  bekanntmachung: string;
  ueberlappung_prozent: string;
  ueberlappung_qm: string;
}

export interface FFHData {
  ogc_fid: number;
  fid: number;
  schutzgebietstyp_kurz: string;
  schutzgebietstyp: string;
  gebietsnummer_intern: number;
  gebietsname: string;
  gebietsnummer: string;
  flaeche_ha: number;
  link_standarddatenbogen: string;
  ueberlappung_prozent: string;
  ueberlappung_qm: string;
}

export interface HochwasserData {
  ogc_fid: number;
  fid: number;
  name: string;
  ereignis: string;
  hinweis: string;
  shape_area: number;
  shape_len: number;
  layer: string;
  path: string;
  ueberlappung_prozent: string;
  ueberlappung_qm: string;
}

export interface AnalysisResponse {
  flurstueck: FlurstueckData;
  naturschutz: NaturschutzData;
  ffh?: FFHData;
  hochwasser?: HochwasserData;
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const webhookUser = process.env.N8N_WEBHOOK_USER;
    const webhookPassword = process.env.N8N_WEBHOOK_PASSWORD;

    if (!webhookUrl || !webhookUser || !webhookPassword) {
      console.error('Missing n8n webhook configuration in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: n8n webhook not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const body: AnalysisRequest = await request.json();
    const { lat, lon } = body;

    // Validate coordinates
    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return NextResponse.json(
        { error: 'Invalid coordinates: lat and lon must be numbers' },
        { status: 400 }
      );
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return NextResponse.json(
        { error: 'Coordinates out of valid range' },
        { status: 400 }
      );
    }

    // Create Basic Auth header
    const authHeader = `Basic ${Buffer.from(`${webhookUser}:${webhookPassword}`).toString('base64')}`;

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ lat, lon }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('n8n webhook error:', {
        status: n8nResponse.status,
        statusText: n8nResponse.statusText,
        body: errorText,
      });

      return NextResponse.json(
        {
          error: 'Failed to fetch analysis data from n8n',
          details: n8nResponse.statusText,
        },
        { status: n8nResponse.status }
      );
    }

    // Get response text first for debugging
    const responseText = await n8nResponse.text();
    console.log('n8n webhook response body:', responseText.substring(0, 500)); // Log first 500 chars

    // Check if response is empty
    if (!responseText || responseText.trim().length === 0) {
      console.error('Empty response from n8n webhook');
      return NextResponse.json(
        {
          error: 'Empty response from analysis service',
          details: 'The analysis service returned no data',
        },
        { status: 502 }
      );
    }

    // Try to parse JSON
    let data: AnalysisResponse;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error';
      console.error('JSON parse error:', errorMessage);
      console.error('Response text:', responseText.substring(0, 1000));
      return NextResponse.json(
        {
          error: 'Invalid response format from analysis service',
          details: 'Response is not valid JSON',
        },
        { status: 502 }
      );
    }

    // Validate response structure
    if (!data.flurstueck || !data.naturschutz) {
      console.error('Invalid response structure:', data);
      return NextResponse.json(
        {
          error: 'Invalid response structure from analysis service',
          details: 'Missing required fields: flurstueck or naturschutz',
        },
        { status: 502 }
      );
    }

    console.log('Analysis successful:', {
      flurstueck: data.flurstueck.flstnrzae,
      naturschutz: data.naturschutz.gebietsname,
      ffh: data.ffh?.gebietsname || 'none',
      hochwasser: data.hochwasser?.name || 'none',
    });

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Analysis API error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
