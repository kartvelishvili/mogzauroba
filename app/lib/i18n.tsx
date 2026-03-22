'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Lang = 'ka' | 'en';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'ka',
  setLang: () => {},
  t: (key: string) => key,
});

export function useLang() {
  return useContext(LangContext);
}

// ─── TRANSLATIONS ────────────────────────────────────────────

const translations: Record<Lang, Record<string, string>> = {
  ka: {
    // Nav
    'nav.home': 'მთავარი',
    'nav.flights': 'ავიაბილეთები',
    'nav.hotels': 'სასტუმროები',
    'nav.tickets': 'ბილეთები',
    'nav.tours': 'ტურები',
    'nav.transfer': 'ტრანსფერი',
    'nav.places': 'ადგილები',
    'nav.currency': 'ვალუტა',
    'nav.weather': 'ამინდი',
    'nav.gallery': 'გალერეა',
    'nav.map': 'რუკა',
    'nav.about': 'შესახებ',
    'nav.book': 'დაჯავშნე',
    'nav.bookNow': 'დაჯავშნე ახლავე',

    // Search
    'search.smartSearch': 'ჭკვიანი პაკეტის ძიება',
    'search.from': 'საიდან (მაგ: TBS)',
    'search.to': 'სად (მაგ: PAR, ROM, DXB)',
    'search.search': 'ძიება',
    'search.date': 'თარიღი',
    'search.liveInfo': 'Live flights + local catalog: ფრენები მოდის API-დან, დანარჩენი სერვისები ჩვენი კატალოგიდან.',
    'search.enterDestination': 'გთხოვ, მიუთითე მიმართულება.',

    // Hero
    'hero.title1': 'აღმოაჩინე',
    'hero.title2': 'მსოფლიო',
    'hero.title3': 'ჩვენთან ერთად',
    'hero.subtitle': 'ავიაბილეთები, სასტუმროები, ტურები, ტრანსფერები — ყველაფერი ერთ პლატფორმაზე. ყველაზე დაბალი ფასები 18+ პროვაიდერიდან.',
    'hero.trustedBy': 'სანდო პარტნიორები',

    // Stats
    'stats.offers': 'აქტიური შეთავაზება',
    'stats.providers': 'პროვაიდერი / პარტნიორი',
    'stats.destinations': 'მიმართულება მსოფლიოში',
    'stats.users': 'რეგისტრირებული მომხმარებელი',

    // Destinations section
    'dest.title': 'პოპულარული მიმართულებები',
    'dest.subtitle': 'იპოვე საუკეთესო შეთავაზებები ლუქს მიმართულებებში',
    'dest.mostPopular': 'ყველაზე პოპულარული',
    'dest.newAddition': 'ახალი დამატება',
    'dest.noVisa': 'ვიზა არ არის საჭირო',
    'dest.hotDestination': 'ცხელი მიმართულება',
    'dest.local': 'ადგილობრივი',

    // Services section
    'svc.title': 'ჩვენი სერვისები',
    'svc.subtitle': '18+ პროვაიდერიდან საუკეთესო სამოგზაურო შეთავაზებები',
    'svc.flights': 'ავიაბილეთები',
    'svc.flightsDesc': 'ყველა ავიაკომპანია ერთ ძიებაში — Aviasales, Kiwi.com და 15+ პროვაიდერი მსოფლიოს მასშტაბით.',
    'svc.tours': 'ქართულენოვანი ტურები',
    'svc.toursDesc': 'პროფესიონალური გიდები მსოფლიოს ქალაქებში — GetYourGuide, Viator და სხვა პარტნიორები.',
    'svc.tickets': 'ბილეთები & ატრაქციონები',
    'svc.ticketsDesc': 'დისნეილენდი, ლუვრი, კოლიზეუმი, ბურჯ ხალიფა და სხვა — რიგის გარეშე.',
    'svc.transfer': 'აეროპორტის ტრანსფერი',
    'svc.transferDesc': 'მსოფლიოს აეროპორტებიდან — Kiwitaxi, GetTransfer, Welcome Pickups + ავტო ქირაობა.',
    'svc.hotels': 'სასტუმროები & აპარტამენტები',
    'svc.hotelsDesc': 'Hotellook-ის 7+ პარტნიორი — საუკეთესო ფასები რეიტინგულ სასტუმროებში.',
    'svc.esim': 'eSIM & ინტერნეტი',
    'svc.esimDesc': 'Airalo-ს eSIM ბარათები 200+ ქვეყანაში — იაფი მობილური ინტერნეტი საზღვარგარეთ.',
    'svc.routes': 'ინდივიდუალური მარშრუტი',
    'svc.routesDesc': 'თქვენი ინტერესებზე მორგებული სამოგზაურო გეგმა — ევროპა, აზია, ამერიკა და აფრიკა.',
    'svc.payment': 'უსაფრთხო გადახდა',
    'svc.paymentDesc': 'SSL დაშიფრული ტრანზაქციები — Stripe-ით დაცული ონლაინ გადახდა ევროში.',
    'svc.georgian': 'სრულად ქართულად',
    'svc.georgianDesc': 'პლატფორმა, მხარდაჭერა და ინფორმაცია მთლიანად ქართულ ენაზე — 24/7 სერვისი.',

    // Footer
    'footer.brand': 'ქართული სამოგზაურო პლატფორმა — ავიაბილეთები, სასტუმროები, ტურები და ტრანსფერები ერთიან ჭკვიან ძიებაში.',
    'footer.services': 'სერვისები',
    'footer.info': 'ინფორმაცია',
    'footer.partners': 'პარტნიორები',
    'footer.payment': 'გადახდის მეთოდები',
    'footer.rights': '© 2024–2026 Mogzauroba.com — ყველა უფლება დაცულია',
    'footer.support': 'მხარდაჭერილია: Travelpayouts',
    'footer.aboutUs': 'ჩვენს შესახებ',
    'footer.contact': 'კონტაქტი',
    'footer.directions': 'მიმართულებები',
    'footer.workHours': 'ყოველდღე 09:00 – 21:00',

    // Cookie
    'cookie.text': 'ჩვენი ვებსაიტი იყენებს Cookie ფაილებს გამოცდილების გასაუმჯობესებლად. გაგრძელებით თანხმდები მათ გამოყენებაზე.',
    'cookie.accept': 'თანხმობა',

    // Discover section
    'discover.all': 'ყველა',
    'discover.europe': 'ევროპა',
    'discover.asia': 'აზია',
    'discover.america': 'ამერიკა',
    'discover.africa': 'აფრიკა',
    'discover.georgia': 'საქართველო',
    'discover.loading': 'იტვირთება...',
    'discover.noResults': 'მონაცემები ვერ მოიძებნა',
    'discover.tryOther': 'სცადე სხვა მიმართულება ან რეგიონი.',
    'discover.from': '-დან',
    'discover.reviews': 'შეფასება',
    'discover.details': 'ვრცლად',
    'discover.official': 'ოფიციალური პარტნიორი',
    'discover.verified': 'ვერიფიცირებული',
    'discover.provider': 'პროვაიდერი',

    // Categories
    'cat.tour': 'ტური',
    'cat.ticket': 'ბილეთი',
    'cat.hotel': 'სასტუმრო',
    'cat.transfer': 'ტრანსფერი',
    'cat.flight': 'ფრენა',
    'cat.car': 'მანქანა',
    'cat.esim': 'eSIM',
    'cat.insurance': 'დაზღვევა',
    'cat.transport': 'ტრანსპორტი',

    // Hotels page
    'hotels.title': 'სასტუმროები',
    'hotels.subtitle': 'იპოვე საუკეთესო სასტუმროები მსოფლიოს ნებისმიერ ქალაქში.',
    'hotels.pageTitle': 'სასტუმროები და აპარტამენტები',
    'hotels.pageDesc': 'იპოვე საუკეთესო განთავსება ნებისმიერ ქალაქში (Klook-ის მხარდაჭერით).',

    // Tours page
    'tours.title': 'ტურები',
    'tours.subtitle': 'პროფესიონალური გიდების თანხლებით ტურები მსოფლიოს მასშტაბით.',
    'tours.pageTitle': 'ჯგუფური და ინდივიდუალური ტურები',
    'tours.pageDesc': 'აღმოაჩინე ახალი კულტურა ექსპერტი გიდების დახმარებით.',

    // Tickets page
    'tickets.title': 'ბილეთები & ატრაქციონები',
    'tickets.subtitle': 'მუზეუმები, ღირსშესანიშნავაბები, თემა-პარკები — ერთ ადგილზე.',
    'tickets.pageTitle': 'ბილეთები & ატრაქციონები',
    'tickets.pageDesc': 'ბილეთები და ტურები ერთ ადგილას — Tiqets, Musement, Klook, GetYourGuide.',

    // Taxi/Transfer page
    'taxi.title': 'ტრანსფერი & ავტო ქირაობა',
    'taxi.subtitle': 'აეროპორტიდან სასტუმრომდე კომფორტულად, სწრაფად და ხელმისაწვდომ ფასად.',
    'taxi.pageTitle': 'ტაქსი და ტრანსფერი',
    'taxi.pageDesc': 'კომფორტული დახვედრა აეროპორტიდან და მანქანების გაქირავება (Kiwitaxi & Localrent).',

    // Places page
    'places.title': 'eSIM & დაზღვევა',
    'places.subtitle': 'ინტერნეტი და დაზღვევა მოგზაურობისას.',
    'places.pageTitle': 'ადგილები & ტურები',
    'places.pageDesc': 'პოპულარული ღირსშესანიშნავაბები, ტურები და ბილეთები — GetYourGuide, Viator, Tiqets.',

    // Weather page
    'weather.title': 'ამინდის პროგნოზი',
    'weather.subtitle': 'შეამოწმე ამინდი დანიშნულების ქალაქში მოგზაურობის დაგეგმვამდე.',
    'weather.selectCity': 'აირჩიე ქალაქი',
    'weather.feelsLike': 'იგრძნობა როგორც',
    'weather.humidity': 'ტენიანობა',
    'weather.wind': 'ქარი',
    'weather.forecast': 'დღიანი პროგნოზი',

    // Currency page
    'currency.title': 'ვალუტის კურსი',
    'currency.subtitle': 'მიმდინარე კურსები სამოგზაურო ვალუტებისთვის.',
    'currency.base': 'ბაზისი: 1 EUR',

    // Gallery page
    'gallery.title': 'ფოტო გალერეა',
    'gallery.subtitle': 'მსოფლიოს ულამაზესი ადგილების ფოტოები.',

    // Map page
    'map.title': 'მოგზაურობის რუკა',
    'map.subtitle': 'ნახე ყველა მიმართულება ინტერაქტიულ რუკაზე.',

    // About page
    'about.title': 'ჩვენს შესახებ',
    'about.mission': 'ჩვენი მისია',
    'about.missionText': 'Mogzauroba.com არის ქართული სამოგზაურო პლატფორმა, რომელიც გთავაზობთ ავიაბილეთებს, სასტუმროებს, ტურებს, ტრანსფერებს და სხვა სერვისებს ერთ ადგილას.',
    'about.why': 'რატომ Mogzauroba.com?',
    'about.whyText': 'ჩვენ ვთანამშრომლობთ 18+ პროვაიდერთან, მ.შ. Aviasales, Klook, Kiwitaxi, Airalo და სხვა, რათა შემოგთავაზოთ საუკეთესო ფასები და სანდო სერვისი.',

    // Service detail
    'detail.related': 'მსგავსი სერვისები',
    'detail.crossSell': 'სხვა სერვისები ამ მიმართულებით',
    'detail.book': 'დაჯავშნე',
    'detail.back': 'უკან',
    'detail.notFound': 'სერვისი ვერ მოიძებნა',

    // Ticket detail
    'ticket.related': 'მსგავსი ბილეთები',
    'ticket.nearbyHotels': 'სასტუმროები ახლოს',
    'ticket.buy': 'შეიძინე',
    'ticket.back': 'უკან',
    'ticket.notFound': 'ბილეთი ვერ მოიძებნა',

    // Common
    'common.loading': 'იტვირთება...',
    'common.error': 'შეცდომა',
    'common.price': 'ფასი',
    'common.from': '-დან',

    // Destination names
    'city.PAR': 'პარიზი', 'city.ROM': 'რომი', 'city.BCN': 'ბარსელონა',
    'city.LON': 'ლონდონი', 'city.AMS': 'ამსტერდამი', 'city.BER': 'ბერლინი',
    'city.PRG': 'პრაღა', 'city.VIE': 'ვენა', 'city.MIL': 'მილანი',
    'city.MAD': 'მადრიდი', 'city.ATH': 'ათენი', 'city.IST': 'სტამბოლი',
    'city.DXB': 'დუბაი', 'city.BKK': 'ბანგკოკი', 'city.TYO': 'ტოკიო',
    'city.SIN': 'სინგაპური', 'city.HKG': 'ჰონგ კონგი', 'city.DEL': 'დელი',
    'city.TLV': 'თელ-ავივი', 'city.NYC': 'ნიუ-იორკი', 'city.MIA': 'მაიამი',
    'city.CUN': 'კანკუნი', 'city.CAI': 'კაირო', 'city.MRK': 'მარაკეში',
    'city.TBS': 'თბილისი', 'city.KUT': 'ქუთაისი', 'city.BUS': 'ბათუმი',

    // Country names
    'country.PAR': 'საფრანგეთი', 'country.ROM': 'იტალია', 'country.BCN': 'ესპანეთი',
    'country.LON': 'ინგლისი', 'country.AMS': 'ნიდერლანდები', 'country.BER': 'გერმანია',
    'country.IST': 'თურქეთი', 'country.DXB': 'საამიროები', 'country.BKK': 'ტაილანდი',
    'country.TYO': 'იაპონია', 'country.NYC': 'აშშ', 'country.TBS': 'საქართველო',
    'country.CUN': 'მექსიკა',

    // Regions
    'region.europe': 'ევროპა',
    'region.asia': 'აზია',
    'region.america': 'ამერიკა',
    'region.africa': 'აფრიკა',
    'region.georgia': 'საქართველო',

    // Explore page
    'explore.title': 'ჭკვიანი პაკეტის ძიება',
    'explore.subtitle': 'აირჩიე ფრენა, სასტუმრო, ტრანსფერი და ტური ერთიან პაკეტში',
    'explore.fromPlaceholder': 'საიდან (მაგ: TBS)',
    'explore.toPlaceholder': 'სად (მაგ: PAR, ROM, DXB)',
    'explore.search': 'ძიება',
    'explore.noDestination': 'გთხოვ, მიუთითე მიმართულება.',
    'explore.searchError': 'ძებნა დროებით ვერ შესრულდა.',
    'explore.connectionError': 'კავშირის შეცდომა. სცადე თავიდან.',
    'explore.notSelected': 'არჩეული არ არის',
    'explore.flights': 'ფრენები',
    'explore.departure': 'გამგზავრება',
    'explore.latestAvailable': 'უახლოესი ხელმისაწვდომი ვარიანტები',
    'explore.airline': 'ავიაკომპანია',
    'explore.direct': 'პირდაპირი',
    'explore.transfer': 'გადაჯდ.',
    'explore.roundTrip': 'ორმხრივი',
    'explore.bothWays': 'ორივე მიმართ.',
    'explore.oneWay': 'ერთი მიმართ.',
    'explore.added': 'დამატებულია',
    'explore.select': 'არჩევა',
    'explore.noFlights': 'ამ პირობებზე ფრენები ვერ მოიძებნა. სცადე სხვა თარიღი ან სხვა მიმართულება.',
    'explore.accommodation': 'განთავსება',
    'explore.inCity': '-ში',
    'explore.orientPrice': 'ორიენტირი ფასი',
    'explore.transferAndCar': 'ტრანსფერი და მანქანა',
    'explore.tours': 'ტურები',
    'explore.yourPackage': 'შენი პაკეტი',
    'explore.destination': 'მიმართულება:',
    'explore.chooseFlight': 'აირჩიე ავიაბილეთი',
    'explore.chooseHotel': 'აირჩიე სასტუმრო',
    'explore.addTransfer': 'დაამატე ტრანსფერი ან მანქანა',
    'explore.addTour': 'დაამატე ტური',
    'explore.addEsim': '+ დაამატე eSIM ან დაზღვევა',
    'explore.total': 'სულ ჯამი:',
    'explore.goToPartner': 'პარტნიორ ლინკზე გადასვლა',
    'explore.chooseServices': 'აირჩიე სერვისები',

    // Flights page
    'fl.title': 'ავიაბილეთები',
    'fl.subtitle': 'მოძებნე ყველაზე იაფი ფრენები ნებისმიერი მიმართულებით',
    'fl.region': 'რეგიონი',
    'fl.all': 'ყველა',
    'fl.direction': 'მიმართულება',
    'fl.flightsTo': 'ფრენები: თბილისი →',
    'fl.flightDirect': 'ფრენა / პირდაპირი',
    'fl.price': 'ფასი:',
    'fl.sort': 'სორტირება',
    'fl.sortPrice': 'ფასი',
    'fl.sortDuration': 'ხანგრძლივობა',
    'fl.sortTransfers': 'გადაჯდომა',
    'fl.directOnly': 'პირდაპირი ფრენა',
    'fl.airline': 'ავიაკომპანია',
    'fl.allAirlines': 'ყველა',
    'fl.less': 'ნაკლები',
    'fl.more': 'სხვა',
    'fl.searching': 'ფრენების ძებნა...',
    'fl.direct': 'პირდაპირი',
    'fl.transfers': 'გადაჯდ.',
    'fl.roundTrip': 'ორმხრივი',
    'fl.bothWays': 'ორივე მიმართ.',
    'fl.oneWay': 'ერთი მიმართ.',
    'fl.buy': 'შეძენა',
    'fl.noFlights': 'ფრენები ვერ მოიძებნა',
    'fl.noFlightsDesc': 'ამ მიმართულებისთვის ფრენები ჯერ არ არის. სცადე სხვა მიმართულება.',
    'fl.fullTripTo': 'სრული მოგზაურობა',
    'fl.fullTripDesc': 'ფრენასთან ერთად დაგეგმე სასტუმრო, ტრანსფერი, eSIM და გასართობი აქტივობები',
    'fl.hotel': 'სასტუმრო',
    'fl.transfer': 'ტრანსფერი',
    'fl.esimPackage': 'eSIM პაკეტი',
    'fl.activity': 'აქტივობა',
    'fl.esimTitle': 'eSIM — ინტერნეტი',
    'fl.esimArrival': 'ჩამოფრენისთანავე',
    'fl.esimDesc': 'აღარ გჭირდება ადგილობრივი SIM ბარათის ყიდვა. აქტივირდება მყისიერად.',
    'fl.hotelsIn': 'სასტუმროები',
    'fl.perNight': '/ღამე',
    'fl.ticketsIn': 'ბილეთები & ტურები',
    'fl.transferIn': 'ტრანსფერი',

    // Weather page extra
    'w.title': 'ამინდის პროგნოზი',
    'w.subtitle': 'რეალური მეტეოროლოგიური მონაცემები 27 პოპულარული ქალაქისთვის',
    'w.all': 'ყველა',
    'w.unavailable': 'პროგნოზი მიუწვდომელია',
    'w.today': 'დღეს',
    'w.kmh': 'კმ/სთ',
    'w.wind': 'ქარი',
    'w.humidity': 'ტენიანობა',
    'w.mm': 'მმ',
    'w.precipitation': 'ნალექი',
    'w.dayForecast': 'დღის პროგნოზი',
    'w.longForecast': '16 დღეზე მეტი პროგნოზი მიუწვდომელია. დაგეგმეთ მოგზაურობა ამ პერიოდში სანდო ინფორმაციისთვის.',
    'w.planTrip': 'დაგეგმე მოგზაურობა',
    'w.flights': 'ავიაბილეთები',
    'w.hotels': 'სასტუმროები',
    'w.tickets': 'ბილეთები & ტურები',
    'w.connectionError': 'კავშირის შეცდომა',

    // Hotel detail
    'hd.notFound': 'სასტუმრო ვერ მოიძებნა',
    'hd.notFoundDesc': 'მოთხოვნილი სასტუმრო არ არსებობს ან წაიშალა',
    'hd.backToHotels': 'სასტუმროებზე დაბრუნება',
    'hd.hotels': 'სასტუმროები',
    'hd.officialPartner': 'ოფიციალური პარტნიორი',
    'hd.about': 'სასტუმროს შესახებ',
    'hd.checkIn': 'ჩეკ-ინი',
    'hd.checkOut': 'ჩეკ-აუტი',
    'hd.guests': 'სტუმრები',
    'hd.guestsValue': '2 ადამიანი',
    'hd.languages': 'ენები',
    'hd.provider': 'პროვაიდერი',
    'hd.verified': 'ვერიფიცირებული',
    'hd.pricePerNight': 'ფასი / ღამეში',
    'hd.perNight': '/ღამე',
    'hd.bookNow': 'დაჯავშნე ახლა',
    'hd.city': 'ქალაქი',
    'hd.currency': 'ვალუტა',
    'hd.rating': 'რეიტინგი',
    'hd.esim': 'eSIM — ინტერნეტი ჩამოფრენისთანავე',
    'hd.flightsTo': 'ფრენები',
    'hd.perPerson': '/ადამ.',
    'hd.toursIn': 'ტურები',
    'hd.ticketsAttractions': 'ბილეთები & ატრაქციონები',
    'hd.transferAirport': 'ტრანსფერი აეროპორტიდან',
    'hd.otherHotels': 'სხვა სასტუმროები',
    'hd.hotel': 'სასტუმრო', 'hd.flight': 'ფრენა', 'hd.tour': 'ტური',
    'hd.transferCat': 'ტრანსფერი', 'hd.ticket': 'ბილეთი', 'hd.insurance': 'დაზღვევა',
    'hd.freeWifi': 'უფასო Wi-Fi', 'hd.breakfast': 'საუზმე ჩართულია',
    'hd.freeCancel': 'უფასო გაუქმება', 'hd.securePay': 'დაცული გადახდა',

    // Ticket detail
    'td.notFound': 'ბილეთი ვერ მოიძებნა',
    'td.notFoundDesc': 'მოთხოვნილი ბილეთი არ არსებობს ან წაიშალა',
    'td.backToHome': 'მთავარ გვერდზე დაბრუნება',
    'td.back': 'უკან',
    'td.aboutTicket': 'ბილეთის შესახებ',
    'td.workHours': 'სამუშაო საათები',
    'td.location': 'მდებარეობა',
    'td.ticketType': 'ბილეთის ტიპი',
    'td.electronic': 'ელექტრონული',
    'td.cancellation': 'გაუქმება',
    'td.freeCancelValue': 'უფასო 24სთ',
    'td.provider': 'პროვაიდერი',
    'td.officialPartner': 'ოფიციალური პარტნიორი',
    'td.verified': 'ვერიფიცირებული',
    'td.price': 'ფასი',
    'td.perPerson': '/ადამ.',
    'td.buyNow': 'შეიძინე ახლა',
    'td.currency': 'კურსი',
    'td.type': 'ტიპი',
    'td.city': 'ქალაქი',
    'td.boughtTogether': 'ხშირად ყიდულობენ ერთად',
    'td.hotelsIn': 'სასტუმროები',
    'td.perNight': '/ღამე',
    'td.flightsTo': 'ფრენები',
    'td.transferIn': 'ტრანსფერი',
    'td.esimIn': 'eSIM — ინტერნეტი',
    'td.esimDesc': 'მოგზაურობისას ინტერნეტი ჩამოფრენისთანავე. SIM ბარათის ყიდვა აღარ გჭირდება.',
    'td.ticketAttraction': 'ბილეთი / ატრაქციონი',
    'td.tourExcursion': 'ტური / ექსკურსია',
    'td.hotelCat': 'სასტუმრო', 'td.transferCat': 'ტრანსფერი',
    'td.flightCat': 'ავიაბილეთი',
    'td.instantConfirm': 'მყისიერი დადასტურება',
    'td.mobileTicket': 'მობილური ბილეთი',
    'td.freeCancel24': 'უფასო გაუქმება 24სთ',
    'td.securePay': 'დაცული გადახდა',

    // Smart Booking Widget
    'bw.flights': 'ავიაბილეთები', 'bw.flightsDesc': 'იპოვე იაფი ფრენები (Aviasales)',
    'bw.hotels': 'სასტუმროები', 'bw.hotelsDesc': 'საუკეთესო ფასები (Klook)',
    'bw.transfer': 'ტრანსფერი', 'bw.transferDesc': 'კომფორტული დახვედრა (Kiwitaxi)',
    'bw.esim': 'მობილური ინტერნეტი', 'bw.esimDesc': 'eSIM როუმინგის გარეშე (Airalo)',
    'bw.car': 'მანქანის ქირაობა', 'bw.carDesc': 'დაჯავშნე იაფად (Localrent)',
    'bw.insurance': 'დაზღვევა', 'bw.insuranceDesc': 'მშვიდი მოგზაურობა (EKTA)',
    'bw.startSearch': 'ძიების დაწყება',

    // Gallery page
    'gal.title': 'გალერეა',
    'gal.subtitle': 'მსოფლიოს საუკეთესო ქალაქების ფოტო არქივი',
    'gal.photos': 'ფოტო',

    // Currency page
    'cur.title': 'ვალუტა',
    'cur.subtitle': 'ეროვნული ბანკის ორიენტირი კურსები.',
    'cur.converter': 'კონვერტორი',
    'cur.gel': 'GEL (ლარი)',
    'cur.foreign': 'უცხოური ვალუტა',
    'cur.demo': '* სადემონსტრაციო კურსები',
    'cur.currentRates': 'მიმდინარე კურსები (1 = ₾)',

    // Map page
    'mp.title': 'რუკა',
    'mp.subtitle': 'დაგეგმე მარშრუტი და მოძებნე ახლო ლოკაციები.',
    'mp.worldMap': 'მსოფლიო რუკა',
    'mp.worldDesc': 'აღმოაჩინე 27+ მიმართულება მსოფლიოს ყველა კონტინენტზე — ევროპა, აზია, ამერიკა, აფრიკა.',

    // About page extra
    'ab.badge': 'ჩვენს შესახებ',
    'ab.heroTitle': 'Mogzauroba.com — ქართული\nსამოგზაურო პლატფორმა',
    'ab.heroDesc': 'ჩვენ ვქმნით ერთიან სივრცეს ქართველი მოგზაურებისთვის, სადაც ერთი ძიებით შეძლებ ავიაბილეთების, სასტუმროების, ტურების და ტრანსფერების შედარებას 12+ პროვაიდერიდან.',
    'ab.mission': 'ჩვენი მისია',
    'ab.missionP1': 'მოგზაურობა ყველას უნდა. ჩვენი მიზანია ქართულენოვან მომხმარებლებს შევთავაზოთ მსოფლიო დონის სამოგზაურო პლატფორმა, სადაც ყველა სერვისი ერთ ადგილას მოგეძებნება.',
    'ab.missionP2': 'ჩვენ ვთანამშრომლობთ Aviasales, Klook, Kiwitaxi, Localrent, Airalo და EKTA პარტნიორებთან, რომ საუკეთესო ფასები და სერვისები შემოგთავაზოთ.',
    'ab.flights': 'ავიაბილეთები', 'ab.hotels': 'სასტუმროები',
    'ab.transfers': 'ტრანსფერები', 'ab.attractions': 'ატრაქციონები',
    'ab.whyUs': 'რატომ Mogzauroba.com?',
    'ab.safe': 'უსაფრთხო', 'ab.safeDesc': 'SSL დაშიფვრა და დაცული ტრანზაქციები',
    'ab.georgian': 'ქართულად', 'ab.georgianDesc': 'სრულად ქართული ინტერფეისი',
    'ab.cheapPrices': 'იაფი ფასები', 'ab.cheapDesc': '12+ პროვაიდერის შედარება',
    'ab.support': 'მხარდაჭერა', 'ab.supportDesc': '24/7 ქართული სერვისი',
    'ab.history': 'ჩვენი ისტორია',
    'ab.team': 'ჩვენი გუნდი',
    'ab.founderCEO': 'დამფუძნებელი & CEO', 'ab.founderDesc': 'სტრატეგია და ხედვა',
    'ab.cto': 'ტექნიკური დირექტორი', 'ab.ctoDesc': 'პლატფორმის განვითარება',
    'ab.marketing': 'მარკეტინგი', 'ab.marketingDesc': 'მომხმარებლის მოზიდვა',
    'ab.supportTeam': 'მხარდაჭერა', 'ab.supportTeamDesc': '24/7 კლიენტთა სერვისი',
    'ab.timeline1': 'პლატფორმის დაფუძნება და API ინტეგრაცია',
    'ab.timeline2': '6 მიმართულება, 225+ აქტიური შეთავაზება',
    'ab.timeline3': 'გაფართოება ევროპის 20+ ქალაქში',
    'ab.question': 'გაქვს შეკითხვა?',
    'ab.questionDesc': 'დაგვიკავშირდი ნებისმიერ დროს — ჩვენი გუნდი მზად არის შენ დასახმარებლად.',
    'ab.email': 'ელ-ფოსტით',
    'ab.phone': 'ტელეფონით',

    // Currency names
    'cur.EUR': 'ევრო', 'cur.USD': 'დოლარი', 'cur.GBP': 'გირვანქა სტერლინგი',
    'cur.TRY': 'თურქული ლირა', 'cur.AED': 'დირჰამი', 'cur.JPY': 'იაპონური იენი',
    'cur.THB': 'ტაილანდური ბატი', 'cur.EGP': 'ეგვიპტური ფუნტი',
    'cur.CZK': 'ჩეხური კრონა', 'cur.INR': 'ინდური რუპია',

    // Day/month names
    'day.sun': 'კვი', 'day.mon': 'ორშ', 'day.tue': 'სამ', 'day.wed': 'ოთხ',
    'day.thu': 'ხუთ', 'day.fri': 'პარ', 'day.sat': 'შაბ',
    'mon.jan': 'იან', 'mon.feb': 'თებ', 'mon.mar': 'მარ', 'mon.apr': 'აპრ',
    'mon.may': 'მაი', 'mon.jun': 'ივნ', 'mon.jul': 'ივლ', 'mon.aug': 'აგვ',
    'mon.sep': 'სექ', 'mon.oct': 'ოქტ', 'mon.nov': 'ნოე', 'mon.dec': 'დეკ',
  },

  en: {
    // Nav
    'nav.home': 'Home',
    'nav.flights': 'Flights',
    'nav.hotels': 'Hotels',
    'nav.tickets': 'Tickets',
    'nav.tours': 'Tours',
    'nav.transfer': 'Transfer',
    'nav.places': 'Places',
    'nav.currency': 'Currency',
    'nav.weather': 'Weather',
    'nav.gallery': 'Gallery',
    'nav.map': 'Map',
    'nav.about': 'About',
    'nav.book': 'Book',
    'nav.bookNow': 'Book Now',

    // Search
    'search.smartSearch': 'Smart Package Search',
    'search.from': 'From (e.g. TBS)',
    'search.to': 'To (e.g. PAR, ROM, DXB)',
    'search.search': 'Search',
    'search.date': 'Date',
    'search.liveInfo': 'Live flights from API + local catalog for hotels, tours, transfers & more.',
    'search.enterDestination': 'Please enter a destination.',

    // Hero
    'hero.title1': 'Discover',
    'hero.title2': 'the World',
    'hero.title3': 'With Us',
    'hero.subtitle': 'Flights, hotels, tours, transfers — everything on one platform. Best prices from 18+ providers.',
    'hero.trustedBy': 'Trusted Partners',

    // Stats
    'stats.offers': 'Active Offers',
    'stats.providers': 'Providers / Partners',
    'stats.destinations': 'Destinations Worldwide',
    'stats.users': 'Registered Users',

    // Destinations section
    'dest.title': 'Popular Destinations',
    'dest.subtitle': 'Find the best deals in luxury destinations',
    'dest.mostPopular': 'Most Popular',
    'dest.newAddition': 'New Addition',
    'dest.noVisa': 'No Visa Required',
    'dest.hotDestination': 'Hot Destination',
    'dest.local': 'Local',

    // Services section
    'svc.title': 'Our Services',
    'svc.subtitle': 'Best travel deals from 18+ providers',
    'svc.flights': 'Flights',
    'svc.flightsDesc': 'All airlines in one search — Aviasales, Kiwi.com and 15+ providers worldwide.',
    'svc.tours': 'Guided Tours',
    'svc.toursDesc': 'Professional guides worldwide — GetYourGuide, Viator and other partners.',
    'svc.tickets': 'Tickets & Attractions',
    'svc.ticketsDesc': 'Disneyland, Louvre, Colosseum, Burj Khalifa and more — skip the line.',
    'svc.transfer': 'Airport Transfer',
    'svc.transferDesc': 'From airports worldwide — Kiwitaxi, GetTransfer, Welcome Pickups + car rental.',
    'svc.hotels': 'Hotels & Apartments',
    'svc.hotelsDesc': 'Hotellook\'s 7+ partners — best prices at top-rated hotels.',
    'svc.esim': 'eSIM & Internet',
    'svc.esimDesc': 'Airalo eSIM cards in 200+ countries — affordable mobile data abroad.',
    'svc.routes': 'Custom Itinerary',
    'svc.routesDesc': 'Personalized travel plans — Europe, Asia, Americas and Africa.',
    'svc.payment': 'Secure Payment',
    'svc.paymentDesc': 'SSL encrypted transactions — Stripe-protected online payment in EUR.',
    'svc.georgian': 'Multilingual',
    'svc.georgianDesc': 'Platform, support and information in Georgian and English — 24/7 service.',

    // Footer
    'footer.brand': 'Georgian travel platform — flights, hotels, tours and transfers in one smart search.',
    'footer.services': 'Services',
    'footer.info': 'Information',
    'footer.partners': 'Partners',
    'footer.payment': 'Payment Methods',
    'footer.rights': '© 2024–2026 Mogzauroba.com — All rights reserved',
    'footer.support': 'Powered by: Travelpayouts',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.directions': 'Destinations',
    'footer.workHours': 'Daily 09:00 – 21:00',

    // Cookie
    'cookie.text': 'Our website uses cookies to improve your experience. By continuing, you agree to their use.',
    'cookie.accept': 'Accept',

    // Discover section
    'discover.all': 'All',
    'discover.europe': 'Europe',
    'discover.asia': 'Asia',
    'discover.america': 'Americas',
    'discover.africa': 'Africa',
    'discover.georgia': 'Georgia',
    'discover.loading': 'Loading...',
    'discover.noResults': 'No results found',
    'discover.tryOther': 'Try a different destination or region.',
    'discover.from': 'from',
    'discover.reviews': 'reviews',
    'discover.details': 'Details',
    'discover.official': 'Official Partner',
    'discover.verified': 'Verified',
    'discover.provider': 'Provider',

    // Categories
    'cat.tour': 'Tour',
    'cat.ticket': 'Ticket',
    'cat.hotel': 'Hotel',
    'cat.transfer': 'Transfer',
    'cat.flight': 'Flight',
    'cat.car': 'Car',
    'cat.esim': 'eSIM',
    'cat.insurance': 'Insurance',
    'cat.transport': 'Transport',

    // Hotels page
    'hotels.title': 'Hotels',
    'hotels.subtitle': 'Find the best hotels in any city worldwide.',
    'hotels.pageTitle': 'Hotels & Apartments',
    'hotels.pageDesc': 'Find the best accommodation in any city (powered by Klook).',

    // Tours page
    'tours.title': 'Tours',
    'tours.subtitle': 'Professional guided tours worldwide.',
    'tours.pageTitle': 'Group & Individual Tours',
    'tours.pageDesc': 'Discover new cultures with expert guides.',

    // Tickets page
    'tickets.title': 'Tickets & Attractions',
    'tickets.subtitle': 'Museums, landmarks, theme parks \u2014 all in one place.',
    'tickets.pageTitle': 'Tickets & Attractions',
    'tickets.pageDesc': 'Tickets and tours in one place \u2014 Tiqets, Musement, Klook, GetYourGuide.',

    // Taxi/Transfer page
    'taxi.title': 'Transfer & Car Rental',
    'taxi.subtitle': 'From airport to hotel \u2014 comfortable, fast and affordable.',
    'taxi.pageTitle': 'Taxi & Transfer',
    'taxi.pageDesc': 'Comfortable airport pickup and car rental (Kiwitaxi & Localrent).',

    // Places page
    'places.title': 'eSIM & Insurance',
    'places.subtitle': 'Internet and insurance while traveling.',
    'places.pageTitle': 'Places & Tours',
    'places.pageDesc': 'Popular attractions, tours and tickets \u2014 GetYourGuide, Viator, Tiqets.',

    // Weather page
    'weather.title': 'Weather Forecast',
    'weather.subtitle': 'Check the weather at your destination before planning your trip.',
    'weather.selectCity': 'Select a city',
    'weather.feelsLike': 'Feels like',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind',
    'weather.forecast': '7-Day Forecast',

    // Currency page
    'currency.title': 'Currency Exchange',
    'currency.subtitle': 'Current rates for travel currencies.',
    'currency.base': 'Base: 1 EUR',

    // Gallery page
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Photos of the most beautiful places in the world.',

    // Map page
    'map.title': 'Travel Map',
    'map.subtitle': 'See all destinations on an interactive map.',

    // About page
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.missionText': 'Mogzauroba.com is a Georgian travel platform offering flights, hotels, tours, transfers and other services in one place.',
    'about.why': 'Why Mogzauroba.com?',
    'about.whyText': 'We partner with 18+ providers including Aviasales, Klook, Kiwitaxi, Airalo and more to offer you the best prices and reliable service.',

    // Service detail
    'detail.related': 'Related Services',
    'detail.crossSell': 'Other Services for This Destination',
    'detail.book': 'Book',
    'detail.back': 'Back',
    'detail.notFound': 'Service not found',

    // Ticket detail
    'ticket.related': 'Related Tickets',
    'ticket.nearbyHotels': 'Nearby Hotels',
    'ticket.buy': 'Buy',
    'ticket.back': 'Back',
    'ticket.notFound': 'Ticket not found',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.price': 'Price',
    'common.from': 'from',

    // Destination names
    'city.PAR': 'Paris', 'city.ROM': 'Rome', 'city.BCN': 'Barcelona',
    'city.LON': 'London', 'city.AMS': 'Amsterdam', 'city.BER': 'Berlin',
    'city.PRG': 'Prague', 'city.VIE': 'Vienna', 'city.MIL': 'Milan',
    'city.MAD': 'Madrid', 'city.ATH': 'Athens', 'city.IST': 'Istanbul',
    'city.DXB': 'Dubai', 'city.BKK': 'Bangkok', 'city.TYO': 'Tokyo',
    'city.SIN': 'Singapore', 'city.HKG': 'Hong Kong', 'city.DEL': 'Delhi',
    'city.TLV': 'Tel Aviv', 'city.NYC': 'New York', 'city.MIA': 'Miami',
    'city.CUN': 'Cancun', 'city.CAI': 'Cairo', 'city.MRK': 'Marrakech',
    'city.TBS': 'Tbilisi', 'city.KUT': 'Kutaisi', 'city.BUS': 'Batumi',

    // Country names
    'country.PAR': 'France', 'country.ROM': 'Italy', 'country.BCN': 'Spain',
    'country.LON': 'England', 'country.AMS': 'Netherlands', 'country.BER': 'Germany',
    'country.IST': 'Turkey', 'country.DXB': 'UAE', 'country.BKK': 'Thailand',
    'country.TYO': 'Japan', 'country.NYC': 'USA', 'country.TBS': 'Georgia',
    'country.CUN': 'Mexico',

    // Regions
    'region.europe': 'Europe',
    'region.asia': 'Asia',
    'region.america': 'Americas',
    'region.africa': 'Africa',
    'region.georgia': 'Georgia',

    // Explore page
    'explore.title': 'Smart Package Search',
    'explore.subtitle': 'Choose flight, hotel, transfer and tour in one package',
    'explore.fromPlaceholder': 'From (e.g. TBS)',
    'explore.toPlaceholder': 'To (e.g. PAR, ROM, DXB)',
    'explore.search': 'Search',
    'explore.noDestination': 'Please specify a destination.',
    'explore.searchError': 'Search temporarily unavailable.',
    'explore.connectionError': 'Connection error. Try again.',
    'explore.notSelected': 'Not selected',
    'explore.flights': 'Flights',
    'explore.departure': 'Departure',
    'explore.latestAvailable': 'Latest available options',
    'explore.airline': 'Airline',
    'explore.direct': 'Direct',
    'explore.transfer': 'stop(s)',
    'explore.roundTrip': 'Round trip',
    'explore.bothWays': 'Both ways',
    'explore.oneWay': 'One way',
    'explore.added': 'Added',
    'explore.select': 'Select',
    'explore.noFlights': 'No flights found for these conditions. Try another date or destination.',
    'explore.accommodation': 'Accommodation',
    'explore.inCity': '',
    'explore.orientPrice': 'Est. price',
    'explore.transferAndCar': 'Transfer & Car',
    'explore.tours': 'Tours',
    'explore.yourPackage': 'Your Package',
    'explore.destination': 'Destination:',
    'explore.chooseFlight': 'Choose a flight',
    'explore.chooseHotel': 'Choose a hotel',
    'explore.addTransfer': 'Add transfer or car',
    'explore.addTour': 'Add a tour',
    'explore.addEsim': '+ Add eSIM or insurance',
    'explore.total': 'Total:',
    'explore.goToPartner': 'Go to partner link',
    'explore.chooseServices': 'Choose services',

    // Flights page
    'fl.title': 'Flights',
    'fl.subtitle': 'Find the cheapest flights to any destination',
    'fl.region': 'Region',
    'fl.all': 'All',
    'fl.direction': 'Destination',
    'fl.flightsTo': 'Flights: Tbilisi →',
    'fl.flightDirect': 'Flight / Direct',
    'fl.price': 'Price:',
    'fl.sort': 'Sort',
    'fl.sortPrice': 'Price',
    'fl.sortDuration': 'Duration',
    'fl.sortTransfers': 'Stops',
    'fl.directOnly': 'Direct flights',
    'fl.airline': 'Airline',
    'fl.allAirlines': 'All',
    'fl.less': 'Less',
    'fl.more': 'More',
    'fl.searching': 'Searching flights...',
    'fl.direct': 'Direct',
    'fl.transfers': 'stop(s)',
    'fl.roundTrip': 'Round trip',
    'fl.bothWays': 'Both ways',
    'fl.oneWay': 'One way',
    'fl.buy': 'Buy',
    'fl.noFlights': 'No flights found',
    'fl.noFlightsDesc': 'No flights available for this destination yet. Try another direction.',
    'fl.fullTripTo': 'Full trip to',
    'fl.fullTripDesc': 'Plan hotel, transfer, eSIM and activities along with your flight',
    'fl.hotel': 'Hotel',
    'fl.transfer': 'Transfer',
    'fl.esimPackage': 'eSIM Package',
    'fl.activity': 'Activity',
    'fl.esimTitle': 'eSIM — Internet in',
    'fl.esimArrival': 'upon arrival',
    'fl.esimDesc': 'No need to buy a local SIM card. Activates instantly.',
    'fl.hotelsIn': 'Hotels in',
    'fl.perNight': '/night',
    'fl.ticketsIn': 'Tickets & Tours in',
    'fl.transferIn': 'Transfer in',

    // Weather page extra
    'w.title': 'Weather Forecast',
    'w.subtitle': 'Real meteorological data for 27 popular cities',
    'w.all': 'All',
    'w.unavailable': 'Forecast unavailable',
    'w.today': 'Today',
    'w.kmh': 'km/h',
    'w.wind': 'Wind',
    'w.humidity': 'Humidity',
    'w.mm': 'mm',
    'w.precipitation': 'Precipitation',
    'w.dayForecast': '-day forecast',
    'w.longForecast': 'Forecast beyond 16 days is unavailable. Plan your trip within this period for reliable information.',
    'w.planTrip': 'Plan your trip',
    'w.flights': 'Flights',
    'w.hotels': 'Hotels',
    'w.tickets': 'Tickets & Tours',
    'w.connectionError': 'Connection error',

    // Hotel detail
    'hd.notFound': 'Hotel not found',
    'hd.notFoundDesc': 'The requested hotel does not exist or has been removed',
    'hd.backToHotels': 'Back to hotels',
    'hd.hotels': 'Hotels',
    'hd.officialPartner': 'Official Partner',
    'hd.about': 'About the Hotel',
    'hd.checkIn': 'Check-in',
    'hd.checkOut': 'Check-out',
    'hd.guests': 'Guests',
    'hd.guestsValue': '2 persons',
    'hd.languages': 'Languages',
    'hd.provider': 'Provider',
    'hd.verified': 'Verified',
    'hd.pricePerNight': 'Price / Night',
    'hd.perNight': '/night',
    'hd.bookNow': 'Book Now',
    'hd.city': 'City',
    'hd.currency': 'Currency',
    'hd.rating': 'Rating',
    'hd.esim': 'eSIM — Internet upon arrival',
    'hd.flightsTo': 'Flights to',
    'hd.perPerson': '/person',
    'hd.toursIn': 'Tours in',
    'hd.ticketsAttractions': 'Tickets & Attractions',
    'hd.transferAirport': 'Airport Transfer',
    'hd.otherHotels': 'Other hotels in',
    'hd.hotel': 'Hotel', 'hd.flight': 'Flight', 'hd.tour': 'Tour',
    'hd.transferCat': 'Transfer', 'hd.ticket': 'Ticket', 'hd.insurance': 'Insurance',
    'hd.freeWifi': 'Free Wi-Fi', 'hd.breakfast': 'Breakfast included',
    'hd.freeCancel': 'Free cancellation', 'hd.securePay': 'Secure payment',

    // Ticket detail
    'td.notFound': 'Ticket not found',
    'td.notFoundDesc': 'The requested ticket does not exist or has been removed',
    'td.backToHome': 'Back to homepage',
    'td.back': 'Back',
    'td.aboutTicket': 'About this Ticket',
    'td.workHours': 'Working hours',
    'td.location': 'Location',
    'td.ticketType': 'Ticket type',
    'td.electronic': 'Electronic',
    'td.cancellation': 'Cancellation',
    'td.freeCancelValue': 'Free 24h',
    'td.provider': 'Provider',
    'td.officialPartner': 'Official Partner',
    'td.verified': 'Verified',
    'td.price': 'Price',
    'td.perPerson': '/person',
    'td.buyNow': 'Buy Now',
    'td.currency': 'Currency',
    'td.type': 'Type',
    'td.city': 'City',
    'td.boughtTogether': 'Frequently bought together',
    'td.hotelsIn': 'Hotels in',
    'td.perNight': '/night',
    'td.flightsTo': 'Flights to',
    'td.transferIn': 'Transfer in',
    'td.esimIn': 'eSIM — Internet in',
    'td.esimDesc': 'Internet upon arrival while traveling. No need to buy a SIM card.',
    'td.ticketAttraction': 'Ticket / Attraction',
    'td.tourExcursion': 'Tour / Excursion',
    'td.hotelCat': 'Hotel', 'td.transferCat': 'Transfer',
    'td.flightCat': 'Flight',
    'td.instantConfirm': 'Instant confirmation',
    'td.mobileTicket': 'Mobile ticket',
    'td.freeCancel24': 'Free cancellation 24h',
    'td.securePay': 'Secure payment',

    // Smart Booking Widget
    'bw.flights': 'Flights', 'bw.flightsDesc': 'Find cheap flights (Aviasales)',
    'bw.hotels': 'Hotels', 'bw.hotelsDesc': 'Best prices (Klook)',
    'bw.transfer': 'Transfer', 'bw.transferDesc': 'Comfortable pickup (Kiwitaxi)',
    'bw.esim': 'Mobile Internet', 'bw.esimDesc': 'eSIM without roaming (Airalo)',
    'bw.car': 'Car Rental', 'bw.carDesc': 'Book affordably (Localrent)',
    'bw.insurance': 'Insurance', 'bw.insuranceDesc': 'Peaceful travel (EKTA)',
    'bw.startSearch': 'Start Search',

    // Gallery page
    'gal.title': 'Gallery',
    'gal.subtitle': 'Photo archive of the world\'s best cities',
    'gal.photos': 'photos',

    // Currency page
    'cur.title': 'Currency',
    'cur.subtitle': 'National Bank reference exchange rates.',
    'cur.converter': 'Converter',
    'cur.gel': 'GEL (Lari)',
    'cur.foreign': 'Foreign currency',
    'cur.demo': '* Demo exchange rates',
    'cur.currentRates': 'Current rates (1 = ₾)',

    // Map page
    'mp.title': 'Map',
    'mp.subtitle': 'Plan your route and find nearby locations.',
    'mp.worldMap': 'World Map',
    'mp.worldDesc': 'Discover 27+ destinations across all continents — Europe, Asia, Americas, Africa.',

    // About page extra
    'ab.badge': 'About Us',
    'ab.heroTitle': 'Mogzauroba.com — Georgian\nTravel Platform',
    'ab.heroDesc': 'We create a unified space for Georgian travelers, where you can compare flights, hotels, tours and transfers from 12+ providers with a single search.',
    'ab.mission': 'Our Mission',
    'ab.missionP1': 'Everyone loves travel. Our goal is to offer Georgian-speaking users a world-class travel platform where all services can be found in one place.',
    'ab.missionP2': 'We partner with Aviasales, Klook, Kiwitaxi, Localrent, Airalo and EKTA to bring you the best prices and services.',
    'ab.flights': 'Flights', 'ab.hotels': 'Hotels',
    'ab.transfers': 'Transfers', 'ab.attractions': 'Attractions',
    'ab.whyUs': 'Why Mogzauroba.com?',
    'ab.safe': 'Secure', 'ab.safeDesc': 'SSL encryption and secure transactions',
    'ab.georgian': 'Georgian', 'ab.georgianDesc': 'Full Georgian interface',
    'ab.cheapPrices': 'Best Prices', 'ab.cheapDesc': 'Compare 12+ providers',
    'ab.support': 'Support', 'ab.supportDesc': '24/7 Georgian service',
    'ab.history': 'Our History',
    'ab.team': 'Our Team',
    'ab.founderCEO': 'Founder & CEO', 'ab.founderDesc': 'Strategy and vision',
    'ab.cto': 'Technical Director', 'ab.ctoDesc': 'Platform development',
    'ab.marketing': 'Marketing', 'ab.marketingDesc': 'User acquisition',
    'ab.supportTeam': 'Support', 'ab.supportTeamDesc': '24/7 Client service',
    'ab.timeline1': 'Platform founding and API integration',
    'ab.timeline2': '6 destinations, 225+ active offers',
    'ab.timeline3': 'Expansion to 20+ European cities',
    'ab.question': 'Have a question?',
    'ab.questionDesc': 'Contact us anytime — our team is ready to help you.',
    'ab.email': 'By email',
    'ab.phone': 'By phone',

    // Currency names
    'cur.EUR': 'Euro', 'cur.USD': 'Dollar', 'cur.GBP': 'British Pound',
    'cur.TRY': 'Turkish Lira', 'cur.AED': 'Dirham', 'cur.JPY': 'Japanese Yen',
    'cur.THB': 'Thai Baht', 'cur.EGP': 'Egyptian Pound',
    'cur.CZK': 'Czech Koruna', 'cur.INR': 'Indian Rupee',

    // Day/month names
    'day.sun': 'Sun', 'day.mon': 'Mon', 'day.tue': 'Tue', 'day.wed': 'Wed',
    'day.thu': 'Thu', 'day.fri': 'Fri', 'day.sat': 'Sat',
    'mon.jan': 'Jan', 'mon.feb': 'Feb', 'mon.mar': 'Mar', 'mon.apr': 'Apr',
    'mon.may': 'May', 'mon.jun': 'Jun', 'mon.jul': 'Jul', 'mon.aug': 'Aug',
    'mon.sep': 'Sep', 'mon.oct': 'Oct', 'mon.nov': 'Nov', 'mon.dec': 'Dec',
  },
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ka');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en' || saved === 'ka') {
      setLangState(saved);
      return;
    }
    // First visit — detect country via geo-IP
    fetch('https://ipapi.co/country/', { signal: AbortSignal.timeout(3000) })
      .then(r => r.text())
      .then(code => {
        const country = code.trim().toUpperCase();
        const detected: Lang = country === 'GE' ? 'ka' : 'en';
        setLangState(detected);
        localStorage.setItem('lang', detected);
      })
      .catch(() => { /* keep default ka on error */ });
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations['ka'][key] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
