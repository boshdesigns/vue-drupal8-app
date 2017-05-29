<template>
  <div class="portfolio">
    <h1>{{ pageTitle }}</h1>
    <ul class="portfolio--project__list row small-up-1 medium-up-2 large-up-4">
      <li class="portfolio--project-link column column-block" v-for="page in getData" style="margin-bottom:20px;">
        <router-link :to="{ name: 'Project', params: { id: page.attributes.field_slug }}" class="portfolio--project-link">
          <div v-for="include in getIncluded" v-if="include.id === page.relationships.field_image.data[0].id" class="portfolio--project-image">
            <img v-bind:src="'http://bosh.dev' + include.attributes.url" />
          </div>
        <section class="portfolio--project-title">
          {{page.attributes.title}}
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
      pageTitle: 'Portfolio',
      getData: [],
      getIncluded: []
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&include=field_image&filter[projectTag][condition][path]=field_project_tags.name&filter[projectTag][condition][value]=' + this.$route.params.id.replace('-', ' '))
        .then(response => {
          this.getData = response.body.data
          this.getIncluded = response.body.included
        }, response => {
          console.log('fail')
        })
    } else {
      this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&include=field_image')
        .then(response => {
          this.getData = response.body.data
          this.getIncluded = response.body.included
        }, response => {
          console.log('fail')
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
