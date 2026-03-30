import { defineConfig, type HeadConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import footnote from 'markdown-it-footnote'
import UnoCSS from 'unocss/vite'

function getCurrentYear(): number {
  const now = new Date()
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const currentTime = new Date(utc + (8 * 3600000))
  return currentTime.getFullYear()
}

type ThemeDefaultOverrideAliasEntry =
  | string
  | {
      source: string
      target: string
    }

/**
 * Build aliases for `docs/.vitepress/theme/overrides/theme-default/**`.
 *
 * Shorthand entry (`'components/Foo.vue'`) means:
 * - source: `./Foo.vue`
 * - target: `components/Foo.vue`
 *
 * Use explicit form (`{ source, target }`) when source specifier does not
 * match `./<basename>`.
 */
function createThemeDefaultOverrideAliases(
  entries: readonly ThemeDefaultOverrideAliasEntry[]
) {
  const usedSources = new Set<string>()

  return entries.map((entry) => {
    const source =
      typeof entry === 'string'
        ? `./${path.posix.basename(entry)}`
        : entry.source
    const target = typeof entry === 'string' ? entry : entry.target

    if (usedSources.has(source)) {
      throw new Error(
        `[vitepress theme overrides] duplicated source alias "${source}". ` +
          'Use explicit { source, target } entries to disambiguate.'
      )
    }

    usedSources.add(source)

    return {
      find: source,
      replacement: fileURLToPath(
        new URL(`./theme/overrides/theme-default/${target}`, import.meta.url)
      )
    }
  })
}

const themeDefaultOverrideAliases = createThemeDefaultOverrideAliases([
  'components/VPDocFooterLastUpdated.vue'
] as const)

export default defineConfig({
  title: 'aboutTrans',
  description: '关于跨性别，你想知道的都在这里～这是一个专注于跨性别与多元性别知识科普的公益性网站，无论是社群伙伴还是盟友朋友们都可以在此获取到有用的信息！',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://aboutrans.info',
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'aboutTrans' }],
    ['meta', { property: 'og:description', content: '关于跨性别，你想知道的都在这里～这是一个专注于跨性别与多元性别知识科普的公益性网站，无论是社群伙伴还是盟友朋友们都可以在此获取到有用的信息！' }],
    ['meta', { property: 'og:image', content: 'https://aboutrans.info/social.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'theme-color', content: '#e5006a' }],
  ],
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = []
    const url = `https://aboutrans.info/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2')}`

    head.push(['link', { rel: 'canonical', href: url }])
    head.push(['meta', { property: 'og:url', content: url }])

    return head
  },
  vite: {
    resolve: {
      alias: [...themeDefaultOverrideAliases],
    },
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
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    outlineTitle: '当前页面内容',
    returnToTopLabel: '回到顶部',
    lastUpdated: {
      text: '当前页面最后更新于',
      formatOptions: {
        forceLocale: true,
        dateStyle: 'medium'
      },
      // @ts-expect-error docs-only option consumed by custom theme component VPDocFooterLastUpdated.vue
      dateTimeSpacing: true
    },
    editLink: {
      pattern: 'https://github.com/AB-aboutTrans/aboutTrans/edit/main/docs/:path',
      text: '对当前页面提出修改建议',
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
        askAi: {
          assistantId: 'LPOC8VnwcNjG'
        },
        searchParameters: {
          facetFilters: [],
          attributesToSnippet: [
                "hierarchy.lvl1:15",
                "hierarchy.lvl2:15",
                "hierarchy.lvl3:15",
                "hierarchy.lvl4:15",
                "hierarchy.lvl5:15",
                "hierarchy.lvl6:15",
                "content:15"
            ]
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
                resultsScreen: { 
                  askAiPlaceholder: '向 AI 提问',
                  noResultsAskAiPlaceholder: '没有在文档中找到？试试向 AI 提问吧！',
                },
                askAiScreen: {
                  disclaimerText: '结果由 AI 生成，请注意核查。',
                  relatedSourcesText: '相关来源',
                  thinkingText: '请稍候...',
                  preToolCallText: '正在搜索',
                  duringToolCallText: '搜索中...',
                  afterToolCallText: '已搜索',
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
    footer: {
      message: '本站内容基于 CC BY 4.0 许可发布',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} AB aboutTrans`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
})
