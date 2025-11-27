// components/volunteer/VolunteerEmailTemplate.tsx
import * as React from "react";

interface VolunteerEmailTemplateProps {
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

export const VolunteerEmailTemplate: React.FC<
  Readonly<VolunteerEmailTemplateProps>
> = ({
  fullName,
  dateOfBirth,
  idPassportNumber,
  gender,
  residentialAddress,
  phoneNumber,
  email,
  hasDisability,
  disabilitySpecification,
  volunteerPillars,
  volunteerActivities,
  otherActivity,
  hasVolunteerExperience,
  volunteerExperience,
  skillsQualifications,
  dietaryRestrictions,
  medicalConditions,
  hearAboutUs,
  consentFullName,
  consentDate,
  indemnityFullName,
  indemnityIdNumber,
  indemnityDate,
  witnessName,
  witnessDate,
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
        New Volunteer Application Received
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
          Volunteer Application Details
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
                  {fullName}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Date of Birth:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {new Date(dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  ID/Passport:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {idPassportNumber}
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
                  {residentialAddress}
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

        {/* Volunteer Interests */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Volunteer Interests
          </h3>

          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                color: "#374151",
                marginBottom: "10px",
                fontSize: "16px",
              }}>
              Volunteer Pillars:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {volunteerPillars.map((pillar, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f3f4f6",
                    padding: "8px 12px",
                    margin: "4px 0",
                    borderRadius: "6px",
                  }}>
                  {pillar}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                color: "#374151",
                marginBottom: "10px",
                fontSize: "16px",
              }}>
              Volunteer Activities:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {volunteerActivities.map((activity, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f3f4f6",
                    padding: "8px 12px",
                    margin: "4px 0",
                    borderRadius: "6px",
                  }}>
                  {activity === "Other (please specify)" && otherActivity
                    ? `Other - ${otherActivity}`
                    : activity}
                </li>
              ))}
            </ul>
          </div>

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
                  Volunteer Experience:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {hasVolunteerExperience === "yes" ? "Yes" : "No"}
                </td>
              </tr>
              {hasVolunteerExperience === "yes" && volunteerExperience && (
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td
                    style={{
                      padding: "12px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}>
                    Experience Details:
                  </td>
                  <td style={{ padding: "12px 0", color: "#111827" }}>
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.5",
                      }}>
                      {volunteerExperience}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Skills and Qualifications */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Skills & Qualifications
          </h3>
          {skillsQualifications ? (
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                whiteSpace: "pre-wrap",
                lineHeight: "1.5",
              }}>
              {skillsQualifications}
            </div>
          ) : (
            <p style={{ color: "#6b7280", fontStyle: "italic" }}>
              No skills or qualifications provided
            </p>
          )}
        </div>

        {/* Additional Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Additional Information
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
                  Dietary Restrictions:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {dietaryRestrictions || "None"}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Medical Conditions:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {medicalConditions || "None"}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Heard About Us:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {hearAboutUs}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Consent and Declaration */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Consent & Declaration
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
                  Consent Name:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {consentFullName}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Consent Date:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {new Date(consentDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Indemnity Form */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              color: "#374151",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}>
            Indemnity Form
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
                  Indemnity Name:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {indemnityFullName}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  ID/Passport Number:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {indemnityIdNumber}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}>
                  Indemnity Date:
                </td>
                <td style={{ padding: "12px 0", color: "#111827" }}>
                  {new Date(indemnityDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
              {witnessName && (
                <>
                  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td
                      style={{
                        padding: "12px 0",
                        fontWeight: "bold",
                        color: "#374151",
                      }}>
                      Witness Name:
                    </td>
                    <td style={{ padding: "12px 0", color: "#111827" }}>
                      {witnessName}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td
                      style={{
                        padding: "12px 0",
                        fontWeight: "bold",
                        color: "#374151",
                      }}>
                      Witness Date:
                    </td>
                    <td style={{ padding: "12px 0", color: "#111827" }}>
                      {witnessDate
                        ? new Date(witnessDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not provided"}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
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
            This volunteer application was submitted on{" "}
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
        Email: volunteers@okaranime.com.ng | Phone: +2349134861443
      </p>
    </div>
  </div>
);
