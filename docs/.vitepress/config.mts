import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
export default defineConfig({
  locales: {
    root: {
      label: '中文',
      lang: 'zh'
    }
  },
  title: "aboutTrans",
  description: "关于跨性别，你想知道的都在这里",
  head: [
    ['link', { rel: 'icon', href: '/icon.png'}]
  ],
  markdown: {
    config(md) {
      md.use(footnote)
    }
  },
  themeConfig: {
    lastUpdated: {
      text: '当前页面最后更新于',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                noResultsText: '没有相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                }
              }
            }
          }
        }
      }
    },
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深色模式',
    outlineTitle: '在此页面中',
    returnToTopLabel: '回到顶部',
    footer: {
      copyright: '© 2023-2025 aboutTrans'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '关于我们', link: 'about' }
    ],
    sidebar: [
      {
        text: "本站页面导航",
        items: [
          { text: '相关概念与释义', link: '/document/concepts-and-definitions' },
          { text: '相关诊断与医疗', link: '/document/diagnosis-and-medical' },
          { text: '相关政策与法规', link: '/document/policies-and-regulations' },
          { text: '相关国际纪念日', link: '/document/days-and-festivals' },
          { text: '相关误区与问答', link: '/document/q-and-a' }
        ]
      },
      {
        text: "想了解更多文章报道与调研资料？",
        items: [
          { text: '访问我们的项目文档网站', link: 'https://docs.transzh.org/' }
        ]
      }
    ]
  }
})