import { type } from '../.nuxt/types/imports';

<template>
    <div class="margen">
        <v-badge
        @click="visualizar()"
        color="error"
        :content="productos.length">
            <v-icon icon="mdi-cart" size="x-large"></v-icon>
        </v-badge>

        <DetalleCarrito
         :dialog="mostrar"
         :productos="productos"
         @cerrar="cerrar"
        ></DetalleCarrito>
    </div>
</template>

<script>
export default {
    props :{
        productos : Array,
       
    },
    data() {
        return {
            mostrar : false
        }
    },

    methods: {
        compra(paq) {
      console.log('Producto comprado:', paq);
      this.compras.push(paq);
    },
    visualizar() {
      this.mostrar = true;
    },
    cerrar() {
      this.mostrar = false;
    },
    eliminarProducto(producto) {
      console.log('Eliminando producto:', producto);
      const index = this.compras.findIndex(p => p.title === producto.title);
      if (index !== -1) {
        this.compras.splice(index, 1);
      }
    }
    },

   
}
</script>

<style scoped>
 .margen{
    margin-right: 30px;
 }
</style>