export type IMAGE_DTO = {
   id: number;
   uri: string;
   createdAt: string;
   updatedAt: string;
   deletedAt: string;
}

export type COLOR_DTO = 'RED' | 'BLUE' | 'GREEN' | 'PURPLE' | 'YELLOW';

export type USER_DTO = {
   id: number,
   loginType: string,
   email: string,
   nickname: string | null,
   imageUri: string | null,
   kakaoImageUri: string | null,
   RED: string | null,
   BLUE: string | null,
   GREEN: string | null,
   PURPLE: string | null,
   YELLOW: string | null,
   createdAt: string,
   updatedAt: string,
   deletedAt: string | null
}

export type PLACE_DTO = {
   address_name: string;
   category_group_code: string;
   category_group_name: string;
   category_name: string;
   distance: string;
   id: string;
   phone: string;
   place_name: string;
   place_url: string;
   road_address_name: string;
   x: string;
   y: string;
}