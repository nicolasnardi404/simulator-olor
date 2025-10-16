import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Svg,
  Path,
  Circle,
  Rect,
  Line,
} from "@react-pdf/renderer";

// Using default fonts to avoid font loading issues

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 25,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    backgroundColor: "#6c79b6",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 68,
    objectFit: "contain",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  reportInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#9187bd",
  },
  reportDate: {
    fontSize: 12,
    color: "#6c79b6",
  },
  reportPeriod: {
    fontSize: 12,
    color: "#6c79b6",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 0,
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#6c79b6",
    fontWeight: "bold",
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 4,
    borderLeft: "4px solid #6c79b6",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#F0F4FF",
    padding: 18,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #E0E0E0",
    minHeight: 80,
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6c79b6",
    marginBottom: 8,
    lineHeight: 1.2,
  },
  metricLabel: {
    fontSize: 11,
    color: "#666666",
    lineHeight: 1.3,
  },
  metricSubValue: {
    fontSize: 9,
    color: "#999999",
    lineHeight: 1.2,
    marginTop: 4,
    fontStyle: "italic",
  },
  perspectiveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 4,
    border: "1px solid #E0E0E0",
  },
  perspectiveLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6c79b6",
  },
  chartContainer: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#FAFAFA",
    borderRadius: 6,
    border: "1px solid #E0E0E0",
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6c79b6",
    marginBottom: 12,
  },
  chartPlaceholder: {
    backgroundColor: "#E8F5E8",
    padding: 25,
    borderRadius: 4,
    border: "2px dashed #2E7D32",
    textAlign: "center",
    marginBottom: 15,
  },
  chartText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "bold",
    marginBottom: 5,
  },
  chartVisualization: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 6,
    border: "1px solid #E0E0E0",
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 30,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 11,
    color: "#6c79b6",
    fontWeight: "bold",
  },
  barChartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    minHeight: 80,
    paddingVertical: 10,
  },
  barChartItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  barChartLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  barChartBars: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  barChartBarContainer: {
    alignItems: "center",
    gap: 4,
  },
  barChartBar: {
    width: 12,
    borderRadius: 2,
    minHeight: 4,
  },
  barChartValue: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
  },
  distributionChart: {
    gap: 12,
  },
  distributionItem: {
    marginBottom: 12,
  },
  distributionLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  distributionColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  distributionLabel: {
    fontSize: 11,
    color: "#6c79b6",
    fontWeight: "bold",
  },
  distributionBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  distributionBar: {
    height: 16,
    borderRadius: 2,
    minWidth: 4,
  },
  distributionValue: {
    fontSize: 10,
    color: "#666",
    fontWeight: "bold",
  },
  svgChartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  dataTable: {
    marginTop: 15,
    border: "1px solid #E0E0E0",
    borderRadius: 4,
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 8,
    minHeight: 35,
  },
  tableHeader: {
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#6c79b6",
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 6,
    fontSize: 11,
    lineHeight: 1.3,
  },
  tableCellCenter: {
    flex: 1,
    paddingHorizontal: 6,
    fontSize: 11,
    textAlign: "center",
    lineHeight: 1.3,
  },
  equivalentsSection: {
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
    border: "1px solid #E0E0E0",
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  equivalentsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 12,
  },
  equivalentsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  equivalentItem: {
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  equivalentValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
    lineHeight: 1.2,
  },
  equivalentLabel: {
    fontSize: 11,
    color: "#666666",
    lineHeight: 1.3,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 15,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 10,
    color: "#999999",
    textAlign: "center",
  },
});

