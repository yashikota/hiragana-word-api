# hiragana-word-api

ひらがなの単語をランダムに返すシンプルなAPIです。  
A simple API that provides random Japanese hiragana words.  

## Overview

このURLにGETリクエストを送るとこのようなレスポンスが帰ってきます。  
If you send a GET request to this URL, you will get a response like this.  

```txt
https://hiragana-word-api.yashikota.workers.dev
```

```json
["りんご"]
```

クエリパラメータで `count=3` などのように個数を選択すると個数分帰ってきます。  
If you specify the number of words with a query parameter like `count=3`, you will receive that number of words in the response.  

```txt
https://hiragana-word-api.yashikota.workers.dev/?count=3
```

```json
["ゆき", "ねこ", "あか"]
```

単語一覧は [words.json](./src/words.json) にあります。  
The list of words can be found in [words.json](./src/words.json).  
