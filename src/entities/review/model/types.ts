type ReviewAuthor = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Review = {
  id: string;
  date: string;
  user: ReviewAuthor;
  comment: string;
  rating: number;
};
