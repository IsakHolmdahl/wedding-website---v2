"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLegend } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default function osa() {

	type Inputs = {
		name: string
		attending: boolean
		rideBus: boolean
		foodPreferences: string
		email: string
	}

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors }, }
		= useForm<Inputs>()

	const [done, setDone] = useState(false)

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
		setDone(true)
		const respose = fetch('/api/osa', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([data]),
		});
	}

	return (
		<main className="min-h-screen">
			<div className='m-5 relative'>
				<header className="">
					<img
						src="logga.png"
						alt="Viktoria & Isak"
						className="mx-auto w-68"
					/>
				</header>
				<div hidden={!done} className=''>
					<h1 className='text-center text-2xl pt-20'>Tack för ditt svar!</h1>
				</div>
				<div hidden={done}>
					<h1 className="text-center py-10 text-lg" hidden={done}>OSA</h1>
					<form className='w-full' onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup className='' id="user">
							<Field className="gap-0">
								<FieldLegend>Namn *</FieldLegend>
								<Input type='text' id='name' {...register('name', { required: true })} required />
							</Field>
							<Field>
								<FieldLegend>Email *</FieldLegend>
								<FieldDescription>Mailaddressen används <b>endast</b> för att skicka ett bekräftelsemail</FieldDescription>
								<Input type='email' id='email' {...register('email', { required: true })} required />
							</Field>
							<Field>
								<FieldLegend>Kommer du? *</FieldLegend>
								<Controller
									name="attending"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<RadioGroup value={field.value === undefined ? undefined : field.value ? "ja" : "nej"} onValueChange={(value) => field.onChange(value === "ja")}>
											<div className="flex items-center gap-3">
												<RadioGroupItem value="ja" id="r1" />
												<Label htmlFor="r1">Jag kommer</Label>
											</div>
											<div className="flex items-center gap-3">
												<RadioGroupItem value="nej" id="r2" />
												<Label htmlFor="r2">Jag kommer inte</Label>
											</div>
										</RadioGroup>
									)}
								/>
							</Field>
							<FieldGroup className='' hidden={!watch('attending')}>
								<Field>
									<FieldLegend>Ska du åka med bussen? *</FieldLegend>
									<Controller
										name="rideBus"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<RadioGroup value={field.value === undefined ? undefined : field.value ? "ja" : "nej"} onValueChange={(value) => field.onChange(value === "ja")}>
												<div className="flex items-center gap-3">
													<RadioGroupItem value="ja" id="r3" />
													<Label htmlFor="r1">Ja</Label>
												</div>
												<div className="flex items-center gap-3">
													<RadioGroupItem value="nej" id="r4" />
													<Label htmlFor="r2">Nej</Label>
												</div>
											</RadioGroup>
										)}
									/>
								</Field>
								<Field>
									<FieldLegend>Allergier/Matpreferenser?</FieldLegend>
									<Input type='text' id='foodPreferences' {...register('foodPreferences')} />
								</Field>
							</FieldGroup>
							<Button className='w-40 mx-auto' type='submit'>Skicka</Button>
						</FieldGroup>
					</form>
				</div>
			</div>
		</main>
	)
}
