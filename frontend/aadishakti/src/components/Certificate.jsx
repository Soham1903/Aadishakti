import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Certificate({ name, course, date }) {
  const certificateRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", -10, 0, pdfWidth + 20, pdfHeight);
    pdf.save(`certificate-${name}.pdf`);
  };

  return (
    <div>
      <div ref={certificateRef} style={styles.container}>
        {/* Decorative corner elements */}
        <div style={styles.cornerTopLeft}></div>
        <div style={styles.cornerTopRight}></div>
        <div style={styles.cornerBottomLeft}></div>
        <div style={styles.cornerBottomRight}></div>

        {/* Main border with ornate design */}
        <div style={styles.outerBorder}>
          <div style={styles.innerBorder}>
            <div style={styles.content}>
              {/* Logo Section */}
              <div style={styles.logoRow}>
                <img
                  src="/assets/aadishaktipng.png"
                  alt="Logo 1"
                  style={styles.logo}
                />
                <img
                  src="/assets/Adishakti TEXT logo.png"
                  alt="Logo 2"
                  style={styles.logo}
                />
              </div>

              {/* Title with decorative elements */}
              <div style={styles.titleSection}>
                <div style={styles.decorativeLine}></div>
                <h1 style={styles.title}>Certificate of Completion</h1>
                <div style={styles.decorativeLine}></div>
              </div>

              {/* Certificate Body */}
              <div style={styles.bodySection}>
                <p style={styles.subtitle}>This is to certify that</p>

                <div style={styles.nameSection}>
                  <span style={styles.name}>{name}</span>
                  <div style={styles.nameUnderline}></div>
                </div>

                <p style={styles.text}>has successfully completed the course</p>

                <div style={styles.courseSection}>
                  <span style={styles.courseName}>{course}</span>
                </div>

                <p style={styles.text}>
                  on <span style={styles.dateText}>{date}</span>
                </p>

                {/* Decorative seal */}
                <div style={styles.sealContainer}>
                  <div style={styles.seal}>
                    <div style={styles.sealInner}>
                      <span style={styles.sealText}>CERTIFIED</span>
                    </div>
                  </div>
                </div>

                <p style={styles.footer}>
                  Congratulations on your achievement!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        <button onClick={handleDownload} style={styles.button}>
          Download Certificate
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "1120px",
    height: "794px",
    margin: "100px auto 50px auto",
    position: "relative",
    fontFamily: "'Georgia', serif",
    background:
      "linear-gradient(135deg, #f8f5f0 0%, #ffffff 50%, #f8f5f0 100%)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  outerBorder: {
    position: "absolute",
    top: "20px",
    left: "20px",
    right: "20px",
    bottom: "20px",
    border: "8px solid #2c5530",
    borderImage: "linear-gradient(45deg, #2c5530, #4a7c59, #2c5530) 1",
    background:
      "linear-gradient(135deg, #faf7f2 0%, #ffffff 50%, #faf7f2 100%)",
  },

  innerBorder: {
    position: "absolute",
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    border: "3px solid #d4af37",
    background: "radial-gradient(ellipse at center, #ffffff 0%, #f9f6f0 100%)",
  },

  content: {
    padding: "40px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
  },

  logoRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginBottom: "20px",
  },

  logo: {
    height: "90px",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },

  titleSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  decorativeLine: {
    width: "100px",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
  },

  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2c5530",
    margin: "0",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    letterSpacing: "2px",
  },

  bodySection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "25px",
  },

  subtitle: {
    fontSize: "1.4rem",
    color: "#5a5a5a",
    margin: "0",
    fontStyle: "italic",
  },

  nameSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },

  name: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c5530",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    letterSpacing: "1px",
  },

  nameUnderline: {
    width: "400px",
    height: "3px",
    background: "linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)",
    borderRadius: "2px",
  },

  text: {
    fontSize: "1.3rem",
    color: "#4a4a4a",
    margin: "0",
    lineHeight: "1.6",
  },

  courseSection: {
    margin: "10px 0",
  },

  courseName: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#2c5530",
    fontStyle: "italic",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },

  dateText: {
    fontWeight: "bold",
    color: "#2c5530",
  },

  sealContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },

  seal: {
    width: "100px",
    height: "100px",
    border: "4px solid #d4af37",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle, #f4d03f 0%, #d4af37 100%)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },

  sealInner: {
    width: "70px",
    height: "70px",
    border: "2px solid #2c5530",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
  },

  sealText: {
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "#2c5530",
    letterSpacing: "1px",
  },

  footer: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    color: "#2c5530",
    margin: "0",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },

  // Decorative corner elements
  cornerTopLeft: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #d4af37, #f4d03f)",
    clipPath: "polygon(0 0, 100% 0, 0 100%)",
  },

  cornerTopRight: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #d4af37, #f4d03f)",
    clipPath: "polygon(100% 0, 100% 100%, 0 0)",
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #d4af37, #f4d03f)",
    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #d4af37, #f4d03f)",
    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
  },

  button: {
    padding: "15px 30px",
    fontSize: "1.1rem",
    backgroundColor: "#2c5530",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
};

export default Certificate;
