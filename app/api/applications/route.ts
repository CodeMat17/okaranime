// app/api/applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ApplicationFormData {
  // Personal Information
  title: string;
  firstName: string;
  surname: string;
  gender: string;
  hasDisability: string;
  disabilitySpecification: string;
  homeAddress: string;
  stateOfOrigin: string;
  lga: string;
  community: string;
  email: string;
  phoneNumber: string;

  // Background Information
  hasConviction: string;
  hasRelative: string;
  relativeName: string;
  isEnrolled: string;
  hasSkills: string;
  desiredSkill: string;
  skills: string[];

  // Program Selection
  programInterest: string;
  motivation: string;
  futureGoals: string;

  // Terms
  agreeToTerms: boolean;
  agreeToDataProcessing: boolean;
}

// HTML email template for applications
const createApplicationEmailTemplate = (data: ApplicationFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background-color: #f8f9fa; }
          .card { background-color: white; border-radius: 10px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          td { padding: 12px 0; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
          .section-title { color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px; }
          .footer { background-color: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
          .message-box { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.5; margin: 10px 0; }
          .summary { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">OKARANIME HERITAGE FOUNDATION</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New Program Application Received</p>
        </div>
        
        <div class="content">
          <div class="card">
            <h2 style="color: #4f46e5; margin-bottom: 25px; font-size: 22px; text-align: center;">Program Application Details</h2>
            
            <!-- Personal Information -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Personal Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Full Name:</td>
                    <td style="color: #111827;">${data.title} ${
    data.firstName
  } ${data.surname}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Gender:</td>
                    <td style="color: #111827;">${data.gender}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Disability:</td>
                    <td style="color: #111827;">
                      ${
                        data.hasDisability === "yes"
                          ? `Yes - ${
                              data.disabilitySpecification || "Not specified"
                            }`
                          : "No"
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Home Address:</td>
                    <td style="color: #111827;">${data.homeAddress}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">State of Origin:</td>
                    <td style="color: #111827;">${data.stateOfOrigin}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">LGA:</td>
                    <td style="color: #111827;">${data.lga}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Community/Town:</td>
                    <td style="color: #111827;">${data.community}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Email:</td>
                    <td style="color: #111827;">
                      <a href="mailto:${
                        data.email
                      }" style="color: #4f46e5; text-decoration: none;">${
    data.email
  }</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Phone Number:</td>
                    <td style="color: #111827;">
                      <a href="tel:${
                        data.phoneNumber
                      }" style="color: #4f46e5; text-decoration: none;">${
    data.phoneNumber
  }</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Background Information -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Background Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Criminal Conviction:</td>
                    <td style="color: #111827;">${
                      data.hasConviction === "yes" ? "Yes" : "No"
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Relative in Organization:</td>
                    <td style="color: #111827;">
                      ${
                        data.hasRelative === "yes"
                          ? `Yes - ${data.relativeName || "Not specified"}`
                          : "No"
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Currently Enrolled:</td>
                    <td style="color: #111827;">${
                      data.isEnrolled === "yes" ? "Yes" : "No"
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Existing Skills:</td>
                    <td style="color: #111827;">
                      ${
                        data.hasSkills === "yes"
                          ? data.skills.length > 0
                            ? data.skills.join(", ")
                            : "None selected"
                          : `Wants to learn: ${data.desiredSkill}`
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Program Information -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Program Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Program Interest:</td>
                    <td style="color: #111827; font-weight: bold;">${
                      data.programInterest
                    }</td>
                  </tr>
                </tbody>
              </table>

              <div style="margin-top: 20px;">
                <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Motivation:</h4>
                <div class="message-box">${data.motivation}</div>
              </div>

              <div style="margin-top: 20px;">
                <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Future Goals:</h4>
                <div class="message-box">${data.futureGoals}</div>
              </div>
            </div>

            <!-- Terms Agreement -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Terms & Agreements</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Agreed to Terms:</td>
                    <td style="color: #111827;">${
                      data.agreeToTerms ? "Yes" : "No"
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Agreed to Data Processing:</td>
                    <td style="color: #111827;">${
                      data.agreeToDataProcessing ? "Yes" : "No"
                    }</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Application Summary -->
            <div class="summary">
              <h4 style="color: #0369a1; margin-bottom: 10px; font-size: 16px;">Application Summary</h4>
              <p style="margin: 0; color: #0369a1; font-size: 14px;">
                This application was submitted on ${new Date().toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )} at ${new Date().toLocaleTimeString("en-US")}.
              </p>
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
  console.log("Application API route called");

  try {
    const body: ApplicationFormData = await request.json();
    console.log("Application request body received");

    // Validate required fields
    const requiredFields = [
      "title",
      "firstName",
      "surname",
      "gender",
      "hasDisability",
      "homeAddress",
      "stateOfOrigin",
      "lga",
      "community",
      "email",
      "phoneNumber",
      "hasConviction",
      "hasRelative",
      "isEnrolled",
      "hasSkills",
      "programInterest",
      "motivation",
      "futureGoals",
      "agreeToTerms",
      "agreeToDataProcessing",
    ] as const;

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log("Invalid email format");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
      console.log("RESEND_API_KEY not found");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("Sending application email...");

    const { data, error } = await resend.emails.send({
      from: "OKARANIME HERITAGE FOUNDATION <info@okaranime.com.ng>",
      to: ["info@okaranime.com.ng"],
      replyTo: body.email,
      subject: `New Program Application: ${body.programInterest} - ${body.firstName} ${body.surname}`,
      html: createApplicationEmailTemplate(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Failed to send application: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("Application email sent successfully");

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Application API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
