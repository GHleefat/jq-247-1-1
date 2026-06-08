## 1. 架构设计

```mermaid
flowchart TD
    A["前端 React 应用"] --> B["Zustand 状态管理"]
    B --> C["猫咪数据 Store"]
    A --> D["看板双栏布局"]
    D --> E["待诱捕区"]
    D --> F["已绝育区"]
    A --> G["猫咪卡片组件"]
    A --> H["拖拽系统 (原生 HTML5 Drag & Drop)"]
    A --> I["位置地图组件"]
    A --> J["编辑弹窗组件"]
    C --> K["Mock 初始数据"]
```

## 2. 技术说明

- 前端：React@18 + TypeScript + Vite
- 样式：Tailwind CSS 3
- 状态管理：Zustand
- 拖拽：原生 HTML5 Drag & Drop API
- 地图：使用 SVG 绘制简化示意地图，无需外部地图服务
- 图标库：lucide-react
- 后端：无（纯前端应用，数据存储在 localStorage）
- 数据持久化：localStorage

## 3. 路由定义

| 路由 | 用途 |
|-------|---------|
| / | 看板主页（唯一页面） |

## 4. 数据模型

### 4.1 数据模型定义

```mermaid
erDiagram
    CAT {
        string id "猫咪唯一标识"
        string name "猫咪名称/编号"
        string photoUrl "猫咪照片URL"
        string furColor "毛色"
        string gender "性别 (male/female/unknown)"
        string status "状态 (to_trap/neutered)"
        string neuterDate "绝育日期 (YYYY-MM-DD)"
        float locationLat "发现位置纬度"
        float locationLng "发现位置经度"
        string locationName "发现位置描述"
        string note "备注"
        string createdAt "创建时间"
    }
```

### 4.2 TypeScript 类型定义

```typescript
type CatGender = 'male' | 'female' | 'unknown';
type CatStatus = 'to_trap' | 'neutered';

interface CatLocation {
  lat: number;
  lng: number;
  name: string;
}

interface Cat {
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
```

### 4.3 初始 Mock 数据

预置 8 只猫咪数据，包含待诱捕和已绝育两种状态，涵盖不同毛色和性别，位置分布在社区不同区域。
