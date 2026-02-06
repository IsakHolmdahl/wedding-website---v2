"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

export default function SpeechPage() {
  type Inputs = {
    email: string;
    relationToCouple: string;
    equipmentNeeds: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      relationToCouple: "",
      equipmentNeeds: "",
    },
  });

  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Form submitted:", data);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
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
    <main className="min-h-screen">
      <div className="m-5 relative">
        <header className="">
          <Link href="/" className="text-white">
            <img
              src="logga.png"
              alt="Viktoria & Isak"
              className="mx-auto w-60"
            />
          </Link>
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
              Tal
            </h1>
            <div className="flex justify-center">
              <div className="w-full h-px bg-gray-300"></div>
            </div>
          </div>
          <p className="text-center mb-8">
            Vad kul att du vill hålla ett tal! Här kan du anmäla till våra
            toastmasters att du önskar hålla ett tal. Du får sen ett
            bekräftelsemail på att du skickat in och sedan kommer våra
            toasmasters Otto och Johanna att höra av sig!
          </p>
          <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
            <FieldGroup className="" id="speech-form">
              <Field className="gap-0">
                <FieldLegend>Email *</FieldLegend>
                <FieldDescription className="mb-2">
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

              <Field className="gap-0">
                <FieldLegend>Relation till brudparet *</FieldLegend>
                <FieldDescription className="mb-2">
                  T.ex. &quot;Brudgummens bror&quot;, &quot;Brudens vän&quot;,
                  etc.
                </FieldDescription>
                <Input
                  type="text"
                  id="relationToCouple"
                  {...register("relationToCouple", { required: true })}
                  required
                />
              </Field>

              <Field className="gap-0">
                <FieldLegend>Utrustningsbehov</FieldLegend>
                <FieldDescription className="mb-2">
                  T.ex. projektor, högtalare, etc. Lämna tomt om inget behövs
                </FieldDescription>
                <Input
                  type="text"
                  id="equipmentNeeds"
                  {...register("equipmentNeeds")}
                />
              </Field>
              <div className="flex justify-center mt-6 gap-4">
                <div className="text-center">
                  <Link href="/">
                    <Button variant="outline">Tillbaka till startsidan</Button>
                  </Link>
                </div>
                <Button
                  className="w-40 transition-all duration-300"
                  type="submit"
                  disabled={loading}
                >
                  <span className="flex items-center gap-2 justify-center">
                    {loading && (
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
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
                    )}
                    <span className="transition-all duration-300">
                      {loading ? "Skickar..." : "Skicka"}
                    </span>
                  </span>
                </Button>
              </div>
            </FieldGroup>
          </form>
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
        </div>
      </div>
    </main>
  );
}
