<template>
  <div>
    <h1 class='topmessage'>Welcome to the premier Computer Science BYU chatroom. Meet other CS students and talk about anything!</h1>
    <post-gallery :posts="postsOrganized" />
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import PostGallery from '@/components/PostList.vue';

export default {
  name: "Home",
  components: {
    PostGallery
  },
  data() {
    return {
      posts: [],
      error: "",
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts/all");
        this.posts = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
  },
  computed: {
    postsOrganized() {
      let sorted = this.posts;
      sorted = sorted.sort((a, b) =>
        a.upvotes.length - a.downvotes.length <
        b.upvotes.length - b.downvotes.length
          ? 1
          : -1
      );
      return sorted;
    },
  },
};
</script>
