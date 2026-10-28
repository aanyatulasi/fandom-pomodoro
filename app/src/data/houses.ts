import type { HouseId, HouseInfo } from '../types';

export const HOUSES: Record<HouseId, HouseInfo> = {
  gryffindor: {
    id: 'gryffindor', name: 'Gryffindor', founder: 'Godric Gryffindor',
    animal: 'Lion', element: 'Fire',
    description: 'You act before fear has a chance to catch up with you. Courage isn\'t the absence of doubt for you — it\'s doing the thing anyway, loudly, and usually for someone else.',
    traits: ['Brave', 'Daring', 'Chivalrous', 'Determined'],
    palette: { primary: '#740001', secondary: '#ae0001', accent: '#d3a625', glow: '#f0c75e' },
  },
  slytherin: {
    id: 'slytherin', name: 'Slytherin', founder: 'Salazar Slytherin',
    animal: 'Serpent', element: 'Water',
    description: 'You play the long game. Ambition isn\'t a dirty word to you — it\'s just honesty about wanting to be excellent, and you\'re resourceful enough to actually get there.',
    traits: ['Ambitious', 'Resourceful', 'Cunning', 'Self-possessed'],
    palette: { primary: '#1a472a', secondary: '#2a623d', accent: '#aaaaaa', glow: '#c7d6c7' },
  },
  ravenclaw: {
    id: 'ravenclaw', name: 'Ravenclaw', founder: 'Rowena Ravenclaw',
    animal: 'Eagle', element: 'Air',
    description: 'You\'d rather understand something fully than win the argument about it. Ideas genuinely delight you, and you trust your own judgment more than the loudest voice in the room.',
    traits: ['Curious', 'Witty', 'Individual', 'Wise'],
    palette: { primary: '#0e1a40', secondary: '#222f5b', accent: '#946b2d', glow: '#cdb37a' },
  },
  hufflepuff: {
    id: 'hufflepuff', name: 'Hufflepuff', founder: 'Helga Hufflepuff',
    animal: 'Badger', element: 'Earth',
    description: 'You show up, consistently, for the people around you. Loyalty and fairness matter more to you than being noticed, and you outlast people who started out louder.',
    traits: ['Loyal', 'Patient', 'Fair', 'Hard-working'],
    palette: { primary: '#ecb939', secondary: '#f0c75e', accent: '#372e29', glow: '#fff1c2' },
  },
};

export const HOUSE_ORDER: HouseId[] = ['gryffindor','slytherin','ravenclaw','hufflepuff'];
