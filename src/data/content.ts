/**
 * Site content — every fact here comes from the supplied property documentation
 * (Trattorias Tranquil, Trattorias Holiday Homes, Trattorias Restaurant).
 * Only positive, confirmed details are used. Nothing is invented: no prices, no
 * guest quotes, no opening hours (none were supplied).
 * Images are still placeholders — see ./images.ts.
 */
import type { IconName } from "@/components/Icon";
import { img } from "./images";

export const site = {
  name: "Trattorias",
  url: "https://web-trattorias.web.app", // live site URL (Firebase Hosting)
  // General number (restaurant) used on the home, contact page and footer.
  phone: "+91 97469 68992",
  // Dedicated call / WhatsApp number for each property.
  phones: {
    restaurant: "+91 97469 68992",
    holiday: "+91 93633 18992",
    tranquil: "+91 73062 68992",
  },
  address: "Varkala, Kerala, India",
};

export const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;
/** Opens the place in Google Maps (search by name + address). */
export const mapsLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const whatsapp = (p: string) => `https://wa.me/${p.replace(/[^\d]/g, "")}`;
/** WhatsApp link with a prefilled enquiry message. */
export const waLink = (p: string, text: string) => `${whatsapp(p)}?text=${encodeURIComponent(text)}`;

export type Theme = "home" | "tranquil" | "restaurant" | "holiday";

export type Feature = { icon: IconName; title: string; text: string; image?: string };
export type Card = { title: string; text?: string; image: string; tag?: string; price?: string; href?: string; brand?: string };
export type Tile = { src: string; caption: string; size?: "tall" | "wide" };
export type AmenityGroup = { icon: IconName; title: string; items: string[] };
export type Score = { value: string; label: string; note: string };

export type Amenities = { eyebrow?: string; title: string; sub: string; groups: AmenityGroup[] };
export type Nearby = { eyebrow?: string; title: string; sub: string; image: string; places: { name: string; distance: string }[] };
export type Ratings = { eyebrow?: string; title: string; sub: string; scores: Score[]; chipsTitle: string; chips: string[] };
export type Book = {
  eyebrow?: string;
  title: string;
  sub: string;
  platforms: string[];
  phone?: string;
  whatsapp?: string;
  /** Direct listing URL per platform. */
  platformLinks?: Record<string, string>;
};

export type BrandPage = {
  theme: Theme;
  path: string;
  name: string;
  tagline: string;
  blurb: string;
  address: string;
  phone?: string;
  whatsapp: string;
  seo: { title: string; description: string; keywords: string[] };
  /** Visible FAQ, also emitted as FAQPage structured data. Facts only from the supplied property docs. */
  faqs: { q: string; a: string }[];
  /** Structured-data (schema.org) facts. */
  schema: {
    rooms?: number;
    checkin?: string;
    checkout?: string;
    hours?: { open: string; close: string };
    amenities: string[];
    sameAs: string[];
    nearby: string[];
  };
  hero: {
    title: string;
    sub: string;
    cta: string;
    href?: string;
    slides: string[];
    corner: string;
    stat: { label: string; to: number; prefix?: string; suffix?: string; decimals?: number };
  };
  why: { eyebrow?: string; title: string; sub: string; items: Feature[] };
  split: { title: string; sub: string; image: string; badge?: { value: string; label: string }; features: Feature[] };
  showcase: { eyebrow: string; title: string; sub: string; items: Card[]; cta?: { label: string; href: string } };
  amenities: Amenities;
  process: { eyebrow?: string; title: string; image: string; steps: { title: string; text: string }[] };
  gallery: { eyebrow?: string; title: string; sub: string; tiles: Tile[] };
  nearby?: Nearby;
  stats: { to: number; suffix?: string; decimals?: number; label: string }[];
  ratings?: Ratings;
  book?: Book;
  info: { icon: IconName; label: string; value: string; href?: string }[];
  cta: { eyebrow?: string; title: string; sub: string; button: string; href?: string; image?: string };
};

/* ================================================================
   TRATTORIAS TRANQUIL — recently renovated B&B / homestay, Odayam Beach Road
   ================================================================ */
