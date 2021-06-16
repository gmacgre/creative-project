<template>
  <div class="upperpad">
    <div v-for="post in posts" v-bind:key="post._id">
      <router-link
        class="titlelink"
        :to="{ name: 'Post', params: { id: post._id } }"
        ><strong>{{ post.title }}</strong></router-link
      >
      <div class="postOuter">
        <div class="postInfo">
          <div class="leftside">
            <p class="desc">{{ post.description }}</p>
            <p class="upvotes">Score: {{ post.upvotes.length - post.downvotes.length }}, {{ post.upvotes.length + post.downvotes.length }} vote(s)</p>
          </div>
          <div class="rightside">
            <div>
              <p class="postAuthor">
                <strong
                  >{{ post.user.firstName }} {{ post.user.lastName }}</strong
                >
              </p>
              <p class="postDate">
                <em>{{ formatDate(post.created) }}</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostGallery",
  props: {
    posts: Array,
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    getScore(a, b){
      return a - b;
    }
  },
};
</script>

<style scoped>
.titlelink {
  color: #2c3e50;
  font-size: 22px;
  width: 90%;
  padding-left: 5px;
  padding-right: 5px;
}
.postOuter {
  display: flex;
  justify-content: center;
}
.postInfo {
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 600px;
}
.postDate {
  font-size: 12px;
}
.desc {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.leftside {
  width: 80%;
}
.upvotes {
  display: flex;
  justify-self: left;
}
.rightside {
  width: 20%;
  display: flex;
  align-self: right;
}
.upperpad {
  padding-top: 10px;
}
</style>