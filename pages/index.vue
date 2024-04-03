<template>
  <v-layout>
    <v-app-bar color="purple-darken-1" image="https://i.pinimg.com/736x/bd/b4/8e/bdb48e31e8cab8a45b05be1d4203ff9a.jpg" height="200">
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <h1>MISCELANEA LOS RECUERDOS</h1>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-badge overlap color="red" :content="compras.length">
        <v-btn class="iconcar" @click="visualizar">
          <v-icon icon="mdi-cart" size="x-large"></v-icon>
        </v-btn>
      </v-badge>

      <template v-if="mostrar"> <!-- Utiliza la propiedad mostrar para condicionar la renderización de DetalleCarrito -->
      <DetalleCarrito :dialog="mostrar" :productos="compras" @cerrar="cerrar" @eliminar="confirmarEliminar"></DetalleCarrito>
    </template>


  

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="data in productos" :key="data.title">
            <Card :paquete="data" @compra="compra"></Card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    

  </v-layout>
</template>


<script>
import axios from 'axios';
import DetalleCarrito from '~/components/DetalleCarrito.vue';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      productos: [],
      compras: [],
      mostrar: false,
      mostrarAlerta: true,
    }
  },

  components: {
    DetalleCarrito
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
    },
    confirmarEliminar(producto) {
      this.cerrar()
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres eliminar este producto del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarProducto(producto);
          Swal.fire(
            'Eliminado',
            'El producto ha sido eliminado del carrito.',
            'success'
          );
        }
      });
      
    }
  },
  async mounted() {
    let vm = this;
    await axios.get('https://dummyjson.com/products').then(response => {
      vm.productos = response.data.products;
    });
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
.v-badge {
  position: absolute;
  top: 70px;
  right: 56px;
}
.iconcar{
  position: absolute;
  top: 10px;
  right: 0px;
}
.alerta-confirmacion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000; /* Asegura que la alerta esté por encima del carrito */
}

.confirmacion-eliminar {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>
