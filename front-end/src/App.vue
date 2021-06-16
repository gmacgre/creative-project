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
    <div class='footer'>
    <a class='github' href='https://github.com/gmacgre/creative-project' target='_blank'><h2 class='githubinner'>Link to Github Repository</h2></a>
    </div>
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

.footer {
  padding: 25px;
  margin-top: 10px;
  background-color: cornflowerblue;
  display: flex;
  justify-content: center;
}

.github {
  color: white;
  text-decoration: none;
}

.githubinner {
  background-color: #2c3e50;
  border-radius: 25px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
