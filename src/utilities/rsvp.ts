export interface RsvpEntry {
  maxGuests: number;
  categories?: Array<"fam" | "fren">;
}
interface RsvpList {
  [codeBird: string]: RsvpEntry;
}

export const rsvpList: RsvpList = {
  bluebird: { maxGuests: 2, categories: ["fam"] },
  cardinal: { maxGuests: 2, categories: ["fam"] },
  robin: { maxGuests: 1, categories: ["fam", "fren"] },
  crow: { maxGuests: 1, categories: ["fam", "fren"] },
  kiwi: { maxGuests: 2, categories: ["fam", "fren"] },
  cockatoo: { maxGuests: 2, categories: ["fam", "fren"] },
  bluejay: { maxGuests: 2, categories: ["fren"] },
  sparrow: { maxGuests: 2, categories: ["fren"] },
  blackbird: { maxGuests: 2, categories: ["fren"] },
  starling: { maxGuests: 2, categories: ["fren"] },
  woodpecker: { maxGuests: 2, categories: ["fren"] },
  magpie: { maxGuests: 2, categories: ["fren"] },
  mallard: { maxGuests: 1, categories: ["fren"] },
  chickadee: { maxGuests: 1, categories: ["fren"] },
  goose: { maxGuests: 1, categories: ["fren"] },
  wren: { maxGuests: 2, categories: ["fam"] },
  dove: { maxGuests: 2, categories: ["fam"] },
  owl: { maxGuests: 2, categories: ["fam"] },
  parrot: { maxGuests: 2, categories: ["fam"] },
  ostrich: { maxGuests: 4, categories: ["fam"] },
  penguin: { maxGuests: 2, categories: ["fam"] },
  heron: { maxGuests: 2, categories: ["fam"] },
  lark: { maxGuests: 2, categories: ["fam"] },
  finch: { maxGuests: 1, categories: ["fam"] },
  quail: { maxGuests: 2, categories: ["fam"] },
  junco: { maxGuests: 2, categories: ["fam"] },
  hawk: { maxGuests: 1, categories: ["fren"] },
  //
  stork: { maxGuests: 2, categories: ["fam"] },
  grackle: { maxGuests: 2, categories: ["fren"] },
  emu: { maxGuests: 1, categories: ["fren"] },
  goldfinch: { maxGuests: 1, categories: ["fren"] },
  mockingbird: { maxGuests: 1, categories: ["fren"] },
  warbler: { maxGuests: 1, categories: ["fren"] },
};

export const birdFacts: string[] = [
  "Ravens are great at mimicking human speech and sounds",
  "Ostriches have the largest eyes of any land animal",
  "Most hummingbirds weigh less than a nickel",
  "In Ancient Greece, pigeons delivered the results of the Olympic Games.",
];
