import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "aboutTrans",
  description: "关于跨性别，你想知道的一切",
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
      copyright: '© 2023-2024 aboutTrans 我们仍在'
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
        items: [
          { text: '相关词汇与定义', link: '/document/definition.md' },
          { text: '相关诊断与医疗', link: '/document/medical.md' },
          { text: '相关政策与法规', link: '/document/regulation.md' },
          { text: '相关国际纪念日', link: '/document/day.md' },
          { text: '相关调研与资料', link: '/document/research.md' },
          { text: '相关误区与问答', link: '/document/Q&A.md' },
          { text: '相关文章与报道', link: '/document/publish.md' },
          { text: '关于本站', link: '/document/about.md' }
        ]
      },
    ],
  }
})