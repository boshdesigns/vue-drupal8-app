<template>
  <div class="about">
    <h1>{{ pageTitle }}</h1>
    <ul>
      <li v-for="page in getData.data" style="margin-bottom:20px;">
        <section>
          {{page.attributes.title}}
        </section>
        <section>
          {{page.attributes.body.value}}
        </section>
      </li>
    </ul>
    <ul>
      <li v-for="relation in getData.included" style="margin-bottom:20px;">
        <section v-if="relation.type === 'file--file'">
          <img v-bind:src="'http://bosh.dev' + relation.attributes.url" />
        </section>

        <div v-if="relation.type === 'taxonomy_term--project_tags'">
          <h2>Project Tags</h2>
          <router-link :to="'/portfolio/' + relation.attributes.name">{{ relation.attributes.name | lowercase | hyphenate }}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'project',
  data () {
    return {
      pageTitle: 'This is a Project Page',
      getData: []
    }
  },
  created: function () {
    this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&filter[field_slug][value]=' + this.$route.params.id + '&include=field_image,field_project_tags')
      .then(response => {
        this.getData = response.data
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
