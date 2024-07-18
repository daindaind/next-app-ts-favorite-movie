import { COLOR_DTO, IMAGE_DTO } from "./dto";

export type MovieType = {
   id: number;
   title: string;
   slug: string;
   image: string;
   summary: string;
   instructions: string;
   creator: string;
   creator_email: string;
}

export type PostType = {
   id: number;
   latitude: number;
   longitude: number;
   color: COLOR_DTO;
   address: string;
   title: string;
   description: string;
   date: string;
   score: number;
   createdAt: string;
   updatedAt: string;
   deletedAt: string;
   images: IMAGE_DTO[];
   isFavorite: boolean;
}