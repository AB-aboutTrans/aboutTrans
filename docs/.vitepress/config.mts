import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
  },
  title: 'aboutTrans',
  description: '关于跨性别，你想知道的都在这里～这是一个面向不了解或希望了解跨性别群体的人的一个科普网站，同时，社群伙伴们也可以在此获取到有用的信息！',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { property: 'og:image', content: 'https://aboutrans.info/social.png' }],
  ],
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(footnote)
    },
  },
  themeConfig: {
    logo: '/favicon.png',
    editLink: {
      pattern: 'https://github.com/AB-aboutTrans/aboutTrans/edit/main/docs/:path',
      text: '对当前页面提出修改建议',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索内容',
                buttonAriaLabel: '搜索内容',
              },
              modal: {
                displayDetails: '显示详细内容',
                noResultsText: '没有相关结果',
                resetButtonTitle: '清除输入内容',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深色模式',
    outlineTitle: '当前页面中',
    returnToTopLabel: '回到顶部',
    footer: {
      message: '本站内容基于 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans">CC BY 4.0</a> 许可发布',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} AB aboutTrans`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      { text: '主页', link: 'index' },
      { text: '关于', link: 'about' },
      { 
        text: '更多',
        items: [
          { 
            text: '更新记录',
            link: 'https://github.com/AB-aboutTrans/aboutTrans/commits/main/' 
          },
          { 
            text: '在 X 上关注',
            link: 'https://x.com/AB_aboutTrans'
          },
        ],
      },
      { 
        text: '字重',
        items: [
          { 
            text: '正文加粗',
            link: '#' 
          },
          { 
            text: '恢复默认',
            link: '#'
          },
        ],
      },
    ],
    sidebar: [
      {
        text: '目录',
        items: [
          { text: '概念术语', link: '/docs/terms' },
          { text: '医疗照护', link: '/docs/medical' },
          { text: '政策法规', link: '/docs/policy' },
          { text: '社会支持', link: '/docs/support' },
          { text: '纪念活动', link: '/docs/events' },
          { text: '误区问答', link: '/docs/faq' },
        ],
      },
    ],
  },
})
