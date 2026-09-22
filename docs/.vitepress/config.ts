import { defineConfig, type HeadConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  title: 'aboutTrans',
  titleTemplate: ':title aboutTrans',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://aboutrans.info',
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://aboutrans.info/social.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  transformHead: ({ pageData, title, description }) => {
    const head: HeadConfig[] = []
    const url = `https://aboutrans.info/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2')}`
    const image = 'https://aboutrans.info/social.png'

    head.push(['link', { rel: 'canonical', href: url }])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:image:alt', content: 'aboutTrans 跨性别与多元性别' }])
    head.push(['meta', { property: 'og:site_name', content: 'aboutTrans' }])
    head.push(['meta', { property: 'og:locale', content: 'zh_CN' }])
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push(['meta', { name: 'twitter:description', content: description }])
    head.push(['meta', { name: 'twitter:image', content: image }])

    return head
  },
  vite: {
    plugins: [
      UnoCSS(),
      Icons(),
    ],
  },

  themeConfig: {
    logo: '/favicon.svg',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    returnToTopLabel: '回到顶部',
    outline: {
      label: '当前页面内容',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
      },
    },
    editLink: {
      pattern: 'https://github.com/AB-aboutTrans/aboutTrans/edit/main/docs/:path',
      text: '提出修改建议',
    },
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
        appId: '116OHOGKSO',
        apiKey: 'ac690e86bfae8e8965ca0eb54624758b',
        indexName: 'index_ab_vitepress_crawls',
        maxResultsPerGroup: 10,
        askAi: {
          assistantId: 'd605bb57-d72b-413b-8a8d-96b0de052392',
          agentStudio: true,
        },
        searchParameters: {
          facetFilters: ['lang:zh-CN'],
          attributesToSnippet: [
            'hierarchy.lvl2:30',
            'content:30',
          ],
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
                  clearButtonTitle: '清除',
                  clearButtonAriaLabel: '清除',
                  closeButtonText: '关闭',
                  closeButtonAriaLabel: '关闭',
                  placeholderText: '搜索内容或向 AI 提问',
                  placeholderTextAskAi: '向 AI 提问',
                  placeholderTextAskAiStreaming: '回答中...',
                  enterKeyHint: '搜索内容',
                  searchInputLabel: '搜索内容',
                  backToKeywordSearchButtonText: '返回搜索',
                  backToKeywordSearchButtonAriaLabel: '返回搜索',
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  saveRecentSearchButtonTitle: '收藏',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                  recentConversationsTitle: '最近',
                  removeRecentConversationButtonTitle: '删除对话',
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '请检查网络连接',
                },
                resultsScreen: {
                  askAiPlaceholder: '向 AI 提问',
                  noResultsAskAiPlaceholder: '没有在文档中找到？试试向 AI 提问',
                },
                askAiScreen: {
                  disclaimerText: '结果由 AI 生成，请注意核查。',
                  thinkingText: '请稍候...',
                  preToolCallText: '正在搜索',
                  duringToolCallText: '搜索中...',
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
    footer: {
      message: '本站内容基于 CC BY 4.0 许可发布',
      copyright: `版权所有 © 2023-<auto-right>${new Date().getFullYear()}</auto-right> AB aboutTrans`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
})
