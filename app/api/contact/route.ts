import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log(`[Contact Form Submission]
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`);

    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "tejasphutane.work@gmail.com",
            reply_to: email,
            subject: `Portfolio: ${subject}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, "<br>")}</p>`,
          }),
        });

        if (response.ok) {
          return NextResponse.json({ success: true, message: "Message sent successfully!" });
        } else {
          const errorData = await response.json();
          console.error("Resend API error response:", errorData);
        }
      } catch (error) {
        console.error("Error sending email via Resend API:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received! (Configure RESEND_API_KEY in Vercel to receive email forwards)",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
