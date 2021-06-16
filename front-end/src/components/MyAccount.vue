<template>
  <div class="main">
    <div class="menu">
      <div class="title">
        <div class="titleinner">
          <h1>
            Tell us what's on your mind, {{ user.firstName }}
            {{ user.lastName }}!
          </h1>
        </div>
      </div>
      <div class="postSection">
        <div>
          <input class="titleinput" placeholder="Title" v-model="title" />
        </div>
        <div>
          <h2>Description:</h2>
          <textarea class="descinput" v-model="description"></textarea>
        </div>
        <button class="topost" type="submit" @click="post()">Post!</button>
      </div>
    </div>
    <div class="posts">
      <h2>My Posts (Most Recent First)</h2>
      <post-gallery :posts="myPosts" />
      <a class="logout" @click="logout">
        <div>
          <strong><em>Logout </em></strong>
          <img class="logoutbutton" src="@/assets/logout.png" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import PostGallery from "@/components/PostList.vue";

export default {
  name: "MyPhotos",
  data() {
    return {
      title: "",
      description: "",
      myPosts: [],
    };
  },
  components: {
    PostGallery,
  },
  created() {
    this.getMyPosts();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async post() {
      try {
        if (this.title != "" && this.description != "") {
          await axios.post("/api/posts/", {
            title: this.title,
            description: this.description,
          });
        }
        this.title = "";
        this.description = "";
        this.getMyPosts();
      } catch (error) {
        console.log(error);
      }
    },
    async getMyPosts() {
      try {
        let response = await axios.get("/api/posts/");
        this.myPosts = response.data;
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
};
</script>

<style scoped>
.logoutbutton {
  width: 13px;
  height: 13px;
}
.title {
  width: 100%;
  display: flex;
  justify-content: center;
}
.titleinner {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.postSection {
  padding-top: 20px;
  justify-content: center;
}
.logout {
  justify-self: center;
}
.titleinput {
  height: 50px;
  width: 200px;
  font-size: 24px;
}
.descinput {
  height: 100px;
  width: 200px;
}
.menu h2 {
  font-size: 14px;
}
.topost {
  height: 24px;
  width: 72px;
  margin: 15px;
}

@media (min-width: 768px) {
  .titleinput {
    width: 500px;
  }
  .descinput {
    width: 500px;
  }
}
</style>
