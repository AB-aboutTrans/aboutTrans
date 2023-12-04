import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "aboutTrans",
  description: "一个科普跨性别相关知识的小站",
  head: [
    ['link', { rel: 'icon', href: '/icon.png'}]
  ],
  themeConfig: {
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
    darkModeSwitchLabel: '切换深色模式',
    outlineTitle: '在此页面中',
    returnToTopLabel: '回到顶部',
    footer: {
      copyright: '© 2023 aboutTrans'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      { text: '主页', link: '/' },
    ],
    sidebar: [
      {
        text: '#概念',
        items: [
          { text: '相关词汇及定义', link: '/document/words.md' },
          { text: '相关医疗及诊断', link: '/document/medical.md' },
          { text: '相关节日纪念日', link: '/document/days.md' }
        ]
      },
      {
        text: '#文章',
        items: [
          { text: '例1', link: '/document/2023-08-15.md' },
          { text: '例2', link: '/document/2023-08-16.md' }
        ]
      },
      {
        text: '#问答',
        items: [
          { text: '问答合集', link: 'document/Q&A.md'}
        ]
      },
      {
        text: '#关于',
        items: [
          { text: '关于我们', link: '/document/about.md'},
          { text: '投稿通道', link: '/document/post.md'},
          { text: '特别鸣谢', link: '/document/thanks.md'}
        ]
      },
    ],
  }
})