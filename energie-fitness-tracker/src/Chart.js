import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, ScatterChart,styler,BandChart,Resizable } from "react-timeseries-charts";
import { TimeSeries, Index ,percentile} from "pondjs";

export default function Chart({data}){
    const series = new TimeSeries({
      name: "hilo_rainfall",
      columns: ["index", "precip"],
      points: data.map(([d, value]) => [Index.getIndexString('15m',d.getTime()), value])
    });
    const axis_style = { label: { stroke: "none", fill: "#C0C0C0",'font-weight': 'bold', 'font-size': 'large',  font: '"Goudy Bookletter 1911", sans-serif"' },
     values: { stroke: "none", fill: "#C0C0C0",'font-weight': 'normal', 'font-size': 'medium', font: '"Goudy Bookletter 1911", sans-serif"' },
      ticks: { fill: "none", stroke: "#C0C0C0" },
       axis: { fill: "none", stroke: "none" } }
    const style = styler([{ key: "precip", color: "#76B82A", selected: "#2CB1CF" ,width:1}]);
    const bandStyle = styler([{ key: "precip", color: "blue", width: 1, opacity: 0.5 }]);
    //        <div style={{width:'80%'}}>
    return (
        <div style={{width:'90%'}}>
        <Resizable>
            <ChartContainer timeRange={series.range()} 
                                timeAxisStyle={axis_style} 
                                title="Tuesdays" 
                                paddingRight={100} 
                                paddingTop={5}
            style={{
                background: "#201d1e",
                borderRadius: 8,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "white"
            }} titleStyle={{
                color: "white",
                fontWeight: 500,
                fontSize:25,
                
            }}
            padding={20}>
        
                <ChartRow height="300">
                    <YAxis
                        id="rain"
                        showGrid
                        hideAxisLine
                        style={axis_style}
                        label="Visitors"
                        format=".2f"
                        width={100}
                        min={0}
                        max={series.max('precip')}
                        labelOffset={-15}
                        type="linear"
                    />
                    <Charts>
                        <BandChart
                            axis="rain"
                            //interpolation="curveBasis"
                            aggregation={{
                                size: "15m",
                                reducers: {
                                    outer: [percentile(5), percentile(95)],
                                    inner: [percentile(25), percentile(75)]
                                }
                            }}
                            style={bandStyle}
                            column="precip"
                            series={series}
                            interpolation="curveBasis"
                        />
                        <ScatterChart
                            axis="rain"
                            series={series}
                            columns={["precip"]}
                            style={style}
                            format=".1f"
                            radius={3}
                        />
                    </Charts>
                </ChartRow>
            </ChartContainer>
            </Resizable>
            </div>
    )
}