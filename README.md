# Hiragana Word API

A simple API that provides Japanese hiragana words from different categories.

## Categories

The API includes the following categories:

- `fruits`: りんご, みかん, etc.
- `flowers`: さくら, うめ, etc.
- `fish`: まぐろ, しゃけ, えび, etc.
- `animals`: いぬ, ねこ, etc.
- `vegetables`: にんじん, じゃがいも, etc.
- `colors`: あか, あお, etc.

## API Endpoints

### Get All Categories

```http
GET /categories
```

### Get Words from a Specific Category

```http
GET /category/:name
```

Example: `/category/fruits`

### Get Random Words

```http
GET /random?categories=fruits,animals&count=3
```

Parameters:

- `categories` (optional): Comma-separated list of categories
- `count` (optional): Number of random words to return from each category

### Get Combinations of Words

```http
GET /combine?categories=fruits,animals&count=3
```

Parameters:

- `categories` (required): Comma-separated list of categories
- `count` (optional): Number of combinations to generate

Example response:

```json
{
  "combinations": [
    [
      {
        "category": "fruits",
        "word": "りんご"
      },
      {
        "category": "animals",
        "word": "いぬ"
      }
    ],
    [
      {
        "category": "fruits",
        "word": "みかん"
      },
      {
        "category": "animals",
        "word": "ねこ"
      }
    ],
    [
      {
        "category": "fruits",
        "word": "ばなな"
      },
      {
        "category": "animals",
        "word": "うさぎ"
      }
    ]
  ]
}
```
```

### Using Combine with Two Specific Categories

Using the `/combine` endpoint, you can create combinations with exactly 2 categories:

```http
GET /combine?categories=fruits,animals&count=2
```

This will return random words combined from the 'fruits' and 'animals' categories.

Example response with fruits and animals:
```json
{
  "combinations": [
    [
      {
        "category": "fruits",
        "word": "りんご"
      },
      {
        "category": "animals",
        "word": "いぬ"
      }
    ],
    [
      {
        "category": "fruits",
        "word": "みかん"
      },
      {
        "category": "animals",
        "word": "ねこ"
      }
    ]
  ]
}
```

For Japanese word combinations like "りんごいぬ" (apple-dog) or "みかんねこ" (orange-cat), you can use this endpoint to generate fun compound words.

### Random Categories Combination

If you want the API to randomly select categories for you, use the `/random-combine` endpoint:

```http
GET /random-combine
```

Parameters:
- `categoryCount` (optional): Number of categories to randomly select (default: 2)
- `count` (optional): Number of combinations to generate (default: 1)

Example:
```http
GET /random-combine?categoryCount=3&count=2
```

Example response:
```json
{
  "combinations": [
    [
      {
        "category": "vegetables",
        "word": "きゅうり"
      },
      {
        "category": "animals",
        "word": "いぬ"
      }
    ]
  ],
  "selectedCategories": [
    "vegetables",
    "animals"
  ]
}
```

This is perfect for creating random word combinations when you don't have specific categories in mind!

## Development

```bash
pnpm install
pnpm run dev
```

## Deployment

```bash
pnpm run deploy
```

## Type Generation

For generating/synchronizing types based on your Worker configuration:

```bash
pnpm run cf-typegen
```
