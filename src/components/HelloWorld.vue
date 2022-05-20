<template>
  <div class="hello">
    <h3>Street Lamps List</h3>
    <ul>
      <li v-for="lamp in LampsList" :key="lamp._id">
        <div class="card w-100">
          <div class="card-body">
            <h5 class="card-title">{{lamp.lampName}}</h5>
            <strong><p class="card-text">Status: {{lamp.isActive ? 'Working': 'Defected'}}</p></strong>
            <p class="card-text">Latitute: {{lamp.lattitude}}, Logitude: {{lamp.longitude}}</p>
            <p><strong>Address of Lamp: </strong> #305, 6th main cores of intel</p>
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
        .then(result => this.LampsList = result)
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
  margin: 0 10px;
}
.w-100 {
  width: 100%;
}
</style>
