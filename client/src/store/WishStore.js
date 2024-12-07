import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { unauthorized } from "../utility/utility.js";

const WishStore = create(
    persist(
        (set) => ({
            isWishSubmit: false,
            WishSaveRequest: async (productID) => {
                try {
                    set({ isWishSubmit: true });
                    let res = await axios.post(`/api/v1/SaveWishList`, { productID: productID });
                    return res.data['status'] === "success";
                } catch (e) {
                    unauthorized(e.response.status);
                } finally {
                    set({ isWishSubmit: false });
                }
            },

            WishList: null,
            WishCount: 0,
            WishListRequest: async () => {
                try {
                    let res = await axios.get(`/api/v1/WishList`);
                    set({ WishList: res.data['data'] });
                    set({ WishCount: res.data['data'].length });
                } catch (e) {
                    unauthorized(e.response.status);
                }
            },

            RemoveWishListRequest: async (productID) => {
                try {
                    set((state) => ({
                        WishList: state.WishList?.filter((item) => item.id !== productID),
                        WishCount: state.WishCount - 1,
                    }));
                    await axios.post(`/api/v1/RemoveWishList`, { productID: productID });
                } catch (e) {
                    unauthorized(e.response.status);
                }
            },
        }),
        {
            name: "wish-store", 
            partialize: (state) => ({
                WishList: state.WishList,
                WishCount: state.WishCount,
            }), 
        }
    )
);

export default WishStore;
