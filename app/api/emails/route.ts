// app/api/emails/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple email template as a string to avoid React component issues
const createEmailTemplate = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  inquiryType: string;
  message: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background-color: #f8f9fa; }
          .card { background-color: white; border-radius: 10px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .footer { background-color: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
          .message-box { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">OKARANIME HERITAGE FOUNDATION</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New Contact Form Submission</p>
        </div>
        
        <div class="content">
          <div class="card">
            <h2 style="color: #4f46e5; margin-bottom: 25px; font-size: 22px;">Contact Form Details</h2>
            
            <table>
              <tbody>
                <tr>
                  <td style="font-weight: bold; width: 140px; color: #374151;">Name:</td>
                  <td style="color: #111827;">${data.firstName} ${
    data.lastName
  }</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #374151;">Email:</td>
                  <td>
                    <a href="mailto:${
                      data.email
                    }" style="color: #4f46e5; text-decoration: none;">${
    data.email
  }</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #374151;">Phone:</td>
                  <td style="color: #111827;">
                    ${
                      data.phone
                        ? `<a href="tel:${data.phone}" style="color: #4f46e5; text-decoration: none;">${data.phone}</a>`
                        : "Not provided"
                    }
                  </td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #374151;">Organization:</td>
                  <td style="color: #111827;">${
                    data.organization || "Not provided"
                  }</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #374151;">Inquiry Type:</td>
                  <td style="color: #111827;">${data.inquiryType}</td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top: 25px;">
              <h3 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Message:</h3>
              <div class="message-box">${data.message}</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>OKARANIME HERITAGE FOUNDATION</strong></p>
          <p style="margin: 0 0 10px 0; opacity: 0.8;">Plots C/52 and C/53 in Urata West Layout, Owerri North L.G.A Imo State, Nigeria</p>
          <p style="margin: 0; opacity: 0.8;">Email: info@okaranime.com.ng | Phone: +2349134861443</p>
        </div>
      </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  console.log("API route called"); // Debug log

  try {
    const body = await request.json();
    console.log("Request body:", body); // Debug log

    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      inquiryType,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !inquiryType || !message) {
      console.log("Missing required fields"); // Debug log
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format"); // Debug log
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
      console.log("RESEND_API_KEY not found"); // Debug log
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("Sending email..."); // Debug log

    const { data, error } = await resend.emails.send({
      from: "OKARANIME HERITAGE FOUNDATION <info@okaranime.com.ng>",
      to: ["info@okaranime.com.ng"],
      replyTo: email,
      subject: `New Contact Form: ${inquiryType} from ${firstName} ${lastName}`,
      html: createEmailTemplate({
        firstName,
        lastName,
        email,
        phone: phone || "Not provided",
        organization: organization || "Not provided",
        inquiryType,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error); // Debug log
      return NextResponse.json(
        { error: `Failed to send email: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data); // Debug log

    return NextResponse.json(
      {
        message: "Email sent successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error); // Debug log
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
