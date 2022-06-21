<template>
  <div id="app" class="header68">
    <div id="nav">
      <router-link to="/"><span >Home</span></router-link> <span>|</span>
      <router-link to="/about"><span>About</span></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header68 #nav {
  padding: 30px;
  background-color: rgb(1, 196, 255);
}
.header68 #nav a{
  color: #000000;
}

.header68 #nav span{
  color : white;
  font-size: 30px;
  text-decoration: underline;
  text-decoration-color: rgb(255, 255, 255);
}

.header68 #nav :hover{
  color: rgb(17, 0, 255);
  text-decoration: underline;
  text-decoration-color: rgb(17, 0, 255);
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#app #nav{
  color: #000000;
}
.card w-100{
  background-color: rgb(201, 245, 158);
}


#nav a.router-link-exact-active {
  color: #f3f3fa;
  font-size: 30px;
}
</style>