export const tranquil: BrandPage = {
  theme: "tranquil",
  path: "/tranquil/",
  name: "Trattorias Tranquil",
  tagline: "Bed & Breakfast",
  blurb: "A recently renovated stay with private garden verandahs and an outdoor pool, a 4-minute walk from Odayam Beach.",
  address: "Odayam Beach Road, Varkala, Kerala, India",
  phone: site.phones.tranquil,
  whatsapp: site.phones.tranquil,
  seo: {
    title: "Trattorias Tranquil — Garden-View Stay near Odayam Beach, Varkala",
    description:
      "Trattorias Tranquil on Odayam Beach Road, Varkala: a recently renovated stay with air-conditioned queen rooms, private garden verandahs, an outdoor swimming pool, free Wi-Fi and parking — 4 minutes' walk to Odayam Beach. Book direct.",
    keywords: [
      "Trattorias Tranquil", "Tranquil Varkala", "homestay in Varkala", "bed and breakfast Varkala", "B&B near Odayam Beach",
      "Odayam Beach stay", "Varkala hotel with swimming pool", "Varkala homestay with pool", "garden stay Varkala",
      "Varkala accommodation with free parking", "air conditioned rooms Varkala", "Odayam Beach Road hotel", "Varkala airport shuttle stay", "Varkala Kerala",
    ],
  },
  faqs: [
    { q: "Where is Trattorias Tranquil in Varkala?", a: "Trattorias Tranquil is on Odayam Beach Road, Varkala, Kerala — a 4-minute walk from Odayam Beach, about 2.1 km from Varkala Cliff and 2.2 km from Varkala Beach." },
    { q: "Does Trattorias Tranquil have a swimming pool?", a: "Yes. Guests can use the outdoor swimming pool and the garden area, along with a shared living room and shared kitchen facilities." },
    { q: "What types of rooms are available at Tranquil?", a: "Seven air-conditioned rooms in two categories — Standard Queen and Deluxe Queen — each with a flat-screen TV, private bathroom with hot water and a private garden verandah sit-out." },
    { q: "What are the check-in and check-out times?", a: "Check-in is between 1:00 PM and 8:00 PM and check-out is between 11:00 AM and 12:00 PM. Staff and security are on duty 24/7." },
    { q: "Is there free Wi-Fi and parking at Tranquil?", a: "Yes, free Wi-Fi is available throughout the property and free private car parking is available on site." },
    { q: "Is there an airport shuttle from Thiruvananthapuram Airport?", a: "An airport shuttle service is available. Thiruvananthapuram Airport is about 40 km from the property. Car hire and bicycle rentals are also available." },
    { q: "How can I book Trattorias Tranquil?", a: "Book direct by calling or messaging +91 73062 68992 on WhatsApp, or find Trattorias Tranquil on Booking.com, Agoda and allkeralahotels.net." },
  ],
  schema: {
    rooms: 7,
    checkin: "13:00",
    checkout: "11:00",
    amenities: ["Outdoor swimming pool", "Free Wi-Fi", "Free parking", "Air conditioning", "Garden", "24-hour security", "Airport shuttle", "Laundry", "Bicycle rental", "Shared kitchen"],
    sameAs: [
      "https://www.booking.com/hotel/in/trattorias-tranquil.html",
      "https://www.agoda.com/en-in/trattorias-tranquil/hotel/varkala-in.html",
      "https://hotel-191.allkeralahotels.net/en/",
    ],
    nearby: ["Odayam Beach", "Varkala Cliff", "Varkala Beach", "Edava Beach", "Varkala Aquarium"],
  },
  hero: {
    title: "Garden *Calm*,\nMinutes From the Sea",
    sub: "A recently renovated stay on Odayam Beach Road, Varkala — private garden verandahs, an outdoor pool and the beach just a 4-minute walk away.",
    cta: "Call Us",
    href: tel(site.phones.tranquil),
    slides: [img.tranquilHero],
    corner: "4-minute walk to Odayam Beach",
    stat: { label: "Comfortable Rooms", to: 7 },
  },
  why: {
    eyebrow: "Why Tranquil",
    title: "Why Stay at *Tranquil*",
    sub: "A calm base on Odayam Beach Road with the sea, the garden and the pool all close at hand.",
    items: [
      { icon: "Waves", title: "Odayam Beach Nearby", text: "Just a 4-minute walk to the sand.", image: img.beach },
      { icon: "Leaf", title: "Private Garden Verandah", text: "Step out onto your private covered sit-out with wooden armchairs, surrounded by tropical greenery.", image: img.tranquilVerandahSitout },
      { icon: "Droplets", title: "Outdoor Swimming Pool", text: "Cool off in the pool after a day at the beach.", image: img.tranquilPoolAerial },
    ],
  },
  split: {
    title: "Rooms Made for Rest",
    sub: "Seven rooms in two categories — Standard Queen and Deluxe Queen — each with the comforts you need for an easy stay.",
    image: img.tranquilDeluxeBed,
    features: [
      { icon: "Wind", title: "Air Conditioning & TV", text: "Cool rooms with a flat-screen TV and satellite channels." },
      { icon: "Droplets", title: "Private Bathroom", text: "With a hot water facility." },
      { icon: "Leaf", title: "Garden Verandah", text: "Private outdoor sit-out with wooden armchairs and garden greenery." },
      { icon: "Users", title: "Room to Relax", text: "Unwind in the garden, the shared living room and the shared kitchen." },
    ],
  },
  showcase: {
    eyebrow: "Rooms & spaces",
    title: "Find Your *Corner*",
    sub: "Two queen room categories, plus a pool and garden to share.",
    items: [
      { title: "Standard Queen Room", text: "Air-conditioned · private bathroom · private verandah sit-out.", image: img.tranquilStandardRoom, tag: "Queen Room" },
      { title: "Deluxe Queen Room", text: "Air-conditioned · private bathroom · private verandah sit-out.", image: img.tranquilDeluxeBed, tag: "Queen Room" },
      { title: "Pool & Garden", text: "An outdoor swimming pool and garden area for all guests.", image: img.tranquilPool, tag: "Shared" },
    ],
  },
  amenities: {
    eyebrow: "Amenities",
    title: "*Amenities* & Services",
    sub: "Everything included to make your stay simple and comfortable.",
    groups: [
      { icon: "Wifi", title: "Internet & Parking", items: ["Free Wi-Fi throughout the property", "Free private on-site car parking"] },
      { icon: "ShieldCheck", title: "Reception & Security", items: ["24/7 staff service", "24/7 security"] },
      { icon: "Car", title: "Getting Around", items: ["Airport shuttle service", "Car hire", "Bicycle rentals"] },
      { icon: "Shirt", title: "Laundry", items: ["On-site laundry facilities"] },
      { icon: "Users", title: "Shared Spaces", items: ["Garden area", "Shared living room", "Shared kitchen facilities"] },
      { icon: "Droplets", title: "Pool", items: ["Outdoor swimming pool"] },
    ],
  },
  process: {
    eyebrow: "Your stay",
    title: "Your *Stay*,\nStep by Step",
    image: img.tranquilCourtyard,
    steps: [
      { title: "Call to Book", text: "Call or WhatsApp +91 73062 68992 to reserve your room." },
      { title: "Easy Arrival", text: "Check in between 1:00 PM and 8:00 PM — our staff is on hand 24/7." },
      { title: "Settle In", text: "Enjoy the pool, the garden, and the shared living room and kitchen." },
      { title: "Explore Varkala", text: "Odayam Beach is 4 minutes on foot, and bicycles are available to rent." },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "A Look *Around*",
    sub: "The pool, the garden and the rooms.",
    tiles: [
      { src: img.tranquilCourtyard, caption: "Sunlit villa facade & tropical courtyard", size: "wide" },
      { src: img.tranquilPool, caption: "Outdoor swimming pool surrounded by palms", size: "wide" },
      { src: img.tranquilGardenPath, caption: "Tropical garden walkway with hanging greenery", size: "tall" },
      { src: img.tranquilLiving, caption: "Shared guest living lounge opening to garden", size: "wide" },
      { src: img.tranquilDiningPatio, caption: "Covered dining patio & breakfast buffet" },
      { src: img.tranquilDeluxeBed, caption: "Deluxe Queen bed with embroidered linens", size: "wide" },
      { src: img.tranquilVerandahNight, caption: "Warmly lit private verandah at night", size: "tall" },
      { src: img.tranquilPoolAerial, caption: "Sunlit pool terrace & private guest deck", size: "tall" },
      { src: img.tranquilStandardRoom, caption: "Standard Queen bedroom with air conditioning" },
      { src: img.tranquilVerandahSitout, caption: "Private garden verandah with outdoor wooden armchairs" },
      { src: img.tranquilCourtyardWalkway, caption: "Courtyard verandah walkway along guest rooms" },
      { src: img.tranquilDeluxeSuite, caption: "Deluxe Queen suite with TV & living lounge", size: "wide" },
    ],
  },
  nearby: {
    eyebrow: "Location",
    title: "Close to *Everything*",
    sub: "Beaches, a temple, a restaurant and Varkala Cliff are all within easy reach.",
    image: img.tranquilSignboard,
    places: [
      { name: "Odayam Beach", distance: "4-minute walk" },
      { name: "Odayam Parambil Sree Bhadrakali Temple", distance: "5-minute walk" },
      { name: "Babu Farm Restaurant", distance: "6-minute walk" },
      { name: "Varkala Aquarium", distance: "940 m" },
      { name: "Edava Beach", distance: "1.5 km" },
      { name: "Varkala Cliff", distance: "2.1 km" },
      { name: "Varkala Beach", distance: "2.2 km" },
      { name: "Thiruvananthapuram Airport", distance: "40 km · shuttle available" },
    ],
  },
  stats: [
    { to: 7, label: "Guest rooms" },
    { to: 4, suffix: " min", label: "Walk to Odayam Beach" },
    { to: 24, suffix: "/7", label: "Staff & security" },
    { to: 2, label: "Room categories" },
  ],
  book: {
    eyebrow: "Book direct",
    title: "Book Your *Stay*",
    sub: "Reserve direct by phone or WhatsApp, or find Trattorias Tranquil on these platforms.",
    platforms: ["Booking.com", "Agoda", "allkeralahotels.net"],
    platformLinks: {
      "Booking.com": "https://www.booking.com/hotel/in/trattorias-tranquil.html",
      Agoda: "https://www.agoda.com/en-in/trattorias-tranquil/hotel/varkala-in.html",
      "allkeralahotels.net": "https://hotel-191.allkeralahotels.net/en/",
    },
    phone: site.phones.tranquil,
    whatsapp: site.phones.tranquil,
  },
  info: [
    { icon: "MapPin", label: "Location", value: "Odayam Beach Road, Varkala", href: mapsLink("Trattorias Tranquil, Odayam Beach Road, Varkala, Kerala, India") },
    { icon: "Key", label: "Check-in / out", value: "1–8 PM / 11 AM–12 PM" },
    { icon: "Phone", label: "Direct booking", value: site.phones.tranquil, href: tel(site.phones.tranquil) },
  ],
  cta: { eyebrow: "Stay with us", title: "Your Quiet Corner of Varkala", sub: "Book direct by phone or WhatsApp.", button: "Call to Book", href: tel(site.phones.tranquil), image: img.tranquilPatioDusk },
};

/* ================================================================
   TRATTORIAS RESTAURANT — North End Cliff, near Black Beach
   ================================================================ */
export const restaurant: BrandPage = {
  theme: "restaurant",
  path: "/restaurant/",
  name: "Trattorias Restaurant",
  tagline: "Cliff-top dining",
  blurb: "A multi-cuisine restaurant, cafe and cocktail bar on North End Cliff with sea-facing terrace seating.",
  address: "North End Cliff, near Black Beach, Varkala, Kerala 695141",
  phone: site.phones.restaurant,
  whatsapp: site.phones.restaurant,
  seo: {
    title: "Trattorias Restaurant — Sea-View Dining on Varkala Cliff",
    description:
      "Trattorias Restaurant on North End Cliff, Varkala: a multi-cuisine restaurant, cafe and cocktail bar serving Italian wood-fired pizza, Tibetan momos, Thai, Pan-Asian, sushi and fresh Kerala seafood with open-air Arabian Sea and sunset views. Open daily 8 AM – 11 PM.",
    keywords: [
      "Trattorias Restaurant", "restaurant in Varkala", "best restaurant Varkala", "Varkala cliff restaurant", "North Cliff Varkala restaurant",
      "sea view restaurant Varkala", "sunset dinner Varkala", "Varkala seafood restaurant", "cafe in Varkala", "cocktail bar Varkala",
      "Italian pizza Varkala", "momos Varkala", "multi cuisine restaurant Varkala", "Black Beach Varkala restaurant", "breakfast in Varkala",
    ],
  },
  faqs: [
    { q: "Where is Trattorias Restaurant in Varkala?", a: "Trattorias Restaurant is on North End Cliff, near Black Beach, Varkala, Kerala 695141, with open-air terrace seating facing the Arabian Sea." },
    { q: "What are the opening hours of Trattorias Restaurant?", a: "We are open daily from 8:00 AM to 11:00 PM — serving breakfast, all-day dining, sunset dinner and drinks." },
    { q: "What kind of food does Trattorias Restaurant serve?", a: "A multi-cuisine menu: fresh Kerala seafood, sushi, Italian wood-fired pizza and pasta, Tibetan momos and thukpa, Thai and Pan-Asian dishes, Continental breakfast, bakery items and healthy salads." },
    { q: "Does the restaurant have a sea view and sunset views?", a: "Yes. The open-air terrace and balcony seating look out over the Arabian Sea with sunset views." },
    { q: "Is there a bar, cafe or takeaway?", a: "Yes. There is a cocktail bar with fresh juices, a full cafe and bakery with coffee, smoothies and desserts, and takeaway is available." },
    { q: "Is there Wi-Fi and charging at the restaurant?", a: "Free customer Wi-Fi and charging sockets for laptops and phones are available." },
    { q: "How do I reserve a table?", a: "Call or WhatsApp +91 97469 68992 to reserve a table or ask any question about the menu." },
  ],
  schema: {
    hours: { open: "08:00", close: "23:00" },
    amenities: ["Sea view terrace", "Free Wi-Fi", "Takeaway", "Cocktail bar", "Outdoor seating", "Charging sockets"],
    sameAs: [],
    nearby: ["North Cliff", "Black Beach", "Varkala Beach"],
  },
  hero: {
    title: "Ocean Views\nUnforgettable *Flavours*",
    sub: "A multi-cuisine restaurant, cafe and cocktail bar on North End Cliff, with an open-air, sea-facing terrace and sunset views.",
    cta: "Call Us",
    href: tel(site.phones.restaurant),
    slides: [img.restaurantHero],
    corner: "North End Cliff · Near Black Beach",
    stat: { label: "Diner Rating on TripAdvisor", to: 4.0, suffix: " / 5", decimals: 1 },
  },
  why: {
    eyebrow: "Why dine here",
    title: "Why Diners Love *Trattorias*",
    sub: "Good food, sea breeze and a relaxed beachside atmosphere on the Varkala cliff.",
    items: [
      { icon: "Sunset", title: "Sea-Facing Terrace", text: "Open-air terrace and balcony seating with ocean and sunset views.", image: img.beachCoastline },
      { icon: "UtensilsCrossed", title: "A Menu That Travels", text: "Fresh Kerala seafood, sushi, Italian pizzas, Tibetan momos and Continental favourites.", image: img.sushiPlatter },
      { icon: "Salad", title: "Something for Everyone", text: "Hearty breakfasts, bakery delights, healthy salads and drinks for all tastes.", image: img.breakfastPlatter },
    ],
  },
  split: {
    title: "Flavours From East to West",
    sub: "A rich multi-cuisine menu crafted by chefs who know world cuisine — from local Kerala seafood curries to Italian thin-crust pizza and Tibetan steamed momos.",
    image: img.romanticTable,
    features: [
      { icon: "UtensilsCrossed", title: "Seafood & Coastal", text: "Catch of the day grilled, steamed in banana leaf, or cooked in rich Kerala coconut curry." },
      { icon: "Pizza", title: "Italian & Wood-Fired", text: "Crispy pizzas, pasta tossed in olive oil or cream sauces, and fresh salads." },
      { icon: "Soup", title: "Tibetan, Thai & Asian", text: "Steamed momos, warming thukpa bowls, pad Thai and aromatic Thai curries." },
      { icon: "Coffee", title: "Bakery, Cafe & Bar", text: "Continental breakfast, barista coffees, smoothies, desserts and tropical cocktails." },
    ],
  },
  showcase: {
    eyebrow: "Menu highlights",
    title: "A Taste of the *Menu*",
    sub: "Twelve of our most-loved dishes and drinks across Italian, Kerala seafood, Tibetan momos, grills and cocktails.",
    cta: {
      label: "View Digital Menu",
      href: "https://trattorias.pages.dev/",
    },
    items: [
      { title: "Wood-Fired Pizza", image: img.pizzaOcean },
      { title: "Banana-Leaf Steamed Fish", image: img.bananaLeafFish },
      { title: "Tibetan Steamed Momos", image: img.momosPlate },
      { title: "Tropical Cliff Cocktails", image: img.cocktails },
      { title: "Kerala Masala Fish Fillet", image: img.masalaFish },
      { title: "Sushi & Maki Platters", image: img.sushiPlatter },
      { title: "Evening Tandoori Platter", image: img.tandooriDinner },
      { title: "Pan-Asian Stir-Fried Noodles", image: img.asianNoodles },
      { title: "Fresh Grilled Fish Fillet", image: img.fishFillet },
      { title: "Gourmet Burger & Home Fries", image: img.burgerFries },
      { title: "Chilled Fresh Lime Soda", image: img.limeSoda },
      { title: "Fresh Tropical Fruit Bowl", image: img.fruitBowl },
    ],
  },
  amenities: {
    eyebrow: "Dining amenities",
    title: "Dining *Comforts*",
    sub: "Everything you need for a comfortable cliff-top dining experience.",
    groups: [
      { icon: "Sunset", title: "Ambience & Views", items: ["Panoramic Arabian Sea views", "Open-air sunset terrace", "Covered patio seating"] },
      { icon: "UtensilsCrossed", title: "Cuisine & Bar", items: ["Multi-cuisine menu", "Full cafe & bakery", "Cocktail bar & fresh juices"] },
      { icon: "Wifi", title: "Connectivity", items: ["Free customer Wi-Fi", "Charging sockets for laptops & phones"] },
      { icon: "Clock", title: "Service", items: ["All-day dining", "Takeaway available", "Friendly multi-lingual staff"] },
    ],
  },
  process: {
    eyebrow: "Experience",
    title: "The Trattorias\n*Dining* Flow",
    image: img.restaurantHero,
    steps: [
      { title: "Find Your Perch", text: "Pick a front-row balcony table or settle into our breezy covered deck." },
      { title: "Order Across Continents", text: "Pair freshly made sushi with Kerala seafood or a stone-baked pizza." },
      { title: "Savour the Sunset", text: "Watch golden hour paint the Arabian Sea with a chilled cocktail in hand." },
      { title: "Linger Over Dessert", text: "Finish with artisanal coffee, homemade brownies or creamy cheesecake." },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Life at the *Cliff*",
    sub: "Open-air dining, fresh seafood, and sunsets over the Arabian Sea.",
    tiles: [
      { src: img.cliffTerraceSunset, caption: "Sunset terrace with Trattorias sign", size: "tall" },
      { src: img.panoramicBalcony, caption: "Balcony dining overlooking turquoise sea", size: "wide" },
      { src: img.cocktails, caption: "Tropical cocktails by the waves" },
      { src: img.breakfastPlatter, caption: "Continental breakfast & fresh coffee" },
      { src: img.fishFillet, caption: "Fresh grilled fish steak with fries & salad", size: "wide" },
      { src: img.eveningTerrace, caption: "Evening dining under handcrafted lamps", size: "wide" },
      { src: img.romanticTable, caption: "Intimate cliffside dining table at dusk", size: "tall" },
      { src: img.clubSandwich, caption: "Toasted club sandwich & crispy french fries" },
      { src: img.cliffWalkway, caption: "North Cliff promenade & seaside tables", size: "wide" },
      { src: img.beachCoastline, caption: "Varkala Beach coastline from the cliff deck" },
      { src: img.sushiPlatter, caption: "Fresh sushi & tempura maki platter", size: "wide" },
      { src: img.coveredPatio, caption: "Semi-covered ocean-facing lounge booth" },
      { src: img.wovenLights, caption: "Artisanal rope & coir pendant lanterns" },
      { src: img.pizzaCandlelit, caption: "Wood-fired pizza on the cliff terrace at dusk", size: "wide" },
      { src: img.dinnerNoodles, caption: "Candlelit noodle dinner with Arabian Sea breeze", size: "wide" },
      { src: img.tandooriFish, caption: "Tandoori fish tikka with panoramic sea views", size: "tall" },
      { src: img.momosTrio, caption: "Steamed spinach momos trio with hot chilli dip" },
      { src: img.momosDumplings, caption: "Handmade Tibetan pleated dumplings" },
      { src: img.spinachOmelette, caption: "Spinach & herb breakfast omelette with toast" },
      { src: img.pizzaMargherita, caption: "Classic wood-fired Margherita pizza", size: "wide" },
      { src: img.limeSoda, caption: "Chilled fresh lime soda overlooking the waves" },
      { src: img.fruitBowl, caption: "Fresh tropical fruit bowl with seasonal Kerala fruits" },
      { src: img.asianNoodles, caption: "Wok-tossed Asian noodles with chili & veggies" },
      { src: img.tandooriDinner, caption: "Evening tandoori feast & cliffside drinks", size: "wide" },
    ],
  },
  stats: [
    { to: 1100, suffix: "+", label: "Diner reviews" },
    { to: 4.0, suffix: " / 5", decimals: 1, label: "TripAdvisor rating" },
    { to: 6, label: "World cuisines" },
    { to: 100, suffix: "%", label: "Sea & sunset views" },
  ],
  info: [
    { icon: "MapPin", label: "Location", value: "North End Cliff, near Black Beach, Varkala", href: mapsLink("Trattorias Restaurant, North End Cliff, Varkala, Kerala") },
    { icon: "Clock", label: "Hours", value: "8:00 AM – 11:00 PM daily" },
    { icon: "Phone", label: "Reservations & queries", value: site.phones.restaurant, href: tel(site.phones.restaurant) },
  ],
  cta: { eyebrow: "Visit us", title: "Come for the Sunset", sub: "Sea-facing tables on the Varkala cliff.", button: "Call Us", href: tel(site.phones.restaurant), image: img.romanticTable },
};

/* ================================================================
   TRATTORIAS HOLIDAY HOMES — Black Beach / Thiruvambadi Road
   ================================================================ */
export const holiday: BrandPage = {
  theme: "holiday",
  path: "/holiday-home/",
  name: "Trattorias Holiday Homes",
  tagline: "Homestay",
  blurb: "A new six-room homestay on Black Beach, about a 5-minute walk from North Cliff.",
  address: "Black Beach, Thiruvambadi Road, Varkala Beach, Varkala, Kerala 695141",
  phone: site.phones.holiday,
  whatsapp: site.phones.holiday,
  seo: {
    title: "Trattorias Holiday Homes — Homestay Near North Cliff, Varkala",
    description:
      "Trattorias Holiday Homes: a new 6-room homestay on Black Beach, Thiruvambadi Road, Varkala. Air-conditioned rooms with private bathrooms, 24-hour front desk, 5 minutes' walk from North Cliff. Rated 4.2 on MakeMyTrip.",
    keywords: [
      "Trattorias Holiday Homes", "Holiday Homes Varkala", "homestay near North Cliff Varkala", "Black Beach Varkala stay", "Varkala homestay",
      "Thiruvambadi Road Varkala", "budget stay Varkala", "air conditioned homestay Varkala", "Varkala couples stay", "stay near Varkala Beach",
      "Varkala holiday home", "North Cliff Varkala accommodation", "new homestay Varkala",
    ],
  },
  faqs: [
    { q: "Where is Trattorias Holiday Homes?", a: "Trattorias Holiday Homes is at Black Beach, Thiruvambadi Road, Varkala Beach, Varkala, Kerala 695141 — about a 5-minute walk (0.35–0.4 km) from North Cliff and 0.5 km from Varkala Beach." },
    { q: "How many rooms does Holiday Homes have?", a: "Six ground-floor, air-conditioned rooms in a new building, each with a private bathroom (hot and cold water, bidet and toiletries) and a balcony or terrace. King-bed rooms sleep 2 adults." },
    { q: "What facilities are available?", a: "A 24-hour front desk, on-site caretaker, shared kitchenette, power backup, parking, housekeeping and laundry service, and Swiggy food delivery access." },
    { q: "Is Holiday Homes suitable for couples and groups of friends?", a: "Yes, couples and groups of friends are welcome." },
    { q: "How do I book Trattorias Holiday Homes?", a: "Find us on MakeMyTrip, Goibibo, Booking.com and allkeralahotels.net, or call or WhatsApp +91 93633 18992. Hosts usually reply within 6 hours." },
    { q: "How is Holiday Homes rated by guests?", a: "Guests rate us 4.2 out of 5 on MakeMyTrip (29 ratings) and Goibibo (26 ratings), often mentioning peaceful surroundings, clean rooms and a helpful host." },
  ],
  schema: {
    rooms: 6,
    amenities: ["Air conditioning", "Private bathroom", "24-hour front desk", "Parking", "Shared kitchenette", "Power backup", "Laundry service", "Balcony or terrace"],
    sameAs: [
      "https://www.booking.com/hotel/in/trattorias-holiday-home.html",
      "https://www.makemytrip.com/hotels/trattorias_holiday_homes-details-varkala.html",
      "https://www.goibibo.com/hotels/trattorias-holiday-homes-hotel-in-varkala-1058302686415001657/",
      "https://trattorias-holiday-home.allkeralahotels.net/en/",
    ],
    nearby: ["North Cliff", "Black Beach", "Varkala Beach"],
  },
  hero: {
    title: "A Quiet Escape,\n*Moments* From the Sea",
    sub: "A peaceful six-room retreat by Black Beach on Thiruvambadi Road — unwind in air-conditioned comfort, just a 5-minute stroll from Varkala's vibrant North Cliff.",
    cta: "Call Us",
    href: tel(site.phones.holiday),
    slides: [img.holidayHero],
    corner: "5-minute stroll to North Cliff",
    stat: { label: "Guest Rating on MakeMyTrip", to: 4.2, suffix: " / 5", decimals: 1 },
  },
  why: {
    eyebrow: "Why Holiday Homes",
    title: "Why Stay at *Holiday Homes*",
    sub: "A calm stay just off the main path, within easy reach of the cliff and the beach.",
    items: [
      { icon: "Mountain", title: "Close to North Cliff", text: "Only 0.35-0.4 km away - about 5 minutes on foot.", image: img.holidaySunsetBeach },
      { icon: "Leaf", title: "Peaceful Surroundings", text: "A calm setting guests often mention.", image: img.holidaySunlitPalms },
      { icon: "Users", title: "Helpful Host & Manager", text: "Friendly, attentive help whenever you need it.", image: img.holidayEveningGazebo },
    ],
  },
  split: {
    title: "Clean, Simple Comfort",
    sub: "Six ground-floor rooms in a new building, each with air conditioning, private bathroom, and outdoor seating.",
    image: img.holidayGreenDeluxeBalcony,
    features: [
      { icon: "Wind", title: "Air Conditioning", text: "Cool, clean rooms for a comfortable rest." },
      { icon: "Droplets", title: "Attached Bathroom", text: "Hot and cold water, bidet, and toiletries." },
      { icon: "Leaf", title: "Balcony or Terrace", text: "Step outside into the quiet coastal surroundings." },
      { icon: "ShieldCheck", title: "24-Hour Front Desk", text: "Staff and on-site caretaker ready to assist." },
    ],
  },
  showcase: {
    eyebrow: "Rooms & spaces",
    title: "Find Your *Room*",
    sub: "Six comfortable rooms designed for peaceful stays in Varkala.",
    items: [
      { title: "King-Bed Room", text: "Sleeps 2 adults, with closet, charging points and a blanket.", image: img.holidayPurpleDeluxeBalcony, tag: "2 Adults" },
      { title: "Attached Bathroom", text: "Hot and cold water, a bidet and toiletries.", image: img.holidayBathroom, tag: "Bathroom" },
      { title: "Balcony or Terrace", text: "Step outside and enjoy the peaceful surroundings.", image: img.holidayBuildingExterior, tag: "Outdoors" },
    ],
  },
  amenities: {
    eyebrow: "Amenities",
    title: "*Amenities* & Services",
    sub: "Everything you need for an easy, independent stay in Varkala.",
    groups: [
      { icon: "Wind", title: "Room Comforts", items: ["Air conditioning", "Tile/marble flooring", "Soundproofing", "Clothes rack", "Socket near bed"] },
      { icon: "Droplets", title: "Bathroom", items: ["Hot and cold water", "Bidet", "Toiletries"] },
      { icon: "Coffee", title: "Property Facilities", items: ["Shared kitchenette", "Power backup", "Parking", "Housekeeping and laundry service", "Swiggy food delivery access"] },
      { icon: "ShieldCheck", title: "Always on Hand", items: ["24-hour front desk", "On-site caretaker"] },
      { icon: "Users", title: "Who's Welcome", items: ["Couples welcome", "Groups of friends welcome"] },
    ],
  },
  process: {
    eyebrow: "Your stay",
    title: "Your Stay,\nMade *Easy*",
    image: img.holidayEveningGazebo,
    steps: [
      { title: "Book Your Dates", text: "Find us on MakeMyTrip, Goibibo, Agoda and Booking.com." },
      { title: "Quick Replies", text: "Your host usually responds within 6 hours." },
      { title: "Settle In", text: "Ground-floor rooms with a 24-hour front desk and an on-site caretaker." },
      { title: "Explore Varkala", text: "North Cliff is about 5 minutes on foot, with Varkala Beach just 0.5 km away." },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Around the *Homes*",
    sub: "The new building, the rooms, gazebo lounge and peaceful surroundings.",
    tiles: [
      { src: img.holidayBuildingExterior, caption: "Modern Homestay Building & Courtyard", size: "wide" },
      { src: img.holidayGreenBedWardrobe, caption: "King Bed with Wardrobe & Dressing Mirror" },
      { src: img.holidaySunlitPalms, caption: "Sunlit Bedroom Overlooking Palm Trees" },
      { src: img.holidayGreenDeluxeBalcony, caption: "Deluxe Green Bedroom with Garden Balcony", size: "wide" },
      { src: img.holidayPurpleDeluxeBalcony, caption: "Deluxe Bedroom with Balcony & Garden View" },
      { src: img.holidayPurpleWardrobeBath, caption: "Bedroom Layout with En-Suite Entrance" },
      { src: img.holidayEveningGazebo, caption: "Twilight Gazebo Lounge & Courtyard", size: "wide" },
      { src: img.holidayDeluxeLounge, caption: "Deluxe Bedroom with TV & Seating Lounge", size: "wide" },
      { src: img.holidaySunsetBeach, caption: "Sunset Over Curving Beach · North Cliff 5-min walk", size: "tall" },
      { src: img.holidayBrandedBedPalms, caption: "King Bed with Branded Linens & Palm Outlook", size: "wide" },
      { src: img.holidayBathroom, caption: "En-Suite Marble Bathroom & Shower", size: "tall" },
      { src: img.holidayTvConsoleDecor, caption: "TV Console, Work Table & Floral Armchair", size: "wide" },
    ],
  },
  stats: [
    { to: 4.2, decimals: 1, label: "Guest rating (out of 5)" },
    { to: 6, label: "Guest rooms" },
    { to: 24, suffix: " hr", label: "Front desk" },
    { to: 5, suffix: " min", label: "Walk to North Cliff" },
  ],
  ratings: {
    eyebrow: "Guest ratings",
    title: "Loved by *Guests*",
    sub: "Ratings from the booking platforms where we're listed.",
    scores: [
      { value: "4.2", label: "MakeMyTrip", note: "based on 29 ratings" },
      { value: "4.2", label: "Goibibo", note: "based on 26 ratings" },
      { value: "4.2", label: "Cleanliness", note: "MakeMyTrip, out of 5" },
      { value: "4.1", label: "Location", note: "MakeMyTrip, out of 5" },
    ],
    chipsTitle: "What guests mention",
    chips: ["Peaceful surroundings", "Close to North Cliff", "Easy access to the beach", "Clean rooms", "Clean bathrooms", "Helpful host", "Helpful manager"],
  },
  book: {
    eyebrow: "Booking",
    title: "Find Us *Online*",
    sub: "Trattorias Holiday Homes is listed on these booking platforms.",
    platforms: ["MakeMyTrip", "Goibibo", "Booking.com", "allkeralahotels.net"],
    platformLinks: {
      "Booking.com": "https://www.booking.com/hotel/in/trattorias-holiday-home.html",
      MakeMyTrip: "https://www.makemytrip.com/hotels/trattorias_holiday_homes-details-varkala.html",
      Goibibo: "https://www.goibibo.com/hotels/trattorias-holiday-homes-hotel-in-varkala-1058302686415001657/",
      "allkeralahotels.net": "https://trattorias-holiday-home.allkeralahotels.net/en/",
    },
    phone: site.phones.holiday,
    whatsapp: site.phones.holiday,
  },
  info: [
    { icon: "MapPin", label: "Address", value: "Black Beach, Thiruvambadi Road, Varkala 695141" },
    { icon: "Clock", label: "Host response", value: "Within 6 hours" },
    { icon: "ShieldCheck", label: "Support", value: "24-hour front desk" },
  ],
  cta: { eyebrow: "Plan your stay", title: "Your Varkala Escape Awaits", sub: "A peaceful stay near North Cliff.", button: "Book Your Stay", image: img.holidayEveningGazebo },
};

export const brands = [tranquil, restaurant, holiday];

/* ================================================================
   HOME (group) — mixes all three
   ================================================================ */
export const home = {
  seo: {
    title: "Trattorias Varkala — Cliff Restaurant, Homestay & B&B in Varkala, Kerala",
    description:
      "Trattorias in Varkala, Kerala: sea-view cliff restaurant & cafe on North End Cliff, Holiday Homes homestay near North Cliff, and Tranquil bed & breakfast with a pool near Odayam Beach. Eat, stay and unwind by the Arabian Sea.",
    keywords: [
      "Trattorias Varkala", "Varkala restaurant", "Varkala homestay", "Varkala bed and breakfast", "where to stay in Varkala", "where to eat in Varkala",
      "North Cliff Varkala", "Odayam Beach", "Black Beach Varkala", "Varkala Kerala hotels", "Varkala cliff dining", "Varkala sunset", "Varkala holiday stay",
    ],
  },
  faqs: [
    { q: "What is Trattorias Varkala?", a: "Trattorias is a family of three places in Varkala, Kerala: Trattorias Restaurant (cliff-top multi-cuisine dining on North End Cliff), Trattorias Holiday Homes (a six-room homestay near North Cliff) and Trattorias Tranquil (a bed & breakfast with a pool near Odayam Beach)." },
    { q: "Where can I eat with a sea view in Varkala?", a: "Trattorias Restaurant on North End Cliff has an open-air, sea-facing terrace with Arabian Sea and sunset views, open daily 8:00 AM to 11:00 PM." },
    { q: "Where can I stay near North Cliff in Varkala?", a: "Trattorias Holiday Homes at Black Beach, Thiruvambadi Road is about a 5-minute walk from North Cliff, with six air-conditioned rooms and a 24-hour front desk." },
    { q: "Is there a place to stay near Odayam Beach with a pool?", a: "Yes — Trattorias Tranquil on Odayam Beach Road has an outdoor swimming pool, private garden verandahs and is a 4-minute walk from Odayam Beach." },
    { q: "How do I contact or book Trattorias?", a: "Call or WhatsApp +91 97469 68992 for room reservations, restaurant tables and travel advice." },
  ],
  slides: [
    { image: img.beachCoastline, title: "Eat, Stay & Unwind\nin Varkala", brand: "Trattorias Varkala" },
    { image: img.cliffTerraceSunset, title: "Sea-View Dining\non the Cliff", brand: "Trattorias Restaurant" },
    { image: img.holidayGreenDeluxeBalcony, title: "A Peaceful Stay\nNear North Cliff", brand: "Trattorias Holiday Homes" },
    { image: img.tranquilPool, title: "Garden Calm by\nOdayam Beach", brand: "Trattorias Tranquil" },
  ],
  why: {
    eyebrow: "One family",
    title: "One Name, *Three* Places",
    sub: "A restaurant on the cliff and two stays near Varkala's beaches.",
    items: [
      { icon: "UtensilsCrossed" as IconName, title: "Dine on the Cliff", text: "Multi-cuisine dishes with Arabian Sea and sunset views.", image: img.cliffTerraceSunset },
      { icon: "BedDouble" as IconName, title: "Stay Near North Cliff", text: "Peaceful rooms at Holiday Homes, about 5 minutes from the cliff.", image: img.holidayGreenDeluxeBalcony },
      { icon: "Leaf" as IconName, title: "Unwind at Tranquil", text: "Garden-view rooms and a pool, 4 minutes from Odayam Beach.", image: img.tranquilVillaExterior },
    ],
  },
  split: {
    title: "Three Places, One Varkala",
    sub: "Trattorias brings together a sea-facing restaurant on North End Cliff and two welcoming stays — Holiday Homes near Black Beach and Tranquil near Odayam Beach.",
    image: img.wovenLights,
    badge: { value: "3", label: "Places to eat & stay" },
    features: [
      { icon: "MapPin" as IconName, title: "Heart of Varkala", text: "North End Cliff, Black Beach and Odayam Beach — beaches a short walk away." },
      { icon: "Sunset" as IconName, title: "Sea & Sunset Views", text: "Open-air terrace dining above the Arabian Sea." },
      { icon: "Wifi" as IconName, title: "Wi-Fi & Parking", text: "Free Wi-Fi at Tranquil and the restaurant, Wi-Fi in Holiday Homes rooms, plus easy parking." },
      { icon: "ShieldCheck" as IconName, title: "Support Around the Clock", text: "24/7 staff at Tranquil, a 24-hour desk at Holiday Homes." },
    ],
  },
  process: {
    eyebrow: "Your day",
    title: "A *Perfect* Day\nWith Trattorias",
    image: img.holidaySunsetBeach,
    steps: [
      { title: "Wake Up by the Sea", text: "Stay at Tranquil and walk to Odayam Beach in 4 minutes." },
      { title: "Stroll to North Cliff", text: "From Holiday Homes, the cliff is about 5 minutes on foot." },
      { title: "Cafe Treats", text: "Brownies, cheesecakes, shakes and cold coffee at the restaurant." },
      { title: "Sunset Dinner", text: "Seafood, pizza and cocktails with ocean and sunset views." },
    ],
  },
  marquee: [
    img.cliffTerraceSunset,
    img.tranquilPool,
    img.holidayGreenDeluxeBalcony,
    img.cocktails,
    img.holidaySunsetBeach,
    img.tranquilCourtyard,
    img.pizzaOcean,
    img.holidayEveningGazebo,
    img.panoramicBalcony,
    img.tranquilGardenPath,
    img.fishFillet,
    img.eveningTerrace,
  ],
  gallery: [
    { src: img.cliffWalkway, caption: "Seaside promenade tables overlooking North Cliff", size: "wide" as const },
    { src: img.tranquilSwimmingPoolAerial, caption: "Sunlit swimming pool terrace at Tranquil", size: "tall" as const },
    { src: img.cocktails, caption: "Tropical cocktails overlooking the Arabian Sea" },
    { src: img.holidayBuildingExterior, caption: "Trattorias Holiday Homes exterior & daytime courtyard", size: "wide" as const },
    { src: img.holidaySunlitPalms, caption: "Sunlit bedroom overlooking swaying palm trees" },
    { src: img.holidayPurpleDeluxeBalcony, caption: "Deluxe bedroom with private garden balcony", size: "wide" as const },
    { src: img.tandooriFish, caption: "Tandoori fish tikka with panoramic sea views", size: "tall" as const },
    { src: img.tranquilDiningBreakfastPatio, caption: "Tranquil covered dining patio & breakfast setting", size: "wide" as const },
    { src: img.tranquilCourtyard, caption: "Lush tropical courtyard at Trattorias Tranquil" },
    { src: img.breakfastPlatter, caption: "Continental breakfast spread with cliffside views", size: "wide" as const },
    { src: img.holidayRoomAmenitiesTv, caption: "In-room comforts, smart TV & guest wardrobe" },
    { src: img.tranquilCourtyardWalkwayTranquil, caption: "Courtyard verandah walkway along guest rooms", size: "wide" as const },
  ],
  ratings: {
    eyebrow: "Reviews",
    title: "Loved by *Travellers*",
    sub: "Ratings from the platforms where our places are listed.",
    scores: [
      { value: "4.0", label: "Restaurant", note: "TripAdvisor & Wanderlog · 1,100+ reviews" },
      { value: "4.2", label: "Holiday Homes", note: "MakeMyTrip · 29 ratings" },
      { value: "4.2", label: "Holiday Homes", note: "Goibibo · 26 ratings" },
      { value: "4.2", label: "Cleanliness", note: "Holiday Homes · MakeMyTrip" },
    ],
    chipsTitle: "What guests mention",
    chips: ["Peaceful surroundings", "Close to North Cliff", "Easy access to the beach", "Clean rooms", "Clean bathrooms", "Helpful host", "Sea-facing terrace"],
  },
  cta: {
    eyebrow: "Get in touch",
    title: "Let's Plan Your\nVarkala Holiday",
    sub: "Great food. Peaceful stays. The sea close by.",
    image: img.holidaySunsetBeach,
  },
};
