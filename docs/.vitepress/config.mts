import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  vite: {
    plugins: [
      UnoCSS(),
    ]
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh'
    }
  },
  title: "aboutTrans",
  description: "关于跨性别，你想知道的都在这里。\naboutTrans是一个主要面向不了解或希望了解跨性别群体的人的一个科普网站。",
  head: [
    ['link', { rel: 'icon', href: '/icon.png'}]
  ],
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(footnote)
    }
  },
  themeConfig: {
    logo: '/icon.png',
    lastUpdated: {
      text: '当前页面最后更新于',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    editLink: {
      pattern: 'https://github.com/ChisakaKanako/aboutTrans/edit/main/docs/:path',
      text: '对当前页面提出修改建议'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索内容',
                buttonAriaLabel: '搜索内容'
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
      { text: '目录',
        items: [
          { text: '概念词条', link: '/documents/concept-and-definition' },
          { text: '医疗照护', link: '/documents/diagnosis-and-medical' },
          { text: '政策法规', link: '/documents/policy-and-regulation' },
          { text: '国际节日', link: '/documents/day-and-festival' },
          { text: '误区问答', link: '/documents/q-and-a' },
          { text: '关于我们', link: '/about' }
        ]
      }
    ]
  }
})