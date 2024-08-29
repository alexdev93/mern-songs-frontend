import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { COLORS } from "../../constants"

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface GenrePieChartProps {
  data: { _id: string; count: number }[] | undefined;
}

const GenrePieChart: React.FC<GenrePieChartProps> = ({ data }) => {
  const theme = useTheme();

  

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
            (_, index) => COLORS[index % COLORS.length]
          ),
          borderColor: theme.palette.background.paper,
          borderWidth: 1,
        },
      ],
    };
  }, [data, theme.palette.background.paper, COLORS]);

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
