<template>
  <div class="home">
    <p>Street Lamp Details</p>
    <Lamp msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Lamp from '@/components/Lamp.vue'

export default {
  name: 'Home',
  components: {
    Lamp
  }
}
</script>
