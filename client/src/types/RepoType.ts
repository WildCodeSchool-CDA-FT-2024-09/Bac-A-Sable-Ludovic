export type Repo = {
    name: string;
    url: string;
    id: string;
    langs?: Lang[];
    isFavorite?: boolean;
  };
  
  export type Lang = {
    id: number;
    label: string;
  };
  
  