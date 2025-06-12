export type StringCrypter = {
  encrypt: (value: string) => string;
  compare: (value: string, hash: string) => boolean;
  decrypt?: (value: string) => string;
};

export type ObjectCrypter = {
  encrypt: (value: object) => string;
  compare: (value: object, hash: string) => boolean;
  decrypt?: <T>(value: string) => T;
};
