<template>
  <div class="hello p-3" style="border: 1px solid black;">
    <div class="card-body">
      <h5 class="card-title">{{lamp.lampName}}</h5>
      <strong><p class="card-text">Status: {{lamp.isActive ? 'Working': 'Defected'}}</p></strong>
      <p class="card-text">Latitute: {{lamp.lattitude}}, Logitude: {{lamp.longitude}}</p>
      <p><strong>Address of Lamp: </strong> #305, 6th main cores of intel, computer</p>
    </div>
    <h2 class="mt-4">Google Map placeholder</h2>
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
      LampsList: [],
      lamp: null,
    };
  },
  methods: {
    findByID() {
      this.LampsList.forEach((lamp) => {
        if (lamp._id == this.$route.params.id) {
          this.lamp = lamp;
        }
      })
    },
    fetchList() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://smart-street-lamp.herokuapp.com/api/lamps", requestOptions)
        .then(response => response.json())
        .then(result => {this.LampsList = result; this.findByID();})
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
