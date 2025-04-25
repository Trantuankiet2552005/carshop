const motors = [
    {
      id: 37,
      name: "Harley-Davidson Nightster",
      price: "650,000,000 VND",
      image: "2022 Harley-Davidson Nightster Redline Red.jpg",
      type: "Cruiser",
      brand: "Harley-Davidson",
      cc: "975cc",
      atcvt: "6 cấp"
    },
    {
      id: 38,
      name: "Harley-Davidson Pan America 1250",
      price: "1,050,000,000 VND",
      image: "2022 Harley-Davidson Pan America 1250 Special Vivid Black.jpg",
      type: "Adventure",
      brand: "Harley-Davidson",
      cc: "1250cc",
      atcvt: "6 cấp"
    },
    {
      id: 39,
      name: "Harley-Davidson Low Rider ST",
      price: "1,200,000,000 VND",
      image: "2023 Harley-Davidson Low Rider ST Fast Johnnie.jpg",
      type: "Cruiser",
      brand: "Harley-Davidson",
      cc: "1868cc",
      atcvt: "6 cấp"
    },
    {
      id: 40,
      name: "Honda Africa Twin Adventure Sports",
      price: "850,000,000 VND",
      image: "Africa Twin 2025 - Bản Adventure Sports.jpg",
      type: "Adventure",
      brand: "Honda",
      cc: "1084cc",
      atcvt: "6 cấp + DCT"
    },
    {
      id: 41,
      name: "BMW R 1250 GS",
      price: "1,100,000,000 VND",
      image: "bmw-r1250gs.jpg",
      type: "Adventure",
      brand: "BMW",
      cc: "1254cc",
      atcvt: "6 cấp"
    },
    {
      id: 42,
      name: "BMW R nineT",
      price: "900,000,000 VND",
      image: "bmw-rninrT.jpg",
      type: "Naked",
      brand: "BMW",
      cc: "1170cc",
      atcvt: "6 cấp"
    },
    {
      id: 43,
      name: "Honda CB350 Hness",
      price: "90,000,000 VND",
      image: "cb350hness.jpg",
      type: "Classic",
      brand: "Honda",
      cc: "348cc",
      atcvt: "5 cấp"
    },
    {
      id: 44,
      name: "Honda CB650R",
      price: "320,000,000 VND",
      image: "cb650r.jpg",
      type: "Naked",
      brand: "Honda",
      cc: "649cc",
      atcvt: "6 cấp"
    },
    {
      id: 45,
      name: "Honda CB1000 Hornet",
      price: "500,000,000 VND",
      image: "cb1000hornet.jpg",
      type: "Naked",
      brand: "Honda",
      cc: "998cc",
      atcvt: "6 cấp"
    },
    {
      id: 46,
      name: "Honda CB1000R",
      price: "550,000,000 VND",
      image: "cb1000r.jpg",
      type: "Naked",
      brand: "Honda",
      cc: "998cc",
      atcvt: "6 cấp"
    },
    {
      id: 47,
      name: "Honda CBR650R",
      price: "350,000,000 VND",
      image: "cbr650r.jpg",
      type: "Sport",
      brand: "Honda",
      cc: "649cc",
      atcvt: "6 cấp"
    },
    {
      id: 48,
      name: "Ducati Diavel 1260",
      price: "1,300,000,000 VND",
      image: "ducati-diavel1260.jpg",
      type: "Cruiser",
      brand: "Ducati",
      cc: "1262cc",
      atcvt: "6 cấp"
    },
    {
      id: 49,
      name: "Ducati Streetfighter V4",
      price: "1,400,000,000 VND",
      image: "Ducati-streetfighter-V4.jpg",
      type: "Naked",
      brand: "Ducati",
      cc: "1103cc",
      atcvt: "6 cấp"
    },
    {
      id: 50,
      name: "Vespa GTS Super Tech 300",
      price: "180,000,000 VND",
      image: "gts-super-tech-300.jpg",
      type: "Scooter",
      brand: "Vespa",
      cc: "278cc",
      atcvt: "CVT"
    },
    {
      id: 51,
      name: "Honda CBR1000RR",
      price: "800,000,000 VND",
      image: "honda-cbr1000r.jpg",
      type: "Sport",
      brand: "Honda",
      cc: "999cc",
      atcvt: "6 cấp"
    },
    {
      id: 52,
      name: "Honda Gold Wing",
      price: "1,500,000,000 VND",
      image: "honda-GoldWing.jpg",
      type: "Touring",
      brand: "Honda",
      cc: "1833cc",
      atcvt: "7 cấp + DCT"
    },
    {
      id: 53,
      name: "Kawasaki Ninja H2",
      price: "2,500,000,000 VND",
      image: "kawasaki-h2.jpg",
      type: "Sport",
      brand: "Kawasaki",
      cc: "998cc",
      atcvt: "6 cấp"
    },
    {
      id: 54,
      name: "Kawasaki W800",
      price: "350,000,000 VND",
      image: "kawasaki-w800.jpg",
      type: "Classic",
      brand: "Kawasaki",
      cc: "773cc",
      atcvt: "5 cấp"
    },
    {
      id: 55,
      name: "Kawasaki KLX230SM",
      price: "120,000,000 VND",
      image: "klx230sm.jpg",
      type: "SuperMoto",
      brand: "Kawasaki",
      cc: "232cc",
      atcvt: "6 cấp"
    },
    {
      id: 56,
      name: "Kawasaki Ninja 650",
      price: "250,000,000 VND",
      image: "ninja650abs.jpg",
      type: "Sport",
      brand: "Kawasaki",
      cc: "649cc",
      atcvt: "6 cấp"
    },
    {
      id: 57,
      name: "Honda NX500",
      price: "220,000,000 VND",
      image: "nx500.jpg",
      type: "Adventure",
      brand: "Honda",
      cc: "471cc",
      atcvt: "6 cấp"
    },
    {
      id: 58,
      name: "Piaggio MP3 400",
      price: "200,000,000 VND",
      image: "piaggio-mp3 400.jpg",
      type: "Scooter",
      brand: "Piaggio",
      cc: "399cc",
      atcvt: "CVT"
    },
    {
      id: 59,
      name: "Honda Rebel 500",
      price: "180,000,000 VND",
      image: "rebel500.jpg",
      type: "Cruiser",
      brand: "Honda",
      cc: "471cc",
      atcvt: "6 cấp"
    },
    {
      id: 60,
      name: "Honda Rebel 1100",
      price: "450,000,000 VND",
      image: "rebel1100r.jpg",
      type: "Cruiser",
      brand: "Honda",
      cc: "1084cc",
      atcvt: "6 cấp + DCT"
    },
    {
      id: 61,
      name: "Honda SH350",
      price: "150,000,000 VND",
      image: "sh350.jpg",
      type: "Scooter",
      brand: "Honda",
      cc: "330cc",
      atcvt: "CVT"
    },
    {
      id: 62,
      name: "Yamaha TMAX 560",
      price: "500,000,000 VND",
      image: "TMAX-560-004-1-768x645.jpg",
      type: "Scooter",
      brand: "Yamaha",
      cc: "562cc",
      atcvt: "CVT"
    },
    {
      id: 63,
      name: "Kawasaki Versys 650",
      price: "300,000,000 VND",
      image: "versys-650.jpg",
      type: "Adventure",
      brand: "Kawasaki",
      cc: "649cc",
      atcvt: "6 cấp"
    },
    {
      id: 64,
      name: "Suzuki V-Strom 250SX",
      price: "100,000,000 VND",
      image: "V-STROM 250SX.jpg",
      type: "Adventure",
      brand: "Suzuki",
      cc: "249cc",
      atcvt: "6 cấp"
    },
    {
      id: 65,
      name: "Yamaha MT-03",
      price: "150,000,000 VND",
      image: "yamaha-mt03.jpg",
      type: "Naked",
      brand: "Yamaha",
      cc: "321cc",
      atcvt: "6 cấp"
    },
    {
      id: 66,
      name: "Yamaha MT-07",
      price: "250,000,000 VND",
      image: "yamaha-mt07.jpg",
      type: "Naked",
      brand: "Yamaha",
      cc: "689cc",
      atcvt: "6 cấp"
    },
    {
      id: 67,
      name: "Yamaha MT-10",
      price: "500,000,000 VND",
      image: "yamaha-mt10.jpg",
      type: "Naked",
      brand: "Yamaha",
      cc: "998cc",
      atcvt: "6 cấp"
    },
    {
      id: 68,
      name: "Yamaha YZF-R7",
      price: "300,000,000 VND",
      image: "yamaha-yzf-r7.jpg",
      type: "Sport",
      brand: "Yamaha",
      cc: "689cc",
      atcvt: "6 cấp"
    },
    {
      id: 69,
      name: "Yamaha YZF-R3",
      price: "130,000,000 VND",
      image: "yzf-r3.jpg",
      type: "Sport",
      brand: "Yamaha",
      cc: "321cc",
      atcvt: "6 cấp"
    },
    {
      id: 70,
      name: "Kawasaki Z650",
      price: "220,000,000 VND",
      image: "z650.jpg",
      type: "Naked",
      brand: "Kawasaki",
      cc: "649cc",
      atcvt: "6 cấp"
    },
    {
      id: 71,
      name: "Kawasaki Z900",
      price: "350,000,000 VND",
      image: "z900.jpg",
      type: "Naked",
      brand: "Kawasaki",
      cc: "948cc",
      atcvt: "6 cấp"
    },
    {
      id: 72,
      name: "Kawasaki Z1000",
      price: "450,000,000 VND",
      image: "z1000.jpg",
      type: "Naked",
      brand: "Kawasaki",
      cc: "1043cc",
      atcvt: "6 cấp"
    }
  ]
  export { motors }; 