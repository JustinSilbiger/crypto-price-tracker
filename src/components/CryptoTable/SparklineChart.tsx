import { FC, useEffect, useRef, useMemo } from 'react';
import { createChart, ColorType, UTCTimestamp, IChartApi, LineWidth } from 'lightweight-charts';

interface SparklineChartProps {
  data: number[];
  id: string;
  percentageChange: number;
}

export const SparklineChart: FC<SparklineChartProps> = ({ data, id, percentageChange }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const isDarkMode = !document.documentElement.classList.contains('light');

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const timeStep = Math.floor(24 * 60 * 60 / data.length);
    return data.map((price, index) => ({
      time: (Math.floor(Date.now() / 1000) - (data.length - index) * timeStep) as UTCTimestamp,
      value: price,
    }));
  }, [data]);

  // Add resize observer to handle container size changes
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      if (chartRef.current && entries[0]) {
        const { width, height } = entries[0].contentRect;
        chartRef.current.applyOptions({ width, height });
      }
    });

    resizeObserver.observe(chartContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return;

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: isDarkMode ? '#9CA3AF' : '#6B7280',
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      timeScale: {
        visible: false,
        borderVisible: false,
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScale: false,
      handleScroll: false,
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);

    const series = chartRef.current.addAreaSeries({
      lineColor: percentageChange >= 0 ? '#00FC2A' : '#FE1040',
      topColor: percentageChange >= 0 ? '#00FC2A20' : '#FE104020',
      bottomColor: 'transparent',
      lineWidth: 1 as LineWidth,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 3,
      lastValueVisible: false,
    });

    series.setData(chartData);

    // Fit the content
    chartRef.current.timeScale().fitContent();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [chartData, percentageChange, isDarkMode]);

  return (
    <div 
      ref={chartContainerRef} 
      id={`chart-${id}`} 
      className="sparkline-chart"
      style={{ 
        width: '100%',
        height: '100%'
      }}
    />
  );
}; 