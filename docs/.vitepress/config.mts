import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import UnoCSS from 'unocss/vite'

function getCurrentYear(): number {
  const now = new Date()
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const currentTime = new Date(utc + (8 * 3600000))
  return currentTime.getFullYear()
}

export default defineConfig({
  title: 'aboutTrans',
  description: '关于跨性别，你想知道的都在这里～这是一个跨性别相关知识科普站，无论是跨儿伙伴还是盟友朋友们都可以在此获取到有用的信息！',
  cleanUrls: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { property: 'og:image', content: 'https://aboutrans.info/social.png' }],
  ],
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },
  markdown: {
    config(md) {
      md.use(footnote)
    },
  },
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '主页', link: 'index' },
      { text: '关于我们', link: 'about' },
      { text: '在 X 上关注', link: 'https://x.com/AB_aboutTrans' },
    ],
    sidebar: [
      {
        text: '文档',
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
    search: {
      provider: 'algolia',
      options: {
        mode: 'sidePanel',
        askAi: {
          assistantId: 'LPOC8VnwcNjG',
          appId: '116OHOGKSO',
          apiKey: 'ac690e86bfae8e8965ca0eb54624758b',
          indexName: 'index_ab_vitepress_crawls',
          sidePanel: true,
        },
        searchParameters: {
          facetFilters: [],
        //   attributesToSnippet: [
        //     "hierarchy.lvl1:15",
        //     "hierarchy.lvl2:15",
        //     "hierarchy.lvl3:15",
        //     "hierarchy.lvl4:15",
        //     "hierarchy.lvl5:15",
        //     "hierarchy.lvl6:15",
        //     "content:50"
        //   ],
        },
        locales: {
          root: {
            placeholder: '搜索内容或向 AI 提问',
            translations: {
              button: {
                buttonText: '搜索内容',
                buttonAriaLabel: '搜索内容',
              },
              modal: {
                searchBox: {
                  clearButtonTitle: '清除查询条件',
                  clearButtonAriaLabel: '清除查询条件',
                  closeButtonText: '关闭',
                  closeButtonAriaLabel: '关闭',
                  placeholderText: '搜索内容或向 AI 提问',
                  placeholderTextAskAi: '向 AI 提问',
                  placeholderTextAskAiStreaming: '回答中...',
                  enterKeyHint: '搜索内容',
                  enterKeyHintAskAi: '向 AI 提问',
                  searchInputLabel: '搜索内容',
                  backToKeywordSearchButtonText: '返回关键词搜索',
                  backToKeywordSearchButtonAriaLabel: '返回关键词搜索',
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                  recentConversationsTitle: '最近的对话',
                  removeRecentConversationButtonTitle: '从历史记录中删除对话',
                },
                newConversation: {
                  newConversationTitle: '有什么想问的吗？',
                },
                resultsScreen: {
                  askAiPlaceholder: '向 AI 提问',
                  noResultsAskAiPlaceholder: '没有在文档中找到？试试向 AI 提问吧！',
                },
                askAiScreen: {
                  disclaimerText: '结果由 AI 生成，请注意核查。',
                  relatedSourcesText: '相关来源',
                  thinkingText: '思考中...',
                  preToolCallText: '搜索中...',
                  duringToolCallText: '搜索 ',
                  afterToolCallText: '已搜索',
                  stoppedStreamingText: '你已停止此回复',
                  errorTitleText: '聊天错误',
                  threadDepthExceededMessage: '由于对话过长，为保持回答准确，此对话已关闭。',
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '请检查网络连接',
                },
                noResultsScreen: {
                  noResultsText: '没有找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈',
                },
                footer: {
                  selectText: '选择',
                  submitQuestionText: '提交问题',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '向上箭头',
                  navigateDownKeyAriaLabel: '向下箭头',
                  closeText: '关闭',
                  backToSearchText: '返回搜索',
                  closeKeyAriaLabel: 'Esc 键',
                  poweredByText: '搜索提供',
                },
              },
            },
            askAi: {
              panel: {
                translations: {
                  promptForm: {
                    promptPlaceholderText: '在这里输入问题',
                    promptAnsweringText: '正在回答...',
                    promptAskAnotherQuestionText: '继续向 AI 提问',
                    promptDisclaimerText: '结果由 AI 生成，请注意核查。',
                    promptLabelText: '按回车发送，Shift + 回车换行。',
                    promptAriaLabelText: '问题输入框',
                  },
                  newConversationScreen: {
                    titleText: '有什么想问的吗？',
                  },
                  conversationScreen: {
                    preToolCallText: '搜索中...',
                    searchingText: '搜索中...',
                    toolCallResultText: '已搜索',
                    conversationDisclaimer: '结果由 AI 生成，请注意核查。',
                    reasoningText: '推理中...',
                    thinkingText: '思考中...',
                    relatedSourcesText: '相关来源',
                    stoppedStreamingText: '你已停止此回复',
                    errorTitleText: '聊天错误',
                  },
                  logo: {
                    poweredByText: '搜索提供',
                  },
                },
              },
            },
          },
        },
      },
    },
    editLink: {
      pattern: 'https://github.com/AB-aboutTrans/aboutTrans/edit/main/docs/:path',
      text: '对当前页面提出修改建议',
    },
    lastUpdated: {
      text: '当前页面最后更新于',
      formatOptions: {
        dateStyle: 'short',
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    footer: {
      message: '本站内容基于 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans">CC BY 4.0</a> 许可发布',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} AB aboutTrans`,
    },
    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
    sidebarMenuLabel: '目录',
    outlineTitle: '当前页面内容',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    returnToTopLabel: '回到顶部',
  },
})
