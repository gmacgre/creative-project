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

    <!-- This is for editing posts that are yours.-->
    <div v-if="owner">
      <div class="spacer"></div>
      <p>Edit your post:</p>
      <div class="postSection">
        <div>
          <input class="titleinput" v-model="newTitle" />{{ post.Title }}
        </div>
        <div>
          <p>New Description:</p>
          <textarea class="descinput" v-model="newDesc"></textarea>
        </div>
        <button class="topost" type="submit" @click="editPost()">Edit</button>
      </div>
    </div>

    <h2>Comments</h2>
    <p>Add a comment...</p>
    <textarea class="commentbox" v-model="commentbox"></textarea>
    <button class="topost" type="submit" @click="comment()">Comment</button>
    <div v-for="comment in comments" v-bind:key="comment._id">
      <p>{{comment.user.username}} says: {{comment.comment}}</p>
    </div>
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
      this.getComments();
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
      newTitle: "",
      newDesc: "",
    };
  },
  methods: {
    async getPost() {
      try {
        this.response = await axios.get("/api/posts/" + this.$route.params.id);
        this.post = this.response.data;
        this.newTitle = this.post.title;
        this.newDesc = this.post.description;
        if (this.post.user.username == this.$root.$data.user.username) {
          this.owner = true;
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getComments(){
      try {
        this.response = await axios.get("/api/comments/" + this.$route.params.id);
        this.comments = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async comment() {
      try {
        await axios.post("/api/comments/" + this.$route.params.id, {
          comment: this.commentbox,
          post: this.post
        });
        this.commentbox = "";
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async upvote() {
      try {
        this.post.downvotes = this.post.downvotes.filter(
          (voter) => voter.username != this.$root.$data.user.username
        ); //remove the user form the downvote array
        let checker = this.post.upvotes.filter(
          (voter) => voter.username == this.$root.$data.user.username
        );
        if (checker.length != 0) {
          //Already upvoted, removethe upvote from the list.
          this.post.upvotes = this.post.upvotes.filter(
            (upvoter) => upvoter.username != this.$root.$data.user.username
          );
        } else {
          //Not Upvoted before, add to it and push
          this.post.upvotes.push(this.$root.$data.user);
        }
        await axios.put("/api/posts/" + this.$route.params.id, {
          newEdit: this.post,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async downvote() {
      try {
        this.post.upvotes = this.post.upvotes.filter(
          (voter) => voter.username != this.$root.$data.user.username
        ); //remove the user form the upvote array
        let checker = this.post.downvotes.filter(
          (voter) => voter.username == this.$root.$data.user.username
        );
        if (checker.length != 0) {
          //Already downvoted, removethe it from the list.
          this.post.downvotes = this.post.downvotes.filter(
            (upvoter) => upvoter.username != this.$root.$data.user.username
          );
        } else {
          //Not Upvoted before, add to it and push
          this.post.downvotes.push(this.$root.$data.user);
        }
        await axios.put("/api/posts/" + this.$route.params.id, {
          newEdit: this.post,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost() {
      try {
        await axios.delete("api/posts/" + this.$route.params.id);
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },
    async editPost() {
      try {
        this.post.description = this.newDesc;
        this.post.title = this.newTitle;
        await axios.put("/api/posts/" + this.$route.params.id, {
          newEdit: this.post,
        });
      } catch (error) {
        console.log(error);
      }
    },
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
.descinput {
  width: 80%;
  max-width: 600px;
  height: 64px;
}
</style>