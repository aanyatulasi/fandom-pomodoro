/**
 * Maps a sceneId to a real, freely-licensed photograph (Pexels — no attribution
 * required, but credited here anyway as good practice) used instead of the
 * illustrated SVG scene. Only sceneIds listed here render as a photo; everything
 * else (currently: the Hera/Artemis/Dionysus cabins) keeps the SVG scene.
 */
export interface LocationPhoto {
  src: string;
  objectPosition?: string;
  credit: { photographer: string; url: string };
}

export const LOCATION_PHOTOS: Record<string, LocationPhoto> = {
  'pj-camp-main': {
    src: '/images/pj/pj-camp-main.jpg',
    credit: { photographer: 'Ali Kazal', url: 'https://www.pexels.com/photo/rustic-cabins-amidst-pines-in-banff-national-park-29041657/' },
  },
  'pj-strawberry-fields': {
    src: '/images/pj/pj-strawberry-fields.jpg',
    credit: { photographer: 'Mark Stebnicki', url: 'https://www.pexels.com/photo/agriculture-strawberries-field-12003825/' },
  },
  'pj-campfire-circle': {
    src: '/images/pj/pj-campfire-circle.jpg',
    credit: { photographer: 'Lana', url: 'https://www.pexels.com/photo/burning-woods-on-a-campfire-12353836/' },
  },
  'pj-canoe-lake': {
    src: '/images/pj/pj-canoe-lake.jpg',
    credit: { photographer: 'Physical Pixel', url: 'https://www.pexels.com/photo/red-canoe-on-serene-lake-with-forest-backdrop-34089983/' },
  },
  'pj-climbing-wall': {
    src: '/images/pj/pj-climbing-wall.jpg',
    objectPosition: '50% 30%',
    credit: { photographer: 'Stephen Leonardi', url: 'https://www.pexels.com/photo/rock-climber-scaling-el-capitan-yosemite-28610678/' },
  },
  'pj-archery-range': {
    src: '/images/pj/pj-archery-range.jpg',
    credit: { photographer: 'Kampus Production', url: 'https://www.pexels.com/photo/archery-target-range-6540677/' },
  },
  'pj-arena': {
    src: '/images/pj/pj-arena.jpg',
    credit: { photographer: 'Nuh Erkan', url: 'https://www.pexels.com/photo/ancient-greek-ruins-at-sunset-32876365/' },
  },
  'pj-dining-pavilion': {
    src: '/images/pj/pj-dining-pavilion.jpg',
    credit: { photographer: 'Anastasia Shuraeva', url: 'https://www.pexels.com/photo/brown-wooden-table-under-a-tent-4994126/' },
  },
  'pj-cabin-poseidon': {
    src: '/images/pj/pj-cabin-poseidon.jpg',
    credit: { photographer: 'Pixabay', url: 'https://www.pexels.com/photo/empty-chairs-near-window-276508/' },
  },
  'pj-cabin-athena': {
    src: '/images/pj/pj-cabin-athena.jpg',
    credit: { photographer: 'Cihat Dede', url: 'https://www.pexels.com/photo/antique-library-with-wooden-bookshelves-and-globe-37441911/' },
  },
  'pj-cabin-apollo': {
    src: '/images/pj/pj-cabin-apollo.jpg',
    objectPosition: '50% 30%',
    credit: { photographer: 'Mushtaq Hussain', url: 'https://www.pexels.com/photo/a-pair-of-acoustic-guitars-on-guitar-stands-11865671/' },
  },
  'pj-cabin-ares': {
    src: '/images/pj/pj-cabin-ares.jpg',
    credit: { photographer: 'Alex Moliski', url: 'https://www.pexels.com/photo/rustic-western-cabin-interior-with-decor-34410827/' },
  },
  'pj-cabin-aphrodite': {
    src: '/images/pj/pj-cabin-aphrodite.jpg',
    credit: { photographer: 'Leeloo The First', url: 'https://www.pexels.com/photo/interior-of-a-bedroom-in-a-vintage-luxurious-style-8210470/' },
  },
  'pj-cabin-hermes': {
    src: '/images/pj/pj-cabin-hermes.jpg',
    credit: { photographer: 'Paul Seling', url: 'https://www.pexels.com/photo/interior-design-of-room-in-house-20390786/' },
  },
  'pj-cabin-hephaestus': {
    src: '/images/pj/pj-cabin-hephaestus.jpg',
    credit: { photographer: 'Yudi Ding', url: 'https://www.pexels.com/photo/rustic-blacksmith-workshop-with-tools-and-forge-34673877/' },
  },
  'pj-cabin-demeter': {
    src: '/images/pj/pj-cabin-demeter.jpg',
    credit: { photographer: 'Ksenia Chernaya', url: 'https://www.pexels.com/photo/interior-of-modern-stylish-room-with-two-tier-layout-and-floral-design-3965563/' },
  },
  'pj-cabin-zeus': {
    src: '/images/pj/pj-cabin-zeus.jpg',
    credit: { photographer: 'Erik Mclean', url: 'https://www.pexels.com/photo/photo-of-a-wooden-house-s-interior-9890656/' },
  },
  'pj-cabin-hades': {
    src: '/images/pj/pj-cabin-hades.jpg',
    credit: { photographer: 'Lisa Fotios', url: 'https://www.pexels.com/photo/table-in-victorian-room-14299995/' },
  },
  'pj-cabin-hecate': {
    src: '/images/pj/pj-cabin-hecate.jpg',
    credit: { photographer: 'Olena Bohovyk', url: 'https://www.pexels.com/photo/furniture-and-decorative-items-in-dark-room-5686479/' },
  },
  'pj-big-house': {
    src: '/images/pj/pj-big-house.jpg',
    credit: { photographer: 'Curtis Adams', url: 'https://www.pexels.com/photo/white-and-brown-wooden-house-with-balcony-over-a-porch-4682066/' },
  },
  'pj-pine-tree-hill': {
    src: '/images/pj/pj-pine-tree-hill.jpg',
    credit: { photographer: 'Kaan Keskin', url: 'https://www.pexels.com/photo/tree-on-field-in-countryside-at-sunset-24538629/' },
  },
  'pj-forest': {
    src: '/images/pj/pj-forest.jpg',
    credit: { photographer: 'Matthias Groeneveld', url: 'https://www.pexels.com/photo/trees-in-a-forest-2691464/' },
  },
  'pj-beach': {
    src: '/images/pj/pj-beach.jpg',
    credit: { photographer: 'Brendan Rühli', url: 'https://www.pexels.com/photo/tranquil-coastal-landscape-with-mountains-37833035/' },
  },
  'pj-clifftop-overlook': {
    src: '/images/pj/pj-clifftop-overlook.jpg',
    credit: { photographer: 'Jules Clark', url: 'https://www.pexels.com/photo/dramatic-rocky-cliffs-of-todos-santos-coastline-35555219/' },
  },
  'hp-common-gryffindor': {
    src: '/images/hp/hp-common-gryffindor.jpg',
    credit: { photographer: 'Gönüldenbirkare', url: 'https://www.pexels.com/photo/cozy-vintage-living-room-with-red-velvet-sofa-39039671/' },
  },
  'hp-common-slytherin': {
    src: '/images/hp/hp-common-slytherin.jpg',
    credit: { photographer: 'Oleksandra Zelena', url: 'https://www.pexels.com/photo/columns-in-ancient-temple-16054026/' },
  },
  'hp-common-ravenclaw': {
    src: '/images/hp/hp-common-ravenclaw.jpg',
    credit: { photographer: 'Sami TÜRK', url: 'https://www.pexels.com/photo/marble-pillars-inside-a-building-14902616/' },
  },
  'hp-common-hufflepuff': {
    src: '/images/hp/hp-common-hufflepuff.jpg',
    credit: { photographer: 'Михаил Крамор (Mikhail Kramor)', url: 'https://www.pexels.com/photo/a-room-with-a-wooden-floor-and-windows-27409033/' },
  },
  'hp-great-hall': {
    src: '/images/hp/hp-great-hall.jpg',
    credit: { photographer: 'Sheku Mans', url: 'https://www.pexels.com/photo/elegant-banquet-in-a-hotel-6822831/' },
  },
  'hp-library': {
    src: '/images/hp/hp-library.jpg',
    credit: { photographer: 'Oswald', url: 'https://www.pexels.com/photo/cozy-library-corner-with-wooden-bookshelves-38796481/' },
  },
  'hp-astronomy-tower': {
    src: '/images/hp/hp-astronomy-tower.jpg',
    credit: { photographer: 'Allyson Santos de Souza', url: 'https://www.pexels.com/photo/concrete-castle-under-blue-sky-8475141/' },
  },
  'hp-room-of-requirement': {
    src: '/images/hp/hp-room-of-requirement.jpg',
    credit: { photographer: 'Helin Gezer', url: 'https://www.pexels.com/photo/books-in-a-library-25049380/' },
  },
  'hp-greenhouse': {
    src: '/images/hp/hp-greenhouse.jpg',
    credit: { photographer: 'Milada Vigerova', url: 'https://www.pexels.com/photo/green-plants-inside-the-greenhouse-5984652/' },
  },
  'hp-black-lake': {
    src: '/images/hp/hp-black-lake.jpg',
    credit: { photographer: 'Lewis Ashton', url: 'https://www.pexels.com/photo/old-stone-castle-on-hill-reflection-in-water-10754932/' },
  },
};
