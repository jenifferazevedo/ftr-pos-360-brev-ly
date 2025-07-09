export interface Link {
  id: string;
  link: string;
  shortLink: string;
  accessQuantity: number;
  createdAt: string;
}

export type LinkSummary = Pick<Link, 'link' | 'shortLink'>;