"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'


/**
 * 
 * Frågor
 * Namn
 * Kommer de?
 * Bara vigseln? (Skippar denna)
 * Allergier/Matprefenser?
 * Mail (bara för att ni ska få bekräftelse)
 * 
 * Kommer ni åka med bussen?
 * 
 * Ska ni föra ett tal? Hör då av er till denna mail:
 * 
 * @returns 
 */

export default function osa() {

  type Inputs = {
    name: string
    attending: boolean
    onlyCeremony: boolean
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
  }

  return (
    <Card className='m-5 bg-neutral-50 h-screen'>
      <CardHeader>
        <CardTitle>OSA</CardTitle>
        <CardDescription>
          Ska du OSA för flera? Skicka då gärna in separata svar för varje person        
        </CardDescription>
      </CardHeader>
    <CardContent>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className=''>
            <Field>
              <FieldLegend>Namn</FieldLegend>
              <Input type='text' id='name' {...register('name', {required: true})} />
            </Field>
            <FieldLegend>Email</FieldLegend>
            <FieldDescription>Mailaddressen används <b>endast</b> för att skicka ett bekräftelsemail</FieldDescription>
            <Input type='email' id='email' {...register('email', {required: true})} />
            <FieldLegend>Kommer ni?</FieldLegend>
            <Checkbox id='attending' defaultChecked={true} {...register('attending')} />
          {/* <FieldSet hidden={!watch('attending')}>
            <FieldLegend>Kommer ni endast vara med vid vigseln?</FieldLegend>
            <Checkbox id='onlyCeremony' {...register('onlyCeremony')} />
          </FieldSet> */}
            <FieldLegend>Allergier/Matpreferenser</FieldLegend>
            <Input type='text' id='foodPreferences' {...register('foodPreferences')} />
          <Button type='submit'>Skicka</Button>
        </FieldGroup>
      </form>
    </CardContent>
    </Card>
  )
}
