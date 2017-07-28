<template>
  <div class="page container">
    <h1 class="page--title">{{ pageTitle }}</h1>
    <div class="page--body" v-html="pageBody"></div>
  </div>
</template>

<script>
export default {
  name: 'basic',
  data () {
    return {
      pageTitle: null,
      pageBody: null,
      getData: []
    }
  },
  created () {
    this.$http.get('http://bosh.dev/jsonapi/node/page?_format=api_json&filter[title][value]=' + this.$route.params.id.replace('-', ' ') + '')
      .then(response => {
        // point to the vue instance for later
        let self = this
        // assign the data
        this.getData = response.body.data
        // get the project title and body
        for (let page of response.body.data) {
          if (typeof page.attributes !== 'undefined') {
            if (page.attributes.title) {
              self.pageTitle = page.attributes.title
            }
            if (page.attributes.body) {
              self.pageBody = page.attributes.body.value
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
  color: #42b983;
  font-weight: normal;
  text-align: center;
}

.page--body {
  text-align: center;
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
