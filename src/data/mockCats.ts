import type { Cat } from "@/types/cat";

export const MOCK_CATS: Cat[] = [
  {
    id: "cat-001",
    name: "大橘",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20chubby%20orange%20tabby%20cat%20sitting%20on%20a%20brick%20wall%20outdoors%20in%20sunny%20day%2C%20photorealistic&image_size=square_hd",
    furColor: "橘猫",
    gender: "male",
    status: "to_trap",
    location: { x: 22, y: 35, name: "社区东门花坛" },
    note: "性格温顺，爱吃罐头，每天傍晚出现在东门",
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "cat-002",
    name: "小黑",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20sleek%20black%20cat%20with%20yellow%20eyes%20sitting%20on%20a%20garden%20fence%2C%20photorealistic%20natural%20lighting&image_size=square_hd",
    furColor: "黑猫",
    gender: "male",
    status: "to_trap",
    location: { x: 68, y: 28, name: "3号楼车棚" },
    note: "有点怕人，需要用食物引诱",
    createdAt: "2026-06-02T14:30:00Z",
  },
  {
    id: "cat-003",
    name: "花花",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20beautiful%20calico%20cat%20with%20orange%20black%20white%20fur%20curled%20up%20on%20a%20porch%2C%20soft%20afternoon%20light%2C%20photorealistic&image_size=square_hd",
    furColor: "三花",
    gender: "female",
    status: "to_trap",
    location: { x: 45, y: 62, name: "中心花园长椅" },
    note: "疑似怀孕，优先安排绝育",
    createdAt: "2026-06-03T09:15:00Z",
  },
  {
    id: "cat-004",
    name: "奶盖",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20fluffy%20white%20cat%20with%20heterochromia%20eyes%20blue%20and%20yellow%2C%20sitting%20on%20a%20windowsill%2C%20photorealistic&image_size=square_hd",
    furColor: "白猫",
    gender: "female",
    status: "to_trap",
    location: { x: 82, y: 55, name: "7号楼垃圾桶旁" },
    createdAt: "2026-06-04T16:45:00Z",
  },
  {
    id: "cat-005",
    name: "狸花队长",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20majestic%20tabby%20cat%20with%20striped%20grey%20brown%20fur%20standing%20proudly%20on%20a%20grass%20lawn%2C%20photorealistic&image_size=square_hd",
    furColor: "狸花",
    gender: "male",
    status: "neutered",
    neuterDate: "2026-05-20",
    location: { x: 35, y: 78, name: "5号楼地下室入口" },
    note: "已剪耳标，放归后状态良好",
    createdAt: "2026-05-15T11:00:00Z",
  },
  {
    id: "cat-006",
    name: "奶牛",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20cute%20black%20and%20white%20cow%20pattern%20cat%20sitting%20in%20a%20cardboard%20box%2C%20playful%20expression%2C%20photorealistic&image_size=square_hd",
    furColor: "奶牛",
    gender: "male",
    status: "neutered",
    neuterDate: "2026-05-28",
    location: { x: 58, y: 42, name: "社区食堂后门" },
    note: "非常亲人，适合领养",
    createdAt: "2026-05-20T13:20:00Z",
  },
  {
    id: "cat-007",
    name: "玳瑁",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20tortoiseshell%20cat%20with%20beautiful%20mixed%20orange%20black%20fur%20relaxing%20on%20a%20warm%20sidewalk%2C%20photorealistic&image_size=square_hd",
    furColor: "玳瑁",
    gender: "female",
    status: "neutered",
    neuterDate: "2026-06-05",
    location: { x: 15, y: 72, name: "物业办公室门口" },
    note: "刚完成绝育，正在恢复期",
    createdAt: "2026-05-25T08:40:00Z",
  },
  {
    id: "cat-008",
    name: "小灰",
    photoUrl:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20gentle%20grey%20russian%20blue%20style%20cat%20with%20silver%20fur%20curled%20up%20sleeping%20on%20a%20soft%20blanket%2C%20photorealistic&image_size=square_hd",
    furColor: "灰色",
    gender: "unknown",
    status: "neutered",
    neuterDate: "2026-04-18",
    location: { x: 75, y: 18, name: "北门快递柜附近" },
    createdAt: "2026-04-10T15:00:00Z",
  },
];
