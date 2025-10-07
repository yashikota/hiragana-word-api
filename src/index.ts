import { Hono } from "hono";
import { cors } from "hono/cors";
import wordsData from "./words.json";

interface WordCategory {
  name: string;
  words: string[];
}

const categories: WordCategory[] = wordsData;

const app = new Hono();
app.use("*", cors());

app.get("/", (c) => {
  const countParam = c.req.query("count");
  const count = countParam ? parseInt(countParam, 10) : 1;
  const categoryParam = c.req.query("category");

  let wordsToSelect: string[];

  if (categoryParam) {
    const category = categories.find((cat) => cat.name === categoryParam);
    wordsToSelect = category ? category.words : [];
  } else {
    wordsToSelect = categories.flatMap((category) => category.words);
  }

  const shuffled = [...wordsToSelect].sort(() => 0.5 - Math.random());
  const selectedWords = shuffled.slice(0, count);
  return c.json(selectedWords);
});

export default app;
