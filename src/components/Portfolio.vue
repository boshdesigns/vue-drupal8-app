<template>
  <div class="portfolio">
    <h1 v-cloak>{{ pageTitle }}</h1>
    <ul class="portfolio--project__list row small-up-1 medium-only-2 large-up-4">
      <li class="portfolio--project-link column column-block" v-for="data in filteredData" style="margin-bottom:20px;">
        <router-link :to="{ name: 'Project', params: { id: data.attributes.field_slug }}" class="portfolio--project-link">
          <div v-for="file in getImages" v-if="file.id === data.relationships.field_image.data[0].id" class="portfolio--project-image">
            <img v-bind:src="'http://bosh.dev' + file.attributes.url" />
          </div>
        <section class="portfolio--project-title" v-cloak>
          {{data.attributes.title}}
        </section>
        </router-link>
      </li>
    </ul> 
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  data () {
    return {
      defaultTitle: 'Portfolio',
      pageTitle: '',
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
        // If the param id exist
        if (this.$route.params.id) {
          this.param = this.toTitleCase(this.$route.params.id.replace('-', ' '))
          // Update the page title to include the param id
          let newTitle = this.param + ' ' + this.defaultTitle
          this.pageTitle = newTitle
        } else {
          // else return the default page title
          this.pageTitle = this.defaultTitle
        }
      }, response => {
        console.log('the call failed for some reason')
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
    filteredData: function () {
      if (this.param) {
        let self = this
        // Set up the filtered data array
        let filterData = []
        // loop through the data and grab the correct data based on the param
        this.getIncluded.forEach(function (included) {
          if (included.type === 'taxonomy_term--project_tags' && included.attributes.name === self.param) {
            let taxID = included.id
            self.getData.filter(function (data) {
              data.relationships.field_project_tags.data.forEach(function (info) {
                if (info.id === taxID) {
                  filterData.push(data)
                }
              })
            })
          }
        })
        // return the filtered data array
        return filterData
      } else {
        return this.getData
      }
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
[v-cloak] {
  display: none;
}
h1, h2 {
  color: #42b983;
  font-weight: normal;
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
