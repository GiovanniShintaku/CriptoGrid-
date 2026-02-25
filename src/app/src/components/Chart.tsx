import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";
import type { OHLCData } from "@/types/Coin";

interface ChartProps {
  data: OHLCData[]; 
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const width = 800;
  const height = 300;
  const margin = 20;
  const candleWidth = 8;
  const upColor = "#2ecc71";
  const downColor = "#e74c3c";

  const svgChart =
    data && data.length > 0
      ? (() => {
          const prices = data.flatMap((d) => [d.high, d.low, d.open, d.close]);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const innerHeight = Math.max(1, height - margin * 2);
          const innerWidth = Math.max(1, width - margin * 2);

          const priceToY = (p: number) =>
            margin +
            ((maxPrice - p) / (maxPrice - minPrice || 1)) * innerHeight;

          const step = innerWidth / data.length;
          const ticks = [0, 0.25, 0.5, 0.75, 1];

          return (
            <Svg width={width} height={height}>
              {/* eixo de preço */}
              {ticks.map((t) => {
                const y = margin + t * innerHeight;
                const price = (1 - t) * (maxPrice - minPrice) + minPrice;
                return (
                  <React.Fragment key={t}>
                    {/* linha */}
                    <Line
                      x1={margin}
                      x2={width - margin}
                      y1={y}
                      y2={y}
                      stroke="#444"
                      strokeWidth={1}
                    />
                    {/* label do preço */}
                    <SvgText
                      x={width - margin + 6}
                      y={y + 4}
                      fontSize={10}
                      fill="#aaa"
                    >
                      {price.toFixed(2)}
                    </SvgText>
                  </React.Fragment>
                );
              })}

              {/* velas */}
              {data.map((d, i) => {
                const cx = margin + i * step + step / 2;
                const wickTop = priceToY(d.high);
                const wickBottom = priceToY(d.low);
                const bodyTop = priceToY(Math.max(d.open, d.close));
                const bodyBottom = priceToY(Math.min(d.open, d.close));
                const bodyHeight = Math.max(1, bodyBottom - bodyTop);
                const isUp = d.close >= d.open;
                const fill = isUp ? upColor : downColor;
                const stroke = fill;

                return (
                  <React.Fragment key={i}>
                    {/* wick */}
                    <Line
                      x1={cx}
                      x2={cx}
                      y1={wickTop}
                      y2={wickBottom}
                      stroke={stroke}
                      strokeWidth={1}
                      strokeLinecap="butt"
                    />
                    {/* body */}
                    <Rect
                      x={cx - candleWidth / 2}
                      y={bodyTop}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={fill}
                      stroke={stroke}
                      rx={1}
                      ry={1}
                    />
                  </React.Fragment>
                );
              })}
            </Svg>
          );
        })()
      : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Gráfico de velas</Text>
      {data && data.length > 0 ? (
        <>
          <Text style={styles.info}>
            {data.length} pontos de dados recebidos
          </Text>
          <View style={styles.jsonBox}>
            <Text style={styles.jsonText}>
              {JSON.stringify(data.slice(0, 2), null, 2)}
            </Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.chartWrapper}
            showsHorizontalScrollIndicator={false}
          >
            {svgChart}
          </ScrollView>
        </>
      ) : (
        <Text style={styles.info}>Nenhum dado carregado ainda.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    padding: 16,
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  info: {
    color: "#374151",
    fontSize: 12,
    textAlign: "center",
  },
  jsonBox: {
    backgroundColor: "#111827",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    alignSelf: "stretch",
  },
  jsonText: {
    color: "#6ee7b7",
    fontSize: 10,
    fontFamily: "monospace",
  },
  chartWrapper: {
    marginTop: 16,
    justifyContent: "center",
  },
});

export default Chart;
