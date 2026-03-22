import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';
import { fetchWithToken } from '@/app/lib/api';
import { DESTINATION_PRESETS, getDestinationLabel } from '@/app/lib/travel';

const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';
const CRON_SECRET = process.env.CRON_SECRET;

const ORIGIN = 'TBS';

function getDestLabel(code: string): string {
  return getDestinationLabel(code);
}

// City-specific data: images, hotel names, attractions, tours
const cityData: Record<string, {
  cityImg: string;
  hotels: { name: string; price: number; img: string }[];
  tours: { name: string; price: number; img: string }[];
  tickets: { name: string; price: number; img: string }[];
  transferPrice: number;
}> = {
  PAR: {
    cityImg: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Le Marais Boutique Hotel', price: 195, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
      { name: 'Hotel Luxembourg Paris', price: 145, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
      { name: 'Montmartre Residence', price: 85, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'ლუვრი & ეიფელის კოშკი ტური', price: 45, img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop' },
      { name: 'ვერსალის სასახლის ექსკურსია', price: 65, img: 'https://images.unsplash.com/photo-1551410224-699683e15636?q=80&w=800&auto=format&fit=crop' },
      { name: 'სენა მდინარის საღამოს კრუიზი', price: 35, img: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'ლუვრის მუზეუმის ბილეთი', price: 22, img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop' },
      { name: 'ეიფელის კოშკის ბილეთი', price: 28, img: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=800&auto=format&fit=crop' },
      { name: 'დისნეილენდი პარიზი', price: 56, img: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 55,
  },
  ROM: {
    cityImg: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Hotel Roma Centro', price: 170, img: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=800&auto=format&fit=crop' },
      { name: 'Palazzo Navona Suite', price: 220, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
      { name: 'Trastevere Budget Inn', price: 65, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'კოლიზეუმი & ვატიკანის ტური', price: 38, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop' },
      { name: 'რომის ისტორიული ცენტრის ტური', price: 30, img: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'კოლიზეუმის ბილეთი (რიგის გარეშე)', price: 24, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop' },
      { name: 'ვატიკანის მუზეუმის ბილეთი', price: 28, img: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 45,
  },
  BCN: {
    cityImg: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Hotel Barcelona Gothic', price: 160, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
      { name: 'Las Ramblas Boutique', price: 130, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'საგრადა ფამილია & პარკ გუელი', price: 35, img: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=800&auto=format&fit=crop' },
      { name: 'გოთიკური კვარტალის ტური', price: 25, img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'საგრადა ფამილიას ბილეთი', price: 26, img: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=800&auto=format&fit=crop' },
      { name: 'პარკ გუელის ბილეთი', price: 12, img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 40,
  },
  LON: {
    cityImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'London Bridge Inn', price: 220, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
      { name: 'Kensington Royal Hotel', price: 280, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
      { name: 'Camden Town Hostel', price: 45, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'ბიგ ბენი & ბუკინგემის სასახლე', price: 50, img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop' },
      { name: 'ლონდონის ტაუერის ტური', price: 45, img: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'ლონდონ აი ბილეთი', price: 32, img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop' },
      { name: 'ბრიტანეთის მუზეუმი (VIP ტური)', price: 18, img: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 60,
  },
  AMS: {
    cityImg: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Canal View Amsterdam', price: 175, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
      { name: 'Jordaan District Hotel', price: 140, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'ანა ფრანკის სახლი & არხების ტური', price: 32, img: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=800&auto=format&fit=crop' },
      { name: 'არხების საღამოს კრუიზი', price: 28, img: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'რეიხსმუზეუმის ბილეთი', price: 22, img: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=800&auto=format&fit=crop' },
      { name: 'ვან გოგის მუზეუმი', price: 20, img: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 45,
  },
  IST: {
    cityImg: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Sultanahmet Palace Hotel', price: 100, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Galata Tower Hotel', price: 130, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
      { name: 'Taksim Budget Stay', price: 45, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'აია სოფია & ლურჯი მეჩეთი', price: 22, img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop' },
      { name: 'ბოსფორის კრუიზი', price: 18, img: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop' },
      { name: 'კაპადოკიის 1-დღიანი ტური', price: 85, img: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'ტოპკაპის სასახლის ბილეთი', price: 15, img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop' },
      { name: 'წყალქვეშა ცისტერნა', price: 10, img: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 30,
  },
  DXB: {
    cityImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Dubai Marina Luxury', price: 250, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'JBR Beach Resort', price: 180, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'ბურჯ ხალიფა & უდაბნოს საფარი', price: 65, img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=800&auto=format&fit=crop' },
      { name: 'აბუ-დაბის 1-დღიანი ტური', price: 75, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'ბურჯ ხალიფა At The Top', price: 45, img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=800&auto=format&fit=crop' },
      { name: 'Dubai Aquarium & Zoo', price: 35, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 35,
  },
  BKK: {
    cityImg: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Bangkok Riverside Resort', price: 85, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Sukhumvit Boutique Hotel', price: 55, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'სასახლეები & არხების ტური', price: 20, img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=800&auto=format&fit=crop' },
      { name: 'მცურავი ბაზრის ექსკურსია', price: 18, img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'Grand Palace ბილეთი', price: 15, img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=800&auto=format&fit=crop' },
      { name: 'Wat Pho ტაძარი', price: 8, img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 20,
  },
  TYO: {
    cityImg: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Shinjuku Tokyo Hotel', price: 180, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Shibuya Capsule Hotel', price: 40, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'სენსო-ჯი & ტოკიოს კოშკი', price: 35, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop' },
      { name: 'მთა ფუძის 1-დღიანი ტური', price: 80, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'TeamLab Borderless ბილეთი', price: 25, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop' },
      { name: 'ტოკიოს კოშკის ბილეთი', price: 18, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 50,
  },
  NYC: {
    cityImg: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Manhattan Midtown Hotel', price: 280, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop' },
      { name: 'Brooklyn Bridge Loft', price: 150, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'თავისუფლების ქანდაკება & ცენტრალ პარკი', price: 60, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop' },
      { name: 'ბრუკლინის პეხით ტური', price: 35, img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'Empire State Building ბილეთი', price: 42, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop' },
      { name: 'MoMA მუზეუმის ბილეთი', price: 25, img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 65,
  },
  ATH: {
    cityImg: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Acropolis View Hotel', price: 120, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Plaka Traditional Inn', price: 75, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'აკროპოლისი & პართენონის ტური', price: 30, img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop' },
      { name: 'დელფის 1-დღიანი ექსკურსია', price: 55, img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'აკროპოლისის ბილეთი', price: 20, img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop' },
      { name: 'ეროვნული არქეოლოგიური მუზეუმი', price: 12, img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 35,
  },
  CAI: {
    cityImg: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Cairo Pyramids Hotel', price: 90, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Nile View Apartment', price: 55, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'გიზას პირამიდები & სფინქსი', price: 25, img: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop' },
      { name: 'ნილოსის კრუიზი', price: 40, img: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'ეგვიპტის მუზეუმის ბილეთი', price: 12, img: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop' },
      { name: 'პირამიდების შიდა ტური', price: 30, img: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 20,
  },
  TBS: {
    cityImg: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=800&auto=format&fit=crop',
    hotels: [
      { name: 'Tbilisi Old Town Hotel', price: 65, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Rustaveli Avenue Suite', price: 95, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
      { name: 'Fabrika Hostel', price: 25, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: 'ძველი თბილისი & აბანოთუბანი', price: 15, img: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=800&auto=format&fit=crop' },
      { name: 'კახეთის ღვინის ტური', price: 35, img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=800&auto=format&fit=crop' },
      { name: 'მცხეთა & ჯვარის მონასტერი', price: 25, img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: 'ეროვნული მუზეუმის ბილეთი', price: 5, img: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=800&auto=format&fit=crop' },
      { name: 'ნარიყალას საბაგირო', price: 3, img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 15,
  },
};

// Default data for cities not in the detailed map
function getDefaultCityData(dest: string) {
  return {
    hotels: [
      { name: `Premium Hotel (${dest})`, price: 150, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
      { name: `Budget Stay (${dest})`, price: 55, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    ],
    tours: [
      { name: `ქალაქის ტური (${dest})`, price: 30, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop' },
    ],
    tickets: [
      { name: `მთავარი მუზეუმის ბილეთი (${dest})`, price: 18, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop' },
    ],
    transferPrice: 40,
  };
}

export async function GET(request: Request) {
  if (CRON_SECRET) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || request.headers.get('authorization')?.replace('Bearer ', '');
    if (token !== CRON_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 });
  }

  try {
    await pool.query('DELETE FROM travel_services');

    const allServices: any[] = [];
    const DESTINATIONS = DESTINATION_PRESETS.map(d => d.code);

    for (const dest of DESTINATIONS) {
      const data = cityData[dest] || { cityImg: '', ...getDefaultCityData(dest) };
      const defaults = getDefaultCityData(dest);
      const hotels = data.hotels || defaults.hotels;
      const tours = data.tours || defaults.tours;
      const tickets = data.tickets || defaults.tickets;
      const transferPrice = data.transferPrice || defaults.transferPrice;

      // ====== 1. AVIASALES — Live flight data ======
      try {
        const flightData = await fetchWithToken(
          `/aviasales/v3/prices_for_dates?origin=${ORIGIN}&destination=${encodeURIComponent(dest)}&currency=eur`
        );
        if (flightData?.data) {
          const flightsArray = Array.isArray(flightData.data) ? flightData.data : Object.values(flightData.data);
          (flightsArray as any[]).forEach((flight: any) => {
            const airlineCode = flight.airline || '';
            const deepLink = flight.link
              ? `https://www.aviasales.com${flight.link}&marker=${MARKER}`
              : `https://search.aviasales.com/${flight.origin}${flight.destination}?marker=${MARKER}`;
            const durationTo = flight.duration_to || 0;
            const durationH = Math.floor(durationTo / 60);
            const durationM = durationTo % 60;
            const durationStr = durationTo > 0 ? ` · ${durationH}სთ ${durationM}წთ` : '';
            const transfersStr = flight.transfers === 0 ? 'პირდაპირი რეისი' : `${flight.transfers} გადაჯდომა`;
            const returnStr = flight.return_at ? ` · ორმხრივი` : '';

            allServices.push({
              provider: 'Aviasales', category: 'flight', destination: dest,
              title: `ფრენა: ${flight.origin} → ${flight.destination} (${airlineCode})`,
              description: `${transfersStr}${durationStr}${returnStr}`,
              price: flight.price, currency: 'EUR',
              external_link: deepLink,
              image_url: `https://pics.avs.io/200/200/${airlineCode}@2x.png`,
            });
          });
        }
      } catch (err) {
        console.error(`Aviasales err for ${dest}`, err);
      }

      // ====== 2. KIWI.COM — Alternative flights ======
      allServices.push({
        provider: 'Kiwi.com', category: 'flight', destination: dest,
        title: `მულტი-სიტი მარშრუტი: TBS → ${dest}`,
        description: 'არატრადიციული კონექშნები ფულის დაზოგვისთვის.',
        price: 110, currency: 'EUR',
        external_link: `https://kiwi.com/?affilid=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 3. TRIP.COM — Hotels ======
      hotels.forEach((h, i) => {
        const providers = ['Trip.com', 'Hotellook', 'Booking.com'];
        const provider = providers[i % providers.length];
        allServices.push({
          provider, category: 'hotel', destination: dest,
          title: h.name,
          description: provider === 'Trip.com' ? 'საერთაშორისო ქსელის სასტუმრო, საუზმე ჩართულია.' :
                       provider === 'Booking.com' ? 'უფასო გაუქმება 24 საათით ადრე.' :
                       'ბიუჯეტური ვარიანტი ქალაქის ცენტრში.',
          price: h.price, currency: 'EUR',
          external_link: provider === 'Trip.com' ? `https://trip.com/hotels/?marker=${MARKER}` :
                         provider === 'Booking.com' ? `https://booking.com/?aid=${MARKER}` :
                         `https://search.hotellook.com/?marker=${MARKER}&destination=${dest}`,
          image_url: h.img,
        });
      });

      // ====== 4. GETYOURGUIDE — Tours ======
      tours.forEach((t) => {
        allServices.push({
          provider: 'GetYourGuide', category: 'tour', destination: dest,
          title: t.name,
          description: 'ინგლისურენოვანი გიდის თანხლებით, ჯგუფური ექსკურსია.',
          price: t.price, currency: 'EUR',
          external_link: `https://getyourguide.com/?partner_id=${MARKER}`,
          image_url: t.img,
        });
      });

      // ====== 5. VIATOR — Additional tours ======
      if (tours.length > 0) {
        allServices.push({
          provider: 'Viator', category: 'tour', destination: dest,
          title: `VIP პრივატული ტური: ${tours[0].name}`,
          description: 'პრივატული გიდი, ინდივიდუალური მარშრუტი.',
          price: Math.round(tours[0].price * 1.8), currency: 'EUR',
          external_link: `https://viator.com/?pid=${MARKER}`,
          image_url: tours[0].img,
        });
      }

      // ====== 6. TIQETS — Museum/Attraction tickets ======
      tickets.forEach((tk) => {
        allServices.push({
          provider: 'Tiqets', category: 'ticket', destination: dest,
          title: tk.name,
          description: 'ელექტრონული ბილეთი, რიგის გარეშე შესვლა.',
          price: tk.price, currency: 'EUR',
          external_link: `https://tiqets.com/en/?partner=${MARKER}`,
          image_url: tk.img,
        });
      });

      // ====== 7. MUSEMENT — Additional tickets ======
      if (tickets.length > 0) {
        allServices.push({
          provider: 'Musement', category: 'ticket', destination: dest,
          title: `კომბო ბილეთი: ${tickets[0].name}`,
          description: 'რამდენიმე ატრაქციონის ერთიანი ბილეთი ფასდაკლებით.',
          price: Math.round(tickets[0].price * 1.5), currency: 'EUR',
          external_link: `https://musement.com/?aid=${MARKER}`,
          image_url: tickets[0].img,
        });
      }

      // ====== 8. KIWITAXI — Airport transfer ======
      allServices.push({
        provider: 'Kiwitaxi', category: 'transfer', destination: dest,
        title: `აეროპორტიდან ცენტრში — სტანდარტი (${dest})`,
        description: `${getDestLabel(dest)} — კერძო მძღოლი აეროპორტიდან სასტუმრომდე. სედანი, 3 ადგილი.`,
        price: transferPrice, currency: 'EUR',
        external_link: `https://kiwitaxi.com/en/transfers/?pap=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 9. WELCOME PICKUPS — Premium transfer ======
      allServices.push({
        provider: 'Welcome Pickups', category: 'transfer', destination: dest,
        title: `პრემიუმ დახვედრა — ინგლისურენოვანი მძღოლი (${dest})`,
        description: `${getDestLabel(dest)} — პრემიუმ კლასის ავტომობილი, საჩუქრად ქალაქის გზამკვლევი.`,
        price: Math.round(transferPrice * 1.5), currency: 'EUR',
        external_link: `https://www.welcomepickups.com/?agent_id=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 10. GETTRANSFER — VIP transfer ======
      allServices.push({
        provider: 'GetTransfer', category: 'transfer', destination: dest,
        title: `VIP ტრანსფერი ტენდერით (${dest})`,
        description: `${getDestLabel(dest)} — მძღოლები შემოგთავაზებენ ფასს. ბიზნეს ან მინივენი.`,
        price: Math.round(transferPrice * 0.8), currency: 'EUR',
        external_link: `https://gettransfer.com/?source=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 11. ECONOMYBOOKINGS — Car rental ======
      const carPrices: Record<string, number> = {
        PAR: 35, ROM: 28, BCN: 25, LON: 45, AMS: 30, BER: 28,
        IST: 18, DXB: 22, BKK: 12, TYO: 40, NYC: 50, ATH: 20,
        CAI: 15, TBS: 20, MRK: 18, SIN: 35, CUN: 22, MIA: 38,
      };
      allServices.push({
        provider: 'EconomyBookings', category: 'car', destination: dest,
        title: `ავტომობილის ქირაობა — ეკონომი კლასი (${dest})`,
        description: `${getDestLabel(dest)} — 800+ კომპანიიდან საუკეთესო ფასები.`,
        price: carPrices[dest] || 25, currency: 'EUR',
        external_link: `https://economybookings.com/?partner=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 12. LOCALRENT — Local car rental ======
      const localrentPrices: Record<string, number> = {
        PAR: 30, ROM: 24, BCN: 22, LON: 40, AMS: 26, BER: 24,
        IST: 15, DXB: 20, BKK: 10, TYO: 35, NYC: 45, ATH: 18,
        CAI: 12, TBS: 15, MRK: 14, SIN: 30, CUN: 19, MIA: 32,
      };
      allServices.push({
        provider: 'Localrent', category: 'car', destination: dest,
        title: `ადგილობრივი ქირაობა — დეპოზიტის გარეშე (${dest})`,
        description: `${getDestLabel(dest)} — ადგილობრივი კომპანიები, სრული დაზღვევა.`,
        price: localrentPrices[dest] || 20, currency: 'EUR',
        external_link: `https://localrent.com/?r=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 13. OMIO — Trains & Buses ======
      allServices.push({
        provider: 'Omio', category: 'transport', destination: dest,
        title: `მატარებელი & ავტობუსი (${dest})`,
        description: 'ევროპის შიდა მარშრუტები მატარებლით და ავტობუსით.',
        price: 35, currency: 'EUR',
        external_link: `https://omio.com/?partner=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 14. AIRALO — eSIM ======
      allServices.push({
        provider: 'Airalo', category: 'esim', destination: dest,
        title: `eSIM 10GB ინტერნეტი (${dest})`,
        description: 'მყისიერი ინტერნეტი ჩამოფრენისთანავე.',
        price: 15, currency: 'EUR',
        external_link: `https://airalo.com/?custom_id=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 15. YESIM — eSIM ======
      allServices.push({
        provider: 'Yesim', category: 'esim', destination: dest,
        title: `ულიმიტო ინტერნეტ პაკეტი (${dest})`,
        description: 'ულიმიტო 4G/5G მონაცემები.',
        price: 30, currency: 'EUR',
        external_link: `https://yesim.app/?ref=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 16. EKTA — Insurance ======
      allServices.push({
        provider: 'EKTA', category: 'insurance', destination: dest,
        title: 'სამოგზაურო დაზღვევა — ბაზისური',
        description: 'ჯანმრთელობის და ბარგის დაზღვევა შენგენისა და მსოფლიოსთვის.',
        price: 12, currency: 'EUR',
        external_link: `https://ektatraveling.com/?partner=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 17. SAFETY WING — Insurance ======
      allServices.push({
        provider: 'SafetyWing', category: 'insurance', destination: dest,
        title: 'ციფრული ნომადის დაზღვევა',
        description: 'გრძელვადიანი სამოგზაურო & ჯანმრთელობის დაზღვევა.',
        price: 42, currency: 'EUR',
        external_link: `https://safetywing.com/?referenceID=${MARKER}`,
        image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
      });

      // ====== 18. KLOOK — Activities ======
      allServices.push({
        provider: 'Klook', category: 'ticket', destination: dest,
        title: `ადგილობრივი ატრაქციონები & აქტივობები (${dest})`,
        description: 'მობილური ბილეთი, მყისიერი დადასტურება.',
        price: 20, currency: 'EUR',
        external_link: `https://www.klook.com/?aid=${MARKER}`,
        image_url: data.cityImg || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
      });
    }

    // Bulk insert all services using a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const columns = ['provider', 'category', 'destination', 'title', 'description', 'price', 'currency', 'external_link', 'image_url'];
      for (const svc of allServices) {
        await client.query(
          `INSERT INTO travel_services (provider, category, destination, title, description, price, currency, external_link, image_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [svc.provider, svc.category, svc.destination, svc.title, svc.description, svc.price, svc.currency || 'EUR', svc.external_link, svc.image_url]
        );
      }
      await client.query('COMMIT');
    } catch (insertErr) {
      await client.query('ROLLBACK');
      throw insertErr;
    } finally {
      client.release();
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${allServices.length} items across ${DESTINATIONS.length} destinations (18 providers) to PostgreSQL.`
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
