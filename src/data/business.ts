export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const business = {
  name: 'Burger in Casa | Hamburgueria',
  shortName: 'Burger in Casa',
  address: 'Q Quadra 3, 70 - Casa - Dom Bosco, Cidade Ocidental - GO, 72887-790',
  addressShort: 'Q Quadra 3, 70 - Dom Bosco, Cidade Ocidental - GO',
  phoneDisplay: '(61) 99931-4669',
  whatsapp: 'https://wa.me/5561999314669',
  whatsappOrder:
    'https://wa.me/5561999314669?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido',
  whatsappRodizio:
    'https://wa.me/5561999314669?text=Ol%C3%A1!%20Quero%20saber%20sobre%20o%20rod%C3%ADzio',
  menuUrl: 'https://pedido.anota.ai/loja/burger-in-casa-1',
  instagram: 'https://www.instagram.com/burgerincasaoficial/',
  maps: 'https://maps.app.goo.gl/SiVCoRtisKAztZsi8',
  rating: 4.7,
  reviews: 188,
  timezone: 'America/Sao_Paulo',
  hoursSummary: 'Todos os dias · 18h às 23h · sex e sáb até 23h30',
  hoursCompact: 'Todos os dias 18h–23h (sex e sáb até 23h30)',
  hours: {
    mon: ['18:00', '23:00'],
    tue: ['18:00', '23:00'],
    wed: ['18:00', '23:00'],
    thu: ['18:00', '23:00'],
    fri: ['18:00', '23:30'],
    sat: ['18:00', '23:30'],
    sun: ['18:00', '23:00'],
  } as Record<DayKey, [string, string]>,
} as const;

export const assets = {
  heroDesktop: '/src/assets/images/hero_desktop_1795082264038.jpg',
  heroMobile: '/src/assets/images/hero_mobile_1795082266053.jpg',
  mesaFamilia: '/src/assets/images/mesa_familia_1795082264968.jpg',
  pulledPork: '/src/assets/images/pulled_pork_1795082265453.jpg',
  burgerDestaque: '/src/assets/images/burger_destaque_1795082266817.jpg',
  rodizioTabua: '/src/assets/images/rodizio_tabua_1795082264351.jpg',
} as const;
