export type CatGender = "male" | "female" | "unknown";
export type CatStatus = "to_trap" | "neutered";

export interface CatLocation {
  x: number;
  y: number;
  name: string;
}

export interface Cat {
  id: string;
  name: string;
  photoUrl: string;
  furColor: string;
  gender: CatGender;
  status: CatStatus;
  neuterDate?: string;
  location: CatLocation;
  note?: string;
  createdAt: string;
}

export interface CatFormData {
  name: string;
  photoUrl: string;
  furColor: string;
  gender: CatGender;
  neuterDate?: string;
  note?: string;
  locationName: string;
}

export const FUR_COLOR_OPTIONS = [
  "橘猫",
  "黑猫",
  "白猫",
  "狸花",
  "三花",
  "玳瑁",
  "奶牛",
  "蓝猫",
  "灰色",
  "其他",
] as const;

export const GENDER_LABEL: Record<CatGender, string> = {
  male: "公猫",
  female: "母猫",
  unknown: "未知",
};

export const STATUS_LABEL: Record<CatStatus, string> = {
  to_trap: "待诱捕",
  neutered: "已绝育",
};
