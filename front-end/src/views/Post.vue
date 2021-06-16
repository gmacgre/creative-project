<template>
<div>
    <h1>{{post.title}}</h1>
    <h2>{{post.user.firstName}} {{post.user.lastName}}</h2>
    <h3>{{post.description}}</h3>
    <p>{{upvoteCount}} upvotes, {{downvoteCount}} downvotes</p>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  components: {},
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
      this.getPost();
      //this.getComments();
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  data() {
    return {
      post: "",
      comments: [],
      commentbox: "",
    };
  },
  methods: {
    async getPost() {
      try {
        this.response = await axios.get("/api/posts/" + this.$route.params.id);
        this.post = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },/*
    async getComments() {
      try {
        this.response = await axios.get(
          "/api/comments/" + this.$route.params.id
        );
        this.comments = this.response.data;
      } catch (error) {
        this.error = error.respose.data.message;
      }
    },
    async submit() {
      try {
        await axios.post("/api/comments/" + this.$route.params.id, {
          comment: this.commentbox,
        });
        this.commentbox = "";
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },*/
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
  },
  computed: {
      upvoteCount(){
          return this.post.upvotes.length;
      },
      downvoteCount(){
          return this.post.downvotes.length;
      },
  }
};
</script>