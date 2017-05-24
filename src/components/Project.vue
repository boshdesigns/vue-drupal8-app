<template>
  <div class="about">
    <h1>{{ pageTitle }}</h1>
    <ul>
      <li v-for="page in getData" style="margin-bottom:20px;">
        <section>
          {{page.attributes.title}}
        </section>
        <section>
          {{page.attributes.body.value}}
        </section>
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
    this.$http.get('http://bosh.dev/jsonapi/node/project?_format=api_json&filter[field_slug][value]=' + this.$route.params.id)
      .then(response => {
        this.getData = response.data.data
      }, response => {
        console.log('fail')
      })
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
