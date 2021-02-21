export interface RsvpEntry {
  maxGuests: number;
}
interface RsvpList {
  [codeBird: string]: RsvpEntry;
}

export const rsvpList: RsvpList = {
  dove: { maxGuests: 1 },
  cardinal: { maxGuests: 2 },
  robin: { maxGuests: 2 },
  crow: { maxGuests: 2 },
  bluejay: { maxGuests: 2 },
  sparrow: { maxGuests: 2 },
  blackbird: { maxGuests: 2 },
  starling: { maxGuests: 2 },
  goldfinch: { maxGuests: 2 },
  goose: { maxGuests: 2 },
  finch: { maxGuests: 2 },
  woodpecker: { maxGuests: 2 },
  mallard: { maxGuests: 2 },
  chickadee: { maxGuests: 2 },
  heron: { maxGuests: 2 },
  mockingbird: { maxGuests: 2 },
  wren: { maxGuests: 2 },
  hawk: { maxGuests: 2 },
  grackle: { maxGuests: 2 },
  magpie: { maxGuests: 2 },
  junco: { maxGuests: 2 },
  owl: { maxGuests: 2 },
  parrot: { maxGuests: 2 },
  cockatoo: { maxGuests: 2 },
  bluebird: { maxGuests: 2 },
  ostrich: { maxGuests: 2 },
  emu: { maxGuests: 2 },
  kiwi: { maxGuests: 2 },
  penguin: { maxGuests: 2 },
};

export const birdFacts: string[] = [
  "Ravens are great at mimicking human speech and sounds",
  "Ostriches have the largest eyes of any land animal",
  "Most hummingbirds weigh less than a nickel",
  "In Ancient Greece, pigeons delivered the results of the Olympic Games.",
];
