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
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Form submitted:", data);
    setError(null);
    // Map guests to API format (add email to each guest)
    const apiData = data.guests.map((guest) => ({
      name: guest.name,
      email: data.email,
      attending: guest.attending ?? false,
      rideBus: guest.rideBus ?? false,
      foodPreferences: guest.foodPreferences,
    }));

    setLoading(true);
    try {
      const res = await fetch("/api/osa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!res.ok) {
        throw new Error("Något gick fel vid skickandet. Försök igen!");
      }

      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Något gick fel vid skickandet. Försök igen!",
      );
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <main className="min-h-screen max-w-2xl mx-auto text-[18px] md:text-base">
      <div className="m-5 relative">
        <header className="">
          <a href="/">
            <img
              src="logga.png"
              alt="Viktoria & Isak"
              className="mx-auto w-68"
            />
          </a>
        </header>
        <div hidden={!done} className="">
          <h1 className="text-center text-2xl pt-20">Tack för ditt svar!</h1>
          <h2 className="text-center text-xl pt-10">
            Ett bekräftelsemail skickas snart till din mail
          </h2>
        </div>
        <div hidden={done}>
          <div className="grid grid-cols-3 items-center">
            <div className="flex justify-center">
              <div className="w-full h-px bg-gray-300"></div>
            </div>
            <h1
              className="text-center py-10 text-[40px] font-fancy"
              hidden={done}
            >
              OSA
            </h1>
            <div className="flex justify-center">
              <div className="w-full h-px bg-gray-300"></div>
            </div>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
            <FieldGroup className="" id="user">
              <Field>
                <FieldLegend>Email *</FieldLegend>

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

              <div className="grid grid-cols-2 gap-4 mt-5">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full text-xl text-white"
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

                <Button
                  className="w-full mx-auto text-white text-xl relative overflow-hidden"
                  type="submit"
                >
                  <span
                    className={`transition-transform duration-300 ${loading ? "-translate-x-2px]" : "translate-x-1/3"}`}
                  >
                    Skicka
                  </span>
                  <svg
                    className={`size-5 animate-spin transition-transform duration-300 inset-0 ${loading ? "translate-y-0" : "-translate-y-[200%]"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
      {error && (
        <Alert
          variant="destructive"
          className="mt-6 bg-red-50/50 dark:bg-red-950/10 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ett fel uppstod</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="w-full flex justify-center my-5">
        <Button className="w-2/3 mx-auto text-xl" variant="outline" asChild>
          <a href="/">
            <ArrowLeft />
            Tillbaka till startsidan
          </a>
        </Button>
      </div>
    </main>
  );
}
