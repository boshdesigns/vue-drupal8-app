<template>
  <div class="portfolio">
    <h1>{{ getIncluded }}</h1>
    <div v-for="data in filterBy">
      {{ data }}
    </div>
    <!-- <div v-for="page in filterBy">
      {{page}}
    </div> -->
    <!-- <ul class="portfolio--project__list row small-up-1 medium-only-2 large-up-4">
      <li class="portfolio--project-link column column-block" v-for="page in getData" style="margin-bottom:20px;">
        <router-link :to="{ name: 'Project', params: { id: page.attributes.field_slug }}" class="portfolio--project-link">
          <div v-for="file in getImages" v-if="file.id === page.relationships.field_image.data[0].id" class="portfolio--project-image">
            <img v-bind:src="'http://bosh.dev' + file.attributes.url" />
          </div>
        <section class="portfolio--project-title">
          {{page.attributes.title}}
        </section>
        </router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  data () {
    return {
      pageTitle: 'Portfolio',
      getData: [],
      getImages: [],
      getIncluded: [],
      param: ''
    }
  },
  created: function () {
    this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&include=field_image,field_project_tags')
      .then(response => {
        this.getData = response.body.data
        this.getIncluded = response.body.included
        // point to the vue instance for later
        let self = this
        // push included data to related arrays
        if (typeof response.data.included !== 'undefined') {
          response.data.included.forEach(function (included) {
            if (included.type === 'file--file') {
              self.getImages.push(included)
            }
          })
        }
        if (this.$route.params.id) {
          this.param = this.toTitleCase(this.$route.params.id.replace('-', ' '))
        }
      }, response => {
        console.log('fail')
      })
  },
  methods: {
    toTitleCase: function (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }
  },
  computed: {
    filterBy: function () {
      // let self = this
      console.log(this.getIncluded)
      // if (this.getIncluded.attributes.name === this.param) {
      //   // let id = this.getIncluded.id
      //   console.log(this.getIncluded.id)
      // }
      return this.getData.filter(function (e) {
        e.relationships.field_project_tags.data.forEach(function (more) {
          return more.id
        })
      })
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    unhyphenate: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.replace('-', ' ')
    }
  }
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
</style>
