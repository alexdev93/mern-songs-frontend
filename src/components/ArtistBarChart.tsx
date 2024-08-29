// src/components/ArtistBarChart.tsx

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

interface ArtistBarChartProps {
  data: { _id: string; totalAlbums: number }[] | undefined;
}

const ArtistBarChart: React.FC<ArtistBarChartProps> = ({ data }) => {
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
            label: "Total Albums",
            data: [],
            backgroundColor: [],
            borderColor: theme.palette.background.paper,
            borderWidth: 1,
          },
        ],
      };
    }

    // Log data for debugging
    console.log("Artist Data:", data);

    return {
      labels: data.map((item) => item._id), // Use _id as the label
      datasets: [
        {
          label: "Total Albums",
          data: data.map((item) => item.totalAlbums),
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
              `${tooltipItem.label}: ${tooltipItem.raw} albums`,
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
          beginAtZero: true,
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
        Total Albums by Artist
      </Typography>
      {data && data.length > 0 ? (
        <div style={{ width: "100%", height: "300px" }}>
          <Bar data={chartData as any} options={options} />
        </div>
      ) : (
        <Typography variant="body1" color={theme.palette.text.primary}>
          No data available
        </Typography>
      )}
    </div>
  );
};

export default ArtistBarChart;
