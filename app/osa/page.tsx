"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'


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
    formState: { errors },} 
    = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
	const respose = fetch('/api/osa', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	alert('Tack för din OSA! Du kommer få en bekräftelse på mail inom kort.')
  }

  return (
		<main className="min-h-screen">
    <Card className='m-5 bg-neutral-50 mt-[200] pt-14 relative'>
			<header className="absolute top-[-180] left-0 right-0">
					<img
						src="logga.png"
						alt="Viktoria & Isak"
						className="mx-auto w-68"
					/>
				</header>
      <CardHeader>
        <CardTitle className="mx-auto pb-10 text-lg">OSA</CardTitle>
        <CardDescription>
          Ska du OSA för flera? Skicka då in separata svar för varje person        
        </CardDescription>
      </CardHeader>
    <CardContent>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className='' id="user">
            <Field className="gap-0">
              <FieldLegend>Namn</FieldLegend>
              <Input type='text' id='name' {...register('name', {required: true})} />
            </Field>
			<Field>
				<FieldLegend>Email</FieldLegend>
				<FieldDescription>Mailaddressen används <b>endast</b> för att skicka ett bekräftelsemail</FieldDescription>
				<Input type='email' id='email' {...register('email', {required: true})} />
			</Field>
			<Field>
            <FieldLegend>Kommer du?</FieldLegend>
            	<Checkbox id='attending' defaultChecked={false} {...register('attending')} />
			</Field>
			<FieldGroup>
				<Field>
					<FieldLegend>Ska du åka med bussen?</FieldLegend>
					<Checkbox id='bus' {...register('rideBus')} />
				</Field>
				<Field>
            		<FieldLegend>Allergier/Matpreferenser?</FieldLegend>
            		<Input type='text' id='foodPreferences' {...register('foodPreferences')} />
				</Field>
			</FieldGroup>
          <Button type='submit'>Skicka</Button>
        </FieldGroup>
      </form>
    </CardContent>
    </Card>
	</main>
  )
}
