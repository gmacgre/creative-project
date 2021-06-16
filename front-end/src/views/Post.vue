<template>
  <div>
    <div class="spacer"></div>
    <h1>{{ post.title }}</h1>
    <p class="author">
      <em>{{ post.user.firstName }} {{ post.user.lastName }}</em>
    </p>
    <div class="desc">
      <p class="descinner">{{ post.description }}</p>
    </div>
    <p>{{ upvoteCount }} upvotes, {{ downvoteCount }} downvotes</p>
    <p class="postDate">
      <em>{{ formatDate(post.created) }}</em>
    </p>
    <button class="votebutton" type="button" @click="upvote()">Upvote</button>
    <button class="votebutton" type="button" @click="downvote()">
      Downvote
    </button>
    <button v-if="owner" type="submit" @click="deletePost()">Delete</button>
    <h2>Comments</h2>
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
      owner: false,
      failed: false
    };
  },
  methods: {
    async getPost() {
      try {
        this.response = await axios.get("/api/posts/" + this.$route.params.id);
        this.post = this.response.data;
        if(this.post == ''){
          this.failed = true;
        }
        if (this.post.user.username == this.$root.$data.user.username) {
          this.owner = true;
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async upvote() {
      try {
        if (this.post.upvotes.includes(this.$root.$data.user)) {
          return;
        }
        this.post.upvotes.push(this.$root.$data.user);
        this.post.downvotes.filter(
          (upvoter) => upvoter.username != this.$root.$data.user.username
        );
        await axios.put("/api/posts/" + this.$route.params.id, {
          newEdit: this.post,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async downvote() {
      try {
        if (this.post.downvotes.includes({user: this.$root.$data.user})) {
          return;
        }
        this.post.downvotes.push(this.$root.$data.user);
        this.post.upvotes.filter((upvoter) => upvoter.username != this.$root.$data.user.username);
        await axios.put("/api/posts/" + this.$route.params.id, {
          newEdit: this.post,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost() {
      try{
        await axios.delete('api/posts/' + this.$route.params.id);
        this.$router.go(-1);
      }
      catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    upvoteCount() {
      return this.post.upvotes.length;
    },
    downvoteCount() {
      return this.post.downvotes.length;
    },
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}
.desc {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.descinner {
  width: 90%;
  max-width: 600px;
}
.spacer {
  margin-top: 10px;
}
.author {
  padding: 0;
  margin: 0;
  font-size: 12px;
}
</style>

<!--
 /*
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
    },*/ -->