"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, MapPin, Users, Camera, Gift, Menu, X } from "lucide-react"
import Link from "next/link"

const sections = [
	{ id: "our-story", title: "Our Story", icon: Heart },
	{ id: "wedding-details", title: "Wedding Details", icon: Calendar },
	{ id: "venue", title: "Venue", icon: MapPin },
	{ id: "wedding-party", title: "Wedding Party", icon: Users },
	{ id: "gallery", title: "Gallery", icon: Camera },
	{ id: "registry", title: "Registry", icon: Gift },
]

export default function WeddingWebsite() {
	const [activeSection, setActiveSection] = useState("our-story")
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight / 2

			let currentSection = sections[0].id

			for (const section of sections) {
				const element = document.getElementById(section.id)
				if (element) {
					const { offsetTop } = element
					if (scrollPosition >= offsetTop) {
						currentSection = section.id
					}
				}
			}
			setActiveSection(currentSection)
		}

		handleScroll()
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		element?.scrollIntoView({ behavior: "smooth" })
		setIsMobileMenuOpen(false)
	}

	return (
		<div className="min-h-screen bg-white">
			<button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
			>
				{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
			</button>

			<div
				className={`fixed inset-0 z-40 ${isMobileMenuOpen ? "" : "pointer-events-none"
					}`}
				onClick={() => setIsMobileMenuOpen(false)}
			>
				<nav
					className={`fixed left-0 top-0 h-full w-full bg-transparent p-6 z-50 flex items-center transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
						}`}
				>
					<div className="space-y-2 w-full">
						{sections.map((section) => {
							const Icon = section.icon
							const isActive = activeSection === section.id
							return (
								<button
									key={section.id}
									onClick={() => scrollToSection(section.id)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${isActive
										? "text-white text-shadow-lg/100 transform translate-x-5 underline decoration-2 underline-offset-4"
										: "text-white text-shadow-lg/50 hover:bg-gray-100"
										}`}
								>
									<Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
									{section.title}
								</button>
							)
						})}
					</div>
				</nav>
			</div>
			<div id="overlay"
				className={`bg-radial-[at_0%_50%] from-black from-40% to-transparent to-160% fixed top-0 left-0 w-full h-full transition-opacity duration-400 pointer-events-none z-30 ${isMobileMenuOpen ? "opacity-70" : "opacity-0"}`}
			/>

			<main className="w-full">

				<header className="relative text-center m-4 mt-40 bg-[url(/i&v/header.jpg)] bg-local  aspect-2/3 bg-cover bg-center ">
					<img
						src="logga.png"
						alt="Viktoria & Isak"
						className="mx-auto w-52 h-52 object-contain absolute top-[-145] left-0 right-0"
					/>
					<div className="absolute bottom-[-30]  mx-auto left-0 right-0 bg-gray-950 w-1/3 h-12 rounded-sm flex items-center justify-center">
						<Link href="/osa" className="text-white">OSA Här!</Link>
					</div>
				</header>

				<div className="max-w-4xl mx-auto pb-8 sm:pb-16 space-y-0">
					{/* Our Story */}
					<section id="our-story" className="scroll-mt-8 py-8 sm:py-16 ">
						<Card className="bg-white border-0 shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
									<Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
									Our Story
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 grid grid-cols-4">
								<div className="col-span-3">
									<p className="text-black leading-relaxed text-sm sm:text-base">
										Våren 2014 blev Viktorias idrottslärare sjukskriven och en vikare fick hoppa in. 
										Vikarien gav eleverna en uppgift: att testa något nytt. Eftersom vikaren var fäkttränare så lockade det 
										Viktoria och hennes vänner att testa just fäktning. Väl på klubben fick Viktoria syn på Isak. Efter första 
										träningen gick Viktoria och vännerna iväg mot bussen. De hinner inte långt innan Viktoria säger:</p>
										<p className="text-black leading-relaxed text-sm sm:text-base py-3"><i>"Han den där med brunt hår och bruna ögon, han var söt".</i></p>

									<p className="text-black leading-relaxed text-sm sm:text-base">
										Så vi villa säga tack till vikarien som oväntat kom in och samanfogade våra vägar. I 12 år har vi	varit på denna resan och i augusti ska vi föreviga vår kärlek tillsammans med er!
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

					<div className="flex justify-center">
						<div className="w-3/4 h-px bg-gray-300"></div>
					</div>

					{/* Kyrka */}
					<section id="wedding-details" className="scroll-mt-8 py-8 sm:py-16 ">
						<Card className="bg-white border-0 shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
									<Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
									Kyrka
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
								<div className="text-right">
									<p className="text-black leading-relaxed text-sm sm:text-base">
										Vigsel sker på Öland kl 14:00
									</p>
								</div>
							</CardContent>
						</Card>
					</section>

					<div className="flex justify-center">
						<div className="w-3/4 h-px bg-gray-300"></div>
					</div>

					{/* Venue */}
					<section id="venue" className="scroll-mt-8 py-8 sm:py-16 ">
						<Card className="bg-white border-0 shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
									<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
									Mottagning
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="font-semibold text-base sm:text-lg text-black">Sunset Gardens & Grand Ballroom</h3>
										<p className="text-black text-sm sm:text-base">123 Garden Lane, Beautiful City, BC 12345</p>
									</div>
									<p className="text-black leading-relaxed text-sm sm:text-base">
										A stunning venue with beautiful gardens for our ceremony and an elegant ballroom for our reception.
										The venue offers ample parking and is easily accessible for all our guests.
									</p>
									<Button className="" variant="default">Get Directions</Button>
								</div>
							</CardContent>
						</Card>
					</section>

					<div className="flex justify-center">
						<div className="w-3/4 h-px bg-gray-300"></div>
					</div>

					{/* Wedding Party */}
					<section id="wedding-party" className="scroll-mt-8 py-8 sm:py-16 ">
						<Card className="bg-white border-0 shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
									<Users className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
									Wedding Party
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-8 sm:grid-cols-2">
									<div>
										<h3 className="font-semibold text-base sm:text-lg mb-4 text-black">Bridesmaids</h3>
										<div className="space-y-3">
											<div>
												<p className="font-medium text-black text-sm sm:text-base">Emma Thompson - Maid of Honor</p>
												<p className="text-xs sm:text-sm text-gray-600">Sarah's sister and best friend</p>
											</div>
											<div>
												<p className="font-medium text-black text-sm sm:text-base">Lisa Chen</p>
												<p className="text-xs sm:text-sm text-gray-600">College roommate</p>
											</div>
											<div>
												<p className="font-medium text-black text-sm sm:text-base">Rachel Davis</p>
												<p className="text-xs sm:text-sm text-gray-600">Childhood friend</p>
											</div>
										</div>
									</div>
									<div>
										<h3 className="font-semibold text-base sm:text-lg mb-4 text-black">Groomsmen</h3>
										<div className="space-y-3">
											<div>
												<p className="font-medium text-black text-sm sm:text-base">Michael Wilson - Best Man</p>
												<p className="text-xs sm:text-sm text-gray-600">James's brother</p>
											</div>
											<div>
												<p className="font-medium text-black text-sm sm:text-base">David Park</p>
												<p className="text-xs sm:text-sm text-gray-600">College friend</p>
											</div>
											<div>
												<p className="font-medium text-black text-sm sm:text-base">Alex Rodriguez</p>
												<p className="text-xs sm:text-sm text-gray-600">Work colleague</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					<div className="flex justify-center">
						<div className="w-3/4 h-px bg-gray-300"></div>
					</div>

					{/* Gallery */}
					<section id="gallery" className="scroll-mt-8 py-8 sm:py-16 ">
						<Card className="bg-white border-0 shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
									<Camera className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
									Gallery
								</CardTitle>
								<CardDescription className="text-gray-600 text-sm sm:text-base">
									A collection of our favorite moments together
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
									{[1, 2, 3, 4, 5, 6].map((i) => (
										<div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
											<Camera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</section>

					<div className="flex justify-center">
						<div className="w-3/4 h-px bg-gray-300"></div>
					</div>

					{/* Registry */}
					<section id="registry" className="scroll-mt-8 py-8 sm:py-16 ">
						<Card className="bg-white border-0 shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
									<Gift className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
									Registry
								</CardTitle>
								<CardDescription className="text-gray-600 text-sm sm:text-base">
									Your presence is the greatest gift, but if you'd like to celebrate with us...
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-black leading-relaxed text-sm sm:text-base">
									We're so grateful to have you celebrate with us! If you'd like to give a gift, we've registered at a
									few of our favorite stores.
								</p>
								<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
									<Button
										variant="outline"
										className="border-gray-300 bg-white text-black hover:bg-gray-50 text-sm sm:text-base"
									>
										View Registry at Target
									</Button>
									<Button
										variant="outline"
										className="border-gray-300 bg-white text-black hover:bg-gray-50 text-sm sm:text-base"
									>
										View Registry at Crate & Barrel
									</Button>
									<Button
										variant="outline"
										className="border-gray-300 bg-white text-black hover:bg-gray-50 text-sm sm:text-base"
									>
										Contribute to Honeymoon Fund
									</Button>
								</div>
							</CardContent>
						</Card>
					</section>
				</div>
			</main>
		</div>
	)
}
