<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      channels: [], // 文章频道列表
      channel_id: this.channelId,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        }
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    // 由于我们让发布和修改使用的同一个组件
    // 所以这里要判断
    // 如果路由路径参数中有 id，则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    // 修改文章：加载文章内容
    loadArticle () {
      console.log('loadArticle')
      // 找到数据接口
      // 封装请求方法
      // 请求获取数据
      getArticle(this.$route.query.id).then((res) => {
        // 模板绑定展示
        this.article = res.data.data
      })
    },
    onPublish (draft = false) {
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
      // 如果是修改文章，则执行修改操作，否则执行添加操作
      const articleId = this.$route.query.id
      if (articleId) {
        // 执行修改操作
        updateArticle(articleId, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 跳转到内容管理页面
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          // 处理响应结果
          // console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 跳转到内容管理页面
          this.$router.push('/article')
        })
      }
    },
    loadChannels () {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
