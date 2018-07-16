<template>
    <el-button type="primary" @click="login">点击登录</el-button>
</template>
<script>
export default {
  name: "login",
  methods: {
    login() {
      var url = config.uumsUrl_HOST + config.getToken_GET;
      this.$api
        .get(url, {}, null)
        .then(res => {
          if (res.appCode === "0") {
            var token = res.resultList[0].token;
            window.location.href = "/index.html?token=" + token;
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
