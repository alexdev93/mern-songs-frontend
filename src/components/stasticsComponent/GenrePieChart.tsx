/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { COLORS } from "../../constants";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface GenrePieChartProps {
  data: { _id: string; count: number }[] | undefined;
}

const GenrePieChart: React.FC<GenrePieChartProps> = ({ data }) => {
  const theme = useTheme();

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
  }, [data, theme.palette.background.paper]);

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
          borderWidth: 2,
        },
      },
      cutout: "70%",
    }),
    []
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
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
        Genre Distribution
      </Typography>
      {data && data.length > 0 ? (
        <div
          css={css`
            width: 300px;
            height: 300px;
          `}
        >
          <Pie data={chartData as any} options={options} />
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

export default GenrePieChart;
