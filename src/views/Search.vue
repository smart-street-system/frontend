<template>
  <div class="hello">
    <h3>Street Lamps List</h3>
    <div class="container">
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
          <input v-model="search" placeholder="search by street / area / pincode" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <select class="form-select" aria-label="Filter based on Status" aria-placeholder="Select" v-model="select">
          <option value="1">Working Lamps</option>
          <option value="2">Defected Lamps</option>
          <option value="3">Both</option>
        </select>
      </div>
      <button type="button" class="btn btn-success mb-3 mt-3" @click="searchHandler">Filter Results</button>
    </div>
    <ul>
      <li v-for="lamp in LampsList" :key="lamp._id" style="width: 30%">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{lamp.lampName}}</h5>
            <strong><p class="card-text">Status: {{lamp.isActive ? 'Working': 'Defected'}}</p></strong>
            <p class="card-text">Latitute: {{lamp.lattitude}}, Logitude: {{lamp.longitude}}</p>
            <p><strong>Address of Lamp: </strong> {{lamp.address}}</p>
            <a :href="`/lamp/${lamp._id}`" class="btn btn-info">More Details</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    msg: String
  },
  data() {
    return {
      LampsList: [],
      oriLampsList: [],
      select: '3',
      search: this.$route.query.search,
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
        .then(result => {this.LampsList = result; this.oriLampsList = result})
        .catch(error => console.log('error', error));
    },
    searchHandler() {
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
      let resu = [];
      for (let i = 0; i < list.length; i += 1) {
        if (this.select == '1') {
          if (list[i].isActive) {
            resu.push(list[i]);
          }
        } else if (this.select == '2') {
          if (!list[i].isActive) {
            resu.push(list[i]);
          }
        } else {
          resu.push(list[i]);
        }
      }
      this.LampsList = resu;
    }
  },
  mounted() {
    this.fetchList();
  },
  // computed: {
  //   filter() {
  //     return this.LampsList.filter(lamp => lamp.lampName.includes(this.search));
  //   }
  // }
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
  margin: 0 10px;
}
.w-100 {
  width: 100%;
}
</style>
