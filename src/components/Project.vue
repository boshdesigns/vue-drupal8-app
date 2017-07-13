<template>
  <div class="project">
    <h1>{{ getData.data[0].attributes.title }}</h1>
    <div>
      {{ getData.data[0].attributes.body.value }}
    </div>
    <div class="project--images" v-for="file in getImages">
      <img v-bind:src="'http://bosh.dev' + file.attributes.url" />
    </div>
    <h3>Project Tags</h3>
    <ul class="project--tags__list">
      <li class="project--tags" v-for="taxonomy in getTaxonomy">
        <h4><router-link :to="'/portfolio/' + taxonomy.attributes.name | lowercase | hyphenate ">{{ taxonomy.attributes.name }}</router-link></h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'project',
  data () {
    return {
      getData: null,
      getTaxonomy: [],
      getImages: []
    }
  },
  created () {
    this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&filter[field_slug][value]=' + this.$route.params.id + '&include=field_image,field_project_tags')
      .then(response => {
        let self = this
        this.getData = response.data
        if (typeof response.data.included !== 'undefined') {
          response.data.included.forEach(function (included) {
            if (included.type === 'file--file') {
              self.getImages.push(included)
            } else if (included.type === 'taxonomy_term--project_tags') {
              self.getTaxonomy.push(included)
            }
          })
        }
      }, response => {
        console.log('fail')
      })
  },
  filters: {
    lowercase: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toLowerCase()
    },
    hyphenate: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.replace(' ', '-')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3, h4 {
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

.project--images {
  margin-bottom: 20px;
  text-align: center;
}

ul.project--tags__list {
  text-align: center;
}
</style>
