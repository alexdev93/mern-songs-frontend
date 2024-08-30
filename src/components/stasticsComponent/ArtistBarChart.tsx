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

interface ArtistBarChartProps {
  data: { _id: string; totalAlbums: number }[] | undefined;
}

const ArtistBarChart: React.FC<ArtistBarChartProps> = ({ data }) => {
  const theme = useTheme();

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

    return {
      labels: data.map((item) => item._id),
      datasets: [
        {
          label: "Total Albums",
          data: data.map((item) => item.totalAlbums),
          backgroundColor: data.map(
            (_, index) => COLORS[index % COLORS.length]
          ),
          borderColor: theme.palette.background.paper,
          borderWidth: 1,
        },
      ],
    };
  }, [data, theme.palette.background.paper]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // Allow the chart to take up the full height
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
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%; 
      `}
    >
      <Typography
        variant="h6"
        css={css`
          color: ${theme.palette.text.primary};
          margin-bottom: 16px;
        `}
      >
        Total Albums by Artist
      </Typography>
      {data && data.length > 0 ? (
        <div
          css={css`
            width: 100%;
            height: 500px; 
            min-height: 500px; 
          `}
        >
          <Bar data={chartData as any} options={options} />
        </div>
      ) : (
        <Typography
          variant="body1"
          css={css`
            color: ${theme.palette.text.primary};
          `}
        >
          No data available
        </Typography>
      )}
    </div>
  );
};

export default ArtistBarChart;
