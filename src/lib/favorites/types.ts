export type FavoriteLaunch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  patchImage: string | null;
};
