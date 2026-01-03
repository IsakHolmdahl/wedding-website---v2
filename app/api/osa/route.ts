import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { OsaAnswers } from '@/types/osaAnswers'

export async function POST(request: Request) {
	const body = await request.json() as OsaAnswers[]

	const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n')

	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: privateKey,
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	})

	const sheets = google.sheets({ version: 'v4', auth })
	try {
		for (const entry of body) {

			await sheets.spreadsheets.values.append({
				spreadsheetId: process.env.GOOGLE_SHEET_ID,
				range: 'Blad1!A:E', // Adjust to your columns
				valueInputOption: 'USER_ENTERED',
				requestBody: {
					values: [[entry.name, entry.attending, entry.rideBus, entry.foodPreferences, new Date().toISOString()]],
				},
			})
		}
	} catch (error) {
		console.error('Google Sheets error:', error)
		return NextResponse.json({ error: 'Failed to save to spreadsheet' }, { status: 500 });
	}

	try {
		if (!body || body.length === 0) {
			return NextResponse.json({ error: 'No data provided' }, { status: 400 });
		}

		// Verify credentials aren't undefined or have extra whitespace
		if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
			throw new Error('SMTP credentials missing');
		}
		
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST.trim(),
			port: 587,
			secure: false,
			auth: {
				user: process.env.SMTP_USER.trim(),
				pass: process.env.SMTP_PASS.trim(),
			},
			tls: {
				ciphers: 'SSLv3',
				rejectUnauthorized: false
			}
		});
		let emailBody = `
			<h1>Välkommen!</h1>
			<p>Tack för din OSA, vi ser fram emot att fira med dig!</p>
			<p><strong>Namn:</strong> ${body[0].name}</p>
			<p><strong>Kommer:</strong> ${body[0].attending}</p>
			${body[0].attending ? `<p><strong>Åker buss:</strong> ${body[0].rideBus}</p>` : ''}
			${body[0].attending ? `<p><strong>Allergi/Matpreferens</strong> ${body[0].foodPreferences}</p>` : ''}
		`
		if (body.length > 1) {
			emailBody += `<h2>Du OSA:de även för:</h2>`
			for (const entry of body.slice(1)) {
				emailBody += `
					<p><strong>Namn:</strong> ${entry.name}</p>
					<p><strong>Kommer:</strong> ${entry.attending}</p>
					${entry.attending ? `<p><strong>Åker buss:</strong> ${entry.rideBus}</p>` : ''}
					${entry.attending ? `<p><strong>Allergi/Matpreferens</strong> ${entry.foodPreferences}</p>` : ''}
					<br/>
				`
			}
		}
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: body[0].email,
			subject: `OSA Bekträftelse`,
			html: emailBody,
		});

	} catch (error) {
		console.error('Email sending error:', error)
		// Don't fail the request if email fails
	}

	return NextResponse.json({ success: true });
}
