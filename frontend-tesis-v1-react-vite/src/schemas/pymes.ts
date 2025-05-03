export interface Pyme {
  id: number;
  name: string;
  type: string;
  category: string;
  location: string;
  services?: string[];
  fundation: number;
  employee: number;
  phone: string;
  email: string;
  socialNetwork: {
    facebook: string;
    instagram: string;
  };
  qualification: number;
  description?: string;
  needs?: string[];
  image?: string;
  imageUrl?: string;

}
export type PymesArray = Pyme[];
