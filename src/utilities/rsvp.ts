export interface RsvpEntry {
  maxGuests: number;
  category?: "fam" | "fren";
}
interface RsvpList {
  [codeBird: string]: RsvpEntry;
}

export const rsvpList: RsvpList = {
  bluebird: { maxGuests: 2, category: "fam" },
  cardinal: { maxGuests: 2, category: "fam" },
  robin: { maxGuests: 1, category: "fam" },
  crow: { maxGuests: 1, category: "fam" },
  kiwi: { maxGuests: 2, category: "fam" },
  cockatoo: { maxGuests: 2, category: "fam" },
  bluejay: { maxGuests: 2, category: "fren" },
  sparrow: { maxGuests: 2, category: "fren" },
  blackbird: { maxGuests: 2, category: "fren" },
  starling: { maxGuests: 2, category: "fren" },
  woodpecker: { maxGuests: 2, category: "fren" },
  magpie: { maxGuests: 2, category: "fren" },
  mallard: { maxGuests: 1, category: "fren" },
  chickadee: { maxGuests: 1, category: "fren" },
  goose: { maxGuests: 1, category: "fren" },
  wren: { maxGuests: 2, category: "fam" },
  dove: { maxGuests: 2, category: "fam" },
  owl: { maxGuests: 2, category: "fam" },
  parrot: { maxGuests: 2, category: "fam" },
  ostrich: { maxGuests: 4, category: "fam" },
  penguin: { maxGuests: 2, category: "fam" },
  heron: { maxGuests: 2, category: "fam" },
  lark: { maxGuests: 2, category: "fam" },
  finch: { maxGuests: 1, category: "fam" },
  quail: { maxGuests: 2, category: "fam" },
  junco: { maxGuests: 2, category: "fam" },
  hawk: { maxGuests: 1, category: "fren" },
  //
  stork: { maxGuests: 2, category: "fam" },
  grackle: { maxGuests: 1, category: "fren" },
  emu: { maxGuests: 1, category: "fren" },
  goldfinch: { maxGuests: 1, category: "fren" },
  mockingbird: { maxGuests: 1, category: "fren" },
  warbler: { maxGuests: 1, category: "fren" },
};

export const birdFacts: string[] = [
  "Ravens are great at mimicking human speech and sounds",
  "Ostriches have the largest eyes of any land animal",
  "Most hummingbirds weigh less than a nickel",
  "In Ancient Greece, pigeons delivered the results of the Olympic Games.",
];
