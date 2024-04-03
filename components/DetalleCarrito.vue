<template>
  <v-dialog v-model="confirmDialog" max-width="300">
    <v-card>
      <v-card-title class="headline">¿Estás seguro de eliminar este producto?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="eliminarConfirmado">Eliminar</v-btn>
        <v-btn color="primary" text @click="cancelarEliminar">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <v-dialog v-model="mostrar" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        LISTADO DE PRODUCTOS
      </v-card-title>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">PRODUCTO</th>
            <th class="text-left">PRECIO</th>
            <th class="text-left">CANTIDAD</th> <!-- Agregado para la columna de cantidad -->
            <th class="text-left">ACCION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.title">
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.cantidad }}</td> <!-- Muestra la cantidad de cada producto -->
            <td>
              <v-icon @click="agregarProducto(item)" icon="mdi-plus" size="x-large"></v-icon> <!-- Icono para agregar un producto -->
              <v-icon @click="quitarProducto(item)" icon="mdi-minus" size="x-large"></v-icon> <!-- Icono para quitar un producto -->
              <v-icon @click="eliminarProducto(item)" icon="mdi-delete" size="x-large"></v-icon>
            </td>
          </tr>
          <tr>
            <td>TOTAL : {{ total }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cerrar()">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog', 'productos'],
  data() {
    return {
      show: false
    };
  },
  computed: {
    mostrar() {
      return this.dialog;
    },
    total() {
      const inicial = 0;
      const pago = this.productos.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price * currentValue.cantidad, // Multiplica el precio por la cantidad
        inicial
      );
      return pago;
    }
  },
  methods: {
    eliminarProducto(producto) {
      console.log('eliminar');
      this.$emit('eliminar', producto);
    },
    cerrar() {
      this.$emit('cerrar');
    },
    agregarProducto(producto) {
      producto.cantidad++; // Incrementa la cantidad del producto
    },
    quitarProducto(producto) {
      if (producto.cantidad > 1) { 
        producto.cantidad--; 
      }
    }
  },
  mounted() {
    for (let i = 0; i < this.productos.length; i++) {
      if (!this.productos[i].cantidad) { 
        this.productos[i].cantidad = 1; 
      }
    }
  }
};
</script>


<style>
/* Estilos CSS */
</style>
