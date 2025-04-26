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
                }
              }
            }
          }
        }
      }
    },
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深色模式',
    outlineTitle: '当前页面中',
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
          { text: '概念术语', link: '/docs/terms' },
          { text: '医疗照护', link: '/docs/medical' },
          { text: '政策法规', link: '/docs/policy' },
          { text: '纪念节日', link: '/docs/days' },
          { text: '误区问答', link: '/docs/faq' },
          { text: '关于我们', link: '/about' }
        ]
      },
      {
        text: '附件',
        collapsed: true,
        items: [
          { text: '跨性别相关知识测试问卷', link: 'https://file.aboutrans.info/跨性别相关知识测试问卷.pdf'},
          { text: '问卷参考答案', link: 'https://file.aboutrans.info/问卷参考答案.pdf'}
        ]
      }
    ]
  }
})