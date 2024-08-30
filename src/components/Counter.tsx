/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { css } from "@emotion/react";

interface CounterProps {
  targetNumber: number;
  largeText: any;
}

const Counter: React.FC<CounterProps> = ({ targetNumber, largeText }) => {
  const [number, setNumber] = useState<number>(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = targetNumber;
      if (start === end) return;

      const incrementTime = Math.abs(Math.floor(500 / (end - start)));
      const timer = setInterval(() => {
        start += 1;
        setNumber(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, targetNumber]);

  return (
    <Typography
      ref={ref}
      variant="body1"
      css={css`
        ${largeText};
      `}
    >
      {number}+
    </Typography>
  );
};

export default Counter;
