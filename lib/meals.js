import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");

export async function getmeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("error is there ");
  return db.prepare("SELECT * FROM meals").all();
}
export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug=?").get(slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedimage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedimage),(error)=>{
    if(error){
        throw new Error("saving image failed");
    }
  });
  meal.image= `/images/${filename}`;
  try {
    db.prepare(`
      INSERT INTO meals
      (title,summary,instructions,creator,creator_email,image,slug)
      VALUES(
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,
          @image,
          @slug
        )
      `).run(meal);
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed: meals.slug')) {
      // If the error indicates a duplicate slug, modify the slug to make it unique
      const timestamp = Date.now();
      meal.slug = `${meal.slug}-${timestamp}`;
      // Retry insertion with the modified slug
      db.prepare(`
        INSERT INTO meals
        (title,summary,instructions,creator,creator_email,image,slug)
        VALUES(
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
          )
        `).run(meal);
    } else {
      // For other errors, re-throw the error
      throw err;
    }
  }
//   db.prepare(`
//   INSERT INTO meals
//   (title,summary,instructions,creator,creator_email,image,slug)
//   VALUES(
//       @title,
//       @summary,
//       @instructions,
//       @creator,
//       @creator_email,
//       @image,
//       @slug
//     )
//   `).run(meal);
}
