import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const userStates = new Map();


bot.onText(/\/add/, (msg) => {
  const chatId = msg.chat.id;

  userStates.set(chatId, {
    mode: "add",
    step: 1,
    product: {},
  });

  bot.sendMessage(chatId, "✔ أرسل اسم المنتج:");
});

bot.onText(/\/erase/, (msg) => {
  const chatId = msg.chat.id;

  userStates.set(chatId, { mode: "erase" });

  bot.sendMessage(chatId, "🗑️ أرسل اسم المنتج أو UUID لحذفه:");
});

bot.onText(/\/price/, (msg) => {
  const chatId = msg.chat.id;

  userStates.set(chatId, { mode: "price", step: 1 });

  bot.sendMessage(chatId, "💲 أرسل اسم المنتج أو UUID الذي تريد تغيير سعره:");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId);

  if (!state) return;
  if (msg.text && msg.text.startsWith("/")) return; 

  if (state.mode === "add") {
    const { step, product } = state;

    if (msg.photo) return; 

    switch (step) {
      case 1:
        product.name = msg.text.trim();
        state.step = 2;
        bot.sendMessage(chatId, "✔ أرسل وصف المنتج:");
        break;
      case 2:
        product.description = msg.text.trim();
        state.step = 3;
        bot.sendMessage(chatId, "✔ أرسل السعر:");
        break;
      case 3:
        if (isNaN(msg.text)) {
          bot.sendMessage(chatId, "❌ السعر يجب أن يكون رقمًا. أعد الإرسال:");
          return;
        }
        product.price = Number(msg.text);
        state.step = 4;
        bot.sendMessage(chatId, "✔ أرسل صورة المنتج الآن:");
        break;
    }
  }

  else if (state.mode === "erase") {
    const input = msg.text.trim();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    try {
      const { data, error } = await supabase
        .from("products")
        .delete()
        [uuidRegex.test(input) ? "eq" : "eq"](
          uuidRegex.test(input) ? "id" : "name",
          input
        );

      if (error) throw error;
      if (!data || data.length === 0) {
        bot.sendMessage(chatId, "❌ لم يتم العثور على المنتج.");
      } else {
        bot.sendMessage(chatId, `🗑️ تم حذف المنتج (${input}) بنجاح.`);
      }
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, "❌ حدث خطأ أثناء الحذف.");
    }

    userStates.delete(chatId);
  }

  else if (state.mode === "price") {
    const input = msg.text.trim();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (state.step === 1) {
      state.target = input;
      state.step = 2;
      bot.sendMessage(chatId, "✔ أرسل السعر الجديد:");
      return;
    }

    if (state.step === 2) {
      if (isNaN(input)) {
        bot.sendMessage(chatId, "❌ السعر يجب أن يكون رقمًا. أعد الإرسال:");
        return;
      }

      const newPrice = Number(input);

      try {
        const { data, error } = await supabase
          .from("products")
          .update({ price: newPrice })
          [uuidRegex.test(state.target) ? "eq" : "eq"](
            uuidRegex.test(state.target) ? "id" : "name",
            state.target
          );

        if (error) throw error;
        if (!data || data.length === 0) {
          bot.sendMessage(chatId, "❌ لم يتم العثور على المنتج.");
        } else {
          bot.sendMessage(
            chatId,
            `💲 تم تغيير سعر المنتج (${state.target}) إلى: ${newPrice} DA`
          );
        }
      } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, "❌ خطأ غير متوقع أثناء تغيير السعر.");
      }

      userStates.delete(chatId);
    }
  }
});

bot.on("photo", async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId);

  if (!state || state.mode !== "add" || state.step !== 4) return;

  try {
    const product = state.product;
    const photo = msg.photo[msg.photo.length - 1]; 
    const file = await bot.getFile(photo.file_id);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    const imageBuffer = Buffer.from(await fetch(fileUrl).then((res) => res.arrayBuffer()));
    const fileName = `product_${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageBuffer, { contentType: "image/jpeg" });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    product.image_url = data.publicUrl;

    const { data: inserted, error: dbError } = await supabase
      .from("products")
      .insert([product])
      .select();

    if (dbError) throw dbError;

    bot.sendMessage(chatId, `🎉 تم إضافة المنتج بنجاح!\n🆔 ID: ${inserted[0].id}`);
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "❌ خطأ غير متوقع أثناء إضافة المنتج.");
  }

  userStates.delete(chatId);
});
