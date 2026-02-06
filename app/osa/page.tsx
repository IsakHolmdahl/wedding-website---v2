"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";

export default function osa() {
  type Guest = {
    name: string;
    attending?: boolean;
    rideBus?: boolean;
    foodPreferences: string;
  };

  type Inputs = {
    email: string;
    guests: Guest[];
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      guests: [
        {
          name: "",
          attending: undefined,
          rideBus: undefined,
          foodPreferences: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const [done, setDone] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form submitted:", data);

    // Map guests to API format (add email to each guest)
    const apiData = data.guests.map((guest) => ({
      name: guest.name,
      email: data.email,
      attending: guest.attending ?? false,
      rideBus: guest.rideBus ?? false,
      foodPreferences: guest.foodPreferences,
    }));

    console.log("API data:", apiData);
    setDone(true);

    fetch("/api/osa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    });
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <main className="min-h-screen">
      <div className="m-5 relative">
        <header className="">
          <img src="logga.png" alt="Viktoria & Isak" className="mx-auto w-68" />
        </header>
        <div hidden={!done} className="">
          <h1 className="text-center text-2xl pt-20">Tack för ditt svar!</h1>
          <h2 className="text-center text-xl pt-10">
            Ett bekräftelsemail skickas snart till din mail
          </h2>
        </div>
        <div hidden={done}>
          <h1 className="text-center py-10 text-lg" hidden={done}>
            OSA
          </h1>
          <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
            <FieldGroup className="" id="user">
              <Field>
                <FieldLegend>Email *</FieldLegend>
                <FieldDescription>
                  Mailaddressen används <b>endast</b> för att skicka ett
                  bekräftelsemail
                </FieldDescription>
                <Input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  required
                />
              </Field>

              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  {index > 0 && <Separator className="my-8" />}

                  <Field className="">
                    <FieldLegend>Namn *</FieldLegend>
                    <Input
                      type="text"
                      {...register(`guests.${index}.name`, { required: true })}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLegend>Kommer du? *</FieldLegend>
                    <Controller
                      name={`guests.${index}.attending`}
                      control={control}
                      rules={{
                        validate: (value) => {
                          if (value === undefined)
                            return "Du måste välja om du kommer eller inte";
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <RadioGroup
                          value={
                            field.value === undefined
                              ? ""
                              : field.value
                                ? "ja"
                                : "nej"
                          }
                          onValueChange={(value) => {
                            if (value === "ja") field.onChange(true);
                            else if (value === "nej") field.onChange(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="ja" id={`r1-${index}`} />
                            <Label htmlFor={`r1-${index}`}>Jag kommer</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="nej" id={`r2-${index}`} />
                            <Label htmlFor={`r2-${index}`}>
                              Jag kommer inte
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </Field>

                  <FieldGroup
                    className=""
                    hidden={!watch(`guests.${index}.attending`)}
                  >
                    <Field>
                      <FieldLegend>
                        Ska du åka med bussen till Sandby Kyrka och till Skällby
                        Loge? *
                      </FieldLegend>
                      <Controller
                        name={`guests.${index}.rideBus`}
                        control={control}
                        rules={{
                          validate: {
                            requiredWhenAttending: (value, formValues) => {
                              const isAttending =
                                formValues.guests[index]?.attending === true;
                              if (!isAttending) return true; // Skip validation if not attending
                              if (value === undefined)
                                return "Du måste välja om du åker buss eller inte";
                              return true;
                            },
                          },
                        }}
                        render={({ field }) => (
                          <RadioGroup
                            value={
                              field.value === undefined
                                ? ""
                                : field.value
                                  ? "ja"
                                  : "nej"
                            }
                            onValueChange={(value) =>
                              field.onChange(value === "ja")
                            }
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="ja" id={`r3-${index}`} />
                              <Label htmlFor={`r3-${index}`}>Ja</Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="nej" id={`r4-${index}`} />
                              <Label htmlFor={`r4-${index}`}>Nej</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </Field>
                    <Field>
                      <FieldLegend>Allergier/Matpreferenser?</FieldLegend>
                      <Input
                        type="text"
                        {...register(`guests.${index}.foodPreferences`)}
                      />
                    </Field>
                  </FieldGroup>

                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => remove(index)}
                    >
                      Ta bort
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                className="w-full mt-8"
                onClick={() =>
                  append({
                    name: "",
                    attending: undefined,
                    rideBus: undefined,
                    foodPreferences: "",
                  })
                }
              >
                Lägg till person
              </Button>

              <Button className="w-40 mx-auto mt-4" type="submit">
                Skicka
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </main>
  );
}
