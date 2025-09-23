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

  const allWords = categories.flatMap((category) => category.words);
  const shuffled = [...allWords].sort(() => 0.5 - Math.random());
  const selectedWords = shuffled.slice(0, count);
  return c.json(selectedWords);
});

export default app;
