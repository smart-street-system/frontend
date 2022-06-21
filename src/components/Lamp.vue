<template>
  <div class="hello p-3" style="border: 1px solid black;">
    <div class="card-body">
      <h5 class="card-title">{{lamp.lampName}}</h5>
      <strong><p class="card-text">Status: {{lamp.isActive ? 'Working': 'Defected'}}</p></strong>
      <p class="card-text">Latitute: {{lamp.lattitude}}, Logitude: {{lamp.longitude}}</p>
      <p><strong>Address of Lamp: </strong>{{lamp.address}}</p>
    </div>
    <h2 class="mt-4">Google Map placeholder</h2>
    <div :v-if="!isLoading">
      <GmapMap
        :center='center'
        :zoom='18'
        style='width:100%;  height: 400px;'
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :icon="icon"
          @click="center=m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lamp',
  props: {
    msg: String
  },
  data() {
    return {
      lamp: null,
      isLoading: true,
      center: { lat: 12.508, lng: 73.587 },
      markers: [],
      icon: null,
    };
  },
  methods: {
    fetchList() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://smart-street-lamp.herokuapp.com/api/lamps/" + this.$route.params.id, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.lamp = result;
          this.center.lat = this.lamp.lattitude;
          this.center.lng = this.lamp.longitude;
          const marker = {
            lat: this.lamp.lattitude,
            lng: this.lamp.longitude,
          };
          this.markers.push({ position: marker });
          if (this.lamp.isActive) {
            this.icon = 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png';
          } else {
            this.icon = 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
          }
          this.isLoading = false;
        })
        .catch(error => console.log('error', error));
          }
  },
  mounted() {
    this.fetchList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  
}
li {
  display: inline-block;

}
.w-100 {
  width: 100%;
}
</style>
