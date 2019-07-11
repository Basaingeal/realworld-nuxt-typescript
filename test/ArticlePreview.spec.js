import { mount, RouterLinkStub } from '@vue/test-utils'
import ArticlePreview from '../components/ArticlePreview.vue'

const createWrapper = (article) => {
  return mount(ArticlePreview, {
    propsData: {
      article
    },
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
}

describe('ArticlePreview', () => {
  let article

  beforeEach(() => {
    article = {
      slug: 'how-to-train-your-dragon',
      title: 'How to train your dragon',
      description: 'Ever wonder how?',
      body: 'It takes a Jacobian',
      tagList: ['dragons', 'training'],
      createdAt: '2016-02-18T03:22:56.637Z',
      updatedAt: '2016-02-18T03:48:35.824Z',
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'jake',
        bio: 'I work at statefarm',
        image: 'https://i.stack.imgur.com/xHWG8.jpg',
        following: false
      }
    }
  })

  it('should display the title', () => {
    const wrapper = createWrapper(article)
    const titleHeader = wrapper.find('h1')
    expect(titleHeader.text()).toContain(article.title)
  })

  it('should display the date with the full month and a day', () => {
    const wrapper = createWrapper(article)
    const dateSpan = wrapper.find('span.date')
    expect(dateSpan.text()).toHaveLength(13)
    expect(dateSpan.text()).toContain('February')
    expect(dateSpan.text()).toContain('th')
    expect(dateSpan.text()).not.toContain('2016')
  })

  it('should have a link to the full article', () => {
    const wrapper = createWrapper(article)
    const link = wrapper.find('a.preview-link')
    expect(link.props().to).toEqual('article/how-to-train-your-dragon')
  })
})
