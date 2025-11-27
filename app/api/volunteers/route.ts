// app/api/volunteers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface VolunteerFormData {
  // Personal Details
  fullName: string;
  dateOfBirth: string;
  idPassportNumber: string;
  gender: string;
  residentialAddress: string;
  phoneNumber: string;
  email: string;
  hasDisability: string;
  disabilitySpecification: string;

  // Volunteer Interests
  volunteerPillars: string[];
  volunteerActivities: string[];
  otherActivity: string;
  hasVolunteerExperience: string;
  volunteerExperience: string;
  skillsQualifications: string;

  // Additional Information
  dietaryRestrictions: string;
  medicalConditions: string;
  hearAboutUs: string;

  // Consent and Declaration
  consentFullName: string;
  consentDate: string;

  // Indemnity Form
  indemnityFullName: string;
  indemnityIdNumber: string;
  indemnityDate: string;
  witnessName: string;
  witnessDate: string;
}

// HTML email template for volunteer applications
const createVolunteerEmailTemplate = (data: VolunteerFormData): string => {
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
          .pillar-list, .activity-list { list-style: none; padding: 0; margin: 0; }
          .pillar-list li, .activity-list li { background: #f3f4f6; padding: 8px 12px; margin: 4px 0; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">OKARANIME HERITAGE FOUNDATION</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New Volunteer Application Received</p>
        </div>
        
        <div class="content">
          <div class="card">
            <h2 style="color: #4f46e5; margin-bottom: 25px; font-size: 22px; text-align: center;">Volunteer Application Details</h2>
            
            <!-- Personal Information -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Personal Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Full Name:</td>
                    <td style="color: #111827;">${data.fullName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Date of Birth:</td>
                    <td style="color: #111827;">${new Date(
                      data.dateOfBirth
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">ID/Passport Number:</td>
                    <td style="color: #111827;">${data.idPassportNumber}</td>
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
                    <td style="font-weight: bold; color: #374151;">Residential Address:</td>
                    <td style="color: #111827;">${data.residentialAddress}</td>
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

            <!-- Volunteer Interests -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Volunteer Interests</h3>
              
              <div style="margin-bottom: 20px;">
                <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Volunteer Pillars:</h4>
                <ul class="pillar-list">
                  ${data.volunteerPillars
                    .map((pillar) => `<li>${pillar}</li>`)
                    .join("")}
                </ul>
              </div>

              <div style="margin-bottom: 20px;">
                <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Volunteer Activities:</h4>
                <ul class="activity-list">
                  ${data.volunteerActivities
                    .map((activity) => {
                      if (
                        activity === "Other (please specify)" &&
                        data.otherActivity
                      ) {
                        return `<li>Other - ${data.otherActivity}</li>`;
                      }
                      return `<li>${activity}</li>`;
                    })
                    .join("")}
                </ul>
              </div>

              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Volunteer Experience:</td>
                    <td style="color: #111827;">${
                      data.hasVolunteerExperience === "yes" ? "Yes" : "No"
                    }</td>
                  </tr>
                  ${
                    data.hasVolunteerExperience === "yes" &&
                    data.volunteerExperience
                      ? `
                        <tr>
                          <td style="font-weight: bold; color: #374151;">Experience Details:</td>
                          <td style="color: #111827;">
                            <div class="message-box">${data.volunteerExperience}</div>
                          </td>
                        </tr>
                      `
                      : ""
                  }
                </tbody>
              </table>
            </div>

            <!-- Skills and Qualifications -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Skills & Qualifications</h3>
              ${
                data.skillsQualifications
                  ? `
                    <div class="message-box">${data.skillsQualifications}</div>
                  `
                  : "<p style='color: #6b7280; font-style: italic;'>No skills or qualifications provided</p>"
              }
            </div>

            <!-- Additional Information -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Additional Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Dietary Restrictions:</td>
                    <td style="color: #111827;">${
                      data.dietaryRestrictions || "None"
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Medical Conditions:</td>
                    <td style="color: #111827;">${
                      data.medicalConditions || "None"
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Heard About Us:</td>
                    <td style="color: #111827;">${data.hearAboutUs}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Consent and Declaration -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Consent & Declaration</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Consent Name:</td>
                    <td style="color: #111827;">${data.consentFullName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Consent Date:</td>
                    <td style="color: #111827;">${new Date(
                      data.consentDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Indemnity Form -->
            <div style="margin-bottom: 30px;">
              <h3 class="section-title">Indemnity Form</h3>
              <table>
                <tbody>
                  <tr>
                    <td style="font-weight: bold; width: 200px; color: #374151;">Indemnity Name:</td>
                    <td style="color: #111827;">${data.indemnityFullName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">ID/Passport Number:</td>
                    <td style="color: #111827;">${data.indemnityIdNumber}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #374151;">Indemnity Date:</td>
                    <td style="color: #111827;">${new Date(
                      data.indemnityDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</td>
                  </tr>
                  ${
                    data.witnessName
                      ? `
                        <tr>
                          <td style="font-weight: bold; color: #374151;">Witness Name:</td>
                          <td style="color: #111827;">${data.witnessName}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; color: #374151;">Witness Date:</td>
                          <td style="color: #111827;">${
                            data.witnessDate
                              ? new Date(data.witnessDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : "Not provided"
                          }</td>
                        </tr>
                      `
                      : ""
                  }
                </tbody>
              </table>
            </div>

            <!-- Application Summary -->
            <div class="summary">
              <h4 style="color: #0369a1; margin-bottom: 10px; font-size: 16px;">Application Summary</h4>
              <p style="margin: 0; color: #0369a1; font-size: 14px;">
                This volunteer application was submitted on ${new Date().toLocaleDateString(
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
  console.log("Volunteer API route called");

  try {
    const body: VolunteerFormData = await request.json();
    console.log("Volunteer request body received");

    // Validate required fields
    const requiredFields = [
      "fullName",
      "dateOfBirth",
      "idPassportNumber",
      "gender",
      "residentialAddress",
      "phoneNumber",
      "email",
      "hasDisability",
      "hasVolunteerExperience",
      "hearAboutUs",
      "consentFullName",
      "consentDate",
      "indemnityFullName",
      "indemnityIdNumber",
      "indemnityDate",
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

    // Validate volunteer pillars and activities
    if (body.volunteerPillars.length === 0) {
      return NextResponse.json(
        { error: "At least one volunteer pillar must be selected" },
        { status: 400 }
      );
    }

    if (body.volunteerActivities.length === 0) {
      return NextResponse.json(
        { error: "At least one volunteer activity must be selected" },
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

    console.log("Sending volunteer application email...");

    const { data, error } = await resend.emails.send({
      from: "OKARANIME HERITAGE FOUNDATION <volunteers@okaranime.com.ng>",
      to: ["volunteers@okaranime.com.ng", "info@okaranime.com.ng"],
      replyTo: body.email,
      subject: `New Volunteer Application - ${body.fullName}`,
      html: createVolunteerEmailTemplate(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Failed to send volunteer application: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("Volunteer application email sent successfully");

    return NextResponse.json(
      {
        message: "Volunteer application submitted successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Volunteer API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
