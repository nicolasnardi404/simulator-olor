import React, { useState, useEffect, useRef } from "react";
import { Buffer } from "buffer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "./PDFReport";
import {
  FaCoffee,
  FaFire,
  FaRecycle,
  FaLeaf,
  FaCar,
  FaWineBottle,
  FaSeedling,
  FaBolt,
  FaFileDownload,
  FaExternalLinkAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import "../styles/SustainabilityDashboard.css";

// Buffer polyfill for PDF generation
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SustainabilityDashboard = () => {
  const [currentView, setCurrentView] = useState("monthly");
  const [dashboardData, setDashboardData] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [chartType, setChartType] = useState("plastic"); // "plastic" or "co2"
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfDocument, setPdfDocument] = useState(null);
  const downloadRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    beanKg: 60,
  });

  // Constants for calculations
  const constants = {
    treeYearlyCo2Capture: 21.77, // kg CO2 per tree per year
    carEmissionsPer100km: 0.12, // 0.12 kg CO2 per km
    plasticBottleWeight: 0.02, // 20g per 500ml bottle
    vcuValue: 30, // EUR per VCU (1 VCU = 1 tonne CO2)
    // Calculator constants
    packagingPlasticFactor: 0.034, // 34g plastic saved per kg of coffee
    roastingCo2Factor: 0.8, // 0.8 kg CO2 saved per kg of coffee roasted
  };

  useEffect(() => {
    loadData();
  }, [currentView]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-update dashboard when form data changes
  useEffect(() => {
    if (formData) {
      const newData = calculateImpactFromForm();
      const dashboardData = {
        ...newData,
        timestamp: new Date().toISOString(),
      };

      setDashboardData(dashboardData);
      localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
      // Reset PDF document when data changes
      setPdfDocument(null);
    }
  }, [formData]);

  // Reset PDF loading state after a delay
  // Handle PDF generation completion
  useEffect(() => {
    if (pdfDocument) {
      setPdfLoading(false);
    }
  }, [pdfDocument]);

  // Reset PDF loading after a delay (fallback)
  useEffect(() => {
    if (pdfLoading) {
      const timer = setTimeout(() => {
        setPdfLoading(false);
        setPdfDocument(null);
        if (downloadRef.current) {
          downloadRef.current = null;
        }
      }, 5000); // Increased timeout for PDF generation
      return () => clearTimeout(timer);
    }
  }, [pdfLoading]);

  // Cleanup effect for download ref
  useEffect(() => {
    return () => {
      if (downloadRef.current) {
        downloadRef.current = null;
      }
    };
  }, []);

  // Calculator functions
  const calculateImpactFromForm = () => {
    const beanKgValue = parseFloat(formData.beanKg) || 0;

    // Calculate impacts based only on coffee beans
    const packagingPlastic = beanKgValue * constants.packagingPlasticFactor; // 34g plastic saved per kg of coffee
    const roastingCo2 = beanKgValue * constants.roastingCo2Factor;

    return {
      beansSold: beanKgValue,
      roastedCoffee: beanKgValue * 1.2, // 120% of beans
      plasticSaved: packagingPlastic,
      co2Saved: roastingCo2,
      estimatedVcu: (roastingCo2 / 1000) * 30, // Convert kg to tonnes and multiply by €30
    };
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Generate PDF document only when needed
  const generatePDFDocument = () => {
    if (!dashboardData) return null;

    try {
      // Reset any existing document state
      setPdfDocument(null);
      if (downloadRef.current) {
        downloadRef.current = null;
      }

      return (
        <PDFReport
          key={`pdf-${Date.now()}`} // Ensure fresh render
          dashboardData={dashboardData}
          currentView={currentView}
        />
      );
    } catch (error) {
      console.error("PDF document generation error:", error);
      setPdfLoading(false);
      setPdfDocument(null);
      return null;
    }
  };

  // Handle PDF download click - generate and download immediately
  const handlePDFDownload = async () => {
    setPdfLoading(true);
    // Reset previous PDF document state
    setPdfDocument(null);

    try {
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));
      const document = generatePDFDocument();
      setPdfDocument(document);

      // Trigger download immediately after generation
      setTimeout(() => {
        if (downloadRef.current) {
          downloadRef.current.click();
          // Reset document state after successful download
          setTimeout(() => {
            setPdfDocument(null);
            setPdfLoading(false);
          }, 500);
        }
      }, 200);
    } catch (error) {
      console.error("PDF generation error:", error);
      setPdfLoading(false);
      setPdfDocument(null);
    }
  };

  const loadData = () => {
    const storedData = localStorage.getItem("dashboardData");

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setDashboardData(parsed);
      } catch (error) {
        console.error("Error parsing stored data:", error);
        // Fallback to sample data
        setDashboardData(getSampleData());
      }
    } else {
      // Fallback to sample data
      setDashboardData(getSampleData());
    }
  };

  const getSampleData = () => {
    const monthlyBase = {
      beansSold: 1000,
      roastedCoffee: 1200,
      plasticSaved: 34,
      co2Saved: 800,
      estimatedVcu: 24,
    };

    return {
      ...monthlyBase,
      timestamp: new Date().toISOString(),
    };
  };

  // Function to get scaled data based on current view
  const getScaledData = (baseData) => {
    if (!baseData) return null;

    const scaleFactor = currentView === "yearly" ? 12 : 1;

    return {
      ...baseData,
      beansSold: Math.round(baseData.beansSold * scaleFactor),
      roastedCoffee: Math.round(baseData.roastedCoffee * scaleFactor),
      plasticSaved: Math.round(baseData.plasticSaved * scaleFactor * 100) / 100,
      co2Saved: Math.round(baseData.co2Saved * scaleFactor * 100) / 100,
      estimatedVcu: Math.round(baseData.estimatedVcu * scaleFactor * 100) / 100,
    };
  };

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return "0";
    if (num >= 1000) {
      return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
    }
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateEquivalents = (data) => {
    const treeEquivalent =
      data.co2Saved / (constants.treeYearlyCo2Capture / 12);
    const carKm = Math.round(
      (data.co2Saved / constants.carEmissionsPer100km) * 100
    );
    const plasticBottles = data.plasticSaved / constants.plasticBottleWeight;

    return {
      trees: treeEquivalent,
      carKm: carKm,
      bottles: Math.round(plasticBottles),
    };
  };

  const getChartData = () => {
    if (!dashboardData) return null;

    try {
      const scaledData = getScaledData(dashboardData);
      if (!scaledData) return null;

      const labels =
        currentView === "monthly"
          ? ["Week 1", "Week 2", "Week 3", "Week 4"]
          : [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];

      const numPoints = labels.length;
      const weeklyPlastic =
        (scaledData.plasticSaved || 0) / (currentView === "monthly" ? 4 : 12);
      const weeklyCo2 =
        (scaledData.co2Saved || 0) / (currentView === "monthly" ? 4 : 12);

      // Create cumulative data - each period shows total accumulated impact
      const plasticData = Array.from({ length: numPoints }, (_, i) =>
        parseFloat((weeklyPlastic * (i + 1)).toFixed(3))
      );
      const co2Data = Array.from({ length: numPoints }, (_, i) =>
        parseFloat((weeklyCo2 * (i + 1)).toFixed(3))
      );

      if (chartType === "plastic") {
        return {
          labels,
          datasets: [
            {
              label: "Cumulative Plastic Saved (kg)",
              data: plasticData,
              borderColor: "#2E7D32",
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#2E7D32",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        };
      } else {
        return {
          labels,
          datasets: [
            {
              label: "Cumulative CO₂ Saved (kg)",
              data: co2Data,
              borderColor: "#1976D2",
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#1976D2",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        };
      }
    } catch (error) {
      console.error("Error generating chart data:", error);
      return null;
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + " kg";
          },
          // Mobile-friendly font size
          font: {
            size: isMobile ? 10 : 12,
          },
        },
        title: {
          display: true,
          text:
            chartType === "plastic"
              ? "Cumulative Plastic Saved (kg)"
              : "Cumulative CO₂ Saved (kg)",
          color: "#3E2723",
          font: {
            size: isMobile ? 10 : 12,
            weight: "normal",
          },
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawOnChartArea: false,
        },
        ticks: {
          // Mobile-friendly font size
          font: {
            size: isMobile ? 10 : 12,
          },
        },
        title: {
          display: true,
          text:
            currentView === "monthly"
              ? "Weekly Breakdown"
              : "Monthly Breakdown",
          color: "#3E2723",
          font: {
            size: isMobile ? 10 : 12,
            weight: "normal",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend since we have toggle buttons
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        // Mobile-friendly tooltip
        titleFont: {
          size: isMobile ? 12 : 14,
        },
        bodyFont: {
          size: isMobile ? 11 : 13,
        },
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            const periodNumber = context.dataIndex + 1;
            return [
              label + ": " + value.toLocaleString() + " kg",
              `Total accumulated by ${
                currentView === "monthly" ? "Week" : "Month"
              } ${periodNumber}`,
            ];
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const scaledData = getScaledData(dashboardData);
  const equivalents = calculateEquivalents(scaledData);
  const chartData = getChartData();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <img
            src="/logo-olor.png"
            alt="OLOR air-roasted in berlin"
            className="logo"
          />
          <h1>Sustainability Impact Simulator</h1>
          <p>Calculate and track your environmental impact in real-time</p>
        </div>
      </header>

      {/* Calculator Section */}
      <section className="calculator-section">
        <div className="calculator-panel">
          <div className="calculator-header">
            <h2>Impact Calculator</h2>
          </div>

          <div className="calculator-content">
            {/* Input Fields */}
            <div className="input-fields">
              <div className="field-group">
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="beanKg">Coffee beans per month (kg)</label>
                    <input
                      type="number"
                      id="beanKg"
                      value={formData.beanKg}
                      onChange={(e) =>
                        handleInputChange("beanKg", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Time Period Selection */}
            <div className="time-period-selector">
              <h3>Time Period</h3>
              <div className="view-toggle-buttons">
                <button
                  className={`view-toggle-btn ${
                    currentView === "monthly" ? "active" : ""
                  }`}
                  onClick={() => setCurrentView("monthly")}
                >
                  Monthly Overview
                </button>
                <button
                  className={`view-toggle-btn ${
                    currentView === "yearly" ? "active" : ""
                  }`}
                  onClick={() => setCurrentView("yearly")}
                >
                  Yearly Projection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Overview */}
      <section className="monthly-overview">
        <div className="view-header">
          <h2>
            {currentView === "monthly"
              ? "Monthly Overview"
              : "Yearly Projection"}
          </h2>
        </div>

        <div className="key-metrics">
          <div className="metric-card">
            <div className="metric-content">
              <div className="value-with-icon">
                <div className="metric-icon">
                  <FaSeedling />
                </div>
                <span className="value">
                  {formatNumber(scaledData.beansSold)}
                </span>
              </div>
              <div className="label">Coffee Beans Sold (kg)</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-content">
              <div className="value-with-icon">
                <div className="metric-icon">
                  <FaBolt />
                </div>
                <span className="value">
                  {formatNumber(scaledData.roastedCoffee)}
                </span>
              </div>
              <div className="label">Roasted Coffee (kg)</div>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        {/* Environmental Impact */}
        <section className="environmental-impact">
          <h2>Environmental Impact</h2>
          <div className="impact-grid">
            <div className="impact-card green">
              <div className="value">
                {formatNumber(scaledData.plasticSaved)} kg
              </div>
              <div className="label">Plastic Saved</div>
            </div>
            <div className="impact-card blue">
              <div className="value">
                {formatNumber(scaledData.co2Saved)} kg
              </div>
              <div className="label">CO₂ Saved</div>
            </div>
            <div className="impact-card purple">
              <div className="value">
                €{formatNumber(scaledData.estimatedVcu)}
              </div>
              <div className="label">Estimated VCU</div>
            </div>
          </div>
          <div className="vcu-info">
            <h3>What is a VCU?</h3>
            <p>
              A Verified Carbon Unit (VCU) represents the reduction or removal
              of one metric tonne of CO₂ equivalent. These carbon credits can be
              traded on voluntary markets.
            </p>
            <p>
              <strong>Market Value:</strong> On average, one VCU is valued
              between €20 and €50, depending on the certification standard,
              project category, and buyer demand. For conservative estimation,
              this dashboard uses €30 per VCU.
            </p>
          </div>
        </section>

        {/* Impact Chart */}
        <section className="impact-chart">
          <div className="chart-header">
            <h2>
              {currentView === "monthly" ? "Weekly" : "Monthly"} Cumulative
              Impact
            </h2>
            <div className="chart-toggle">
              <button
                className={`toggle-btn ${
                  chartType === "plastic" ? "active" : ""
                }`}
                onClick={() => setChartType("plastic")}
              >
                <FaRecycle />
                Plastic Saved
              </button>
              <button
                className={`toggle-btn ${chartType === "co2" ? "active" : ""}`}
                onClick={() => setChartType("co2")}
              >
                <FaLeaf />
                CO₂ Saved
              </button>
            </div>
          </div>
          <div className="chart-container">
            {chartData ? (
              <Line
                key={`${chartType}-${currentView}-${
                  dashboardData?.timestamp || "default"
                }`}
                data={chartData}
                options={chartOptions}
              />
            ) : (
              <div className="chart-loading">
                <p>Loading chart data...</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Impact Equivalents */}
      <section className="impact-equivalents">
        <h2>Environmental Impact Equivalents</h2>
        <div className="equivalents-grid">
          <div className="equivalent-card">
            <div className="emoji">
              <FaLeaf />
            </div>
            <div className="value">{formatNumber(equivalents.trees)}</div>
            <h4>Trees Equivalent</h4>
          </div>
          <div className="equivalent-card">
            <div className="emoji">
              <FaCar />
            </div>
            <div className="value">{formatNumber(equivalents.carKm)}</div>
            <h4>Car Emissions Saved (km)</h4>
          </div>
          <div className="equivalent-card">
            <div className="emoji">
              <FaWineBottle />
            </div>
            <div className="value">{formatNumber(equivalents.bottles)}</div>
            <h4>Plastic Bottles Avoided</h4>
          </div>
        </div>
        <div className="equivalents-notes">
          <ul>
            <li>
              Tree equivalents based on average CO₂ capture of 21.77 kg per tree
              per year.
            </li>
            <li>
              Car emissions equivalents based on average CO₂ emissions of 0.12
              kg per car per km.
            </li>
            <li>
              Plastic bottle equivalents based on average weight of 20g per
              500ml plastic water bottle.
            </li>
          </ul>
        </div>
      </section>

      {/* Download Report */}
      <section className="download-report">
        <div className="download-container">
          <h2>Download Report</h2>
          <p>
            Generate a detailed PDF report of your environmental impact with
            charts and graphics
          </p>
          <div className="pdf-actions">
            {/* Hidden PDFDownloadLink for programmatic download */}
            {pdfDocument && (
              <PDFDownloadLink
                ref={downloadRef}
                document={pdfDocument}
                fileName="olor-sustainability-report.pdf"
                style={{ display: "none" }}
              >
                {({ loading, error }) => {
                  if (error) {
                    console.error("PDF DownloadLink error:", error);
                    setPdfLoading(false);
                    setPdfDocument(null);
                    if (downloadRef.current) {
                      downloadRef.current = null;
                    }
                    return null;
                  }
                  if (loading) {
                    return null;
                  }
                  return null;
                }}
              </PDFDownloadLink>
            )}

            {/* Main download button */}
            <button
              onClick={handlePDFDownload}
              className={`download-button ${pdfLoading ? "loading" : ""}`}
              disabled={pdfLoading}
            >
              <span className="button-icon">
                {pdfLoading ? (
                  <span className="loading-spinner" />
                ) : (
                  <FaFileDownload />
                )}
              </span>
              {pdfLoading
                ? "Generating & Downloading PDF..."
                : "Generate & Download PDF"}
            </button>
          </div>
        </div>
      </section>

      {/* Calculation Methods */}
      <div className="calculation-panel">
        <h2>Calculation Methods</h2>

        <div className="method-section">
          <h3>Coffee Packaging Savings</h3>
          <p>
            Each kilogram of coffee sold in aluminum pails saves 34 grams of
            plastic. This 34g figure is noted as the weight of a standard 1kg
            coffee plastic bag. This reusable packaging solution significantly
            reduces single-use plastic waste.
          </p>
        </div>

        <div className="method-section">
          <h3>Air Roasting CO2 Savings</h3>
          <p>
            Comparison of CO2 emissions for air roasting versus traditional gas
            roasting, based on the German electricity mix (~0.4 kg CO2 per kWh).
          </p>
          <p>
            <strong>Air Roasting:</strong> It consumes approximately 1.0 kWh per
            kg of coffee, resulting in 0.4 kg of CO2 per kg of coffee.
          </p>
          <p>
            <strong>Traditional Gas Roaster:</strong> It consumes approximately
            0.25 m³ of gas per kg, which is equivalent to ~2.5 kWh. This
            translates to 0.5 kg of direct CO2 emissions, and ~1.2 kg of CO2 per
            kg when including inefficiencies.
          </p>
          <p>
            <strong>Resulting CO2 Savings:</strong> The air roasting method
            results in approximately 0.8 kg less CO2 per kg of roasted coffee
            compared to traditional gas roasting.
          </p>
          <p>
            <strong>Example:</strong> For 1,000 kg (1 ton) of roasted coffee,
            this method saves 800 kg of CO2.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <img
              src="/logo-olor.png"
              alt="OLOR air-roasted in berlin"
              className="footer-logo"
            />
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>info@cafemundi.de</p>
            <p>+49 (030) 2028-8581</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/cafemundi.de/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://cafemundi.de/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
              >
                Website
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p style={{ marginBottom: "10px" }}>
            Sustainable coffee solutions for a better planet.
          </p>
          <p>
            &copy; {new Date().getFullYear()} OLOR air-roasted in berlin - Telos
            Import Export & Trading GmbH. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SustainabilityDashboard;
