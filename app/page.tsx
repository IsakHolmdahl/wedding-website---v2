"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Gift,
  Menu,
  X,
  Underline,
  Church,
  PartyPopper,
  Bus,
  MessageCircleHeart,
  Baby,
} from "lucide-react";
import Link from "next/link";
import Countdown from "@/components/ui/countdown";

const sections = [
  { id: "our-story", title: "Vår historia", icon: Heart },
  { id: "ceremony", title: "Vigsel", icon: Church },
  { id: "party", title: "Festen", icon: PartyPopper },
  { id: "transport", title: "Transport", icon: Bus },
  { id: "speech", title: "Hålla tal", icon: MessageCircleHeart },
  { id: "kids", title: "Barn på bröllopet", icon: Baby },
  { id: "gift", title: "Bröllopspresent", icon: Gift },
];

export default function WeddingWebsite() {
  const [activeSection, setActiveSection] = useState("our-story");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 ${
          isMobileMenuOpen ? "" : "pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <nav
          className={`fixed left-0 top-0 h-full w-full bg-transparent p-6 z-50 flex items-center transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-2 w-full">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "text-white text-shadow-lg/100 transform translate-x-5 underline decoration-2 underline-offset-4"
                      : "text-white text-shadow-lg/50 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  {section.title}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
      <div
        id="overlay"
        className={`bg-radial-[at_0%_50%] from-black from-40% to-transparent to-160% fixed top-0 left-0 w-full h-full transition-opacity duration-400 pointer-events-none z-30 ${isMobileMenuOpen ? "opacity-70" : "opacity-0"}`}
      />

      <main className="text-[18px] md:text-base max-w-4xl mx-auto">
        <header className="relative text-center m-4 mt-40 bg-[url(/i&v/header.jpg)] bg-local rounded-md shadow-lg aspect-2/3 md:aspect-5/4 bg-cover bg-center ">
          <img
            src="logga.png"
            alt="Viktoria & Isak"
            className="w-52 h-52 object-contain absolute top-[-145] left-1/2 -translate-x-1/2"
          />
          <Button
            className="absolute bottom-[-15] left-1/2 -translate-x-1/2 w-36 h-10 text-white text-xl shadow-xl"
            asChild
            variant="default"
          >
            <Link href="/osa" className="">
              OSA Här!
            </Link>
          </Button>
        </header>

        <div className="max-w-4xl mx-auto pb-8 sm:pb-16 space-y-0">
          <Countdown className="pt-10 w-[90%] mx-auto" />
          {/* Our Story */}
          <section id="our-story" className="scroll-mt-8 py-8  ">
            <Card className="bg-white border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  Vår Historia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 grid grid-cols-4">
                <div className="col-span-3">
                  <p>
                    Våren 2014 blev Viktorias idrottslärare sjukskriven och en
                    vikare fick hoppa in. Vikarien gav eleverna en uppgift: att
                    testa något nytt. Eftersom vikaren var fäkttränare så
                    lockade det Viktoria och hennes vänner att testa just
                    fäktning. Väl på klubben fick Viktoria syn på Isak. Efter
                    första träningen gick Viktoria och vännerna iväg mot bussen.
                    De hinner inte långt innan Viktoria säger:
                  </p>
                  <p>
                    <i>
                      "Han den där med brunt hår och bruna ögon, han var söt".
                    </i>
                  </p>

                  <p>
                    Så vi vill säga tack till vikarien som oväntat kom in och
                    samanfogade våra vägar. I 12 år har vi varit på denna resan
                    och i augusti ska vi föreviga vår kärlek tillsammans med er!
                  </p>
                </div>
                <div className="col-span-1">
                  <img
                    src="/flowerRope1.png"
                    alt="Rope of Flowers"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="w-[90%] mx-auto overflow-hidden rounded-lg bg-[url(/i&v/holding_hands.jpg)] bg-local lg:my-10 aspect-3/1 bg-cover bg-center shadow-xl"></div>

          {/* ceremony */}
          <section id="ceremony" className="scroll-mt-8 py-8  ">
            <Card className="bg-white border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  Vigsel
                </CardTitle>
              </CardHeader>
              <CardContent className="relative flex ">
                <div className="w-40 -rotate-12 h-full">
                  <img
                    src="/purpleFlower1.png"
                    alt="Rope of Flowers"
                    className="w-full h-auto"
                  />
                </div>
                <div className="">
                  <ul className=" space-y-3">
                    <li>Vigseln sker i Sandby kyrka på Öland kl 14:00</li>
                    <li className="">Adress: Sandby kyrka Färjestaden</li>
                    <li>
                      Du kan antingen köra dit, eller åka med{" "}
                      <a href="#transport" className=" text-blue-600">
                        <u>vår buss</u>
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Party */}
          <section
            id="party"
            className="w-full mx-auto scroll-mt-8 shadow-xl bg-black"
          >
            <div className="bg-[url(/i&v/dancing.jpg)] bg-local aspect-2/3 bg-cover bg-center flex-col-reverse flex mask-b-from-15% mask-b-to-transparent" />
            <Card className="border-0 mt-[-40] py-0 pb-8 bg-transparent text-white rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  Bröllopsfest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Efter vigseln beger vi oss till Skällby Loge för att fira
                  tillsammans med mat, dryck och dans!
                  <br />
                  Adress: Skällbyallén 7, Kalmar
                </p>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-center">
            <div className="w-3/4 h-px bg-gray-300"></div>
          </div>

          {/* Transport */}
          <section id="transport" className="scroll-mt-8 py-8  ">
            <Card className="bg-white border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  Buss
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Vi har bokat buss som åker från Kalmar till Sandby kyrka och
                  sedan till bröllopsfesten i Skällby Loge. Bussen avgår från
                  Kalmar centralstation kl 13:00. Anmäl ditt intresse att åka
                  med bussen när du OSA:ar!
                </p>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-center">
            <div className="w-3/4 h-px bg-gray-300"></div>
          </div>

          {/* Speech */}
          <section id="speech" className="scroll-mt-8 py-8  ">
            <Card className="bg-white border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  Hålla tal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Vi älskar tal! Vill du hålla ett tal under middagen? Fyll i
                  detta formulär!
                </p>
                <div className="mt-4">
                  <Link href="/speech">
                    <Button className="text-white" variant="default">
                      Anmäl att du vill hålla tal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-center">
            <div className="w-3/4 h-px bg-gray-300"></div>
          </div>

          {/* Kids */}
          <section id="kids" className="scroll-mt-8 py-8  ">
            <Card className="bg-white border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  Barn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Vi har valt att hålla vår bröllopsfest barnfri. Barn är
                  hjärtligt välkomna till vigseln i kyrkan, men får tyvärr
                  stanna hemma under festen. Undantag görs såklart för de allra
                  minsta.
                </p>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-center">
            <div className="w-3/4 h-px bg-gray-300"></div>
          </div>

          {/* Gift */}
          <section id="gift" className="relative scroll-mt-8 py-8  ">
            <Card className="bg-white border-0 shadow-none mb-10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  Bröllopspresent
                </CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <p className="max-w-4/5">
                  Om ni vill och kan får ni gärna ge en present i form av ett
                  bridrag till resekassan för vår bröllopsresa!
                </p>
              </CardContent>
            </Card>
            <img
              src="/flowerRope1Rotated.png"
              alt="Band av blommor"
              className="w-[800px] aspect-4/1 hidden md:flex mx-auto -mb-10"
            />
            <img
              src="/flowerBend.png"
              alt="Flower Bend"
              className="w-55 absolute md:hidden bottom-0 right-5"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
