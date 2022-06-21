<template>
  <div class="hello">
    <h3 style="font-size : 20px">Street Lamps List</h3>
    <div class="container">
      <div style="display: flex; justify-content: space-between;align-items: center">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
          <input v-model="search" placeholder="search by street / area / pincode" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
      </div>
      <button  type="button" id="searchButton" class="btn btn-success mb-3 mt-3" @click="searchHandler">Search / Filter</button>
      <button type="button" class="btn btn-success mb-3 mt-3" @click="showMap">Show map for Area</button>
    </div>
    <div v-if="map">
      <GmapMap
        :center='center'
        :zoom='16'
        style='width:100%;  height: 400px;'
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :icon="m.icon"
          @click="center=m.position"
        />
      </GmapMap>
    </div>
    <ul>
      <li v-for="lamp in LampsList" :key="lamp._id">
        <div class="card w-100">
          <div class="card-body">
            <h5 class="card-title">{{lamp.lampName}}</h5>
            <strong><p class="card-text">Status: {{lamp.isActive ? 'Working': 'Defected'}}</p></strong>
            <p class="card-text">Lattitude: {{lamp.lattitude}}, Longitude: {{lamp.longitude}}</p>
            <p id="prashivkou"><strong>Address of Lamp: </strong><span>{{lamp.address}}</span></p>
            <a :href="`/lamp/${lamp._id}`" class="btn btn-info">More Details</a>
          </div>
        </div>
      </li> 
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      LampsList: [],
      oriLampsList: [],
      search: '',
      map: false,
      center: { lat: 12.508, lng: 73.587 },
      markers: [],
    };
  },
  methods: {
    fetchList() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://smart-street-lamp.herokuapp.com/api/lamps", requestOptions)
        .then(response => response.json())
        .then(result => {this.LampsList = result; this.oriLampsList = result;})
        .catch(error => console.log('error', error));
    },
    searchHandler() {
      this.$router.push('/search?search=' + this.search);
    },
    showMap() {
      // this.map = false;
      let list = [];
      for (let i = 0; i < this.oriLampsList.length; i += 1) {
        const add = this.oriLampsList[i].address;
        if (add)
        if (this.oriLampsList[i].address) {
          if (this.oriLampsList[i].address.toString().toLowerCase().includes(this.search.toLowerCase())) {
            list.push(this.oriLampsList[i]);
          }
        }
      }
      this.LampsList = list;

      let lats = 0, longs = 0;
      for (let i = 0; i < this.LampsList.length; i += 1) {
        lats += this.LampsList[i].lattitude;
        longs += this.LampsList[i].longitude;

        const marker = {
          lat: this.LampsList[i].lattitude,
          lng: this.LampsList[i].longitude,
        };
        let icon = 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png';
        if (this.LampsList[i].isActive) {
          icon = 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png';
        } else {
          icon = 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
        }
        this.markers.push({ position: marker, icon });
      }

      this.center.lat = lats / this.LampsList.length;
      this.center.lng = longs / this.LampsList.length;
      
      console.log(this.markers, this.center);

      this.map = true;
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
  margin: 15px 10px 15px 10px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.w-100 {
  width: 100%;
}
#prashivkou{
  
  padding: 20px;
  background: #eaeaea;
  max-width: 400px;
  margin: 50px auto;
}

/* .demo-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
} */

</style>
