<template>
  <div class="about">
    <h1>{{ pageTitle }}</h1>
    {{id}}
    <ul>
      <li v-for="page in getData.data" style="margin-bottom:20px;">
        <section>
          {{page.attributes.title}}
        </section>
        <section>
          {{page.attributes.body.value}}
        </section>
        <router-link :to="{ name: 'Project', params: { id: page.attributes.field_slug }}">{{ "Project " + page.attributes.title }}</router-link>
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
      getData: []
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&filter[projectTag][condition][path]=field_project_tags.name&filter[projectTag][condition][value]=' + this.$route.params.id.replace('-', ' '))
        .then(response => {
          this.getData = response.data
        }, response => {
          console.log('fail')
        })
    } else {
      this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&include=field_image')
        .then(response => {
          this.getData = response.data
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
