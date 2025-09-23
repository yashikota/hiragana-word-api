# hiragana-word-api

ひらがなをランダムに返すシンプルなAPIです。  
A simple API that provides random Japanese hiragana words.  

## 概要

```txt
https://hiragana-word-api.yashikota.workers.dev
```

このURLにGETリクエストを送ると以下のようなレスポンスが帰ってきます。  

```json
["りんご"]
```

```txt
https://hiragana-word-api.yashikota.workers.dev/?count=3
```

クエリパラメータで `count=3` などのように個数を選択すると個数分帰ってきます。  

```json
["ゆき", "ねこ", "あか"]
```

単語リスト一覧は [words.json](./src/words.json) にあります。  

---

## Overview

```txt
https://hiragana-word-api.yashikota.workers.dev
```

If you send a GET request to this URL, you will get a response like below.  

```json
["りんご"]
```

```txt
https://hiragana-word-api.yashikota.workers.dev/?count=3
```

If you specify the number of words with a query parameter like `count=3`, you will receive that number of words in the response.  

```json
["ゆき", "ねこ", "あか"]
```

The list of words can be found in [words.json](./src/words.json).  
