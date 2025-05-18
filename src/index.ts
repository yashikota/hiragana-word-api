import { Hono } from 'hono'

// Define word categories
interface WordCategory {
  name: string;
  words: string[];
}

const categories: WordCategory[] = [
  {
    name: 'fruits',
    words: ['りんご', 'みかん', 'ばなな', 'ぶどう', 'もも', 'めろん', 'いちご', 'すいか', 'なし', 'かき']
  },
  {
    name: 'flowers',
    words: ['さくら', 'うめ', 'ちゅーりっぷ', 'ひまわり', 'あじさい', 'ゆり', 'ばら', 'あさがお', 'たんぽぽ', 'なのはな']
  },
  {
    name: 'fish',
    words: ['まぐろ', 'しゃけ', 'えび', 'たい', 'さば', 'あじ', 'うなぎ', 'いわし', 'ほたて', 'たこ']
  },
  {
    name: 'animals',
    words: ['いぬ', 'ねこ', 'うさぎ', 'ぱんだ', 'きりん', 'ぞう', 'らいおん', 'とら', 'くま', 'さる']
  },
  {
    name: 'vegetables',
    words: ['にんじん', 'じゃがいも', 'たまねぎ', 'きゅうり', 'なす', 'とまと', 'かぼちゃ', 'だいこん', 'ほうれんそう', 'れたす']
  },
  {
    name: 'colors',
    words: ['あか', 'あお', 'きいろ', 'みどり', 'むらさき', 'しろ', 'くろ', 'ぴんく', 'おれんじ', 'ちゃいろ']
  }
]

const app = new Hono()

// Get all categories
app.get('/categories', (c) => {
  return c.json({
    categories: categories.map(category => category.name)
  })
})

// Get words from a specific category
app.get('/category/:name', (c) => {
  const categoryName = c.req.param('name')
  const category = categories.find(cat => cat.name === categoryName)

  if (!category) {
    return c.json({ error: 'Category not found' }, 404)
  }

  return c.json({ words: category.words })
})

// Get combinations of words from different categories
app.get('/combine', async (c) => {
  const categoryParams = c.req.query('categories')
  const countParam = c.req.query('count')
  const count = countParam ? parseInt(countParam, 10) : 1

  if (!categoryParams) {
    return c.json({ error: 'Please provide categories parameter' }, 400)
  }

  const requestedCategories = categoryParams.split(',')
  const selectedCategories = categories.filter(
    category => requestedCategories.includes(category.name)
  )

  if (selectedCategories.length === 0) {
    return c.json({ error: 'No valid categories found' }, 400)
  }

  // Generate combinations
  const combinations = []

  for (let i = 0; i < count; i++) {
    const combination = selectedCategories.map(category => {
      const randomIndex = Math.floor(Math.random() * category.words.length)
      return {
        category: category.name,
        word: category.words[randomIndex]
      }
    })

    combinations.push(combination)
  }

  return c.json({ combinations })
})

// Get random words from specified categories
app.get('/random', async (c) => {
  const categoryParams = c.req.query('categories')
  const countParam = c.req.query('count')
  const count = countParam ? parseInt(countParam, 10) : 1

  let selectedCategories: WordCategory[] = []

  if (categoryParams) {
    const requestedCategories = categoryParams.split(',')
    selectedCategories = categories.filter(
      category => requestedCategories.includes(category.name)
    )
  } else {
    // If no categories specified, use all categories
    selectedCategories = categories
  }

  if (selectedCategories.length === 0) {
    return c.json({ error: 'No valid categories found' }, 400)
  }

  // Get random words from selected categories
  const result: Record<string, string[]> = {}

  selectedCategories.forEach(category => {
    const shuffled = [...category.words].sort(() => 0.5 - Math.random())
    result[category.name] = shuffled.slice(0, count)
  })

  return c.json(result)
})

// Get combinations with random categories
app.get('/random-combine', async (c) => {
  const countParam = c.req.query('count')
  const categoryCountParam = c.req.query('categoryCount')
  const count = countParam ? parseInt(countParam, 10) : 1
  const categoryCount = categoryCountParam ? parseInt(categoryCountParam, 10) : 2

  // Always use 2 categories by default
  const actualCategoryCount = Math.min(categoryCount, categories.length)

  // Randomly select categories
  const shuffledCategories = [...categories].sort(() => 0.5 - Math.random())
  const selectedCategories = shuffledCategories.slice(0, actualCategoryCount)

  // Generate combinations
  const combinations = []

  for (let i = 0; i < count; i++) {
    const combination = selectedCategories.map(category => {
      const randomIndex = Math.floor(Math.random() * category.words.length)
      return {
        category: category.name,
        word: category.words[randomIndex]
      }
    })

    combinations.push(combination)
  }

  return c.json({
    combinations,
    selectedCategories: selectedCategories.map(cat => cat.name)
  })
})

// Default route for API information
app.get('/', (c) => {
  return c.json({
    message: 'Hiragana Word API',
    endpoints: [
      { path: '/categories', description: 'Get all available categories' },
      { path: '/category/:name', description: 'Get all words for a specific category' },
      { path: '/random', description: 'Get random words. Query params: categories (comma-separated), count (number)' },
      { path: '/combine', description: 'Get combinations of words from different categories. Query params: categories (comma-separated, required), count (number)' },
      { path: '/random-combine', description: 'Get combinations of words from random categories. Query params: categoryCount (number, default: 2), count (number, default: 3)' }
    ]
  })
})

export default app
