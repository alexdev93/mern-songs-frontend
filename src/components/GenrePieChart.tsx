// src/components/GenrePieChart.tsx
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface GenrePieChartProps {
  data: { _id: string; count: number }[] | undefined;
}

const GenrePieChart: React.FC<GenrePieChartProps> = ({ data }) => {
  const theme = useTheme();

  // Define a set of colors for up to 10 different data entries
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#FF9F40",
    "#C9CBCF",
    "#E7E9ED",
    "#F1C40F",
    "#E74C3C",
    "#9B59B6",
  ];

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: theme.palette.background.paper,
            borderWidth: 1,
          },
        ],
      };
    }

    return {
      labels: data.map((item) => item._id),
      datasets: [
        {
          data: data.map((item) => item.count),
          backgroundColor: data.map(
            (_, index) => colors[index % colors.length]
          ),
          borderColor: theme.palette.background.paper,
          borderWidth: 1,
        },
      ],
    };
  }, [data, theme.palette.background.paper, colors]);

  // Prepare chart options
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) =>
              `${tooltipItem.label}: ${tooltipItem.raw} songs`,
          },
        },
      },
      elements: {
        arc: {
          borderWidth: 2, // Adjust border width to make it look compact
        },
      },
      cutout: "70%", // Creates a donut effect
    }),
    [theme.palette.background.paper]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
        textAlign: "center",
        height: "100%", // Ensure it takes full height of the container
      }}
    >
      <Typography variant="h6" color={theme.palette.text.primary} gutterBottom>
        Genre Distribution
      </Typography>
      {data && data.length > 0 ? (
        <div style={{ width: "300px", height: "300px" }}>
          <Pie data={chartData as any} options={options} />
        </div>
      ) : (
        <Typography variant="body1" color={theme.palette.text.primary}>
          No data available
        </Typography>
      )}
    </div>
  );
};

export default GenrePieChart;
