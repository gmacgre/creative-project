<template>
  <section>
    <div v-for="post in posts" v-bind:key="post._id">
      <router-link
        class="titlelink"
        :to="{ name: 'Post', params: { id: post._id } }"
        ><strong>{{ post.title }}</strong></router-link
      >
      <div class="postOuter">
        <div class="postInfo">
          <p class="desc">{{ post.description }}</p>
          <p>{{ post.upvotes.length }} upvote(s)</p>
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
  </section>
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
  },
};
</script>

<style scoped>
.titlelink {
  color: black;
  font-size: 24px;
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
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}
</style>