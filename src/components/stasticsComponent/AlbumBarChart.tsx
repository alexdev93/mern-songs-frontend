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
import { css } from "@emotion/react";
import { COLORS } from "../../constants";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface HorizontalBarChartProps {
  data?: { _id: string; count: number }[];
}

const AlbumBarChart: React.FC<HorizontalBarChartProps> = ({ data = [] }) => {
  const theme = useTheme();

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
            (_, index) => COLORS[index % COLORS.length]
          ),
          borderColor: theme.palette.background.paper,
          borderWidth: 1,
        },
      ],
    };
  }, [data, theme.palette.background.paper]);

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
              `${tooltipItem.label}: ${tooltipItem.raw} songs`,
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

  if (data.length === 0) {
    return (
      <div
        css={css`
          width: 100%;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <span>No data available</span>
      </div>
    );
  }

  return (
    <div
      css={css`
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        box-sizing: border-box;
      `}
    >
      <Typography
        variant="h6"
        css={css`
          margin-bottom: 16px;
          text-align: center;
          color: ${theme.palette.text.primary};
        `}
      >
        Albums Count by Artist
      </Typography>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AlbumBarChart;