const PDFReport = ({ dashboardData, currentView }) => {
  if (!dashboardData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No data available for PDF generation</Text>
        </Page>
      </Document>
    );
  }

  // Calculate equivalents - PDF always shows yearly projections
  const constants = {
    treeYearlyCo2Capture: 21.77,
    carEmissionsPer100km: 0.12,
    plasticBottleWeight: 0.02,
  };

  // Scale data to yearly for PDF (PDF always shows yearly projections)
  const yearlyData = {
    beansSold: dashboardData.beansSold * 12,
    roastedCoffee: dashboardData.roastedCoffee * 12,
    plasticSaved: dashboardData.plasticSaved * 12,
    co2Saved: dashboardData.co2Saved * 12,
    estimatedVcu: dashboardData.estimatedVcu * 12,
  };

  const equivalents = {
    // Yearly equivalents
    trees: yearlyData.co2Saved / (constants.treeYearlyCo2Capture / 12),
    carKm: Math.round(
      (yearlyData.co2Saved / constants.carEmissionsPer100km) * 100
    ),
    bottles: Math.round(
      yearlyData.plasticSaved / constants.plasticBottleWeight
    ),
    // Monthly equivalents
    monthlyTrees:
      yearlyData.co2Saved / 12 / (constants.treeYearlyCo2Capture / 12),
    monthlyCarKm: Math.round(
      (yearlyData.co2Saved / 12 / constants.carEmissionsPer100km) * 100
    ),
    monthlyBottles: Math.round(
      yearlyData.plasticSaved / 12 / constants.plasticBottleWeight
    ),
  };

  // Prepare chart data - yearly cumulative
  const getPlasticChartData = () => {
    const labels = [
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
    // yearlyData contains yearly totals, so we divide by 12 to get monthly average
    const monthlyPlastic = yearlyData.plasticSaved / 12;

    return labels.map((label, i) => ({
      period: label,
      value: parseFloat((monthlyPlastic * (i + 1)).toFixed(3)),
    }));
  };

  const getCo2ChartData = () => {
    const labels = [
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
    // yearlyData contains yearly totals, so we divide by 12 to get monthly average
    const monthlyCo2 = yearlyData.co2Saved / 12;

    return labels.map((label, i) => ({
      period: label,
      value: parseFloat((monthlyCo2 * (i + 1)).toFixed(3)),
    }));
  };

  // Get yearly data for both charts
  const plasticChartData = getPlasticChartData();
  const co2ChartData = getCo2ChartData();

  // Professional Line Chart Component for single data series
  const LineChart = ({
    data,
    width = 400,
    height = 200,
    color = "#2E7D32",
    label = "Value",
  }) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const getX = (index) => padding + (index / (data.length - 1)) * chartWidth;
    const getY = (value) =>
      padding + chartHeight - (value / maxValue) * chartHeight;

    // Create smooth path for the line
    const linePath = data
      .map((d, i) => {
        const x = getX(i);
        const y = getY(d.value);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");

    // Create filled area path
    const areaPath = `${linePath} L ${getX(data.length - 1)} ${
      padding + chartHeight
    } L ${getX(0)} ${padding + chartHeight} Z`;

    return (
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <Line
            key={ratio}
            x1={padding}
            y1={padding + ratio * chartHeight}
            x2={padding + chartWidth}
            y2={padding + ratio * chartHeight}
            stroke="#E0E0E0"
            strokeWidth={0.5}
          />
        ))}

        {/* Y-axis */}
        <Line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={padding + chartHeight}
          stroke="#333"
          strokeWidth={1}
        />

        {/* X-axis */}
        <Line
          x1={padding}
          y1={padding + chartHeight}
          x2={padding + chartWidth}
          y2={padding + chartHeight}
          stroke="#333"
          strokeWidth={1}
        />

        {/* Filled area */}
        <Path d={areaPath} fill={`${color}20`} stroke="none" />

        {/* Line */}
        <Path d={linePath} stroke={color} strokeWidth={2} fill="none" />

        {/* Data points */}
        {data.map((d, i) => (
          <Circle
            key={i}
            cx={getX(i)}
            cy={getY(d.value)}
            r={4}
            fill={color}
            stroke="#fff"
            strokeWidth={1}
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => (
          <Text
            key={i}
            x={getX(i)}
            y={padding + chartHeight + 15}
            style={{
              fontSize: 9,
              textAnchor: "middle",
              fill: "#666",
            }}
          >
            {d.period}
          </Text>
        ))}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <Text
            key={ratio}
            x={padding - 10}
            y={padding + (1 - ratio) * chartHeight + 3}
            style={{
              fontSize: 8,
              textAnchor: "end",
              fill: "#666",
            }}
          >
            {Math.round(maxValue * ratio).toLocaleString()}
          </Text>
        ))}
      </Svg>
    );
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src="/logo-olor.png" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>
                Sustainability Impact Report
              </Text>
            </View>
          </View>
        </View>

        {/* Report Info */}
        <View style={styles.reportInfo}>
          <Text style={styles.reportDate}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.reportPeriod}>
            Comprehensive Sustainability Report
          </Text>
        </View>

        {/* Business Overview - Monthly & Yearly */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Overview</Text>

          <View style={styles.metricsGrid}>
            {/* Coffee Beans Sold */}
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>
                {formatNumber(yearlyData.beansSold / 12)} kg
              </Text>
              <Text style={styles.metricLabel}>
                Coffee Beans - Monthly Average
              </Text>
              <Text style={styles.metricSubValue}>
                {formatNumber(yearlyData.beansSold)} kg total yearly
              </Text>
            </View>

            {/* Roasted Coffee */}
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>
                {formatNumber(yearlyData.roastedCoffee / 12)} kg
              </Text>
              <Text style={styles.metricLabel}>
                Roasted Coffee - Monthly Average
              </Text>
              <Text style={styles.metricSubValue}>
                {formatNumber(yearlyData.roastedCoffee)} kg total yearly
              </Text>
            </View>
          </View>
        </View>

        {/* Environmental Impact - Monthly & Yearly */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>

          <View style={styles.metricsGrid}>
            {/* CO2 Saved */}
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>
                {formatNumber(yearlyData.co2Saved / 12)} kg
              </Text>
              <Text style={styles.metricLabel}>
                CO₂ Saved - Monthly Average
              </Text>
              <Text style={styles.metricSubValue}>
                {formatNumber(yearlyData.co2Saved)} kg total yearly
              </Text>
            </View>

            {/* Plastic Saved */}
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>
                {formatNumber(yearlyData.plasticSaved / 12)} kg
              </Text>
              <Text style={styles.metricLabel}>
                Plastic Saved - Monthly Average
              </Text>
              <Text style={styles.metricSubValue}>
                {formatNumber(yearlyData.plasticSaved)} kg total yearly
              </Text>
            </View>

            {/* VCU Value */}
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>
                €{formatNumber(yearlyData.estimatedVcu / 12)}
              </Text>
              <Text style={styles.metricLabel}>
                VCU Value - Monthly Average
              </Text>
              <Text style={styles.metricSubValue}>
                €{formatNumber(yearlyData.estimatedVcu)} total yearly
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Second Page - Yearly Cumulative Plastic Saved */}
      <Page size="A4" style={styles.page}>
        {/* Plastic Saved Chart - Yearly Only */}
        <View
          style={{
            pageBreakInside: "avoid",
            breakInside: "avoid",
          }}
        >
          <Text style={styles.chartTitle}>Yearly Cumulative Plastic Saved</Text>

          {/* Business Projection Explanation */}
          <View
            style={[
              styles.metricCard,
              {
                width: "100%",
                backgroundColor: "#F8F9FA",
                marginBottom: 18,
                padding: 18,
              },
            ]}
          >
            <Text
              style={[
                styles.metricLabel,
                { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
              ]}
            >
              Business Projection Analysis
            </Text>
            <Text
              style={[
                styles.metricLabel,
                { fontSize: 12, lineHeight: 1.4, marginBottom: 10 },
              ]}
            >
              By choosing our coffee, you would be saving{" "}
              {formatNumber(yearlyData.plasticSaved / 12)} kg of plastic per
              month, totaling {formatNumber(yearlyData.plasticSaved)} kg per
              year.
            </Text>
            <Text
              style={[
                styles.metricLabel,
                { fontSize: 11, lineHeight: 1.3, marginBottom: 0 },
              ]}
            >
              • Each kg of roasted coffee saves 34g of plastic through our
              aluminum pail packaging instead of plastic bags
            </Text>
          </View>

          {/* Visual Chart Representation */}
          <View style={styles.chartVisualization}>
            {/* Professional Line Chart for Plastic */}
            <View style={styles.svgChartContainer}>
              <LineChart
                data={plasticChartData}
                width={400}
                height={200}
                color="#2E7D32"
                label="Plastic Saved"
              />
            </View>

            {/* Compact Legend Below Chart */}
            <View
              style={[
                styles.chartLegend,
                { marginTop: 4, justifyContent: "center" },
              ]}
            >
              <View
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  },
                ]}
              >
                <View
                  style={[
                    {
                      backgroundColor: "#2E7D32",
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      marginBottom: 4,
                    },
                  ]}
                />
                <Text
                  style={[
                    {
                      fontSize: 9,
                      fontWeight: "bold",
                      color: "#2E7D32",
                      textAlign: "center",
                    },
                  ]}
                >
                  Plastic Saved (kg)
                </Text>
              </View>
            </View>

            {/* Total Value Display */}
            <View
              style={[
                styles.metricCard,
                {
                  width: "100%",
                  backgroundColor: "#F0F8F0",
                  marginTop: 18,
                  padding: 18,
                },
              ]}
            >
              <Text
                style={[
                  styles.metricValue,
                  { fontSize: 22, color: "#2E7D32", textAlign: "center" },
                ]}
              >
                Total: {formatNumber(yearlyData.plasticSaved)} kg
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { textAlign: "center", fontSize: 13 },
                ]}
              >
                Plastic Saved per Year
              </Text>
            </View>

            {/* Calculation Method Explanation */}
            <View
              style={[
                styles.metricCard,
                {
                  width: "100%",
                  backgroundColor: "#E8F5E8",
                  marginTop: 18,
                  padding: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.metricLabel,
                  { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
                ]}
              >
                How We Calculate Plastic Savings:
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { fontSize: 11, lineHeight: 1.4, marginBottom: 4 },
                ]}
              >
                • Packaging savings: {formatNumber(yearlyData.beansSold)} kg
                coffee × 34g = {formatNumber(yearlyData.beansSold * 0.034)} kg
                plastic saved
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { fontSize: 11, lineHeight: 1.4, marginBottom: 0 },
                ]}
              >
                • Total plastic saved: {formatNumber(yearlyData.plasticSaved)}{" "}
                kg through sustainable packaging
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Third Page - Yearly Cumulative CO2 Saved */}
      <Page size="A4" style={styles.page}>
        {/* CO2 Saved Chart - Yearly Only */}
        <View
          style={{
            pageBreakInside: "avoid",
            breakInside: "avoid",
            marginTop: 15,
          }}
        >
          <Text style={styles.chartTitle}>Yearly Cumulative CO₂ Saved</Text>

          {/* Environmental Impact Analysis */}
          <View
            style={[
              styles.metricCard,
              {
                width: "100%",
                backgroundColor: "#F8F9FA",
                marginBottom: 12,
                padding: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.metricLabel,
                { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
              ]}
            >
              Environmental Impact Analysis
            </Text>
            <Text
              style={[styles.metricLabel, { fontSize: 11, lineHeight: 1.3 }]}
            >
              This chart shows the cumulative CO₂ savings throughout the year,
              demonstrating the environmental impact of our sustainable
              production methods and eco-friendly materials compared to
              traditional industrial processes.
            </Text>
          </View>

          {/* Visual Chart Representation */}
          <View style={styles.chartVisualization}>
            {/* Professional Line Chart for CO2 */}
            <View style={styles.svgChartContainer}>
              <LineChart
                data={co2ChartData}
                width={400}
                height={200}
                color="#1976D2"
                label="CO₂ Saved"
              />
            </View>

            {/* Legend below chart */}
            <View
              style={[
                styles.chartLegend,
                { marginTop: 0, justifyContent: "center" },
              ]}
            >
              <View
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  },
                ]}
              >
                <View
                  style={[
                    {
                      backgroundColor: "#1976D2",
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      marginBottom: 0,
                    },
                  ]}
                />
                <Text
                  style={[
                    {
                      fontSize: 9,
                      fontWeight: "bold",
                      color: "#1976D2",
                      textAlign: "center",
                    },
                  ]}
                >
                  CO₂ Saved (kg)
                </Text>
              </View>
            </View>

            {/* Total Value Display */}
            <View
              style={[
                styles.metricCard,
                {
                  width: "100%",
                  backgroundColor: "#F0F8FF",
                  marginTop: 12,
                  padding: 10,
                },
              ]}
            >
              <Text
                style={[
                  styles.metricValue,
                  { fontSize: 20, color: "#1976D2", textAlign: "center" },
                ]}
              >
                Total: {formatNumber(yearlyData.co2Saved)} kg
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { textAlign: "center", fontSize: 12 },
                ]}
              >
                CO₂ Saved per Year
              </Text>
            </View>

            {/* Calculation Method Explanation */}
            <View
              style={[
                styles.metricCard,
                {
                  width: "100%",
                  backgroundColor: "#E3F2FD",
                  marginTop: 12,
                  padding: 10,
                },
              ]}
            >
              <Text
                style={[
                  styles.metricLabel,
                  {
                    fontSize: 11,
                    fontWeight: "bold",
                    marginBottom: 3,
                    marginTop: 0,
                  },
                ]}
              >
                Air Roasting Efficiency:
              </Text>
              <Text
                style={[styles.metricLabel, { fontSize: 10, lineHeight: 1.2 }]}
              >
                • Traditional drum roasting: 1.2 kg CO₂ per kg of coffee
              </Text>
              <Text
                style={[styles.metricLabel, { fontSize: 10, lineHeight: 1.2 }]}
              >
                • Our air roasting method: 0.4 kg CO₂ per kg of coffee
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { fontSize: 10, lineHeight: 1.3, marginBottom: 4 },
                ]}
              >
                • Calculation: {formatNumber(yearlyData.beansSold)} kg × 0.8 kg
                CO₂/kg = {formatNumber(yearlyData.beansSold * 0.8)} kg CO₂ saved
              </Text>

              <Text
                style={[
                  styles.metricLabel,
                  {
                    fontSize: 11,
                    fontWeight: "bold",
                    marginBottom: 3,
                    marginTop: 6,
                  },
                ]}
              >
                Total CO₂ Savings:
              </Text>
              <Text
                style={[styles.metricLabel, { fontSize: 10, lineHeight: 1.2 }]}
              >
                • Our methods reduce energy consumption by 33% in roasting
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { fontSize: 10, lineHeight: 1.3, marginBottom: 4 },
                ]}
              >
                • Total CO₂ savings: {formatNumber(yearlyData.co2Saved)} kg
                through sustainable air roasting methods
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Fourth Page - Environmental Equivalents and Summary */}
      <Page size="A4" style={styles.page}>
        {/* Environmental Equivalents */}
        <View
          style={[
            styles.equivalentsSection,
            { pageBreakInside: "avoid", breakInside: "avoid" },
          ]}
        >
          <Text style={styles.equivalentsTitle}>
            Environmental Impact Equivalents
          </Text>

          {/* Monthly Equivalents */}
          <View
            style={{
              marginBottom: 12,
              pageBreakInside: "avoid",
              breakInside: "avoid",
            }}
          >
            <Text
              style={[
                styles.equivalentsTitle,
                { fontSize: 12, marginBottom: 8, color: "#666" },
              ]}
            >
              Monthly Impact
            </Text>
            <View style={styles.equivalentsGrid}>
              <View style={styles.equivalentItem}>
                <Text style={styles.equivalentValue}>
                  {formatNumber(equivalents.monthlyTrees)}
                </Text>
                <Text style={styles.equivalentLabel}>Trees Equivalent</Text>
                <Text
                  style={[
                    styles.equivalentLabel,
                    { fontSize: 9, color: "#999", marginTop: 2 },
                  ]}
                >
                  per month
                </Text>
              </View>
              <View style={styles.equivalentItem}>
                <Text style={styles.equivalentValue}>
                  {formatNumber(equivalents.monthlyCarKm)} km
                </Text>
                <Text style={styles.equivalentLabel}>Car Emissions Saved</Text>
                <Text
                  style={[
                    styles.equivalentLabel,
                    { fontSize: 9, color: "#999", marginTop: 2 },
                  ]}
                >
                  per month
                </Text>
              </View>
              <View style={styles.equivalentItem}>
                <Text style={styles.equivalentValue}>
                  {formatNumber(equivalents.monthlyBottles)}
                </Text>
                <Text style={styles.equivalentLabel}>
                  Plastic Bottles Avoided
                </Text>
                <Text
                  style={[
                    styles.equivalentLabel,
                    { fontSize: 9, color: "#999", marginTop: 2 },
                  ]}
                >
                  per month
                </Text>
              </View>
            </View>
          </View>

          {/* Yearly Equivalents */}
          <View style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
            <Text
              style={[
                styles.equivalentsTitle,
                { fontSize: 12, marginBottom: 8, color: "#666" },
              ]}
            >
              Yearly Impact
            </Text>
            <View style={styles.equivalentsGrid}>
              <View style={styles.equivalentItem}>
                <Text style={styles.equivalentValue}>
                  {formatNumber(equivalents.trees)}
                </Text>
                <Text style={styles.equivalentLabel}>Trees Equivalent</Text>
                <Text
                  style={[
                    styles.equivalentLabel,
                    { fontSize: 9, color: "#999", marginTop: 2 },
                  ]}
                >
                  per year
                </Text>
              </View>
              <View style={styles.equivalentItem}>
                <Text style={styles.equivalentValue}>
                  {formatNumber(equivalents.carKm)} km
                </Text>
                <Text style={styles.equivalentLabel}>Car Emissions Saved</Text>
                <Text
                  style={[
                    styles.equivalentLabel,
                    { fontSize: 9, color: "#999", marginTop: 2 },
                  ]}
                >
                  per year
                </Text>
              </View>
              <View style={styles.equivalentItem}>
                <Text style={styles.equivalentValue}>
                  {formatNumber(equivalents.bottles)}
                </Text>
                <Text style={styles.equivalentLabel}>
                  Plastic Bottles Avoided
                </Text>
                <Text
                  style={[
                    styles.equivalentLabel,
                    { fontSize: 9, color: "#999", marginTop: 2 },
                  ]}
                >
                  per year
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View
          style={[
            styles.section,
            { pageBreakInside: "avoid", breakInside: "avoid" },
          ]}
        >
          {/* Calculation Methods Card */}
          <View
            style={[
              styles.metricCard,
              {
                width: "100%",
                backgroundColor: "#F5F5F5",
                marginBottom: 15,
                padding: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.metricValue,
                { fontSize: 16, marginBottom: 12, color: "#666" },
              ]}
            >
              Calculation Methods
            </Text>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={[
                  styles.metricLabel,
                  { marginBottom: 8, fontSize: 12, lineHeight: 1.4 },
                ]}
              >
                • Tree equivalents based on average CO₂ capture of 21.77 kg per
                tree per year
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { marginBottom: 8, fontSize: 12, lineHeight: 1.4 },
                ]}
              >
                • Car emissions equivalents based on average CO₂ emissions of
                0.12 kg per car per km
              </Text>
              <Text
                style={[
                  styles.metricLabel,
                  { marginBottom: 8, fontSize: 12, lineHeight: 1.4 },
                ]}
              >
                • Plastic bottle equivalents based on average weight of 20g per
                500ml plastic water bottle
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.metricCard,
              { width: "100%", backgroundColor: "#F0F8F0" },
            ]}
          >
            <Text
              style={[
                styles.metricValue,
                { fontSize: 16, marginBottom: 12, color: "#666" },
              ]}
            >
              Key Achievements
            </Text>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={[styles.metricLabel, { marginBottom: 6, fontSize: 12 }]}
              >
                • Saved {formatNumber(yearlyData.co2Saved)} kg of CO₂ emissions
              </Text>
              <Text
                style={[styles.metricLabel, { marginBottom: 6, fontSize: 12 }]}
              >
                • Prevented {formatNumber(yearlyData.plasticSaved)} kg of
                plastic waste
              </Text>
              <Text
                style={[styles.metricLabel, { marginBottom: 6, fontSize: 12 }]}
              >
                • Generated €{formatNumber(yearlyData.estimatedVcu)} in VCU
                value
              </Text>
              <Text
                style={[styles.metricLabel, { marginBottom: 6, fontSize: 12 }]}
              >
                • Equivalent to {formatNumber(equivalents.trees)} trees planted
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This report was generated by OLOR air-roasted in berlin
            Sustainability Impact Simulator
          </Text>
          <Text
            style={[styles.footerText, { marginTop: 4, fontStyle: "italic" }]}
          >
            OLOR air-roasted in berlin - Sustainable coffee solutions for a
            better planet.
          </Text>
          <Text style={[styles.footerText, { marginTop: 4 }]}>
            &copy; {new Date().getFullYear()} OLOR air-roasted in berlin. All
            rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;
