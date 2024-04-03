<script>
export default {
  props : ['paquete'],
  data() {
    return {
      
    }
    },
    methods: {
      comprar(){
        const paq = Object()
        paq.title = this.paquete.title
        paq.price = this.paquete.price
        this.$emit('compra',paq)
      }
    },
}
 
</script>
    


<template>

  <v-card
    class="mx-auto"
    width="344"
  >
    <v-img
      height="250px"
      :src="paquete.images[0]"
      cover
    ></v-img>

    <v-card-title>
      {{paquete.title}}
    </v-card-title>

    <v-card-subtitle>
      <v-chip color="primary">
        ${{ paquete.price }}
      </v-chip>
     
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        @click="comprar()"
      >
        Add Cart
        <v-icon
          icon="mdi-cart"
          end
        ></v-icon>
      </v-btn>

     </v-card-actions>

   
  </v-card>


</template>



    
