// components/ApplicationEmailTemplate.tsx
import * as React from "react";

interface ApplicationEmailTemplateProps {
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
}

export const ApplicationEmailTemplate: React.FC<
  Readonly<ApplicationEmailTemplateProps>
> = ({
  title,
  firstName,
  surname,
  gender,
  hasDisability,
  disabilitySpecification,
  homeAddress,
  stateOfOrigin,
  lga,
  community,
  email,
  phoneNumber,
  hasConviction,
  hasRelative,
  relativeName,
  isEnrolled,
  hasSkills,
  desiredSkill,
  skills,
  programInterest,
  motivation,
  futureGoals,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
      maxWidth: "800px",
      margin: "0 auto",
    }}>
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
        textAlign: "center",
        color: "white",
      }}>
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>
        OKARANIME HERITAGE FOUNDATION
      </h1>
      <p style={{ margin: "10px 0 0 0", fontSize: "16px", opacity: 0.9 }}>
        New Program Application Received
      </p>
    </div>

    <div style={{ padding: "30px", backgroundColor: "#f8f9fa" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}>
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "25px",
            fontSize: "22px",
            textAlign: "center",
          }}>
          Program Application Details
        </h2>

        {/* Personal Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Personal Information
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    width: "200px",
                    color: "#374151",
                  }}>
                  Full Name:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {title} {firstName} {surname}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Gender:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {gender}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Disability:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {hasDisability === "yes"
                    ? `Yes - ${disabilitySpecification || "Not specified"}`
                    : "No"}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Address:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {homeAddress}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Origin:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {stateOfOrigin}, {lga}, {community}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Contact:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  <a
                    href={`mailto:${email}`}
                    style={{ color: "#4f46e5", textDecoration: "none" }}>
                    {email}
                  </a>{" "}
                  |
                  <a
                    href={`tel:${phoneNumber}`}
                    style={{
                      color: "#4f46e5",
                      textDecoration: "none",
                      marginLeft: "10px",
                    }}>
                    {phoneNumber}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Background Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Background Information
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    width: "200px",
                    color: "#374151",
                  }}>
                  Criminal Conviction:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {hasConviction === "yes" ? "Yes" : "No"}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Relative in Organization:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {hasRelative === "yes"
                    ? `Yes - ${relativeName || "Not specified"}`
                    : "No"}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Currently Enrolled:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {isEnrolled === "yes" ? "Yes" : "No"}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Existing Skills:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {hasSkills === "yes"
                    ? skills.length > 0
                      ? skills.join(", ")
                      : "None selected"
                    : `Wants to learn: ${desiredSkill}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Program Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Program Information
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    width: "200px",
                    color: "#374151",
                  }}>
                  Program Interest:
                </td>
                <td
                  style={{
                    padding: "12px 0",
                    color: "#111827",
                    fontWeight: "bold",
                  }}>
                  {programInterest}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <h4
              style={{
                color: "#374151",
                marginBottom: "10px",
                fontSize: "16px",
              }}>
              Motivation:
            </h4>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                whiteSpace: "pre-wrap",
                lineHeight: "1.5",
              }}>
              {motivation}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h4
              style={{
                color: "#374151",
                marginBottom: "10px",
                fontSize: "16px",
              }}>
              Future Goals:
            </h4>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                whiteSpace: "pre-wrap",
                lineHeight: "1.5",
              }}>
              {futureGoals}
            </div>
          </div>
        </div>

        {/* Application Summary */}
        <div
          style={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: "8px",
            padding: "20px",
            marginTop: "20px",
          }}>
          <h4
            style={{
              color: "#0369a1",
              marginBottom: "10px",
              fontSize: "16px",
            }}>
            Application Summary
          </h4>
          <p style={{ margin: 0, color: "#0369a1", fontSize: "14px" }}>
            This application was submitted on{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {new Date().toLocaleTimeString("en-US")}.
          </p>
        </div>
      </div>
    </div>

    <div
      style={{
        backgroundColor: "#374151",
        color: "white",
        padding: "20px",
        textAlign: "center",
        fontSize: "14px",
      }}>
      <p style={{ margin: "0 0 10px 0" }}>
        <strong>OKARANIME HERITAGE FOUNDATION</strong>
      </p>
      <p style={{ margin: "0 0 10px 0", opacity: 0.8 }}>
        Plots C/52 and C/53 in Urata West Layout, Owerri North L.G.A Imo State,
        Nigeria
      </p>
      <p style={{ margin: "0", opacity: 0.8 }}>
        Email: info@okaranime.com.ng | Phone: +2349134861443
      </p>
    </div>
  </div>
);
