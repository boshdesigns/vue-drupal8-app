<template>
  <div class="home container">
    <h1 class="home--title">{{ homeTitle }}</h1>
    <div class="home--body" v-html="homeBody"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      homeTitle: null,
      homeBody: null,
      getData: []
    }
  },
  created () {
    this.$http.get('http://bosh.dev/jsonapi/node/homepage?_format=api_json&include=field_slideshow')
      .then(response => {
        // point to the vue instance for later
        let self = this
        // assign the data
        this.getData = response.body.data
        // get the project title and body
        for (let home of response.body.data) {
          if (typeof home.attributes !== 'undefined') {
            if (home.attributes.title) {
              self.homeTitle = home.attributes.title
            }
            if (home.attributes.body) {
              self.homeBody = home.attributes.body.value
            }
          }
        }
      }, response => {
        console.log('the call failed for some reason')
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
