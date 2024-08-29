/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface HorizontalBarChartProps {
  data?: { _id: string; count: number }[]; // Make data optional
}

const AlbumBarChart: React.FC<HorizontalBarChartProps> = ({ data = [] }) => {
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
    if (data.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Count",
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
          label: "Count",
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
      indexAxis: "y" as const,
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) =>
              `${tooltipItem.label}: ${tooltipItem.raw} counts`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: theme.palette.text.primary,
          },
        },
        y: {
          grid: {
            color: theme.palette.text.secondary,
          },
          ticks: {
            color: theme.palette.text.primary,
          },
        },
      },
    }),
    [theme.palette.text.primary, theme.palette.text.secondary]
  );

  // Render a message if no data is available
  if (data.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>No data available</span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px", // Add padding
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: "16px",
          textAlign: "center",
          color: theme.palette.text.primary,
        }}
      >
        Albums Count by Artist
      </Typography>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AlbumBarChart;
