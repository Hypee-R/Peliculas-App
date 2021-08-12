export interface WatchResponse {
  id:      number;
  results: Results;
}

export interface Results {
  AR: Ar;
  AT: Ar;
  AU: Ar;
  BE: Ar;
  BG: Ar;
  BR: Ar;
  CA: Ar;
  CH: Ar;
  CL: Ar;
  CO: Ar;
  CZ: Ar;
  DE: Ar;
  DK: Ar;
  EC: Ar;
  EE: Ar;
  ES: Ar;
  FI: Ar;
  FR: Ar;
  GB: Ar;
  GR: Ar;
  HU: Ar;
  ID: Ar;
  IE: Ar;
  IN: Ar;
  IT: Ar;
  JP: Ar;
  KR: Ar;
  LT: Ar;
  LV: Ar;
  MX: Ar;
  MY: Ar;
  NL: Ar;
  NO: Ar;
  NZ: Ar;
  PE: Ar;
  PH: Ar;
  PL: Ar;
  PT: Ar;
  RO: Ar;
  RU: Ar;
  SE: Ar;
  SG: Ar;
  TH: Ar;
  TR: Ar;
  US: Ar;
  VE: Ar;
  ZA: Ar;
}

export interface Ar {
  link:      string;
  buy?:       Buy[];
  rent?:     Buy[];
  flatrate?: Buy[];
}

export interface Buy {
  display_priority: number;
  logo_path:        string;
  provider_id:      number;
  provider_name:    string;
}

export interface Br {
  link:     string;
  flatrate: Buy[];
}

export interface Tr {
  link: string;
  buy:  Buy[];
}
