import { NextResponse } from 'next/server'
import { google } from 'googleapis'

     export async function POST(request: Request) {
       const body = await request.json()

       const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n')
       
       const auth = new google.auth.GoogleAuth({
         credentials: {
           client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
           private_key: privateKey,
         },
         scopes: ['https://www.googleapis.com/auth/spreadsheets'],
       })

       const sheets = google.sheets({ version: 'v4', auth })

       await sheets.spreadsheets.values.append({
         spreadsheetId: process.env.GOOGLE_SHEET_ID,
         range: 'Blad1!A:E', // Adjust to your columns
         valueInputOption: 'USER_ENTERED',
         requestBody: {
           values: [[body.name, body.attending, body.rideBus, body.foodPreferences, new Date().toISOString()]],
         },
       })

       return NextResponse.json({ success: true })
     }
