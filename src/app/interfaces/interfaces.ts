export interface Respuesta {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  [x: string]: unknown;
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
  enFavoritos: boolean;
}

export interface Source {
  id: string;
  name: string;
}