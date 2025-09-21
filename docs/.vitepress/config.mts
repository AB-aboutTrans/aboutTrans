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
  description: '关于跨性别，你想知道的都在这里～这是一个跨性别相关知识科普网站，无论是社群伙伴还是盟友朋友们都可以在此获取到有用的信息！',
  head: [
    ['link', { rel: 'icon', href: '/icon.svg' }],
    ['meta', { property: 'og:image', content: 'https://aboutrans.info/social.png' }],
  ],
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(footnote)
    },
  },
  themeConfig: {
    logo: '/icon.svg',
    lastUpdated: {
      text: '当前页面最后更新于',
      formatOptions: {
        dateStyle: 'short',
      }
    },
    editLink: {
      pattern: 'https://github.com/AB-aboutTrans/aboutTrans/edit/main/docs/:path',
      text: '对当前页面提出修改建议',
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '116OHOGKSO',
        apiKey: 'ac690e86bfae8e8965ca0eb54624758b',
        indexName: 'index_ab_vitepress_crawls',
        askAi: {
          assistantId: 'LPOC8VnwcNjG'
        },
        searchParameters: {
          facetFilters: []
        },
        locales: {
          root: {
            placeholder: '搜索内容或向 AI 提问',
            translations: {
              button: { buttonText: '搜索内容', buttonAriaLabel: '搜索内容' },
              modal: {
                searchBox: {
                  clearButtonTitle: '清除查询条件',
                  clearButtonAriaLabel: '清除查询条件',
                  closeButtonText: '关闭',
                  closeButtonAriaLabel: '关闭',
                  placeholderText: '搜索内容或向 AI 提问',
                  placeholderTextAskAi: '向 AI 提问',
                  placeholderTextAskAiStreaming: '思考中...',
                  searchInputLabel: '搜索',
                  backToKeywordSearchButtonText: '返回关键字搜索',
                  backToKeywordSearchButtonAriaLabel: '返回关键字搜索'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                  recentConversationsTitle: '最近的对话',
                  removeRecentConversationButtonTitle: '从历史记录中删除对话'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '请检查网络连接'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '您可以尝试查询',
                  reportMissingResultsText: '您认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
                resultsScreen: { askAiPlaceholder: '向 AI 提问' },
                askAiScreen: {
                  disclaimerText: '结果由 AI 生成，请注意核查。',
                  relatedSourcesText: '相关来源',
                  thinkingText: '思考中...',
                  copyButtonText: '复制',
                  copyButtonCopiedText: '已复制！',
                  copyButtonTitle: '复制',
                  likeButtonTitle: '赞',
                  dislikeButtonTitle: '踩',
                  thanksForFeedbackText: '感谢反馈！',
                  preToolCallText: '搜索中...',
                  duringToolCallText: '搜索 ',
                  afterToolCallText: '已搜索',
                  aggregatedToolCallText: (queries: string[]) => ({
                    before: '已搜索 ',
                    separator: '、',
                    lastSeparator: ' 和 ',
                    after: ''
                  })
                } as any,
                footer: {
                  selectText: '查看',
                  submitQuestionText: '提交问题',
                  selectKeyAriaLabel: 'Enter 键',
                  navigateText: '选择',
                  navigateUpKeyAriaLabel: '向上箭头',
                  navigateDownKeyAriaLabel: '向下箭头',
                  closeText: '关闭',
                  backToSearchText: '返回搜索',
                  closeKeyAriaLabel: 'Esc 键',
                  poweredByText: '搜索提供者'
                }
              }
            }
          }
        }
      }
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
      { text: '关于我们', link: 'about' },
      { text: '在 X 上关注', link: 'https://x.com/AB_aboutTrans' },
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
          { text: '议题问答', link: '/docs/faq' },
        ],
      },
    ],
  },
})
