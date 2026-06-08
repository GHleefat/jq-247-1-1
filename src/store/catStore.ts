import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cat, CatStatus, CatFormData } from "@/types/cat";
import { MOCK_CATS } from "@/data/mockCats";

interface CatStore {
  cats: Cat[];
  editingCat: Cat | null;
  setEditingCat: (cat: Cat | null) => void;
  addCat: (data: CatFormData) => void;
  updateCat: (id: string, data: Partial<CatFormData>) => void;
  updateCatStatus: (id: string, status: CatStatus) => void;
  deleteCat: (id: string) => void;
  getCatsByStatus: (status: CatStatus) => Cat[];
  resetToMock: () => void;
}

const generateId = () =>
  `cat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useCatStore = create<CatStore>()(
  persist(
    (set, get) => ({
      cats: MOCK_CATS,
      editingCat: null,

      setEditingCat: (cat) => set({ editingCat: cat }),

      addCat: (data) => {
        const newCat: Cat = {
          id: generateId(),
          name: data.name,
          photoUrl: data.photoUrl,
          furColor: data.furColor,
          gender: data.gender,
          status: "to_trap",
          neuterDate: undefined,
          location: {
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            name: data.locationName,
          },
          note: data.note,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ cats: [newCat, ...state.cats] }));
      },

      updateCat: (id, data) => {
        set((state) => ({
          cats: state.cats.map((cat) =>
            cat.id === id
              ? {
                  ...cat,
                  ...(data.name && { name: data.name }),
                  ...(data.photoUrl && { photoUrl: data.photoUrl }),
                  ...(data.furColor && { furColor: data.furColor }),
                  ...(data.gender && { gender: data.gender }),
                  ...(data.neuterDate !== undefined && {
                    neuterDate: data.neuterDate || undefined,
                  }),
                  ...(data.note !== undefined && { note: data.note }),
                  ...(data.locationName && {
                    location: { ...cat.location, name: data.locationName },
                  }),
                }
              : cat,
          ),
        }));
      },

      updateCatStatus: (id, status) => {
        set((state) => ({
          cats: state.cats.map((cat) =>
            cat.id === id
              ? {
                  ...cat,
                  status,
                  neuterDate:
                    status === "neutered"
                      ? cat.neuterDate || new Date().toISOString().slice(0, 10)
                      : undefined,
                }
              : cat,
          ),
        }));
      },

      deleteCat: (id) => {
        set((state) => ({ cats: state.cats.filter((cat) => cat.id !== id) }));
      },

      getCatsByStatus: (status) => {
        return get().cats.filter((cat) => cat.status === status);
      },

      resetToMock: () => set({ cats: MOCK_CATS }),
    }),
    {
      name: "tnr-cat-store",
    },
  ),
);
