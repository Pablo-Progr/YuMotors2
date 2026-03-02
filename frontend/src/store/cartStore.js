import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Agregar producto al carrito
      addItem: (producto, tipoProducto, cantidad) => {
        if (cantidad <= 0) return;

        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.idProducto === producto.idProducto && item.tipoProducto === tipoProducto
        );

        if (existingIndex >= 0) {
          // Si ya existe, sumar la cantidad
          const updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            cantidad: updatedItems[existingIndex].cantidad + cantidad,
          };
          set({ items: updatedItems });
        } else {
          // Si no existe, agregar nuevo
          const idProducto =
            tipoProducto === 'repuesto' ? producto.idRepuesto : producto.idAccesorio;

          set({
            items: [
              ...items,
              {
                idProducto,
                tipoProducto,
                nombre: producto.nombre,
                marca: producto.marca,
                precio: Number(producto.precio),
                imagen: producto.imagen,
                cantidad,
              },
            ],
          });
        }
      },

      // Actualizar cantidad de un item
      updateQuantity: (idProducto, tipoProducto, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        const items = get().items.map((item) =>
          item.idProducto === idProducto && item.tipoProducto === tipoProducto
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
        set({ items });
      },

      // Eliminar un item del carrito
      removeItem: (idProducto, tipoProducto) => {
        const items = get().items.filter(
          (item) => !(item.idProducto === idProducto && item.tipoProducto === tipoProducto)
        );
        set({ items });
      },

      // Limpiar carrito
      clearCart: () => set({ items: [] }),

      // Obtener cantidad total de items
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },

      // Obtener precio total
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
