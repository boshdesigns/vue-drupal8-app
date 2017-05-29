<template>
  <nav>
    <div class="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
      <button class="menu-icon" type="button" data-toggle="example-menu"></button>
      <div class="title-bar-title">Menu</div>
    </div>

    <div class="top-bar" id="example-menu">
      <div class="top-bar-left">
        <section class="site-name"><router-link :to="'/'">Bish Bash Bosh Designs</router-link></section>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li>
            <router-link :to="'/about'">About</router-link>
          </li>
          <li>
            <router-link :to="'/portfolio'">Portfolio</router-link>
          </li>
          <li>
            <router-link :to="'/contact'">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color: #42b983;
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.no-js .top-bar {
  display: none;
}

@media screen and (min-width: 40em) {
  .no-js .top-bar {
    display: block;
  }

  .no-js .title-bar {
    display: none;
  }
}
</style>
