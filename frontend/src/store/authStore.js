import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // Estado
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      // Función de login
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          isAdmin: userData.idRol === 1, // 1 = admin
        });
      },

      // Función de logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      // Verificar si el usuario es admin
      checkIsAdmin: () => {
        const state = useAuthStore.getState();
        return state.user?.idRol === 1;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
