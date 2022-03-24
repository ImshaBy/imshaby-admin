export type City = {
  id: string;
  key: string;
  name: null;
  localizedInfo: Record<string, Localization>
};

type Localization = {
  name: string;
};
