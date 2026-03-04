import React, { useState } from "react";
import Banner from "../components/Banner";
import Bats from "../components/Bats";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const TELEGRAM_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

    const message = `
📩 New Contact Message
👤 Name: ${formData.name}
📧 Email: ${formData.email}
💬 Message: ${formData.message}
`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      setStatus("Server error. Try again later.");
    }
  };

  return (
    <div>
      <Banner />
      <Bats />
      <div className="contact-container">
        <h1 className="fade-in">Contact Us</h1>
        <p className="fade-in delay-1">
          We'd love to hear from you! Reach out for inquiries, collaborations, or just to say hi.
        </p>

        <form className="contact-form fade-in delay-2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        {status && <p style={{ color: "#ff4444", marginTop: "10px" }}>{status}</p>}

        <div className="social-icons fade-in delay-3">
          <a href="https://www.instagram.com/whynot.dz03" target="_blank" rel="noopener noreferrer">🅾</a>
          <a href="https://www.tiktok.com/@whynot.dz03" target="_blank" rel="noopener noreferrer">ꚠ</a>
          <a href="https://www.facebook.com/profile.php?id=61577440207036" target="_blank" rel="noopener noreferrer">𝐟</a>
          <a href="https://wa.me/+213667741582" target="_blank" rel="noopener noreferrer">✆</a>
        </div>

        <div className="phone-number fade-in delay-4">
          📞 +213 667 74 15 82
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
