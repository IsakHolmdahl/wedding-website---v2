import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import * as path from 'path'

type SpeechInput = {
	email: string
	relationToCouple: string
	equipmentNeeds: string
}

export async function POST(request: Request) {
	const body = await request.json() as SpeechInput

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
		await sheets.spreadsheets.values.append({
			spreadsheetId: process.env.GOOGLE_SHEET_ID,
			range: 'tal!A:D', // Writing to 'tal' sheet
			valueInputOption: 'USER_ENTERED',
			insertDataOption: 'INSERT_ROWS',
			requestBody: {
				values: [[
					body.email, 
					body.relationToCouple, 
					body.equipmentNeeds || 'Inga behov', 
					new Date().toISOString()
				]],
			},
		})
	} catch (error) {
		console.error('Google Sheets error:', error)
		return NextResponse.json({ error: 'Failed to save to spreadsheet' }, { status: 500 });
	}

	try {
		if (!body) {
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
		
		const emailBody = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
			</head>
			<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
				<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
					<tr>
						<td align="center">
							<table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
								<tr>
									<td style="padding: 40px 40px 20px 40px; text-align: center;">
										<img src="cid:logo" alt="Logo" style="max-width: 180px; height: auto;" />
									</td>
								</tr>
								<tr>
									<td style="padding: 0 40px 40px 40px;">
										<h1 style="color: #333333; font-size: 28px; margin: 0 0 20px 0; text-align: center;">Tack för din anmälan!</h1>
										<p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
											Vi är så glada att du vill hålla ett tal på vårt bröllop! Otto och Johanna kommer att höra av sig snart.
										</p>
										<div style="background-color: #f9f9f9; border-left: 4px solid #8b5cf6; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
											<p style="color: #333333; font-size: 15px; margin: 8px 0; line-height: 1.6;">
												<strong>Din relation till brudparet:</strong> ${body.relationToCouple}
											</p>
											${body.equipmentNeeds ? `
												<p style="color: #333333; font-size: 15px; margin: 8px 0; line-height: 1.6;">
													<strong>Utrustningsbehov:</strong> ${body.equipmentNeeds}
												</p>
											` : ''}
										</div>
									</td>
								</tr>
								<tr>
									<td style="background-color: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #eeeeee;">
										<p style="color: #999999; font-size: 14px; margin: 0; line-height: 1.6;">
											Vi ser fram emot ditt tal! 🎤
										</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</body>
			</html>
		`
		const logoPath = path.join(process.cwd(), 'public', 'logga.png');
		
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: body.email,
			subject: `Talanmälan Bekräftelse`,
			html: emailBody,
			attachments: [{
				filename: 'logga.png',
				path: logoPath,
				cid: 'logo'
			}]
		});

	} catch (error) {
		console.error('Email sending error:', error)
		// Don't fail the request if email fails
	}

	return NextResponse.json({ success: true });
}
