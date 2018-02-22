<template>
  <div class="home container">
    <h1 class="home--title" v-cloak>{{ homeTitle }}</h1>
    <div class="home--body" v-html="homeBody"></div>
    <div class="home--homepage-slideshow">
      <ul class="home--homepage-slideshow__list">
        <li v-for="slide in getSlides">
          <img class="home--homepage-slideshow--image"/>
          <section class="home--homepage-slideshow--title">
            <h3></h3>
          </section>
          <section class="home--homepage-slideshow--body"></section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      homeTitle: null,
      homeBody: null,
      getData: [],
      getSlides: [{
        data: [],
        img: []
      }]
    }
  },
  created () {
    this.$http.get('http://bosh.local/jsonapi/node/homepage?_format=api_json&include=field_slideshow,field_image')
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
        // // Now lets deal with the included slideshow
        // this.getIncluded = response.body.included
        // // push included data to related arrays
        // if (typeof response.data.included !== 'undefined') {
        //   for (let included of response.data.included) {
        //     if (included.type === 'paragraph--slideshow') {
        //       self.getSlides.push(included)
        //     }
        //   }
        // }
      }, response => {
        console.log('the call failed for some reason')
      })
    this.$http.get('http://bosh.local/jsonapi/paragraph/slideshow?_format=api_json&include=field_image')
      .then(response => {
        // this.getSlides = response.body
        // push included data to related arrays
        let test = []
        if (typeof response.body !== 'undefined') {
          if (typeof response.body.data !== 'undefined') {
            // First loopof the data
            for (let slideinfo of response.body.data) {
              test.push(slideinfo)
            }
          }
          // if (typeof response.body.included !== 'undefined') {
          //   // Now loop over the images
          //   for (let slideimg of response.body.included) {
          //     if (typeof slideimg.attributes.url !== 'undefined') {
          //       self.getSlides.img = slideimg.attributes.url
          //     }
          //   }
          // }
        }
        this.getSlides.data = test
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
