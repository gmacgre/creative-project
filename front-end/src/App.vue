<template>
  <div id="app">
    <div id="nav">
      <div class="innernav">
        <h1>COUGARCHAT</h1>
        <div class="navbar">
          <router-link to="/">Home</router-link>
          <router-link to="/dashboard">My Account</router-link>
        </div>
      </div>
    </div>
    <router-view />
    <a href='' target='_blank'><h2>Link to Github Repository</h2></a>
  </div>
</template>

<style>
body {
  padding: 0;
  border: 0;
  margin: 0;
}

.navbar {
  align-self: center;
  width: 150px;
  display: flex;
  justify-content: space-between;
}

h1 {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: cornflowerblue;
  padding: 30px;
  display: flex;
  justify-content: center;
  color: #ffffff;
}

.innernav {
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  align-self: center;
}

#nav a.router-link-exact-active {
  color: #03515c;
}
</style>
